import { createContext, useContext, type ReactNode } from 'react';

/** Logical names for the image assets shipped in `assets/images`. */
export type AbaImageKey = 'mastheadLogo' | 'footerLogo' | 'heroCityscape' | 'wealthTrustPhoto';

export const ABA_IMAGE_FILES: Record<AbaImageKey, string> = {
  mastheadLogo: 'e9b8cdba-14b2-47a7-98fc-71398702bfb2.png',
  footerLogo: 'f2056b34-3966-47a1-8a4b-abf1f59c0dc6.png',
  heroCityscape: '986be0ce-7527-485f-93bd-b2c0e610393f.png',
  wealthTrustPhoto: '98ae5cd5-94a4-467c-b834-fed7a3d6f6b9.png',
};

export interface AbaAssets {
  /** Resolve a logical image to a URL. */
  image: (key: AbaImageKey) => string;
}

const defaultAssets: AbaAssets = {
  // The Advisory serves the package images from /images at the site root.
  image: (key) => `/images/${ABA_IMAGE_FILES[key]}`,
};

const AssetsContext = createContext<AbaAssets>(defaultAssets);

/**
 * Lets a host app tell the organisms where the image assets live
 * (e.g. bundler-imported URLs under a base path).
 */
export function AbaAssetsProvider({ images, children }: { images: Partial<Record<AbaImageKey, string>>; children: ReactNode }) {
  const value: AbaAssets = { image: (key) => images[key] ?? defaultAssets.image(key) };
  return <AssetsContext.Provider value={value}>{children}</AssetsContext.Provider>;
}

export function useAbaAssets(): AbaAssets {
  return useContext(AssetsContext);
}
