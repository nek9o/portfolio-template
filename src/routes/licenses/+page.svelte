<script lang="ts">
  import LinkItem from "$lib/components/LinkItem.svelte";
  import { config } from "$lib/config";
  import { getBorderClass } from "$lib/utils/borderClass";
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";

  let isMounted = false;
  let licenses: Record<string, any> = {};
  let loading = true;

  onMount(async () => {
    isMounted = true;
    try {
      const response = await fetch("/licenses.json");
      licenses = await response.json();
    } catch (error) {
      console.error("Failed to load licenses:", error);
    } finally {
      loading = false;
    }
  });

  function getBaseName(pkg: string) {
    if (pkg.startsWith("@")) {
      const parts = pkg.split("/");
      return parts.slice(0, 2).join("/");
    }
    return pkg.split("@")[0];
  }

  function getVersion(pkg: string) {
    const parts = pkg.split("@");
    return parts[parts.length - 1];
  }
</script>

<svelte:head>
  <title>Licenses | {config.profile.nameEn}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+JP:wght@400;500&family=Lexend:wght@300;400;500&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="min-h-screen bg-(--bg-primary) text-zinc-800 selection:bg-zinc-800 selection:text-zinc-50 flex flex-col font-base transition-colors duration-500">
  {#if isMounted}
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
          Licenses
        </h1>
        <LinkItem label="Back" url="/" external={false} border={false} reverse={true} />
      </header>

      <!-- ライセンスリスト -->
      {#if loading}
        <div class="text-center py-20 text-zinc-400">
          <p class="text-[10px] uppercase tracking-widest">Loading</p>
        </div>
      {:else}
        <div
          in:fly={{ y: 10, duration: 800, delay: 200 }}
          class="space-y-24"
        >
          {#each Object.entries(licenses) as [name, info]}
            <section class="border-b border-zinc-100 pb-12 last:border-0">
              <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
                <h2 class="text-sm font-medium text-zinc-800">
                  {getBaseName(name)}
                </h2>
                <span class="text-[10px] text-zinc-400 font-mono">
                  v{getVersion(name)}
                </span>
                <span class="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">
                  {info.licenseId}
                </span>
              </div>

              {#if info.publisher || info.email}
                <div class="text-[11px] text-zinc-400 mb-4">
                  {#if info.publisher}{info.publisher}{/if}
                  {#if info.publisher && info.email} &bull; {/if}
                  {#if info.email}{info.email}{/if}
                </div>
              {/if}

              {#if info.repository || info.url}
                <div class="mt-4 space-y-2">
                  {#if info.repository}
                    <div class="flex items-center gap-2">
                      <span class="text-[9px] uppercase tracking-wider text-zinc-400 w-16">Repo</span>
                      <a
                        href={info.repository}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-[11px] text-zinc-400 hover:text-zinc-800 transition-all truncate"
                      >
                        {info.repository}
                      </a>
                    </div>
                  {/if}
                  {#if info.url && info.url !== info.repository}
                    <div class="flex items-center gap-2">
                      <span class="text-[9px] uppercase tracking-wider text-zinc-400 w-16">Site</span>
                      <a
                        href={info.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-[11px] text-zinc-400 hover:text-zinc-800 transition-all truncate"
                      >
                        {info.url}
                      </a>
                    </div>
                  {/if}
                </div>
              {/if}

              {#if info.licenseText}
                <details class="mt-6 group">
                  <summary class="text-[10px] uppercase tracking-widest text-zinc-400 hover:text-zinc-800 cursor-pointer list-none transition-colors">
                    View License
                  </summary>
                  <div class="mt-6 p-6 bg-zinc-50 border border-zinc-100/50 rounded overflow-x-auto">
                    <pre class="text-[10px] leading-relaxed text-zinc-500 font-mono whitespace-pre-wrap">{info.licenseText}</pre>
                  </div>
                </details>
              {/if}
            </section>
          {/each}
        </div>
      {/if}
    </main>

    <!-- フッター -->
    <footer
      in:fade={{ duration: 1000, delay: 600 }}
      class="pb-16 text-center"
    >
      <div class="text-[9px] uppercase tracking-[0.2em] text-zinc-400">
        &copy; {new Date().getFullYear()} {config.profile.nameEn}{config.seo.showAllRightsReserved ? '. All rights reserved' : ''}
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
