import { theme } from '@unocss/preset-mini';
import {
  defineConfig,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig({
  content: {
    pipeline: {
      include: [/\.(vue|svelte|[jt]sx|mdx?|html)($|\?)/, 'src/**/*.{js,ts}'],
    },
  },
  presets: [presetUno()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    fontFamily: {
      sans: '"Noto Sans JP", sans-serif',
      base: '"Lexend", "IBM Plex Sans JP", sans-serif',
    },
    colors: {
      bgPrimary: theme.colors.zinc[50], // メイン背景色 (Body背景など)
      bgSecondary: theme.colors.zinc[100], // サブ背景色
      textPrimary: theme.colors.zinc[800], // メイン文字色 (見出し、本文など)
      textSecondary: theme.colors.zinc[500], // サブ文字色 (リンク、メタ情報など)
      textDimmed: theme.colors.zinc[600], // 薄い文字色 (プロジェクト名など)
      textBio: theme.colors.zinc[700], // 自己紹介文用の濃い文字色
      textLight: theme.colors.zinc[400], // 極薄い文字色 (ラベル、フッターなど)
      textHover: theme.colors.zinc[800], // ホバー時の文字色
      borderDim: theme.colors.zinc[200], // 控えめなボーダー色
      bgSelection: theme.colors.zinc[900], // テキスト選択時の背景色
    },
  },
});
