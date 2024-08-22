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

<header
  class="top-0 z-50 mx-auto max-w-7xl md:sticky sticky sm:px-4 py-2 lg:pt-4 lg:px-8 md:px-12 wq-hd:px-0 4k:px-0"
>
  <nav>
    <div
      class="flex-col justify-between flex text-slate-200 md:px-0 top-2 px-4 py-2 md:py-0 md:flex-row md:items-center"
    >
      <div
        class="flex items-center justify-between bg-white/5 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border rounded-full isolate border-slate-800 hover:text-cyan-500 md:px-5 md:py-6 px-4 py-3 md:hover:border-cyan-500"
      >
        <a
          href="/"
          aria-label="Homepage"
          class="avatar text-4xl font-extrabold relative bottom-1 left-2 md:left-0 md:bottom-1 tracking-tighter text-slate-500"
          >{settings.data.first_name}<span
            class="text-4xl relative top-2 right-2 -z-10 text-slate-200"
            >{settings.data.last_name}</span
          ></a
        >
        <button
          aria-expanded={open}
          aria-label="Open Menu"
          class="block text-2xl text-slate-200 md:hidden"
          on:click={() => (open = true)}
        >
          <IconMenu />
        </button>
      </div>
      <!-- Mobile Nav -->
      <ul
        class={`fixed inset-0 z-50 flex flex-col items-end gap-4 bg-slate-950 pr-4 pt-14 transition-transform duration-300 ease-in-out md:hidden ${open ? 'translate-x-0' : 'translate-x-[100%]'}`}
      >
        <li>
          <button
            aria-expanded={open}
            aria-label="Close Menu"
            class="fixed right-4 top-3 block p-2 text-3xl text-slate-200 md:hidden"
            on:click={() => (open = false)}
          >
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
      <ul class="relative pb-0 z-50 hidden flex-row items-center gap-1 bg-transparent py-0 md:flex">
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
