<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
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

  function closeOnOutsideClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target && target.closest('.modal-content') === null) {
      toggleModal();
    }
  }

  function closeOnEscape(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      toggleModal();
    }
  }

  onMount(() => {
    if (showModal && emailInput) {
      emailInput.focus();
    }

    if (showModal) {
      document.body.classList.add('modal-open');
      document.addEventListener('keydown', closeOnEscape);
    }

    return () => {
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', closeOnEscape);
    };
  });

  $: if (!showModal) {
    if (typeof document !== 'undefined') {
      document.body.classList.remove('modal-open');
    }
  }
</script>

{#if showModal}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 overflow-auto my-0 sm:my-4 lg:my-0"
    role="dialog"
    aria-labelledby="modal-title"
    aria-modal="true"
  >
    <button
      class="absolute inset-0 z-0 w-full h-full bg-transparent cursor-default"
      on:click={closeOnOutsideClick}
      tabindex="-1"
      aria-label="Close modal on background click"
    ></button>
    <div
      class="modal-content bg-slate-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 shadow-lg md:h-[70%] md:w-[80%] md:pt-10 p-5 sm:p-10 sm:pt-[15rem] md:landscape-max:pt-[17rem] lg:landscape:pt-8 w-full landscape-max:rounded-lg border-transparent max-w-4xl h-full landscape-max:h-auto landscape-max:max-h-screen flex flex-col justify-center overflow-y-auto"
    >
      <div
        class="flex justify-end relative md:left-8 left-0 bottom-6 landscape-sm:bottom-2 landscape-max:top-0 landscape-sm:left-4 md:bottom-10"
      >
        <button
          class="text-slate-300 hover:text-cyan-500 flex justify-end text-[3em] font-bold p-0 md:p-2 cursor-pointer"
          on:click={toggleModal}
          aria-label="close modal"
        >
          &times;
        </button>
      </div>
      <Heading
        tag="h2"
        size="md"
        id="modal-title"
        class="mb-4 text-center relative bottom-0 md:bottom-10"
      >
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
            style="resize: none; min-height: 150px;"
            maxlength="1000"
            on:input={updateRemainingChars}
            required
          ></textarea>
          <p class="text-right text-sm text-slate-400 mt-1">{remainingChars}/1000</p>
        </div>
        <div class="flex justify-center sm:justify-center pt-4">
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
