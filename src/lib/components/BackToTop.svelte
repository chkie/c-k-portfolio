<script>
  import ScrollArrow from '~icons/material-symbols/arrow-upward-alt-rounded';
  export let showOnPx = 500;
  let hidden = true;
  let rotation = 0;
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

    // Scrollrichtung prüfen
    if (currentScrollTop > lastScrollTop) {
      // Nach unten scrollen
      rotation += 10; // Anpassung der Rotationsgeschwindigkeit
    } else {
      // Nach oben scrollen
      rotation -= 10; // Anpassung der Rotationsgeschwindigkeit
    }

    lastScrollTop = currentScrollTop;
    isScrolling = true;

    if (scrollContainer().scrollTop > showOnPx) {
      hidden = false;
    } else {
      hidden = true;
    }

    // Setze isScrolling zurück, nachdem das Scrollen beendet ist
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, 100); // Timeout auf eine kleine Verzögerung setzen
  }

  /**
   * @type {string | number | NodeJS.Timeout | undefined}
   */
  let scrollTimeout;
</script>

<svelte:window on:scroll={handleOnScroll} />

<button
  class="w-14 h-14 rounded-full ransition-transform duration-300 md:w-20 md:h-20 md:right-20 md:bottom-20 bg-white/5 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 shadow-lg border-2 border-backdrop-blur-sm border-backdrop-filter border-white/5 hover:border-2 hover:border-cyan-500 fixed right-6 select-none bottom-6 hidden:opacity-0 visible:hidden z-50"
  on:click={goTop}
  class:hidden
  style="transform: rotate({rotation}deg); transition: {isScrolling
    ? 'transform 0.1s linear'
    : 'none'};"
>
  <span class="flex justify-center">
    <ScrollArrow
      class=" transition-transform duration-300 cursor-pointer rounded-full w-10 h-10 md:w-16 md:h-16 hover:text-cyan-500"
    />
  </span>
</button>
