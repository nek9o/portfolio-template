<script lang="ts">
  import Avatar from "$lib/components/Avatar.svelte";
  import LinkItem from "$lib/components/LinkItem.svelte";
  import ProjectCard from "$lib/components/ProjectCard.svelte";
  import { config } from "$lib/config";
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";

  let isMounted = false;

  const { profile, links, projects, seo, privacyPolicy } = config;

  onMount(() => {
    isMounted = true;
  });
</script>

<svelte:head>
  <title>{profile.nameEn} | Profile</title>
  <meta name="description" content="{profile.nameJp} ({profile.nameEn}) のポートフォリオサイトです。プロジェクトや活動内容を紹介しています。" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content={seo.themeColor} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={seo.siteUrl} />
  <meta property="og:title" content="{profile.nameEn} | Profile" />
  <meta property="og:description" content="{profile.nameJp} ({profile.nameEn}) のポートフォリオサイトです。プロジェクトや活動内容を紹介しています。" />
  <meta property="og:image" content={seo.ogpImage} />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary" />
  <meta property="twitter:url" content={seo.siteUrl} />
  <meta property="twitter:title" content="{profile.nameEn} | Profile" />
  <meta property="twitter:description" content="{profile.nameJp} ({profile.nameEn}) のポートフォリオサイトです。プロジェクトや活動内容を紹介しています。" />
  <meta property="twitter:image" content={seo.ogpImage} />

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
        max-w-lg
        w-full
      "
    >
      <!-- プロフィール・bioセクション -->
      <section
        in:fly={{ y: 10, duration: 800 }}
      >
        <div class="flex flex-col sm:flex-row items-start justify-between gap-8 sm:gap-12">
          <div class="order-first sm:order-last shrink-0">
            <Avatar src={profile.avatar} alt={profile.nameEn} class="mb-4 sm:mb-0" />
          </div>

          <div class="flex-1 min-w-0">
            <h1 class="text-2xl font-medium tracking-tight mb-4">
              {profile.nameJp} / {profile.nameEn}
            </h1>
            <p class="text-sm text-zinc-600 leading-relaxed max-w-xs whitespace-pre-wrap mb-6">
              {profile.bio}
            </p>

            {#if profile.showDetailedAbout}
              <a
                href="/about"
                class="text-[10px] uppercase tracking-widest font-medium text-zinc-500 hover:text-zinc-800 transition-colors duration-300"
              >
                Read More
              </a>
            {/if}
          </div>
        </div>
      </section>

      <!-- 極限までミニマルなリンク集 -->
      <section
        in:fly={{ y: 10, duration: 800 }}
        class="mt-32"
      >
        <div class="w-full space-y-0 text-left">
          <h2 class="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-medium mb-8">Links</h2>
          {#each links as link, i}
            <LinkItem label={link.label} url={link.url} border={i < links.length - 1} />
          {/each}
        </div>
      </section>

      <!-- プロジェクトセクション (完全モノクロ) -->
      <section
        in:fly={{ y: 10, duration: 800, delay: 200 }}
        class="mt-32"
      >
        <h2 class="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-medium mb-6">Projects</h2>

        <div class="space-y-0">
          {#each projects as project, i}
            <ProjectCard {...project} border={i < projects.length - 1} />
          {/each}
        </div>
      </section>
    </main>

    <!-- フッター (元の構成を維持) -->
    <footer
      in:fade={{ duration: 1000, delay: 600 }}
      class="pb-16 text-center"
    >
      <div class="text-[9px] uppercase tracking-[0.2em] text-zinc-400 mb-2">
        &copy; {new Date().getFullYear()} {profile.nameEn}{seo.showAllRightsReserved ? '. All rights reserved' : ''}
      </div>

      <div class="text-[9px] text-zinc-400">
        Fonts: <a href="https://fonts.google.com/specimen/Lexend" target="_blank" class="hover:text-zinc-800 border-b border-transparent hover:border-zinc-300/80 transition-all duration-300">Lexend</a> &
        <a href="https://fonts.google.com/specimen/IBM+Plex+Sans+JP" target="_blank" class="hover:text-zinc-800 border-b border-transparent hover:border-zinc-300/80 transition-all duration-300">IBM Plex Sans JP</a>
        <!-- 削除しないでください！削除した場合各OSSのライセンスを違反することになります。 -->
        <!-- Please do not delete this! Doing so will constitute a violation of the respective OSS licenses. -->
        | <a href="/licenses" class="hover:text-zinc-800 border-b border-transparent hover:border-zinc-300/80 transition-all duration-300">Licenses</a>
        {#if privacyPolicy?.enabled}
          | <a
              href="/privacy"
              class="hover:text-zinc-800 border-b border-transparent hover:border-zinc-300/80 transition-all duration-300"
            >
              Privacy Policy
            </a>
        {/if}
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
