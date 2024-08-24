<script lang="ts">
  import { type Content, isFilled } from '@prismicio/client';
  import { PrismicLink } from '@prismicio/svelte';
  export let showModal: boolean;
  export let toggleModal: () => void;

  export let settings: Content.SettingsDocument;
</script>

{#if showModal}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
    <div
      class="bg-slate-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60
      shadow-lg p-12 w-full max-w-xl h-[55vh] overflow-y-auto"
    >
      <button
        class="text-slate-300 hover:text-cyan-500 flex relative w-full justify-end bottom-8 left-5 text-4xl font-bold"
        on:click={toggleModal}
      >
        &times;
      </button>
      <h2 class="text-3xl font-bold text-center mb-6 text-slate-300">
        {settings.data.contact_form_header}
      </h2>
      <form action="https://formspree.io/f/myzgbeqj" method="POST" class="space-y-4">
        <div>
          <label for="email" class="block text-lg font-medium mb-1 text-slate-300"
            >{settings.data.email_title}</label
          >
          <input
            id="email"
            type="email"
            name="email"
            class="w-full p-2 border border-gray-300 text-slate-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label for="message" class="block text-lg font-medium mb-1 text-slate-300"
            >{settings.data.message_title}</label
          >
          <textarea
            id="message"
            name="message"
            class="w-full p-2 border border-gray-300 text-slate-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="15"
            required
          ></textarea>
        </div>
        <div class="flex justify-center">
          <button
            type="submit"
            class="group relative flex w-fit items-center justify-center overflow-hidden rounded-full border-2 border-cyan-500 bg-transparent px-10 py-2 font-bold text-slate-200 transition-transform ease-out hover:scale-105"
          >
            <span
              class="absolute inset-0 z-0 h-full rounded bg-cyan-500 transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-12"
            >
            </span>
            <span class="relative flex items-center justify-center gap-2"
              >{settings.data.contact_form_button}</span
            >
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}
