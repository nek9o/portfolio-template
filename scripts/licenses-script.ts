import * as TOML from "@iarna/toml";
import { readFileSync } from "fs";
import path from "path";
import spdxSatisfies from "spdx-satisfies";

/**
 * ライセンス情報の型定義
 */
export interface LicenseInfo {
  name: string;
  version: string;
  licenseId: string;
  repository: string;
  publisher: string;
  email: string;
  url: string;
  licenseText: string;
}

/**
 * 許可するライセンスの SPDX 式
 * 商用利用で一般的に安全とされるライセンスを OR 条件で結合
 */
export const ALLOWED_LICENSES =
  "(MIT OR Apache-2.0 OR BSD-3-Clause OR BSD-2-Clause OR ISC OR 0BSD OR OFL-1.1)";

/**
 * リポジトリURLの表記ゆれを正規化し、クリーンなHTTPS URLに変換する関数
 * 例: git+https://github.com/... -> https://github.com/...
 */
export function cleanRepositoryUrl(url: string | undefined): string {
  if (!url) return "";

  let cleaned = url
    // 先頭の不要なプロトコルを削除・置換
    .replace(/^git\+https:\/\//, "https://")
    .replace(/^git\+ssh:\/\/(git@)?/, "https://")
    .replace(/^git:\/\//, "https://")
    .replace(/^ssh:\/\/(git@)?github\.com\//, "https://github.com/")
    .replace(/^git@github\.com:/, "https://github.com/");

  // githubのショートハンド (例: github:user/repo) への対応もあれば
  cleaned = cleaned.replace(/^github:/, "https://github.com/");

  // 末尾の .git を削除 (フラグメント/ハッシュが続く可能性も考慮)
  cleaned = cleaned.replace(/\.git(#.*)?$/, "$1");

  return cleaned;
}

/**
 * ライセンスが許可されているか判定する関数
 */
export function isLicenseAllowed(licenseId: string | undefined | null): boolean {
  if (!licenseId) return false;

  try {
    return (spdxSatisfies as any)(licenseId, ALLOWED_LICENSES);
  } catch (e) {
    // SPDX 式として解析できない場合は、念のため完全一致もチェック
    return ALLOWED_LICENSES.includes(licenseId);
  }
}

/**
 * CDN 経由で読み込むライブラリ (npm バンドル対象外) の
 * ライセンス情報を手動管理しているTOMLファイルを読み込む
 */
export function loadManualLicenses(filePath: string): LicenseInfo[] {
  try {
    const tomlContent = readFileSync(path.resolve(filePath), "utf-8");
    const data = TOML.parse(tomlContent) as unknown as {
      licenses: LicenseInfo[];
    };
    return data.licenses || [];
  } catch (e) {
    console.error(`[LicenseGenerator] 手動管理ライセンスの読み込みに失敗しました (${filePath}):`, e);
    return [];
  }
}

/**
 * rollup-plugin-license から渡される依存関係リストを JSON 文字列に整形する
 */
export function formatLicenseData(
  dependencies: any[],
  manualLicenses: LicenseInfo[]
): string {
  const result: Record<string, LicenseInfo> = {};

  // npm パッケージ (バンドル対象) を追加
  for (const dep of dependencies) {
    const key = `${dep.name}@${dep.version}`;

    // repository は string | { url: string } の可能性があるため文字列に変換
    let repository = "";
    if (typeof dep.repository === "string") {
      repository = dep.repository;
    } else if (
      dep.repository &&
      typeof dep.repository === "object" &&
      "url" in dep.repository
    ) {
      repository = (dep.repository as { url: string }).url;
    }

    repository = cleanRepositoryUrl(repository);

    result[key] = {
      name: dep.name ?? "",
      version: dep.version ?? "",
      licenseId: dep.license ?? "",
      repository,
      publisher: dep.author?.name ?? "",
      email: dep.author?.email ?? "",
      url: dep.homepage ?? "",
      licenseText: dep.licenseText ?? "",
    };
  }

  // CDN 経由ライブラリ (手動管理分) をマージ
  for (const dep of manualLicenses) {
    const key = dep.version ? `${dep.name}@${dep.version}` : dep.name;
    result[key] = dep;
  }

  return JSON.stringify(result, null, 2);
}
