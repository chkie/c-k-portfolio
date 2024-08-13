<script lang="ts">
  import IconMenu from '~icons/ic/round-menu';
  import IconClose from '~icons/material-symbols-light/cancel-rounded';
  import { type Content, isFilled } from '@prismicio/client';
  import NavBarLink from './NavbarLink.svelte';
  import Button from './Button.svelte';

  export let settings: Content.SettingsDocument;

  let open = false;

  function onLinkClick() {
    open = false;
  }
</script>

<header class="top-0 z-50 mx-auto max-w-7xl md:top-4 md:sticky relative">
  <nav>
    <div class="flex-col justify-between rounded-b-lg flex text-slate-200 md:px-0 top-2 px-4 py-4 md:m-4 md:flex-row md:items-center">
      <div class="flex items-center justify-between">
        <a href="/" aria-label="Hompage" class="text-xl font-extrabold tracking-tighter hover:text-cyan-500"> {settings.data.name}</a>
        <button aria-expanded={open} aria-label="Open Menu" class="block p-2 text-2xl text-slate-200 md:hidden hover:text-cyan-500" on:click={() => (open = true)}><IconMenu /></button>
      </div>
      <!-- Mobile Menu -->
      <ul class={`fixed inset-0 z-50 flex flex-col items-end gap-4 bg-slate-900 pr-4 pt-14 transition-transform duration-300 ease-in-out md:hidden ${open ? 'translate-x-0' : 'translate-y-[100%]'}`}>
        <li>
          <button aria-expanded={open} aria-label="Close Menu" class="fixed right-4 top-3 block p-2 text-2xl text-slate-200 md:hidden hover:text-cyan-500" on:click={() => (open = false)}
            ><IconClose class="size-10" /></button
          >
        </li>
        {#each settings.data.nav_items as { label, link }}
          <li class="first:mt-8">
            <NavBarLink field={link} {label} {onLinkClick} type="mobile" />
          </li>
        {/each}
        {#if isFilled.link(settings.data.cta_link)}
          <Button linkField={settings.data.cta_link} label={settings.data.cta_label} />
        {/if}
      </ul>
      <!-- Desktop Menu -->
      <ul class="relative z-50 hidden flex-row items-center gap-1 bg-transparent py-0 md:flex">
        {#each settings.data.nav_items as { label, link }}
          <li>
            <NavBarLink field={link} {label} {onLinkClick} type="desktop" />
          </li>
        {/each}
        {#if isFilled.link(settings.data.cta_link)}
          <Button linkField={settings.data.cta_link} label={settings.data.cta_label} class="ml-3" />
        {/if}
      </ul>
    </div>
  </nav>
</header>
