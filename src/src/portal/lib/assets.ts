import mastheadLogo from '@workspace/aba-design-system/assets/images/e9b8cdba-14b2-47a7-98fc-71398702bfb2.png';
import footerLogo from '@workspace/aba-design-system/assets/images/f2056b34-3966-47a1-8a4b-abf1f59c0dc6.png';
import heroCityscape from '@workspace/aba-design-system/assets/images/986be0ce-7527-485f-93bd-b2c0e610393f.png';
import wealthTrustPhoto from '@workspace/aba-design-system/assets/images/98ae5cd5-94a4-467c-b834-fed7a3d6f6b9.png';
import tokensJson from '@workspace/aba-design-system/dist/tokens/tokens.json?url';
import tokensFlat from '@workspace/aba-design-system/dist/tokens/tokens.flat.json?url';
import tokensCss from '@workspace/aba-design-system/dist/tokens/tokens.css?url';
import figmaVars from '@workspace/aba-design-system/dist/tokens/figma-variables.json?url';
import fontsZip from '@workspace/aba-design-system/dist/packs/aba-fonts.zip?url';
import imagesZip from '@workspace/aba-design-system/dist/packs/aba-brand-images.zip?url';
import tokensZip from '@workspace/aba-design-system/dist/packs/aba-tokens.zip?url';

/** Bundler-resolved URLs for the package images (used by AbaAssetsProvider and the Brand pages). */
export const IMAGES = { mastheadLogo, footerLogo, heroCityscape, wealthTrustPhoto } as const;

export const DOWNLOADS = {
  tokensJson, tokensFlat, tokensCss, figmaVars, fontsZip, imagesZip, tokensZip,
} as const;
