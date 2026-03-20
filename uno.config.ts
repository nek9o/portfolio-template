import {
  defineConfig,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig({
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
      textHover: '#27272a',
      borderDim: '#f1f1f2',
    },
  },
});
