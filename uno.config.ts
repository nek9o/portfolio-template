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
      bgPrimary: '#fbfbfb',
      bgSecondary: '#f7f7f7',
      textPrimary: '#27272a',
      textSecondary: '#71717a',
      textDimmed: '#52525b',
      textLight: '#a1a1aa',
      textHover: '#27272a',
      borderDim: '#f1f1f2',
      bgSelection: '#18181b',
    },
  },
});
