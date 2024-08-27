<script>
  import ScrollArrow from '~icons/material-symbols/arrow-upward-alt-rounded';
  export let showOnPx = 500;
  let hidden = true;
  let lastScrollTop = 0;
  let isScrolling = false;

  function goTop() {
    document.body.scrollIntoView();
  }

  function scrollContainer() {
    return document.documentElement || document.body;
  }

  function handleOnScroll() {
    if (!scrollContainer()) {
      return;
    }

    const currentScrollTop = scrollContainer().scrollTop;

    lastScrollTop = currentScrollTop;
    isScrolling = true;

    if (scrollContainer().scrollTop > showOnPx) {
      hidden = false;
    } else {
      hidden = true;
    }
  }
</script>

<svelte:window on:scroll={handleOnScroll} />

<button
  class="transition-transform duration-300 fixed md:bottom-20 w-14 h-14 md:w-20 md:h-20 md:right-20 right-6 bottom-6 rounded-full overflow-hidden group cursor-pointer bg-white/10 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 z-50 flex items-center justify-center shadow-lg"
  on:click={goTop}
  class:hidden
>
  <span
    class="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-cyan-500 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"
  ></span>

  <ScrollArrow
    class="transition-transform duration-300 cursor-pointer rounded-full w-12 h-12 md:w-16 md:h-16 hover:text-slate-300 text-cyan-500 z-50"
  />
</button>
