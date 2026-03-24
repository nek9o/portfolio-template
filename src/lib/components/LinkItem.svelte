<script lang="ts">
  import { getBorderClass } from '$lib/utils/borderClass';
  export let label: string;
  export let url: string;
  export let external = true;
  export let border = true;
  export let reverse = false;
  /** 未指定時はreverse(Backボタン判定)を継承。trueのとき区切り線をホバー時含め完全に非表示 */
  export let noBorder: boolean | undefined = undefined;
  $: effectiveNoBorder = noBorder ?? reverse;
</script>

<a
  href={url}
  target={external ? "_blank" : undefined}
  rel={external ? "noopener noreferrer" : undefined}
  aria-label={external ? `${label} (新しいタブで開く)` : label}
  class="
    group relative
    flex items-center justify-between
    -mx-4 px-4
    py-4 {effectiveNoBorder ? '' : `border-b ${getBorderClass(border)}`}
    text-sm text-textSecondary
    transition-all duration-200 ease-in-out
    whitespace-nowrap
  "
>
  <div
    class="indicator-container relative transform transition-transform duration-300 ease-in-out will-change-transform"
    class:reverse
  >
    <!-- インジケーター -->
    <div
      class="
        indicator-line
        absolute top-0.5 bottom-0.5 w-0.5 bg-textPrimary opacity-0 transition-opacity duration-300 ease-in-out
        {reverse ? '-right-4' : '-left-4'}
        pointer-events-none
      "
    ></div>

    <span class="inline-block tracking-wide">{label}</span>
  </div>
</a>

<style>
  /* UnoCSS handles @apply without @reference */


  @media (hover: hover) and (pointer: fine) {
    /* ホバーに対応したデバイス（PCなど）でのみ、インジケーター表示とスライドを有効化 */
    .group:hover .indicator-container:not(.reverse) {
      transform: translateX(0.25rem);
    }
    .group:hover .indicator-container.reverse {
      transform: translateX(-0.25rem);
    }
    .group:hover .indicator-line {
      opacity: 1;
    }

    /* 文字色とボーダーのホバーもマウス時のみに限定 */
    .group:hover {
      @apply text-textPrimary border-textSecondary/60;
    }
  }
</style>
