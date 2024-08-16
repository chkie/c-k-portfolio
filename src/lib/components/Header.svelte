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
    <div class="flex-col justify-between flex text-slate-200 md:px-0 top-2 px-8 py-2 md:flex-row md:items-center">
      <div
        class="flex items-center justify-between bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border rounded-full pl-2 border-slate-800 hover:text-cyan-500 md:px-10 md:py-12 px-2 py-3 md:hover:border-cyan-500"
      >
        <a href="/" aria-label="Hompage" class="avatar text-6xl font-extrabold relative bottom-2 left-2 md:left-0 md:bottom-2 tracking-tighter text-slate-500">
          {settings.data.first_name}<span class="text-[3.65rem] relative top-[14.7px] right-[0.75rem] -z-10 text-slate-200">{settings.data.last_name}</span></a
        >
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
