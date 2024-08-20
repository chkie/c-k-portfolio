import { createClient } from '$lib/prismicio';

interface LoadContext {
  params: {
    uid: string;
  };
  fetch: typeof fetch;
  cookies: undefined; // You can replace `any` with a more specific type if you know it
}

export async function load({ params, fetch, cookies }: LoadContext) {
  const client = createClient({ fetch, cookies });

  const page = await client.getByUID('blogpost', params.uid);

  return {
    page,
    title: page.data.title,
    meta_description: page.data.meta_description,
    meta_title: page.data.meta_title || page.data.title,
    meta_image: page.data.meta_image.url
  };
}

export async function entries() {
  const client = createClient();

  const pages = await client.getAllByType('blogpost');

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
