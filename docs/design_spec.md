# デザインシステム & カラーリファレンス

このドキュメントは、プロジェクトで使用されているミニマルなデザイン原則、配色、タイポグラフィ、および再利用可能なコンポーネントの仕様をまとめたものです。

## 1. デザインコンセプト (Design Concept)

- **Mini-Mono**: 限界まで色数を絞り、黒 (Zinc) と白 (Background Primary) の階調のみで構成。
- **Modern Texture**: デジタルの平坦さを避けるため、非常に薄いグレイン (粒子) レイヤーを重ねています。
- **Adaptive Spacing**: ワイドな余白 (py-32〜py-48) を使用し、情報の密度を意図的に下げることで洗練された印象を与えます。

## 2. カラーシステム (Color System)

### CSS Variables ([src/app.css](./src/app.css))

| 変数名             | 色 (HEX)  | 用途                                      |
| :----------------- | :-------- | :---------------------------------------- |
| `--bg-primary`     | `#fbfbfb` | メイン背景 (視認性を考慮したオフホワイト) |
| `--bg-secondary`   | `#f7f7f7` | サブ背景・セクション背景                  |
| `--text-primary`   | `#27272a` | 主要テキスト                              |
| `--text-secondary` | `#71717a` | 補助テキスト・説明文                      |
| `--border`         | `#f1f1f2` | 境界線・区切り線                          |

### Tailwind Zinc Palette

| クラス     | HEX       | 主な適用箇所                   |
| :--------- | :-------- | :----------------------------- |
| `zinc-800` | `#27272a` | 見出し、選択時のアクセント色   |
| `zinc-600` | `#52525b` | 通常のリンク名、プロジェクト名 |
| `zinc-500` | `#71717a` | 自己紹介、バイオ、コピーライト |
| `zinc-400` | `#a1a1aa` | ラベル、補助情報、メタデータ   |

## 3. タイポグラフィ (Typography)

| 役割            | フォントファミリー | 指定ウェイト                |
| :-------------- | :----------------- | :-------------------------- |
| **欧文ベース**  | `Lexend`           | 300 (Light), 400 (Regular)  |
| **和文ベース**  | `IBM Plex Sans JP` | 400 (Regular), 500 (Medium) |
| **コード/汎用** | `sans-serif`       | -                           |

- **設定**: 文字間隔 (`tracking-tight`) を調整し、数字や英字の可読性を高めています。

## 4. コンポーネント・ガイド (Components)

再利用可能なパーツが `$lib/components` に定義されています。

- **`Avatar.svelte`**:
  - 特徴: `grayscale-[30%]` の適用、ソフトなインセットシャドウによる背景への馴染ませ。
- **`LinkItem.svelte`**:
  - 特徴: 左側の `2px` インジケーター。ホバー時に `translate-x-1` の滑らかな移動。
- **`ProjectCard.svelte`**:
  - 特徴: モノクロームを維持。右上の言語表示 (`zinc-400`) による簡潔な情報提示。

## 5. 特殊効果 & 質感 (Effects)

- **グレインエフェクト (`.bg-grain`)**:
  - `opacity: 0.03` のSVGノイズフィルターを使用。静的な画面に深みを与えます。
- **選択範囲 (`selection-mono`)**:
  - `selection:bg-zinc-900 selection:text-white` により、テキスト選択時もブランドイメージを維持。

## 6. 再利用ガイド (Reuse Guide)

### Tailwind Theme ([src/app.css](../src/app.css))

他のプロジェクトでこの配色やフォントを再現するには、CSS ファイル内の `@theme` ブロックをコピーして使用してください。

```css
/* app.css での定義例 */
@theme {
  --font-sans: 'Noto Sans JP', sans-serif;
  --font-base: 'Lexend', 'IBM Plex Sans JP', sans-serif;

  --color-bg-primary: #fbfbfb;
  --color-bg-secondary: #f7f7f7;
  --color-text-primary: #27272a;
  --color-text-secondary: #71717a;
  --color-text-hover: #27272a;
  --color-border-dim: #f1f1f2;
}
```
