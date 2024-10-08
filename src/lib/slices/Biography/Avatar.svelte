<script lang="ts">
  import { PrismicImage } from '@prismicio/svelte';
  import { type ImageField } from '@prismicio/client';
  import clsx from 'clsx';
  import { gsap } from 'gsap';
  import { onMount } from 'svelte';

  export let image: ImageField;
  let className: string = '';
  export { className as class };
  let component: HTMLElement;

  onMount(() => {
    gsap.fromTo(
      '.avatar',
      {
        opacity: 0,
        scale: 1.4
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.3,
        ease: 'power3.inOut'
      }
    );

    window.onmousemove = (e) => {
      if (!component) return; // component is not ready yet
      const componentRect = (component as HTMLElement).getBoundingClientRect();
      const componentCenterX = componentRect.left + componentRect.width / 2;

      let componentPercent = {
        x: (e.clientX - componentCenterX) / componentRect.width / 2
      };

      let distFromCenterX = 1 - Math.abs(componentPercent.x);

      gsap
        .timeline({
          defaults: {
            duration: 0.5,
            overwrite: 'auto',
            ease: 'power3.out'
          }
        })
        .to(
          '.avatar',
          {
            rotation: gsap.utils.clamp(-2, 2, 5 * componentPercent.x)
          },
          0
        )
        .to(
          '.higlight',
          {
            opacity: distFromCenterX - 0.7,
            x: -10 + 20 * componentPercent.x
          },
          0
        );
    };
  });
</script>

<div class={clsx('relative h-full w-full ', className)} bind:this={component}>
  <div class="avatar aspect-auto overflow-hidden bg-gray-400 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-slate-800 p-4 opacity-0">
    <PrismicImage field={image} class="avatar-image h-full w-full object-fill rounded-xl" imgixParams={{ q: 90 }} />
    <div class="higlight absolute inset-0 w-full scale-110 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0"></div>
  </div>
</div>

<style>
  .avatar {
    perspective: 500px;
    perspective-origin: 150% 150%;
  }
</style>
