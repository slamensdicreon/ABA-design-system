/**
 * @workspace/aba-design-system
 *
 * - `import '@workspace/aba-design-system/css'` — fonts + tokens + base + `.aba-*` components
 * - `import { tokens } from '@workspace/aba-design-system/tokens'` — typed token catalogue
 * - React atoms / molecules / organisms are re-exported here.
 */
export * from './react';
export { tokens, tokenByVar, type TokenEntry, type TokenTier } from './generated/tokens';
