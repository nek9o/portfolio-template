/**
 * サイトの全体設定を一元管理するファイルです。
 * すべてのカスタマイズをこのファイルで行うことができます。
 */
import { theme } from '@unocss/preset-mini';

export const config = {
  // ---------------------------------------------------------
  // 1. プロフィール設定 (Profile Settings)
  // ---------------------------------------------------------
  profile: {
    nameJp: '山田 太郎', // 日本語名
    nameEn: 'Taro Yamada', // 英語名 (OGPやタイトルバーにも使用)
    bio: `エンジニア / デザイナー。\nオープンソースと創ることが好きです。`, // 自己紹介(1〜2行程度を推奨)
    avatar: '/avatar.svg', // アバター画像のパス (staticフォルダ内)
    detailedAbout: `ここには、より詳細な自己紹介文を記述できます。
何行にもわたる文章や、これまでの経歴、趣味、大切にしている価値観などを自由に記載してください。
デザインはシンプルにまとめているため、読みやすさを重視した構成になっています。`, // 追加の自己紹介文
    showDetailedAbout: true, // 詳細自己紹介ページを表示するかどうか
  },

  // ---------------------------------------------------------
  // 2. リンク集 (Links)
  // ---------------------------------------------------------
  links: [
    { label: 'Twitter / X', url: 'https://twitter.com/your_account' },
    { label: 'GitHub', url: 'https://github.com/your_account' },
    { label: 'Zenn', url: 'https://zenn.dev/your_account' },
    { label: 'note', url: 'https://note.com/your_account' },
    // 必要に応じて追加・削除してください
  ],

  // ---------------------------------------------------------
  // 3. プロジェクト実績 (Projects)
  // ---------------------------------------------------------
  projects: [
    {
      name: 'Portfolio Template',
      description:
        'SvelteKit + UnoCSS で作られた、ミニマルなポートフォリオテンプレートです。',
      url: 'https://github.com/your_account/your_repo',
      language: 'SvelteKit',
    },
    {
      name: 'My Project',
      description:
        'プロジェクトの説明をここに書いてください。簡潔かつ具体的に記述することをおすすめします。',
      url: 'https://example.com/project2',
      language: 'TypeScript',
    },
    // プロジェクトを追加する場合は、上のブロックをコピーしてください
  ],

  // ---------------------------------------------------------
  // 4. SEO & OGP (メタデータ設定)
  // ---------------------------------------------------------
  seo: {
    themeColor: theme.colors.zinc[50], // ブラウザのテーマカラー
    siteUrl: 'https://your-site.pages.dev/', // デプロイ先のURL
    ogpImage: 'https://your-site.pages.dev/ogp.png', // SNSシェア時の画像URL (デプロイ後に実際のURLへ変更してください)
    githubRepo: 'https://github.com/your-username/your-repo', // GitHubリポジトリのURL
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

  // ---------------------------------------------------------
  // 6. 表示・機能設定 (Display Settings)
  // ---------------------------------------------------------
  settings: {
    showLinks: true, // リンク集セクションを表示するかどうか
    showProjects: true, // プロジェクト実績セクションを表示するかどうか
  },
};
