# 技術選定 (Technical Selection)

このテンプレートの技術的な選定理由と、使用しているツールについて説明します。

## 開発環境 & フレームワーク

- **Framework:** SvelteKit
  - React等に比べ依存関係が少なく、ビルド後のコードも軽量です。ライセンス管理も容易です。
- **Styling:** UnoCSS
  - 設定の柔軟性と、一連のデザイントークンベースの開発効率を優先して採用しました。
- **No UI Library:** `shadcn/ui` 等のコンポーネントライブラリに依存せず、すべてのパーツをスクラッチで実装することで、独自のデザインを追求しています。
- **No FontAwesome:** ライセンス管理をシンプルにするため採用していません。アイコンが必要な場合はPhosphor IconsやSimple Iconsを推奨します。

> [!TIP]
> アイコンや CDN 経由のライブラリを使用する場合は [`src/lib/licenses.manual.toml`](../src/lib/licenses.manual.toml) に追加してください。\
> ビルドプロセスにおいて、`rollup-plugin-license` と `vite.config.ts` (Vite のネイティブ `emitFile` API) が連携し、npm パッケージと手動管理分を安定して統合した `licenses.json` をバンドル内に生成します。

## アーキテクチャとインフラ

- **環境変数の動的注入**: Cloudflare Web Analytics のトークンなど、公開すべきでない、あるいは環境ごとに異なる設定値に関してコードへの直書きを廃止し、SvelteKit の `$env/dynamic/public` 経由による動的注入を採用しています。
- **CI/CD の関心分離 (GitHub Actions)**: ワークフローは役割ごとに分割・整理されています。
  - `build.yml`: Pull Request 時の継続的インテグレーション（コード検証とビルドチェック用）
  - `release.yml`: 開発用のバージョン採番（CalVer）、配布用パッケージ (ZIP) の生成用
  - `deploy.yml`: テンプレート利用者が本番環境へ純粋にデプロイするため（あるいはCloudflareへの自動デプロイが不要な場合）の雛形設計

## 使用 AI モデル

このテンプレートは、人間がデザインや動作等を監督しながら以下のAIモデルを使用し作成されました。

- **Claude:** Opus 4.6 / Sonnet 4.6
- **Gemini:** 1.5 Pro / 1.5 Flash

## デザイン思想

- **Mini-Mono:** 黒 (Zinc) と白の階調のみで構成。色に頼らずタイポグラフィの美しさと余白で魅せるデザイン。
- **Modern Texture:** デジタルの平坦さを避けるため、非常に薄いグレイン (粒子感) を全体に重ねています。CSSのハードウェアアクセラレーションを活用し、モバイル環境でも描画負荷を最小限に抑える最適化を行っています。
- **Typography:**
  - **Lexend:** 数字や英字の可読性が高く、モダンな印象を与えるフォント。
  - **IBM Plex Sans JP:** 曲線が美しく、和文において独特の美学を持つフォント。

## 実装上の特徴

- **非同期ライセンス表示:** `/licenses`ページは静的なJSONファイル(`/licenses.json`)を非同期で取得してレンダリングします。これによりメインのバンドルサイズを増やすことなく膨大なライセンス情報を提示可能です。
- **プライバシーポリシーの柔軟性:** `config.ts`で`enabled: true`にするとフッターにリンクが自動出現し`/privacy`ページが有効になります。Content-firstな設計により文章の追加も容易です。
