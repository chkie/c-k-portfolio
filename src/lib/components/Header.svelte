<script lang="ts">
  import { type Content, isFilled } from '@prismicio/client';
  import NavBarLink from './NavbarLink.svelte';
  import Button from './Button.svelte';

  import IconMenu from '~icons/ic/baseline-menu';
  import IconClose from '~icons/ic/baseline-close';

  export let settings: Content.SettingsDocument;

  let open = false;

  function onLinkClick() {
    open = false;
  }
</script>

<header class="top-0 z-50 mx-auto max-w-7xl md:sticky md:top-4 relative sm:px-4 lg:pt-4">
  <nav>
    <div class="flex-col justify-between flex text-slate-200 md:px-0 top-2 px-8 py-2 md:flex-row md:items-center">
      <div
        class="flex items-center justify-between bg-white/5 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border rounded-full border-slate-800 hover:text-cyan-500 md:p-7 md:py-10 px-2 py-3 md:hover:border-cyan-500"
      >
        <a href="/" aria-label="Homepage" class="avatar text-6xl font-extrabold relative bottom-2 left-2 md:left-0 md:bottom-2 tracking-tighter text-slate-500"
          >{settings.data.first_name}<span class="text-[3.65rem] relative top-[14.7px] right-[0.75rem] -z-10 text-slate-200">{settings.data.last_name}</span></a
        >
        <button aria-expanded={open} aria-label="Open Menu" class="block p-2 text-2xl text-slate-200 md:hidden" on:click={() => (open = true)}>
          <IconMenu />
        </button>
      </div>
      <!-- Mobile Nav -->
      <ul class={`fixed inset-0 z-50 flex flex-col items-end gap-4 bg-slate-950 pr-4 pt-14 transition-transform duration-300 ease-in-out md:hidden ${open ? 'translate-x-0' : 'translate-x-[100%]'}`}>
        <li>
          <button aria-expanded={open} aria-label="Close Menu" class="fixed right-4 top-3 block p-2 text-3xl text-slate-200 md:hidden" on:click={() => (open = false)}>
            <IconClose />
          </button>
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

      <!-- Desktop Nav -->
      <ul class="relative pb-0 md:pb-24 z-50 hidden flex-row items-center gap-1 bg-transparent py-0 md:flex">
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
