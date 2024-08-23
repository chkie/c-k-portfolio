<script lang="ts" context="module">
  export let showModal: boolean = false;

  function toggleModal(): void {
    showModal = !showModal;
  }

  async function onFormSubmit(event: Event): Promise<void> {
    event.preventDefault();

    // Das reCAPTCHA v2 Token abrufen
    const recaptchaToken = (document.getElementById('g-recaptcha-response') as HTMLInputElement)
      .value;

    if (!recaptchaToken) {
      alert('Please complete the reCAPTCHA challenge.');
      return;
    }

    const email = (document.getElementById('email') as HTMLInputElement).value;
    const message = (document.getElementById('message') as HTMLTextAreaElement).value;

    // Formulardaten an Formspree senden
    try {
      const response = await fetch('https://formspree.io/f/myzgbeqj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          message: message,
          'g-recaptcha-response': recaptchaToken
        })
      });

      if (response.ok) {
        alert('Your message has been sent successfully!');
        toggleModal();
      } else {
        alert('There was an error sending your message. Please try again.');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      alert('There was an error submitting the form. Please try again.');
    }
  }

  // reCAPTCHA v2-Skript laden
  function loadRecaptchaScript() {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log('reCAPTCHA script loaded successfully');
    };
    script.onerror = () => {
      console.error('Failed to load the reCAPTCHA script');
    };
    document.head.appendChild(script);
  }

  import { onMount } from 'svelte';
  onMount(() => {
    loadRecaptchaScript();
  });
</script>

<!-- Button zum Öffnen des Modals -->
<button on:click={toggleModal} class="px-4 py-2 bg-blue-500 text-slate-300 rounded">
  Kontakt
</button>

<!-- Modal, wird nur angezeigt, wenn showModal true ist -->
{#if showModal}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div
      class="bg-cyan-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 shadow-lg p-6 w-full max-w-md"
    >
      <button
        class="text-slate-300 hover:text-gray-700 float-right text-2xl font-bold"
        on:click={toggleModal}
      >
        &times;
      </button>
      <h2 class="text-3xl font-bold text-center mb-6 text-slate-300">Kontaktformular</h2>
      <form on:submit={onFormSubmit} class="space-y-4">
        <div>
          <label for="email" class="block text-lg font-medium mb-1 text-slate-300"
            >Your email:</label
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
            >Your message:</label
          >
          <textarea
            id="message"
            name="message"
            class="w-full p-2 border border-gray-300 text-slate-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="5"
            required
          ></textarea>
        </div>
        <div class="g-recaptcha" data-sitekey="6LcIkS0qAAAAAIuRy7OZLsm-DVwC-5DaPSssqpx3"></div>
        <button
          type="submit"
          class="w-full py-2 px-4 bg-blue-500 text-white rounded font-bold text-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </form>
    </div>
  </div>
{/if}

<style lang="postcss">
  /* TailwindCSS wird verwendet, daher ist zusätzliches CSS minimal */
</style>
