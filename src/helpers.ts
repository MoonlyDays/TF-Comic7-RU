export function comicImageUrl(page: number) {
    const href = new URL(`./assets/pages/${page + 1}.png`, import.meta.url).href;
    return href.endsWith('/undefined') ? undefined : href;
}

export function parseHash(hash: string): number {
    return hash ? Number(hash.slice(1)) : 1;
}