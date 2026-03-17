<script lang="ts">
  export let label: string;
  export let url: string;
  export let external = true;
  export let border = true;
  export let reverse = false;
</script>

<a
  href={url}
  target={external ? "_blank" : undefined}
  rel={external ? "noopener noreferrer" : undefined}
  class="
    group relative
    inline-flex items-center
    -mx-4 px-4
    {border ? 'py-4 border-b border-zinc-200/50 hover:border-zinc-300/80 w-full justify-between' : ''}
    text-sm text-zinc-500 hover:text-zinc-800
    transition-colors duration-300
    whitespace-nowrap
  "
>
  <div class="relative transform {reverse ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'} transition-transform duration-300 will-change-transform">
    <!-- インジケーター -->
    <div
      class="
        absolute top-0.5 bottom-0.5 w-[2px] bg-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300
        {reverse ? '-right-4' : '-left-4'}
        pointer-events-none
      "
    ></div>

    <span class="inline-block tracking-wide">{label}</span>
  </div>
</a>
