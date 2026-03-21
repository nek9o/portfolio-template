<script lang="ts">
  import Avatar from "$lib/components/Avatar.svelte";
  import LinkItem from "$lib/components/LinkItem.svelte";
  import ProjectCard from "$lib/components/ProjectCard.svelte";
  import { config } from "$lib/config";

    const { profile, links, projects, seo, privacyPolicy } = config;
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
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
  <link
    href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+JP:wght@400;500&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="min-h-screen bg-bgPrimary text-textPrimary selection:bg-textPrimary selection:text-bgPrimary flex flex-col font-base transition-colors duration-500">
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
    <section class="anim-fade-up">
      <div class="flex flex-col sm:flex-row items-start justify-between gap-8 sm:gap-12">
        <div class="order-first sm:order-last shrink-0">
          <Avatar src={profile.avatar} alt={profile.nameEn} class="mb-4 sm:mb-0" />
        </div>

        <div class="flex-1 min-w-0">
          <h1 class="text-2xl font-medium mb-4">
            {profile.nameJp} / {profile.nameEn}
          </h1>
          <p class="text-sm text-textBio leading-relaxed max-w-xs whitespace-pre-wrap mb-6">
            {profile.bio}
          </p>

          {#if profile.showDetailedAbout}
            <a
              href="/about"
              class="text-[10px] uppercase tracking-widest font-medium text-textSecondary hover:text-textPrimary transition-colors duration-300"
            >
              Read More
            </a>
          {/if}
        </div>
      </div>
    </section>

    <!-- 極限までミニマルなリンク集 -->
    <section class="mt-32 anim-fade-up">
      <div class="w-full space-y-0 text-left">
        <h2 class="text-[10px] uppercase tracking-[0.3em] text-textLight font-medium mb-8">Links</h2>
        {#each links as link, i (link.url)}
          <LinkItem label={link.label} url={link.url} border={i < links.length - 1} />
        {/each}
      </div>
    </section>

    <!-- プロジェクトセクション (完全モノクロ) -->
    <section class="mt-32 anim-fade-up anim-delay-200">
      <h2 class="text-[10px] uppercase tracking-[0.3em] text-textLight font-medium mb-6">Projects</h2>

      <div class="space-y-0">
        {#each projects as project, i (project.url)}
          <ProjectCard {...project} border={i < projects.length - 1} />
        {/each}
      </div>
    </section>
  </main>

  <!-- フッター -->
  <footer class="pb-16 text-center anim-fade anim-delay-600">
    <div class="text-[9px] uppercase tracking-[0.2em] text-textLight mb-2">
      &copy; {new Date().getFullYear()} {profile.nameEn}{seo.showAllRightsReserved ? '. All rights reserved' : ''}
    </div>

    <div class="text-[9px] text-textLight">
      Font: <a href="https://fonts.google.com/specimen/IBM+Plex+Sans+JP" target="_blank" class="hover:text-textPrimary transition-all duration-300">IBM Plex Sans JP</a>
      <!-- 削除しないでください！削除した場合各OSSのライセンスを違反することになります。 -->
      <!-- Please do not delete this! Doing so will constitute a violation of the respective OSS licenses. -->
      | <a href="/licenses" class="hover:text-textPrimary transition-all duration-300">Licenses</a>
      {#if privacyPolicy?.enabled}
        | <a
            href="/privacy"
            class="hover:text-textPrimary transition-all duration-300"
          >
            Privacy Policy
          </a>
      {/if}
    </div>
  </footer>

</div>

<style>
  :global(body) {
    font-family: "IBM Plex Sans JP", sans-serif;
    font-weight: 400;
  }

  /* SSRに対応したCSSアニメーション。isMountedを使わずスムーズなフェードインを実現する */
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
  }

  .anim-fade {
    animation: fadeIn 1s ease both;
  }

  /* animation-delay ユーティリティ */
  .anim-delay-200 {
    animation-delay: 200ms;
  }

  .anim-delay-600 {
    animation-delay: 600ms;
  }

  /* OSの「視差効果を減らす」設定を尊重する */
  @media (prefers-reduced-motion: reduce) {
    .anim-fade-up,
    .anim-fade {
      animation: none;
    }
  }
</style>
