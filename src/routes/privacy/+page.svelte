<script lang="ts">
  import LinkItem from "$lib/components/LinkItem.svelte";
  import { config } from "$lib/config";

  const { profile, privacyPolicy } = config;
</script>

<svelte:head>
  <title>Privacy Policy | {profile.nameEn}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />

</svelte:head>

<div class="min-h-screen bg-(--bg-primary) text-zinc-800 selection:bg-zinc-800 selection:text-zinc-50 flex flex-col font-base transition-colors duration-500">
  <main
    class="
      grow
      mx-auto
      px-6
      py-32 sm:py-48
      max-w-2xl
      w-full
    "
  >
    <!-- ヘッダー -->
    <header class="mb-32 flex items-center justify-between anim-fade-up">
      <h1 class="text-2xl font-medium tracking-tight">
        Privacy Policy
      </h1>
      <LinkItem label="Back" url="/" external={false} border={false} reverse={true} />
    </header>

    <!-- コンテンツ -->
    <div class="space-y-24 anim-fade-up anim-delay-200">
      {#each privacyPolicy.items as item (item.title)}
        <section class="border-b border-zinc-100 pb-12 last:border-0">
          <h2 class="text-sm font-medium text-zinc-800 mb-4">
            {item.title}
          </h2>
          <p class="text-sm text-zinc-600 leading-relaxed whitespace-pre-wrap">
            {item.description}
          </p>
        </section>
      {/each}
    </div>
  </main>

  <!-- フッター -->
  <footer class="pb-16 text-center anim-fade anim-delay-600">
    <div class="text-[9px] uppercase tracking-[0.2em] text-zinc-400">
      &copy; {new Date().getFullYear()} {profile.nameEn}{config.seo.showAllRightsReserved ? '. All rights reserved' : ''}
    </div>
  </footer>
</div>

<style>
  :global(body) {
    font-family: "IBM Plex Sans JP", sans-serif;
    font-weight: 400;
  }

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .anim-fade-up {
    animation: fadeUp 0.8s ease both;
    will-change: transform, opacity;
  }

  .anim-fade {
    animation: fadeIn 1s ease both;
    will-change: opacity;
  }

  .anim-delay-200 {
    animation-delay: 200ms;
  }

  .anim-delay-600 {
    animation-delay: 600ms;
  }

  @media (prefers-reduced-motion: reduce) {
    .anim-fade-up,
    .anim-fade {
      animation: none;
    }
  }
</style>
