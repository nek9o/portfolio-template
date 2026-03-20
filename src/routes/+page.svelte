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
        max-w-md
        w-full
      "
    >
      <!-- プロフィールセクション -->
      <section
        in:fly={{ y: 10, duration: 800 }}
        class="flex flex-col items-center text-center mb-32"
      >
        <Avatar src={profile.avatar} alt={profile.nameEn} />

        <h1 class="text-2xl font-medium tracking-tight mb-4">
          {profile.nameJp} / {profile.nameEn}
        </h1>
        <p class="text-sm text-zinc-600 leading-relaxed max-w-xs mx-auto {profile.showDetailedAbout ? 'mb-12' : 'mb-32'}">
          {profile.bio}
        </p>

        {#if profile.showDetailedAbout}
          <div class="mb-24">
            <a
              href="/about"
              class="text-[10px] uppercase tracking-widest text-zinc-500 hover:text-zinc-800 transition-colors duration-300"
            >
              Read More
            </a>
          </div>
        {/if}

        <!-- 極限までミニマルなリンク集 -->
        <div class="w-full space-y-0 text-left">
          {#each links as link}
            <LinkItem label={link.label} url={link.url} />
          {/each}
        </div>
      </section>

      <!-- プロジェクトセクション (完全モノクロ) -->
      <section
        in:fly={{ y: 10, duration: 800, delay: 200 }}
        class="mt-48 space-y-12"
      >
        <h2 class="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-medium">Projects</h2>

        <div class="space-y-0">
          {#each projects as project}
            <ProjectCard {...project} />
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

      <div class="text-[9px] text-zinc-400 mb-1">
        Fonts: <a href="https://fonts.google.com/specimen/Lexend" target="_blank" class="hover:text-zinc-800 underline underline-offset-2 transition-colors duration-300">Lexend</a> &
        <a href="https://fonts.google.com/specimen/IBM+Plex+Sans+JP" target="_blank" class="hover:text-zinc-800 underline underline-offset-2 transition-colors duration-300">IBM Plex Sans JP</a>
      </div>

      <div class="text-[9px] text-zinc-400">
        <!-- 削除しないでください！削除した場合各OSSのライセンスを違反することになります。 -->
        <!-- Please do not delete this! Doing so will constitute a violation of the respective OSS licenses. -->
        <a href="/licenses" class="hover:text-zinc-800 underline underline-offset-2 transition-colors duration-300">Licenses</a>
        {#if privacyPolicy?.enabled}
          | <a
              href="/privacy"
              class="hover:text-zinc-800 underline underline-offset-2 transition-colors duration-300"
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
