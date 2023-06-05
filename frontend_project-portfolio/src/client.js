import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: import.meta.env.VITE_REACT_APP__SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2023-05-26",
  useCdn: true,
  token: import.meta.env.VITE_REACT_APP__SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export async function getAbout() {
  try {
    const abouts = await client.fetch('*[_type == "abouts"]');
    return abouts;
  } catch (e) {
    console.log(`Error: ${e}`);
  }
}
