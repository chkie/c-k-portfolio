<script lang="ts">
  import { type Content } from '@prismicio/client';
  import Heading from './Heading.svelte';
  export let showModal: boolean;
  export let toggleModal: () => void;
  export let settings: Content.SettingsDocument;

  let emailInput: HTMLInputElement | null = null;
  let messageInput: HTMLTextAreaElement | null = null;
  let remainingChars: number = 1000;

  function updateRemainingChars() {
    if (messageInput) {
      remainingChars = 1000 - messageInput.value.length;
    }
  }

  $: if (showModal && emailInput) {
    emailInput.focus();
  }
</script>

{#if showModal}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
    role="dialog"
    aria-labelledby="modal-title"
    aria-modal="true"
  >
    <div
      class="bg-slate-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 shadow-lg p-5 sm:p-10 w-full max-w-4xl min-h-screen flex flex-col justify-center overflow-y-auto"
      style="height: 100vh; margin: auto;"
    >
      <button
        class="text-slate-300 hover:text-cyan-500 flex justify-end text-4xl font-bold"
        on:click={toggleModal}
        aria-label="close modal"
      >
        &times;
      </button>
      <Heading tag="h2" size="md" id="modal-title" class="mb-4 text-center">
        {settings.data.contact_form_header}
      </Heading>
      <form
        action="https://formspree.io/f/myzgbeqj"
        method="POST"
        class="space-y-4 flex-grow flex flex-col"
      >
        <div>
          <label for="email" class="block text-lg font-medium mb-1 text-slate-300">
            {settings.data.email_title}
          </label>
          <input
            bind:this={emailInput}
            id="email"
            type="email"
            name="email"
            placeholder="your email"
            class="w-full p-2 border border-gray-300 text-slate-900 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>
        <div class="flex-grow flex flex-col">
          <label for="message" class="block text-lg font-medium mb-1 text-slate-300 pt-4">
            {settings.data.message_title}
          </label>
          <textarea
            bind:this={messageInput}
            id="message"
            name="message"
            placeholder="your message ..."
            class="w-full p-2 border border-gray-300 text-slate-900 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 flex-grow"
            style="resize: none;"
            maxlength="1000"
            on:input={updateRemainingChars}
            required
          ></textarea>
          <p class="text-right text-sm text-slate-400 mt-1">{remainingChars}/1000</p>
        </div>
        <div class="flex justify-center sm:justify-end pt-4">
          <button
            type="submit"
            class="group relative flex w-fit items-center justify-center overflow-hidden rounded-full border-2 border-cyan-500 bg-transparent px-10 py-2 font-bold text-slate-200 transition-transform ease-out hover:scale-105"
          >
            <span
              class="absolute inset-0 z-0 h-full rounded bg-cyan-500 transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-12"
            ></span>
            <span class="relative flex items-center justify-center gap-2">
              {settings.data.contact_form_button}
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}
