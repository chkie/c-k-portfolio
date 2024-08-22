<script lang="ts">
  import { type Content, isFilled } from '@prismicio/client';
  import { PrismicLink } from '@prismicio/svelte';
  import IconGithub from '~icons/fa6-brands/github';
  import IconLinkedIn from '~icons/fa6-brands/linkedin';
  import IconX from '~icons/fa6-brands/x-twitter';
  import Bounded from './Bounded.svelte';

  export let settings: Content.SettingsDocument;
</script>

<Bounded as="footer" class="text-slate-600 ">
  <div
    class="container mx-auto flex lg:mt-20 flex-col md:px-4 items-center justify-between gap-6 py-8 sm:flex-row wq-hd:pt-[4rem] 4k:pt-[18rem] full-hd:-mt-2 wq-hd:px-0 4k:px-0"
  >
    <div
      class="name flex flex-col items-center justify-center gap-x-1 gap-y-2 sm:flex-row sm:justify-self-start"
    >
      <a
        href="/"
        class="text-4xl relative bottom-1 font-extrabold tracking-tighter text-slate-400 transition-colors duration-150 hover:text-cyan-500"
      >
        {settings.data.first_name}<span
          class="relative right-2 -z-20 text-4xl text-slate-100 top-2"
        >
          {settings.data.last_name}</span
        >
      </a>
      <a
        href="/"
        class="text-xl font-extrabold tracking-tighter text-slate-100 transition-colors duration-150 hover:text-cyan-500"
      >
      </a>
      <span
        class="hidden text-5xl font-extralight leading-[0] text-slate-400 sm:inline"
        aria-hidden="true">/</span
      >
      <p class="text-sm text-slate-300 pl-2">
        © {new Date().getFullYear()}
        {settings.data.full_name}
      </p>
    </div>
    <nav class="navigation" aria-label="Footer Navigation">
      <ul class="flex items-center gap-1">
        {#each settings.data.nav_items as { link, label }, index}
          <li>
            <PrismicLink
              field={link}
              class="block px-3 py-1 text-base font-bold text-slate-100 transition-colors duration-150 hover:text-cyan-500"
              >{label}</PrismicLink
            >
          </li>
          {#if index < settings.data.nav_items.length - 1}
            <span class="text-4xl font-thin leading-[0] text-slate-400" aria-hidden="true">/</span>
          {/if}
        {/each}
      </ul>
    </nav>
    <div class="socials inline-flex justify-center sm:justify-end">
      {#if isFilled.link(settings.data.github_link)}
        <PrismicLink
          field={settings.data.github_link}
          class="p-2 text-2xl transition-all duration-150 transform text-slate-300 hover:text-cyan-500 hover:scale-125"
          aria-label={settings.data.full_name + ' on GitHub'}
        >
          <IconGithub />
        </PrismicLink>
      {/if}
      <div class="socials inline-flex justify-center sm:justify-end">
        {#if isFilled.link(settings.data.linkedin_link)}
          <PrismicLink
            field={settings.data.linkedin_link}
            class="p-2 text-2xl transition-all duration-150 transform text-slate-300 hover:text-cyan-500 hover:scale-125"
            aria-label={settings.data.full_name + ' on LinkedIn'}
          >
            <IconLinkedIn />
          </PrismicLink>
        {/if}
      </div>
      <div class="socials inline-flex justify-center sm:justify-end">
        {#if isFilled.link(settings.data.x_link)}
          <PrismicLink
            field={settings.data.x_link}
            class="p-2 text-2xl transition-all duration-150 transform text-slate-300 hover:text-cyan-500 hover:scale-125"
            aria-label={settings.data.full_name + ' on X'}
          >
            <IconX />
          </PrismicLink>
        {/if}
      </div>
    </div>
  </div>
</Bounded>
