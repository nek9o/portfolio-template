import { sveltekit } from '@sveltejs/kit/vite';
import license from 'rollup-plugin-license';
import UnoCSS from 'unocss/vite';
import { defineConfig, type ConfigEnv, type UserConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import {
  formatLicenseData,
  isLicenseAllowed,
  loadManualLicenses,
} from './scripts/licenses-script';

let licensesJsonData = '';

/**
 * ビルド時にサードパーティのライセンス情報を収集するプラグイン。
 * ファイルへの直接書き出しは行わず、変数に保持して後続のプラグインでアセットとして出力。
 */
const licensePlugin = license({
  thirdParty: {
    includePrivate: false,
    allow: {
      test: (dependency) => isLicenseAllowed(dependency.license),
      failOnViolation: true,
      failOnUnlicensed: true,
    },
    // outputにファイルパスを指定する代わりに、コールバック関数でデータを受け取る
    output: (dependencies) => {
      const manualLicenses = loadManualLicenses(
        './src/lib/licenses.manual.toml'
      );
      licensesJsonData = formatLicenseData(dependencies, manualLicenses);
    },
  },
});

export default defineConfig({
  plugins: [
    UnoCSS(),
    sveltekit(),
    ViteImageOptimizer(),
    // クライアントビルド時のみライセンス情報を抽出する
    {
      ...licensePlugin,
      apply(config: UserConfig, env: ConfigEnv & { ssrBuild?: boolean; isSsrBuild?: boolean }) {
        return env.command === 'build' && !env.ssrBuild && !env.isSsrBuild;
      },
    },
    // SvelteKitの内部パス( .svelte-kit/* )に依存せず、Viteのビルド機構(emitFile)を利用して
    // アセットとして licenses.json を出力するプラグイン
    {
      name: 'emit-licenses-json',
      apply(config: UserConfig, env: ConfigEnv & { ssrBuild?: boolean; isSsrBuild?: boolean }) {
        return env.command === 'build' && !env.ssrBuild && !env.isSsrBuild;
      },
      // rollup-plugin-license による抽出が終わった後のフックで出力
      generateBundle() {
        if (licensesJsonData) {
          this.emitFile({
            type: 'asset',
            fileName: 'licenses.json',
            source: licensesJsonData,
          });
        }
      },
    },
  ],
});
