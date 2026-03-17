import * as TOML from "@iarna/toml";
import { sveltekit } from "@sveltejs/kit/vite";
import { readFileSync } from "fs";
import { createRequire } from "module";
import path from "path";
import license from "rollup-plugin-license";
import spdxSatisfies from "spdx-satisfies";
import { defineConfig } from "vite";

const require = createRequire(import.meta.url);

/**
 * 許可するライセンスの SPDX 式
 * 商用利用で一般的に安全とされるライセンスを OR 条件で結合
 */
const ALLOWED_LICENSES =
  "(MIT OR Apache-2.0 OR BSD-3-Clause OR BSD-2-Clause OR ISC OR 0BSD OR OFL-1.1)";

/**
 * ライセンス情報の型定義
 */
interface LicenseInfo {
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
 * CDN 経由で読み込むライブラリ (npm バンドル対象外) の
 * ライセンス情報を手動管理するファイル (TOML形式)
 */
const manualLicensesToml = readFileSync(
  path.resolve("./src/lib/licenses.manual.toml"),
  "utf-8",
);
const manualLicensesData = TOML.parse(manualLicensesToml) as unknown as {
  licenses: LicenseInfo[];
};
const manualLicenses = manualLicensesData.licenses;

/**
 * ビルド時にサードパーティのライセンス情報を収集し、
 * static/licenses.json として出力するプラグイン
 */
const licensePlugin = license({
  thirdParty: {
    includePrivate: false,
    // 許可するライセンスの設定
    // 許可外のライセンスが見つかった場合にビルドをエラーにする
    allow: {
      test: (dependency) => {
        const licenseId = dependency.license;
        if (!licenseId) return false;

        try {
          return spdxSatisfies(licenseId, ALLOWED_LICENSES);
        } catch (e) {
          // SPDX 式として解析できない場合は、念のため完全一致もチェック
          return (ALLOWED_LICENSES as string).includes(licenseId);
        }
      },
      // ライセンスが許可リスト外の場合にビルドを失敗させる
      failOnViolation: true,
      // ライセンス情報が未記載のパッケージがある場合にビルドを失敗させる
      failOnUnlicensed: true,
    },
    output: {
      // 出力先ファイル
      file: path.resolve("./static/licenses.json"),
      // JSON 形式でライセンス情報 (ライセンス文含む) を書き出す
      template(dependencies) {
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
      },
    },
  },
});

export default defineConfig({
  plugins: [sveltekit(), licensePlugin],
});
