<script lang="ts">
  import { type Content } from '@prismicio/client';
  export let settings: Content.SettingsDocument;

  let open = false;

  function onLinkClick() {
    open = false;
  }
</script>

<header class="top-0 z-50 mx-auto max-w-7xl md:top-4 md:sticky relative">
  <nav>
    <div
      class="flex flex-col justify-between rounded-b-lg border-slate-300 shadow-xl top-2 border-2 px-4 py-4 md:m-4 md:flex-row md:items-center md:rounded-xl bg-transparent"
    >
      <div>
        <a href="/" aria-label="Hompage" class="text-xl font-extrabold tracking-tighter text-slate-300 hover:text-cyan-500">
          {settings.data.name}</a
        >
        <button
          aria-expanded={open}
          aria-label="Open Menu"
          class="block p-2 text-2xl text-slate-800 md:hidden"
          on:click={() => (open = true)}>OPEN</button
        >
      </div>
    </div>
  </nav>
</header>
