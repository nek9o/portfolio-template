<script lang="ts">
  export let src: string;
  export let alt: string;
</script>

<div class="mb-12 relative w-24 h-24 group">
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
      on:error={(e) =>
        ((e.currentTarget as HTMLImageElement).src =
          "https://ui-avatars.com/api/?name=" +
          alt +
          "&background=f4f4f5&color=a1a1aa&size=128")}
    />
  </div>
  <!-- 境界をなじませるオーバーレイ (Soft Fade) -->
  <div class="absolute inset-0 rounded-[50%] shadow-[inset_0_0_20px_4px_var(--bg-primary)] ring-[1.5px] ring-[var(--bg-primary)] pointer-events-none"></div>
  <!-- 外側の柔らかな影 -->
  <div class="absolute inset-0 rounded-[50%] shadow-[0_10px_40px_rgba(0,0,0,0.03)] -z-10"></div>
</div>
