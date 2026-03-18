# カスタマイズガイド

本テンプレートでは、すべてのコンテンツと設定を1つの設定ファイル (`src/lib/config.ts`) 経由で行うことができます。

## 基本情報の変更 (`src/lib/config.ts`)

`src/lib/config.ts` を開き、`profile` オブジェクトを編集してください。

```typescript
  profile: {
    nameJp: "名前",                     // 日本語名
    nameEn: "Your Name",                // 英語名 (OGPやタイトルバーにも使用)
    bio: "あなたの自己紹介文をここに書いてください。", // 自己紹介
    avatar: "/avatar.png",              // アバター画像のパス (staticフォルダ内)
  },
```

## リンク集・プロジェクト一覧の変更

同じく `config.ts` 内の `links` 配列および `projects` 配列を編集して、実績や制作物を追加・修正してください。

```typescript
  projects: [
    {
      name: "プロジェクト名",
      description: "プロジェクトの詳細説明。",
      url: "https://project-url.com",
      language: "使用技術 (例: Svelte, TypeScript)",
    },
  ],
```

## SEO・OGP設定

`seo` オブジェクトにて、サイト全体のテーマカラーやメタ情報を設定できます。

```typescript
  seo: {
    themeColor: "#fbfbfb",             // ブラウザのテーマカラー
    siteUrl: "https://your-site.pages.dev/", // デプロイ先のURL
    ogpImage: "https://your-site.pages.dev/avatar.png", // SNSシェア時の画像URL
    showAllRightsReserved: true,       // フッターに "All rights reserved" を表示するか
  },
```

## デザインの調整

- **配色**: `src/app.css` 内の CSS 変数を編集することで、サイト全体のトーンを変更できます。
- **フォント**: `src/app.css` または `src/routes/+page.svelte` の Google Fonts URL を変更してください。

詳細なデザイン仕様については [docs/design_spec.md](./design_spec.md) を参照してください。

## 重要な注意事項

> [!CAUTION]
> フッターにある「Licenses」のリンク、及びその内容は**絶対に削除しないでください**。\
> これらを削除することは、使用しているオープンソースソフトウェアへの敬意を欠く行為であると同時に、各ライブラリのライセンスに対する明確な**ライセンス違反**となります。
