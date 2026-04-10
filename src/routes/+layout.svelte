<script>
  import '@unocss/reset/tailwind.css';
  import 'virtual:uno.css';
  import '@fontsource/ibm-plex-sans-jp/400.css';
  import '@fontsource/ibm-plex-sans-jp/500.css';
  import '../app.css';

  import { env } from '$env/dynamic/public';
</script>

<svelte:head>
  {#if env.PUBLIC_CF_WEB_ANALYTICS_TOKEN}
    <!-- Cloudflare Web Analytics -->
    <script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token: env.PUBLIC_CF_WEB_ANALYTICS_TOKEN })}
    ></script>
    <!-- End Cloudflare Web Analytics -->
  {/if}
</svelte:head>

<div class="bg-grain"></div>
<slot />
