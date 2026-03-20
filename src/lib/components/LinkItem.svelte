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
    text-sm text-zinc-500 hover:text-zinc-800
    transition-colors duration-300
    whitespace-nowrap
  "
>
  <div class="relative transform {reverse ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'} transition-transform duration-300 will-change-transform">
    <!-- インジケーター -->
    <div
      class="
        absolute top-0.5 bottom-0.5 w-0.5 bg-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300
        {reverse ? '-right-4' : '-left-4'}
        pointer-events-none
      "
    ></div>

    <span class="inline-block tracking-wide">{label}</span>
  </div>
</a>
