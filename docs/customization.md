# カスタマイズガイド

本テンプレートでは、すべてのコンテンツと設定を1つの設定ファイル (`src/lib/config.ts`) 経由で行うことができます。

## 基本情報の変更 (`src/lib/config.ts`)

`src/lib/config.ts` を開き、`profile` オブジェクトを編集してください。

```typescript
  profile: {
    nameJp: "名前",                     // 日本語名
    nameEn: "Your Name",                // 英語名 (OGPやタイトルバーにも使用)
    bio: `自己紹介文。\n改行も使用できます。`, // 自己紹介 (1〜2行程度を推奨)
    avatar: "/avatar.png",              // アバター画像のパス (staticフォルダ内)
    detailedAbout: `詳細な自己紹介テキスト。\n複数行対応しています。`, // 詳細自己紹介ページのコンテンツ
    showDetailedAbout: true,            // true: /about ページを有効化、false: 非表示
  },
```

## 詳細自己紹介ページ (`/about`) の設定

`showDetailedAbout` を `true` にすると、トップページのbioの下に「Read More」リンクが表示され、`/about` ページが有効になります。\
`false` にすると非表示になり、`/about` へのアクセスはトップページにリダイレクトされます。

```typescript
  profile: {
    detailedAbout: `経歴やスキル、趣味など、より詳しい自己紹介をここに書いてください。`,
    showDetailedAbout: true, // false にすると/aboutページは非表示になりトップページにリダイレクトされます
  },
```

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

- **配色**: `src/app.css` 内の `@theme` ブロックまたは CSS 変数を編集することで、サイト全体のトーンを変更できます。
- **フォント**: `src/app.css` の `@theme` 内のフォント定義、または `src/routes/+page.svelte` の Google Fonts URL を変更してください。

詳細なデザイン仕様については [docs/design_spec.md](./design_spec.md) を参照してください。

## プライバシーポリシーの設定

`config.ts`内の`privacyPolicy`オブジェクトでプライバシーポリシーの表示・非表示および内容を設定できます。

```typescript
  privacyPolicy: {
    enabled: true,             // フッターにリンクを表示するか
    items: [
      {
        title: "Analytics",
        description: "Cloudflare Web Analytics の利用について...",
      },
    ],
  },
```

## 手動管理ライセンスの追加

npmパッケージ以外(Google FontsやCDN経由のライブラリなど)を使用している場合は、`src/lib/licenses.manual.toml`にライセンス情報を手動で追記してください。\
ここに追記された情報は、ビルド時に自動生成されるライセンス一覧にマージされます。

## 重要な注意事項

> [!CAUTION]
> フッターにある「Licenses」のリンク、及びその内容は**絶対に削除しないでください**。\
> これらを削除することは、使用しているオープンソースソフトウェアへの敬意を欠く行為であると同時に、各ライブラリのライセンスに対する明確な**ライセンス違反**となります。
