<script lang="ts">
  import { getBorderClass } from '$lib/utils/borderClass';

  interface Props {
    label: string;
    url: string;
    external?: boolean;
    border?: boolean;
    reverse?: boolean;
    /** 未指定時はreverse(Backボタン判定)を継承。trueのとき区切り線をホバー時含め完全に非表示 */
    noBorder?: boolean | undefined;
  }

  let {
    label,
    url,
    external = true,
    border = true,
    reverse = false,
    noBorder = undefined
  }: Props = $props();

  const effectiveNoBorder = $derived(noBorder ?? reverse);
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
    class="indicator-container relative transform transition-transform duration-300 cubic-bezier-[0.16,1,0.3,1] will-change-transform"
    class:reverse={reverse}
  >
    <span class="inline-block tracking-wide">{label}</span>
  </div>
</a>

<style>
  /* UnoCSS handles @apply without @reference */


  @media (hover: hover) and (pointer: fine) {
    /* ホバーに対応したデバイス（PCなど）でのみスライドを有効化 */
    .group:hover .indicator-container:not(.reverse) {
      transform: translateX(0.3rem);
    }
    .group:hover .indicator-container.reverse {
      transform: translateX(-0.3rem);
    }

    /* 文字色とボーダーのホバーもマウス時のみに限定 */
    .group:hover {
      @apply text-textPrimary border-textSecondary/60;
    }
  }
</style>
