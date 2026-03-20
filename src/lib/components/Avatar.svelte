<script lang="ts">
  export let src: string;
  export let alt: string;
  let className = "";
  export { className as class };

  /**
   * 画像読み込み失敗時のフォールバック先。
   * static/avatar.svg をローカルで使用するため、外部サービスへのリクエストは不要。
   */
  const FALLBACK_AVATAR = '/avatar.svg';
</script>

<div class="relative w-24 h-24 group {className}" role="img" aria-label={alt}>
  <!-- アバター本体 -->
  <div class="absolute inset-0 rounded-[50%] overflow-hidden">
    <img
      {src}
      {alt}
      class="
        w-full h-full
        object-cover
        grayscale-[30%]
      "
      loading="eager"
      decoding="async"
      on:error={(e) =>
        ((e.currentTarget as HTMLImageElement).src = FALLBACK_AVATAR)}
    />
  </div>
  <!-- 境界をなじませるオーバーレイ (Soft Fade) -->
  <div class="absolute inset-0 rounded-[50%] shadow-[inset_0_0_20px_4px_var(--bg-primary)] ring-[var(--bg-primary)] ring-[1.5px] pointer-events-none"></div>
  <!-- 外側の柔らかな影 -->
  <div class="absolute inset-0 rounded-[50%] shadow-[0_10px_40px_rgba(0,0,0,0.03)] -z-10"></div>
</div>
