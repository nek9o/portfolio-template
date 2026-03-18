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
