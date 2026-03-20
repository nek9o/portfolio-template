<script lang="ts">
  import { getBorderClass } from '$lib/utils/borderClass';
  export let name: string;
  export let description: string;
  export let url: string;
  export let language: string;
  export let border = true;
</script>

<a
  href={url}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="{name} (新しいタブで開く)"
  class="
    group relative
    flex flex-col space-y-1.5
    -mx-4 px-4
    py-6 border-b {getBorderClass(border)}
    transition-all duration-200
  "
>
  <div class="indicator-container relative transform transition-transform duration-300 will-change-transform">
    <!-- インジケーター -->
    <div class="indicator-line absolute -left-4 top-0.5 bottom-0.5 w-0.5 bg-zinc-800 opacity-0 transition-opacity duration-300 pointer-events-none"></div>

    <div class="flex items-center justify-between">
      <span class="project-name text-sm font-medium tracking-tight text-zinc-600 transition-colors">
        {name}
      </span>
      <span class="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">{language}</span>
    </div>
    <p class="project-description text-[13px] text-zinc-500 leading-relaxed transition-colors">
      {description}
    </p>
  </div>
</a>

<style>
  @reference "../../app.css";

  @media (hover: hover) {
    /* マウスホバー時のみスライドとインジケーター表示を有効化 */
    .group:hover .indicator-container {
      transform: translateX(0.25rem);
    }
    .group:hover .indicator-line {
      opacity: 1;
    }

    /* テキストカラーの変更もホバー時のみ */
    .group:hover .project-name {
      @apply text-zinc-800;
    }
    .group:hover .project-description {
      @apply text-zinc-600;
    }
  }
</style>
