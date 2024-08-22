<script lang="ts">
  import { onMount } from 'svelte';
  import type { Content } from '@prismicio/client';
  import Scene from './Scene.svelte';
  import { gsap } from 'gsap';

  export let slice: Content.HeroSlice;

  const first_name_letters = slice.primary.first_name?.split('') ?? '';
  const last_name_letters = slice.primary.last_name?.split('') ?? '';

  onMount(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.to('.name-animation', { opacity: 1 });
      gsap.to('.job-title', { opacity: 1 });
      return;
    }

    const tl = gsap.timeline();

    tl.fromTo(
      '.name-animation',
      {
        x: -100,
        opacity: 0,
        rotate: -10
      },
      {
        x: 0,
        rotate: 0,
        opacity: 1,
        ease: 'elastic.out(1,0.3)',
        duration: 1,
        transformOrigin: 'left top',
        delay: 0.5,
        stagger: {
          each: 0.1,
          from: 'random'
        }
      }
    );

    tl.fromTo(
      '.job-title',
      {
        y: 20,
        opacity: 0,
        scale: 1.2
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scale: 1,
        ease: 'elastic.out(1,0.3)'
      }
    );
  });
</script>

<section
  data-slice-type={slice.slice_type}
  data-slice-variation={slice.variation}
  class="px-4 mt-8"
>
  <div class="mx-auto w-full max-w-7xl md:px-8 wq-hd:px-0 4k:px-0">
    <div class="grid min-h-[65vh] grid-cols-1 items-center md:grid-cols-2">
      <div
        class="relative z-10 row-span-1 row-start-1 -my-20 lg:-my-20 aspect-[1/1.0] wq-hd:aspect=[1/1.3] overflow-hidden md:col-span-1 md:col-start-2 md:mt-0 4k:aspect=[1/1.3]"
      >
        <Scene />
      </div>
      <div class="col-start-1 md:row-start-1">
        <h1
          class="mb-2 mt-10 md:mb-8 text-[clamp(3rem,20vmin,11rem)] md:text-[clamp(3rem,20vmin,6rem)] lg:text-[clamp(3rem,20vmin,8rem)] font-extrabold leading-none tracking-tighter text-nowrap wq-hd:text-[clamp(3rem,20vmin,11rem)] 4K:[clamp(3rem,20vmin,11rem)]"
          aria-label={slice.primary.first_name + ' ' + slice.primary.last_name}
        >
          {#if first_name_letters.length && last_name_letters.length}
            <span class="block text-slate-300">
              {#each first_name_letters as letter}
                <span class="name-animation inline-block opacity-0">{letter}</span>
              {/each}
            </span>
            <span class="block text-slate-500 -mt-[.2em]">
              {#each last_name_letters as letter}
                <span class="name-animation inline-block opacity-0">{letter}</span>
              {/each}
            </span>
          {/if}
        </h1>
        <span
          class="job-title block bg-gradient-to-tr ml-2 from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text text-transparent text-2xl font-bold uppercase tracking-[.2em] md:text-xl lg:text-3xl opacity-0 wq-hd:text-4xl"
        >
          {slice.primary.tag_line}
        </span>
      </div>
    </div>
  </div>
</section>
