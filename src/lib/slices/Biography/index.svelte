<script lang="ts">
  import Bounded from '$lib/components/Bounded.svelte';
  import Button from '$lib/components/Button.svelte';
  import { type Content, isFilled } from '@prismicio/client';
  import { PrismicRichText } from '@prismicio/svelte';
  import Heading from '$lib/components/Heading.svelte';
  import Avatar from './Avatar.svelte';

  export let slice: Content.BiographySlice;

  export let settings: Content.SettingsDocument;
  export let showModal: boolean; // Empfang des showModal-Props
  export let toggleModal: () => void; // Empfang der toggleModal-Funktion

  let open = false;

  function onLinkClick() {
    open = false;
  }
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
  <div class="grid gap-x-8 gap-y-6 md:grid-cols-[2fr,1fr] px-4 md:px-6 lg:mt-20">
    <Heading size="xl" class="col-start-1">{slice.primary.heading}</Heading>
    <div class="col-start-1 prose prose-invert prose-slate prose-lg">
      <PrismicRichText field={slice.primary.description} />
    </div>
    <Avatar image={slice.primary.avatar} class="row-start-1 max-w-sm md:col-start-2 md:row-end-3" />
  </div>
</Bounded>
