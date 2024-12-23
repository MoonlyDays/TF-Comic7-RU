import type {ImageMetadata} from "astro";

export async function getImages() {
    let images = import.meta.glob<{ default: ImageMetadata }>('/src/comic/*.png');

    return await Promise.all(
        Object.values(images).map(image => image().then(mod => mod.default))
    );
}