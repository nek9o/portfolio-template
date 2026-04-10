# Portfolio Template

[![SvelteKit](https://img.shields.io/github/package-json/dependency-version/nek9o/portfolio-template/dev/@sveltejs/kit/main?label=SvelteKit&color=FF3E00&style=flat)](https://kit.svelte.dev/)
[![UnoCSS](https://img.shields.io/github/package-json/dependency-version/nek9o/portfolio-template/dev/unocss/main?label=UnoCSS&color=333333&style=flat)](https://unocss.dev/)
[![TypeScript](https://img.shields.io/github/package-json/dependency-version/nek9o/portfolio-template/dev/typescript/main?label=TypeScript&color=3178C6&style=flat)](https://www.typescriptlang.org/)
[![Build Status](https://img.shields.io/github/actions/workflow/status/nek9o/portfolio-template/build.yml?branch=main&label=build&style=flat)](https://github.com/nek9o/portfolio-template/actions)
[![CodeFactor](https://img.shields.io/codefactor/grade/github/nek9o/portfolio-template?label=codefactor&style=flat)](https://www.codefactor.io/repository/github/nek9o/portfolio-template)
[![License](https://img.shields.io/badge/License-Blue_Oak-blue?style=flat)](./LICENSE.md)

「余白で魅せるポートフォリオ」を最短で作れる、ミニマル特化のSvelteKitテンプレートです。\
本テンプレートは、設定ファイル `src/lib/config.ts` を編集するだけで、すべてのカスタマイズが完結するミニマルなポートフォリオテンプレートです。

> [!NOTE]
> このテンプレートはAIとの対話を通じて設計・作成しました。\
> 使用AIや技術的な詳細は[技術選定ドキュメント](./docs/tech_spec.md)に記載しています。

## 主な特徴

- **究極のミニマリズム:** ムダを削ぎ落とし、タイポグラフィと余白の美しさを追求したデザイン。
- **軽量・高速:** SvelteKitのSSR(サーバーサイドレンダリング)を完全に有効化しており、初回表示が高速でSEOにも有利です。
- **マイクロインタラクション:** ホバー時の微細なアニメーションやインジケーターなど、触れて心地よい質感を実装。モバイル環境での「ホバーの固着」を防ぐための最適化や、`prefers-reduced-motion` にも対応しています。
- **詳細自己紹介ページ:** `showDetailedAbout: true` にするだけで、bioの下に「Read More」リンクと `/about` ページが有効になります。
- **レスポンシブ対応:** モバイル(アバター上→テキスト下の縦並び)からデスクトップ(bio左・アバター右の横並び)まで、自動的にレイアウトが切り替わります。
- **OSSライセンス自動出力:** ビルド時にバンドルされるnpmパッケージのライセンス情報を自動で抽出し、`static/licenses.json`として出力。手動管理用のTOMLにも対応しています。
- **プライバシーポリシー設定:** Cloudflare Web Analyticsなどの利用状況分析に関するポリシーを、設定ファイルから簡単に有効化・編集できます。
- **アクセシビリティ対応:** 外部リンクへの `aria-label` 付与、アバターへの `role="img"` など、スクリーンリーダーにも配慮した実装です。
- **設定ファイルで完結:** すべてのカスタマイズを `src/lib/config.ts` 1箇所で安全に行えます。

---

## デザインのこだわり

### エフェクト

- ホバー時にテキストを右に微動 (スライド効果) 。
- ホバー時のカラーシフト (`zinc-400/500` -> `zinc-800`)。
- 全体に施された薄いグレイン (粒子感) 。

### 独自の美学

- **ライトテーマ:** 画一的なダークテーマとは一線を画す、洗練された白の表現。
- **モノクロ:** 色に頼らず、タイポグラフィと余白で魅せるデザイン。
- **脱グラスモーフィズム:** 安易に流行を追わず、長く使えるミニマリズム。

## 詳細ドキュメント

より詳細な情報は、以下のドキュメントを参照してください。

- [セットアップガイド (インストール・起動)](./docs/setup.md)
- [カスタマイズガイド (編集方法)](./docs/customization.md)
- [デザイン仕様書 (配色・フォント)](./docs/design_spec.md)

## 使い方 (概要)

基本的には以下の手順で利用可能です。

1. `npm install`
2. `src/lib/config.ts` を開き、自分のプロフィール情報やプロジェクトを設定
3. `npm run dev` で確認
4. `static/avatar.svg` を自分のアバター画像に置き換えます（PNG/JPG/SVGに対応。ビルド時に自動で圧縮・最適化されます）。
5. `static/ogp.png` をSNSシェア用の画像に差し替え、`config.ts` の `ogpImage` にデプロイ先の絶対URLを設定してください
6. (任意) `showDetailedAbout: true` にすると、詳細自己紹介ページ (`/about`) が有効になります

## Cloudflare Web Analytics の設定

本テンプレートは Cloudflare Web Analytics の組み込みをサポートしています。
トークンをコードに直書きせず、環境変数として注入することで、ソースコードをクリーンに保つことができます。

**【ローカル環境での確認】**

1. プロジェクトルートにある `.env.example` をコピーして `.env` ファイルを作成します。
   （`.env` は `.gitignore` に登録されているため、Gitには含まれません）
2. `.env` ファイル内に `PUBLIC_CF_WEB_ANALYTICS_TOKEN` を設定すると、ローカル環境（`npm run dev`等）でも動作確認ができます。

**【本番環境 (Cloudflare Pages) での設定】**

1. Cloudflareダッシュボードにログインし、デプロイ先のPagesプロジェクトを開きます。
2. **「Settings (設定)」>「Environment variables (環境変数)」** に移動します。
3. `PUBLIC_CF_WEB_ANALYTICS_TOKEN` という名前で、あなたのトークンの値を設定します。
4. 設定を保存後、次回のビルド・デプロイ時から自動的にアナリティクス用のスクリプトタグがページに埋め込まれるようになります。

## 注意事項

- **商用利用が可能**です (制作代行や自社サイト等でお使いいただけます) 。
- **OSSライセンスについて**
  本テンプレートでは、使用しているオープンソースソフトウェアのライセンス表記として、フッターに「Licenses」リンクを設置しています。\
  このリンクをクリックすると、ビルド時に自動生成された `licenses.json` を読み込み、各ライブラリのライセンス情報を一覧表示します。\
  **このリンクおよび表示機能はライセンス要件のため削除できません。**

## ライセンス

本テンプレートは [Blue Oak Model License 1.0.0](./LICENSE.md) に準拠します。

### ライセンスの概要

- **自由な利用:** 私用・商用を問わず、自由に利用・改変・配布いただけます。
- **再配布時の条件:** 本テンプレートを再配布（他人に譲渡・公開）する場合は、このライセンス全文または [公式URL](https://blueoakcouncil.org/license/1.0.0) へのリンクを含める必要があります。
- **免責事項:** 本テンプレートは「現状のまま（AS-IS）」提供され、制作者はいかなる損害についても法令の範囲内で責任を負いません。

詳細な条項については [LICENSE.md](./LICENSE.md) をご確認ください。

## フィードバック・サポート

不具合の報告や機能のご提案、使い方の質問などは [GitHub Issues](https://github.com/nek9o/portfolio-template/issues) で受け付けています。

- **バグ報告:** 動作の不備や表示の崩れなど
- **質問・相談:** セットアップ手順や基本的な使い方について
- **機能要望:** デザインの微調整やUX改善の提案(※ミニマルなコンセプトを維持する範囲内に限ります)

それぞれの目的に合わせたテンプレートを用意していますので、そちらに沿って入力をお願いします。

## 免責事項

> [!CAUTION]
>
> - **保証の否認**: 本テンプレートは「現状のまま（AS-IS）」提供されます。制作者は、本テンプレートの動作、品質、特定の目的への適合性、および第三者の知的財産権の非侵害性を含め、明示・黙示を問わずいかなる保証も行いません。
> - **責任の制限**: 本テンプレートの使用（導入、カスタマイズ、公開等を含む）によって生じた、直接的・間接的な損害、損失、またはトラブルについて、制作者は法律が許容する最大限の範囲において一切の責任を負いません。
> - **AI技術の利用**: 本テンプレートの一部（コードやデザイン）はAI技術を活用して作成されています。そのため、制作者は当該生成物に関する第三者の知的財産権侵害の有無について完全な保証を行うことはできません。
> - **法的解釈**: 制作者は法律の専門家ではありません。本規約やOSSライセンス等の詳細な法的解釈について判断を提供することはできません。疑義がある場合は、利用者自身の責任において弁護士等の専門家へご相談ください。
> - **自己責任**: 本テンプレートの利用に関するすべての行為は、利用者自身の責任と判断において行ってください。
