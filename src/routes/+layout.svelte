<script lang="ts">
  import '../app.css';
  import '@fontsource-variable/inter';
  import { PrismicPreview } from '@prismicio/svelte/kit';
  import { page } from '$app/stores';
  import { repositoryName } from '$lib/prismicio';
  import Footer from '$lib/components/Footer.svelte';
  import Header from '$lib/components/Header.svelte';
  import ContactForm from '$lib/components/ContactForm.svelte';
  import { dev } from '$app/environment';
  import { inject } from '@vercel/analytics';
  import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

  injectSpeedInsights();

  inject({ mode: dev ? 'development' : 'production' });

  let showModal = false;

  function toggleModal() {
    showModal = !showModal;
  }

  export let data;
</script>

<svelte:head>
  <title>{$page.data.title}</title>
  {#if $page.data.meta_description}
    <meta name="description" content={$page.data.meta_description} />
  {/if}
  {#if $page.data.meta_title}
    <meta name="og:title" content={$page.data.meta_title} />
  {/if}
  {#if $page.data.meta_image}
    <meta name="og:image" content={$page.data.meta_image} />
    <meta name="twitter:card" content="summary_large_image" />
  {/if}
</svelte:head>

<Header settings={data.settings} {showModal} {toggleModal} />
<main>
  <slot />
</main>
<div class="background-gradient absolute inset-0 -z-50 ma-h-screen" />
<div
  class="pointer-events-none absolute inset-0 -z-40 h-full opacity-10 mix-blend-soft-light"
></div>
<Footer settings={data.settings} />

<ContactForm settings={data.settings} {showModal} {toggleModal} />

<PrismicPreview {repositoryName} />
