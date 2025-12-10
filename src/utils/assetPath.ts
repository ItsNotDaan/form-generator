/**
 * Get the full path for a public asset, including the basePath if configured
 * @param path - Path relative to the public folder (e.g., '/images/photo.png')
 * @returns Full path with basePath included
 */
export function getAssetPath(path: string): string {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

    // Remove leading slash from path if present
    const cleanPath = path.startsWith('/') ? path : `/${path}`;

    // Combine basePath with the asset path
    return `${basePath}${cleanPath}`;
}
