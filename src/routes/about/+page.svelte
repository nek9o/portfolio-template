<script lang="ts">
  import { config } from "$lib/config";
  import LinkItem from "$lib/components/LinkItem.svelte";
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { goto } from "$app/navigation";

  let isMounted = false;
  const { profile, seo } = config;

  onMount(() => {
    isMounted = true;
    if (!profile.showDetailedAbout) {
      goto("/");
    }
  });
</script>

<svelte:head>
  <title>About | {profile.nameEn}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+JP:wght@400;500&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="min-h-screen bg-(--bg-primary) text-zinc-800 selection:bg-zinc-800 selection:text-zinc-50 flex flex-col font-base transition-colors duration-500">
  {#if isMounted && profile.showDetailedAbout}
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
      <header
        in:fly={{ y: 10, duration: 800 }}
        class="mb-32 flex items-center justify-between"
      >
        <h1 class="text-2xl font-medium tracking-tight">
          About
        </h1>
        <LinkItem label="Back" url="/" external={false} border={false} reverse={true} />
      </header>

      <!-- 詳細紹介セクション -->
      <section
        in:fly={{ y: 10, duration: 800, delay: 200 }}
        class="space-y-8"
      >
        <p class="text-sm text-zinc-600 leading-relaxed whitespace-pre-wrap">
          {profile.detailedAbout}
        </p>
      </section>
    </main>

    <!-- フッター -->
    <footer
      in:fade={{ duration: 1000, delay: 600 }}
      class="pb-16 text-center"
    >
      <div class="text-[9px] uppercase tracking-[0.2em] text-zinc-400">
        &copy; {new Date().getFullYear()} {profile.nameEn}{seo.showAllRightsReserved ? '. All rights reserved' : ''}
      </div>
    </footer>
  {/if}
</div>

<style>
  :global(body) {
    font-family: "IBM Plex Sans JP", sans-serif;
    font-weight: 400;
  }
</style>
