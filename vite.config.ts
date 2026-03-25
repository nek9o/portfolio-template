import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import license from 'rollup-plugin-license';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import {
  formatLicenseData,
  isLicenseAllowed,
  loadManualLicenses,
} from './scripts/licenses-script';

/**
 * ビルド時にサードパーティのライセンス情報を収集し、
 * static/licenses.json として出力するプラグイン
 */
const licensePlugin = license({
  thirdParty: {
    includePrivate: false,
    allow: {
      test: (dependency) => isLicenseAllowed(dependency.license),
      failOnViolation: true,
      failOnUnlicensed: true,
    },
    output: {
      file: path.resolve('./static/licenses.json'),
      template(dependencies) {
        const manualLicenses = loadManualLicenses(
          './src/lib/licenses.manual.toml'
        );
        return formatLicenseData(dependencies, manualLicenses);
      },
    },
  },
});

export default defineConfig({
  plugins: [
    UnoCSS(),
    sveltekit(),
    ViteImageOptimizer(),
    licensePlugin,
  ],
});
