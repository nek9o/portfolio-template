# セットアップガイド

このセクションでは、本テンプレートのローカル環境でのセットアップ手順について説明します。

## 前提条件

- **Node.js**: v18.x 以上を推奨
- **npm**: Node.js に同梱されているもの

## インストール手順

1. **リポジトリの取得**\
   本テンプレートをクローンまたはダウンロードし、プロジェクトディレクトリに移動します。

   ```bash
   git clone https://github.com/fal-114514/portfolio-template.git
   cd ./portfolio-template
   ```

2. **依存関係のインストール**

   ```bash
   npm install
   ```

3. **開発サーバーの起動**
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
   ビルドが成功すると、`build` ディレクトリ(アダプターの設定による)に静的ファイルが生成されます。\
   Vercel, Cloudflare Pages, Netlify などのプラットフォームにデプロイ可能です。\
   デフォルトでは `@sveltejs/adapter-auto` が使用されています。

## 補足

- **ライセンス情報の生成**: 開発サーバー起動時 (`npm run dev`) またはビルド時 (`npm run build`) に、`static/licenses.json` が自動的に作成・更新されます。

## staticフォルダーの構成

| ファイル | 役割 |
|---|---|
| `static/avatar.svg` | アバターのデフォルト画像。ご自身の画像(PNG/JPG/SVG)に置き換えてください。ファイル名を変えた場合は `config.ts` の `avatar` パスも合わせて変更してください。 |
| `static/ogp.png` | SNSシェア時に表示されるOGP画像のデフォルト。ご自身の画像に差し替え、`config.ts` の `ogpImage` にデプロイ先の絶対URLを設定してください。 |
| `static/favicon.svg` | ブラウザのタブに表示されるファビコン。 |
| `static/licenses.json` | ビルド時に自動生成されるOSSライセンス一覧。手動編集は不要です。 |
