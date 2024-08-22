<script lang="ts">
  import { SliceZone } from '@prismicio/svelte';
  import type { Content } from '@prismicio/client';
  import { components } from '$lib/slices';
  import { formatDate } from '$lib/formatDate';
  import Heading from './Heading.svelte';
  import Bounded from './Bounded.svelte';

  export let page: Content.BlogpostDocument | Content.ProjectDocument;

  let isWrapped = true; // Set this to true or false depending on your condition
  const formattedDate = formatDate(page.data.date);
</script>

<Bounded tag="article">
  <div
    class="rounded-2xl md:border-4 border-slate-800 bg-slate-900 border-0 px-4 py-10 md:px-8 md:py-20"
  >
    <Heading tag="h1">{page.data.title}</Heading>
    <div class=" pt-2 flex gap-4 md:mt-6 text-cyan-500 flex-wrap {isWrapped ? 'pb-8' : ''}">
      {#each page.tags as tag}
        <span class="text-xl font-bold -my-[0.5em]">{tag}</span>
      {/each}
    </div>
    <p class="mt-8 border-b border-slate-600 text-xl font-medium text-slate-300">{formattedDate}</p>
    <div class="prose prose-lg prose-invert mt-12 w-full max-w-none md:mt-20">
      <SliceZone slices={page.data.slices} {components} />
    </div>
  </div>
</Bounded>
