<script lang="ts">
  import { type KeyTextField, type LinkField } from '@prismicio/client';
  import { PrismicLink } from '@prismicio/svelte';

  export let linkField: LinkField | null = null; // Mach das linkField optional
  export let label: KeyTextField;
  export let className: string = '';
  export let onClick: (() => void) | null = null; // Optionales onClick-Event
  export { className as class };
</script>

{#if linkField}
  <!-- Verwende PrismicLink, wenn ein linkField vorhanden ist -->
  <PrismicLink
    field={linkField}
    class={`group relative flex w-fit items-center justify-center overflow-hidden rounded-full border-2 border-cyan-500 bg-transparent px-6 py-2 font-bold text-slate-200 transition-transform ease-out hover:scale-105 ${className}`}
  >
    <span
      class={`absolute inset-0 z-0 h-full rounded bg-cyan-500 transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-12`}
    ></span>
    <span class="relative flex items-center justify-center gap-2">{label}</span>
  </PrismicLink>
{:else}
  <!-- Verwende einen normalen Button, wenn ein onClick-Event vorhanden ist -->
  <button
    on:click={onClick}
    class={`group relative flex w-fit items-center justify-center overflow-hidden rounded-full border-2 border-cyan-500 bg-transparent px-6 py-2 font-bold text-slate-200 transition-transform ease-out hover:scale-105 ${className}`}
  >
    <span
      class={`absolute inset-0 z-0 h-full rounded bg-cyan-500 transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-12`}
    ></span>
    <span class="relative flex items-center justify-center gap-2">{label}</span>
  </button>
{/if}
