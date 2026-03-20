<script lang="ts">
  export let name: string;
  export let description: string;
  export let url: string;
  export let language: string;
</script>

<a
  href={url}
  target="_blank"
  rel="noopener noreferrer"
  class="
    group relative
    flex flex-col space-y-1.5
    -mx-4 px-4
    py-6 border-b border-zinc-200/50 hover:border-zinc-300/80
    transition-colors duration-300
  "
>
  <div class="relative transform group-hover:translate-x-1 transition-transform duration-300 will-change-transform">
    <!-- インジケーター -->
    <div class="absolute -left-4 top-0.5 bottom-0.5 w-0.5 bg-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

    <div class="flex items-center justify-between">
      <span class="text-sm font-medium tracking-tight text-zinc-600 group-hover:text-zinc-800 transition-colors">
        {name}
      </span>
      <span class="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">{language}</span>
    </div>
    <p class="text-[13px] text-zinc-500 leading-relaxed group-hover:text-zinc-600 transition-colors">
      {description}
    </p>
  </div>
</a>
