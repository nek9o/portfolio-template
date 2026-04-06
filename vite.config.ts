import { sveltekit } from '@sveltejs/kit/vite';
import fs from 'fs';
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
    // クライアントビルド時のみライセンス抽出プラグインを実行する
    {
      ...licensePlugin,
      apply(config, env: any) {
        // SSRビルドでは実行しない (UnoCSS等の欠損や上書きを防ぐため)
        return env.command === 'build' && !env.ssrBuild && !env.isSsrBuild;
      },
    },
    // SvelteKitのファイルコピータミングズレを補正するため、
    // 生成されたファイルを出力先にも直接コピーするプラグイン
    {
      name: 'copy-licenses-to-client-output',
      enforce: 'post',
      apply(config, env: any) {
        return env.command === 'build' && !env.ssrBuild && !env.isSsrBuild;
      },
      closeBundle() {
        const src = path.resolve('./static/licenses.json');
        const destDir = path.resolve('./.svelte-kit/output/client');
        const dest = path.join(destDir, 'licenses.json');
        if (fs.existsSync(src)) {
          if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
          }
          fs.copyFileSync(src, dest);
        }
      },
    },
  ],
});
