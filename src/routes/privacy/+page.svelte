<script lang="ts">
  import LinkItem from "$lib/components/LinkItem.svelte";
  import { config } from "$lib/config";
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";

  let isMounted = false;
  const { profile, privacyPolicy } = config;

  onMount(() => {
    isMounted = true;
  });
</script>

<svelte:head>
  <title>Privacy Policy | {profile.nameEn}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+JP:wght@400;500&family=Lexend:wght@300;400;500&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="min-h-screen bg-[var(--bg-primary)] text-zinc-800 selection:bg-zinc-800 selection:text-zinc-50 flex flex-col font-base">
  {#if isMounted}
    <main
      class="
        flex-grow
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
        class="mb-24 flex items-center justify-between"
      >
        <h1 class="text-2xl font-medium tracking-tight">
          Privacy Policy
        </h1>
        <LinkItem label="Back" url="/" external={false} border={false} reverse={true} />
      </header>

      <!-- コンテンツ -->
      <div
        in:fly={{ y: 10, duration: 800, delay: 200 }}
        class="space-y-16"
      >
        {#each privacyPolicy.items as item}
          <section class="border-b border-zinc-100 pb-12 last:border-0">
            <h2 class="text-sm font-medium text-zinc-800 mb-4">
              {item.title}
            </h2>
            <p class="text-[13px] text-zinc-500 leading-relaxed whitespace-pre-wrap">
              {item.description}
            </p>
          </section>
        {/each}
      </div>
    </main>

    <!-- フッター -->
    <footer
      in:fade={{ duration: 1000, delay: 600 }}
      class="pb-16 text-center"
    >
      <div class="text-[9px] uppercase tracking-[0.2em] text-zinc-400">
        &copy; {new Date().getFullYear()} {profile.nameEn}{config.seo.showAllRightsReserved ? '. All rights reserved' : ''}
      </div>
    </footer>
  {/if}
</div>

<style>
  :global(body) {
    font-family: "Lexend", "IBM Plex Sans JP", sans-serif;
    font-weight: 300;
  }
</style>
