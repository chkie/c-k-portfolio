<script lang="ts">
  import { PrismicImage } from '@prismicio/svelte';
  import { type ImageField } from '@prismicio/client';
  import clsx from 'clsx';

  export let image: ImageField;
  let className: string = '';
  export { className as class };
</script>

<div class={clsx('relative h-full w-full p-4 ', className)}>
  <div class="avatar aspect-auto overflow-hidden bg-gray-400 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-slate-800 p-4">
    <PrismicImage field={image} class="avatar-image h-full w-full object-fill rounded-xl" imgixParams={{ q: 90 }} />
  </div>
</div>

<style>
  .avatar {
    perspective: 500px;
    perspective-origin: 150% 150%;
  }
</style>
