/**
 * サイトの全体設定を一元管理するファイルです。
 * すべてのカスタマイズをこのファイルで行うことができます。
 */

export const config = {
  // ---------------------------------------------------------
  // 1. プロフィール設定 (Profile Settings)
  // ---------------------------------------------------------
  profile: {
    nameJp: '名前', // 日本語名
    nameEn: 'Your Name', // 英語名 (OGPやタイトルバーにも使用)
    bio: 'あなたの自己紹介文をここに書いてください。', // 自己紹介(1〜2行程度を推奨)
    avatar: '/avatar.png', // アバター画像のパス (staticフォルダ内)
    detailedAbout: `ここには、より詳細な自己紹介文を記述できます。
何行にもわたる文章や、これまでの経歴、趣味、大切にしている価値観などを自由に記載してください。
デザインはシンプルにまとめているため、読みやすさを重視した構成になっています。`, // 追加の自己紹介文
    showDetailedAbout: true, // 詳細自己紹介ページを表示するかどうか
  },

  // ---------------------------------------------------------
  // 2. リンク集 (Links)
  // ---------------------------------------------------------
  links: [
    { label: 'Twitter (X)', url: 'https://twitter.com/your_account' },
    { label: 'GitHub', url: 'https://github.com/your_account' },
    { label: 'Zenn', url: 'https://zenn.dev/your_account' },
    { label: 'Note', url: 'https://note.com/your_account' },
    // 必要に応じて追加・削除してください
  ],

  // ---------------------------------------------------------
  // 3. プロジェクト実績 (Projects)
  // ---------------------------------------------------------
  projects: [
    {
      name: 'Project Name 1',
      description: 'Project description goes here. Keep it concise and clear.',
      url: 'https://example.com/project1',
      language: 'SvelteKit',
    },
    {
      name: 'Project Name 2',
      description: "Another project description. Show off what you've built!",
      url: 'https://example.com/project2',
      language: 'TypeScript',
    },
    // プロジェクトを追加する場合は、上のブロックをコピーして編集してください
  ],

  // ---------------------------------------------------------
  // 4. SEO & OGP (メタデータ設定)
  // ---------------------------------------------------------
  seo: {
    themeColor: '#fbfbfb', // ブラウザのテーマカラー
    siteUrl: 'https://your-site.pages.dev/', // デプロイ先のURL
    ogpImage: 'https://your-site.pages.dev/placeholder-avatar.png', // SNSシェア時の画像URL
    githubRepo: 'https://github.com/your-username/your-repo', // GitHubリポジトリのURL (将来用: フッター等で表示したい場合)
    showAllRightsReserved: true, // フッターに "All rights reserved" を表示するかどうか
  },

  // ---------------------------------------------------------
  // 5. プライバシーポリシー (Privacy Policy)
  // ---------------------------------------------------------
  privacyPolicy: {
    enabled: true, // フッターにプライバシーポリシー表示ボタンを表示するか
    items: [
      {
        title: 'Analytics',
        description:
          '当サイトでは、利用状況の分析のために Cloudflare Web Analytics を使用しています。クッキー（Cookie）を使用せず、個人の特定が不可能な匿名情報として収集されます。詳細については、Cloudflare のプライバシーポリシーをご確認ください。',
      },
    ],
  },
};
