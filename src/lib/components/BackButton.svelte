<script lang="ts">
  /** 戻り先URL */
  export let url = '/';
  /** 表示ラベル */
  export let label = 'Back';
</script>

<a
  href={url}
  aria-label={label}
  class="
    group relative
    flex items-center
    px-4
    py-4
    text-sm text-textSecondary
    transition-all duration-200 ease-in-out
    whitespace-nowrap
  "
>
  <div
    class="indicator-container relative transform transition-transform duration-300 ease-in-out will-change-transform"
  >
    <!-- インジケーター -->
    <div
      class="
        indicator-line
        absolute -top-0.5 bottom-0.4 w-0.5 -right-4 bg-textPrimary opacity-0 transition-opacity duration-300 ease-in-out
        pointer-events-none
      "
    ></div>

    <span class="inline-block tracking-wide">{label}</span>
  </div>
</a>

<style>
  @media (hover: hover) and (pointer: fine) {
    /* ホバーに対応したデバイス(PCなど)でのみ、インジケーター表示とスライドを有効化 */
    .group:hover .indicator-container {
      transform: translateX(-0.25rem);
    }
    .group:hover .indicator-line {
      opacity: 1;
    }
    .group:hover {
      @apply text-textPrimary;
    }
  }
</style>
