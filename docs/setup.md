# セットアップガイド

このセクションでは、本テンプレートのローカル環境でのセットアップ手順について説明します。

## 前提条件

- **Node.js**: v18.x 以上を推奨
- **npm**: Node.js に同梱されているもの

## インストール手順

1. **リポジトリの取得**\
   本テンプレートをクローンまたはダウンロードし、プロジェクトディレクトリに移動します。

   ```bash
   git clone https://github.com/nek9o/portfolio-template.git
   cd ./portfolio-template
   ```

2. **依存関係のインストール**

   ```bash
   npm install
   ```

3. **環境変数の設定 (任意)**\
   プロジェクトルートにある `.env.example` をコピーまたはリネームして `.env` ファイルを作成します。\
   Cloudflare Web Analytics などを使用する場合は、このファイルにトークンを記述します（詳細は[カスタマイズガイド](./customization.md)参照）。

4. **開発サーバーの起動**
   ```bash
   npm run dev
   ```
   ブラウザで `http://localhost:5173` を開くと、サイトをプレビューできます。

## ビルドとデプロイ

1. **ビルドの実行**

   ```bash
   npm run build
   ```

2. **デプロイ**
   ビルドが成功すると、`build` ディレクトリに完全な静的ファイル (SSG) が生成されます。\
   Cloudflare Pages, Vercel, Netlify などのプラットフォームにそのままデプロイ可能です。\
   デフォルトでは `@sveltejs/adapter-static` が使用されており、軽量かつ高速に動作します。

   > [!NOTE]
   > Cloudflare Pages をご利用の場合は、Cloudflare ダッシュボード上で GitHub リポジトリを連携させるだけで、ソースコード変更時に **自動的にビルド・デプロイが行われる標準機能** が利用できます。\
   > 本テンプレートではこの標準の自動デプロイ機能を利用することを推奨しているため、デプロイ用の GitHub Actions ワークフローファイルは含めていません。

### Cloudflare Pages でビルドエラーが発生する場合

デプロイ時に `Error: Output directory ".svelte-kit/cloudflare" not found` というエラーが発生することがあります。\
これは Cloudflare 側の「Framework preset」設定と、本テンプレートで使用している `adapter-static` の出力先が一致していないことが原因です。

**解決策1: Cloudflare 側の設定を変更する (推奨・静的サイトを維持)**
Cloudflare ダッシュボードの対象プロジェクトから **[Settings]** > **[Build & deployments]** > **[Build configuration]** を開き、以下の通り変更してください。
- **Framework preset**: `None` (または `SvelteKit` 以外を選択)
- **Build output directory**: `build`

**解決策2: アダプターを Cloudflare 専用に変更する (SSR/Functions を利用する場合)**
Cloudflare の機能 (Workers 等) をフル活用したい場合は、プロジェクトのアダプターを切り替えます。
1. `@sveltejs/adapter-static` を削除し、`@sveltejs/adapter-cloudflare` をインストールします。
2. `svelte.config.js` の `import` と `adapter()` 設定を書き換えます（`fallback` オプションは削除してください）。


## 補足

- **ライセンス情報の生成**: 開発サーバー起動時 (`npm run dev`) またはビルド時 (`npm run build`) に、`static/licenses.json` が自動的に作成・更新されます。

## staticフォルダーの構成

| ファイル | 役割 |
|---|---|
| `static/avatar.svg` | アバターのデフォルト画像。ご自身の画像(PNG/JPG/SVG)に置き換えてください。ビルド時に画質を保ちつつ自動で圧縮されます。ファイル名を変えた場合は `config.ts` の `avatar` パスも合わせて変更してください。 |
| `static/ogp.png` | SNSシェア時に表示されるOGP画像のデフォルト。ご自身の画像に差し替え、`config.ts` の `ogpImage` にデプロイ先の絶対URLを設定してください。 |
| `static/favicon.svg` | ブラウザのタブに表示されるファビコン。 |
| `static/licenses.json` | ビルド時に自動生成されるOSSライセンス一覧。手動編集は不要です。 |
