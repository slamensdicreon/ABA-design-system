// GENERATED FILE — do not edit. Source: tokens/tokens.json (run build:tokens)
export type TokenTier = 'primitive' | 'semantic' | 'component';
export interface TokenEntry {
  path: string;
  cssVar: string;
  type: string;
  /** Raw DTCG value (typed values JSON-encoded), may contain {references}. */
  value: string;
  /** CSS value as emitted in tokens.css (references become var()). */
  css: string;
  /** Fully resolved literal. */
  resolved: string;
  tier: TokenTier;
  description: string | null;
}
export const tokens: TokenEntry[] = [
  {
    "path": "color.blue.50",
    "cssVar": "--color-blue-50",
    "type": "color",
    "value": "#EFF4FA",
    "css": "#EFF4FA",
    "resolved": "#EFF4FA",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "color.blue.100",
    "cssVar": "--color-blue-100",
    "type": "color",
    "value": "#DEEAF5",
    "css": "#DEEAF5",
    "resolved": "#DEEAF5",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "color.blue.200",
    "cssVar": "--color-blue-200",
    "type": "color",
    "value": "#B9D0E8",
    "css": "#B9D0E8",
    "resolved": "#B9D0E8",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "color.blue.300",
    "cssVar": "--color-blue-300",
    "type": "color",
    "value": "#7FA9D4",
    "css": "#7FA9D4",
    "resolved": "#7FA9D4",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "color.blue.400",
    "cssVar": "--color-blue-400",
    "type": "color",
    "value": "#4A83BE",
    "css": "#4A83BE",
    "resolved": "#4A83BE",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "color.blue.500",
    "cssVar": "--color-blue-500",
    "type": "color",
    "value": "#2868A8",
    "css": "#2868A8",
    "resolved": "#2868A8",
    "tier": "primitive",
    "description": "ABA brand blue — sampled from logo"
  },
  {
    "path": "color.blue.600",
    "cssVar": "--color-blue-600",
    "type": "color",
    "value": "#1E5794",
    "css": "#1E5794",
    "resolved": "#1E5794",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "color.blue.700",
    "cssVar": "--color-blue-700",
    "type": "color",
    "value": "#16487A",
    "css": "#16487A",
    "resolved": "#16487A",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "color.blue.800",
    "cssVar": "--color-blue-800",
    "type": "color",
    "value": "#10375C",
    "css": "#10375C",
    "resolved": "#10375C",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "color.blue.900",
    "cssVar": "--color-blue-900",
    "type": "color",
    "value": "#0B2440",
    "css": "#0B2440",
    "resolved": "#0B2440",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "color.gold.100",
    "cssVar": "--color-gold-100",
    "type": "color",
    "value": "#F7EED6",
    "css": "#F7EED6",
    "resolved": "#F7EED6",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "color.gold.200",
    "cssVar": "--color-gold-200",
    "type": "color",
    "value": "#ECD9A8",
    "css": "#ECD9A8",
    "resolved": "#ECD9A8",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "color.gold.400",
    "cssVar": "--color-gold-400",
    "type": "color",
    "value": "#D6B268",
    "css": "#D6B268",
    "resolved": "#D6B268",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "color.gold.500",
    "cssVar": "--color-gold-500",
    "type": "color",
    "value": "#C79A3A",
    "css": "#C79A3A",
    "resolved": "#C79A3A",
    "tier": "primitive",
    "description": "primary accent"
  },
  {
    "path": "color.gold.600",
    "cssVar": "--color-gold-600",
    "type": "color",
    "value": "#A87E1C",
    "css": "#A87E1C",
    "resolved": "#A87E1C",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "color.gold.700",
    "cssVar": "--color-gold-700",
    "type": "color",
    "value": "#8A6714",
    "css": "#8A6714",
    "resolved": "#8A6714",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "color.ink.200",
    "cssVar": "--color-ink-200",
    "type": "color",
    "value": "#D6DADF",
    "css": "#D6DADF",
    "resolved": "#D6DADF",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "color.ink.300",
    "cssVar": "--color-ink-300",
    "type": "color",
    "value": "#B4BAC2",
    "css": "#B4BAC2",
    "resolved": "#B4BAC2",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "color.ink.400",
    "cssVar": "--color-ink-400",
    "type": "color",
    "value": "#8A929E",
    "css": "#8A929E",
    "resolved": "#8A929E",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "color.ink.500",
    "cssVar": "--color-ink-500",
    "type": "color",
    "value": "#687078",
    "css": "#687078",
    "resolved": "#687078",
    "tier": "primitive",
    "description": "logo wordmark gray"
  },
  {
    "path": "color.ink.600",
    "cssVar": "--color-ink-600",
    "type": "color",
    "value": "#545C68",
    "css": "#545C68",
    "resolved": "#545C68",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "color.ink.700",
    "cssVar": "--color-ink-700",
    "type": "color",
    "value": "#3A424E",
    "css": "#3A424E",
    "resolved": "#3A424E",
    "tier": "primitive",
    "description": "body strong"
  },
  {
    "path": "color.ink.800",
    "cssVar": "--color-ink-800",
    "type": "color",
    "value": "#232B36",
    "css": "#232B36",
    "resolved": "#232B36",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "color.ink.900",
    "cssVar": "--color-ink-900",
    "type": "color",
    "value": "#14181F",
    "css": "#14181F",
    "resolved": "#14181F",
    "tier": "primitive",
    "description": "near-black headline ink"
  },
  {
    "path": "color.line.100",
    "cssVar": "--color-line-100",
    "type": "color",
    "value": "#EDEFF2",
    "css": "#EDEFF2",
    "resolved": "#EDEFF2",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "color.line.200",
    "cssVar": "--color-line-200",
    "type": "color",
    "value": "#E3E6EA",
    "css": "#E3E6EA",
    "resolved": "#E3E6EA",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "color.paper",
    "cssVar": "--color-paper",
    "type": "color",
    "value": "#F6F7F9",
    "css": "#F6F7F9",
    "resolved": "#F6F7F9",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "color.white",
    "cssVar": "--color-white",
    "type": "color",
    "value": "#FFFFFF",
    "css": "#FFFFFF",
    "resolved": "#FFFFFF",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "color.red.100",
    "cssVar": "--color-red-100",
    "type": "color",
    "value": "#F7E1E3",
    "css": "#F7E1E3",
    "resolved": "#F7E1E3",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "color.red.600",
    "cssVar": "--color-red-600",
    "type": "color",
    "value": "#B22234",
    "css": "#B22234",
    "resolved": "#B22234",
    "tier": "primitive",
    "description": "breaking / alert / markets-down"
  },
  {
    "path": "color.red.700",
    "cssVar": "--color-red-700",
    "type": "color",
    "value": "#8E1B29",
    "css": "#8E1B29",
    "resolved": "#8E1B29",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "color.green.100",
    "cssVar": "--color-green-100",
    "type": "color",
    "value": "#DDF0E6",
    "css": "#DDF0E6",
    "resolved": "#DDF0E6",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "color.green.600",
    "cssVar": "--color-green-600",
    "type": "color",
    "value": "#1E7A4D",
    "css": "#1E7A4D",
    "resolved": "#1E7A4D",
    "tier": "primitive",
    "description": "positive / markets-up"
  },
  {
    "path": "color.green.700",
    "cssVar": "--color-green-700",
    "type": "color",
    "value": "#14603C",
    "css": "#14603C",
    "resolved": "#14603C",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "color.amber.100",
    "cssVar": "--color-amber-100",
    "type": "color",
    "value": "#FBEED4",
    "css": "#FBEED4",
    "resolved": "#FBEED4",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "color.amber.600",
    "cssVar": "--color-amber-600",
    "type": "color",
    "value": "#B8791C",
    "css": "#B8791C",
    "resolved": "#B8791C",
    "tier": "primitive",
    "description": "caution"
  },
  {
    "path": "text.primary",
    "cssVar": "--text-primary",
    "type": "color",
    "value": "{color.ink.900}",
    "css": "var(--color-ink-900)",
    "resolved": "#14181F",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "text.secondary",
    "cssVar": "--text-secondary",
    "type": "color",
    "value": "{color.ink.700}",
    "css": "var(--color-ink-700)",
    "resolved": "#3A424E",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "text.muted",
    "cssVar": "--text-muted",
    "type": "color",
    "value": "{color.ink.500}",
    "css": "var(--color-ink-500)",
    "resolved": "#687078",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "text.faint",
    "cssVar": "--text-faint",
    "type": "color",
    "value": "{color.ink.400}",
    "css": "var(--color-ink-400)",
    "resolved": "#8A929E",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "text.inverse",
    "cssVar": "--text-inverse",
    "type": "color",
    "value": "{color.white}",
    "css": "var(--color-white)",
    "resolved": "#FFFFFF",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "text.link",
    "cssVar": "--text-link",
    "type": "color",
    "value": "{color.blue.600}",
    "css": "var(--color-blue-600)",
    "resolved": "#1E5794",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "text.link-hover",
    "cssVar": "--text-link-hover",
    "type": "color",
    "value": "{color.blue.800}",
    "css": "var(--color-blue-800)",
    "resolved": "#10375C",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "text.on-brand",
    "cssVar": "--text-on-brand",
    "type": "color",
    "value": "{color.white}",
    "css": "var(--color-white)",
    "resolved": "#FFFFFF",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "surface.page",
    "cssVar": "--surface-page",
    "type": "color",
    "value": "{color.white}",
    "css": "var(--color-white)",
    "resolved": "#FFFFFF",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "surface.sunken",
    "cssVar": "--surface-sunken",
    "type": "color",
    "value": "{color.paper}",
    "css": "var(--color-paper)",
    "resolved": "#F6F7F9",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "surface.card",
    "cssVar": "--surface-card",
    "type": "color",
    "value": "{color.white}",
    "css": "var(--color-white)",
    "resolved": "#FFFFFF",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "surface.brand",
    "cssVar": "--surface-brand",
    "type": "color",
    "value": "{color.blue.500}",
    "css": "var(--color-blue-500)",
    "resolved": "#2868A8",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "surface.brand-deep",
    "cssVar": "--surface-brand-deep",
    "type": "color",
    "value": "{color.blue.800}",
    "css": "var(--color-blue-800)",
    "resolved": "#10375C",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "surface.navy",
    "cssVar": "--surface-navy",
    "type": "color",
    "value": "{color.blue.900}",
    "css": "var(--color-blue-900)",
    "resolved": "#0B2440",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "surface.inverse",
    "cssVar": "--surface-inverse",
    "type": "color",
    "value": "{color.blue.900}",
    "css": "var(--color-blue-900)",
    "resolved": "#0B2440",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "surface.tint",
    "cssVar": "--surface-tint",
    "type": "color",
    "value": "{color.blue.50}",
    "css": "var(--color-blue-50)",
    "resolved": "#EFF4FA",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "surface.gold-tint",
    "cssVar": "--surface-gold-tint",
    "type": "color",
    "value": "{color.gold.100}",
    "css": "var(--color-gold-100)",
    "resolved": "#F7EED6",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "border.subtle",
    "cssVar": "--border-subtle",
    "type": "color",
    "value": "{color.line.100}",
    "css": "var(--color-line-100)",
    "resolved": "#EDEFF2",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "border.default",
    "cssVar": "--border-default",
    "type": "color",
    "value": "{color.line.200}",
    "css": "var(--color-line-200)",
    "resolved": "#E3E6EA",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "border.strong",
    "cssVar": "--border-strong",
    "type": "color",
    "value": "{color.ink.300}",
    "css": "var(--color-ink-300)",
    "resolved": "#B4BAC2",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "border.brand",
    "cssVar": "--border-brand",
    "type": "color",
    "value": "{color.blue.500}",
    "css": "var(--color-blue-500)",
    "resolved": "#2868A8",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "border.focus",
    "cssVar": "--border-focus",
    "type": "color",
    "value": "{color.blue.500}",
    "css": "var(--color-blue-500)",
    "resolved": "#2868A8",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "interactive.primary",
    "cssVar": "--interactive-primary",
    "type": "color",
    "value": "{color.blue.500}",
    "css": "var(--color-blue-500)",
    "resolved": "#2868A8",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "interactive.primary-hover",
    "cssVar": "--interactive-primary-hover",
    "type": "color",
    "value": "{color.blue.700}",
    "css": "var(--color-blue-700)",
    "resolved": "#16487A",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "interactive.primary-active",
    "cssVar": "--interactive-primary-active",
    "type": "color",
    "value": "{color.blue.800}",
    "css": "var(--color-blue-800)",
    "resolved": "#10375C",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "interactive.accent",
    "cssVar": "--interactive-accent",
    "type": "color",
    "value": "{color.gold.500}",
    "css": "var(--color-gold-500)",
    "resolved": "#C79A3A",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "interactive.accent-hover",
    "cssVar": "--interactive-accent-hover",
    "type": "color",
    "value": "{color.gold.600}",
    "css": "var(--color-gold-600)",
    "resolved": "#A87E1C",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "accent.gold",
    "cssVar": "--accent-gold",
    "type": "color",
    "value": "{color.gold.500}",
    "css": "var(--color-gold-500)",
    "resolved": "#C79A3A",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "status.positive",
    "cssVar": "--status-positive",
    "type": "color",
    "value": "{color.green.600}",
    "css": "var(--color-green-600)",
    "resolved": "#1E7A4D",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "status.negative",
    "cssVar": "--status-negative",
    "type": "color",
    "value": "{color.red.600}",
    "css": "var(--color-red-600)",
    "resolved": "#B22234",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "status.caution",
    "cssVar": "--status-caution",
    "type": "color",
    "value": "{color.amber.600}",
    "css": "var(--color-amber-600)",
    "resolved": "#B8791C",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "status.breaking",
    "cssVar": "--status-breaking",
    "type": "color",
    "value": "{color.red.600}",
    "css": "var(--color-red-600)",
    "resolved": "#B22234",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "focus.ring",
    "cssVar": "--focus-ring",
    "type": "shadow",
    "value": "{\"color\":\"{color.blue.200}\",\"offsetX\":{\"value\":0,\"unit\":\"px\"},\"offsetY\":{\"value\":0,\"unit\":\"px\"},\"blur\":{\"value\":0,\"unit\":\"px\"},\"spread\":{\"value\":3,\"unit\":\"px\"}}",
    "css": "0 0 0 3px var(--color-blue-200)",
    "resolved": "0 0 0 3px #B9D0E8",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "fontFamily.serif",
    "cssVar": "--font-serif",
    "type": "fontFamily",
    "value": "[\"Gloock\",\"serif\"]",
    "css": "\"Gloock\", serif",
    "resolved": "\"Gloock\", serif",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "fontFamily.sans",
    "cssVar": "--font-sans",
    "type": "fontFamily",
    "value": "[\"Google Sans\",\"sans-serif\"]",
    "css": "\"Google Sans\", sans-serif",
    "resolved": "\"Google Sans\", sans-serif",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "fontFamily.mono",
    "cssVar": "--font-mono",
    "type": "fontFamily",
    "value": "[\"IBM Plex Mono\",\"monospace\"]",
    "css": "\"IBM Plex Mono\", monospace",
    "resolved": "\"IBM Plex Mono\", monospace",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "fontRole.display",
    "cssVar": "--font-display",
    "type": "fontFamily",
    "value": "{fontFamily.serif}",
    "css": "var(--font-serif)",
    "resolved": "\"Gloock\", serif",
    "tier": "semantic",
    "description": "Gloock — big display headlines only"
  },
  {
    "path": "fontRole.headline",
    "cssVar": "--font-headline",
    "type": "fontFamily",
    "value": "{fontFamily.serif}",
    "css": "var(--font-serif)",
    "resolved": "\"Gloock\", serif",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "fontRole.body",
    "cssVar": "--font-body",
    "type": "fontFamily",
    "value": "{fontFamily.sans}",
    "css": "var(--font-sans)",
    "resolved": "\"Google Sans\", sans-serif",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "fontRole.ui",
    "cssVar": "--font-ui",
    "type": "fontFamily",
    "value": "{fontFamily.sans}",
    "css": "var(--font-sans)",
    "resolved": "\"Google Sans\", sans-serif",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "fontRole.data",
    "cssVar": "--font-data",
    "type": "fontFamily",
    "value": "{fontFamily.mono}",
    "css": "var(--font-mono)",
    "resolved": "\"IBM Plex Mono\", monospace",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "fontRole.kicker",
    "cssVar": "--font-kicker",
    "type": "fontFamily",
    "value": "{fontFamily.sans}",
    "css": "var(--font-sans)",
    "resolved": "\"Google Sans\", sans-serif",
    "tier": "semantic",
    "description": "uppercase eyebrows/labels"
  },
  {
    "path": "fontWeight.regular",
    "cssVar": "--weight-regular",
    "type": "fontWeight",
    "value": "400",
    "css": "400",
    "resolved": "400",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "fontWeight.medium",
    "cssVar": "--weight-medium",
    "type": "fontWeight",
    "value": "500",
    "css": "500",
    "resolved": "500",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "fontWeight.semibold",
    "cssVar": "--weight-semibold",
    "type": "fontWeight",
    "value": "600",
    "css": "600",
    "resolved": "600",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "fontWeight.bold",
    "cssVar": "--weight-bold",
    "type": "fontWeight",
    "value": "700",
    "css": "700",
    "resolved": "700",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "fontWeight.black",
    "cssVar": "--weight-black",
    "type": "fontWeight",
    "value": "900",
    "css": "900",
    "resolved": "900",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "fontSize.2xs",
    "cssVar": "--text-2xs",
    "type": "dimension",
    "value": "{\"value\":11,\"unit\":\"px\"}",
    "css": "11px",
    "resolved": "11px",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "fontSize.xs",
    "cssVar": "--text-xs",
    "type": "dimension",
    "value": "{\"value\":12,\"unit\":\"px\"}",
    "css": "12px",
    "resolved": "12px",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "fontSize.sm",
    "cssVar": "--text-sm",
    "type": "dimension",
    "value": "{\"value\":13,\"unit\":\"px\"}",
    "css": "13px",
    "resolved": "13px",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "fontSize.base",
    "cssVar": "--text-base",
    "type": "dimension",
    "value": "{\"value\":15,\"unit\":\"px\"}",
    "css": "15px",
    "resolved": "15px",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "fontSize.md",
    "cssVar": "--text-md",
    "type": "dimension",
    "value": "{\"value\":17,\"unit\":\"px\"}",
    "css": "17px",
    "resolved": "17px",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "fontSize.lg",
    "cssVar": "--text-lg",
    "type": "dimension",
    "value": "{\"value\":20,\"unit\":\"px\"}",
    "css": "20px",
    "resolved": "20px",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "fontSize.xl",
    "cssVar": "--text-xl",
    "type": "dimension",
    "value": "{\"value\":24,\"unit\":\"px\"}",
    "css": "24px",
    "resolved": "24px",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "fontSize.2xl",
    "cssVar": "--text-2xl",
    "type": "dimension",
    "value": "{\"value\":30,\"unit\":\"px\"}",
    "css": "30px",
    "resolved": "30px",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "fontSize.3xl",
    "cssVar": "--text-3xl",
    "type": "dimension",
    "value": "{\"value\":38,\"unit\":\"px\"}",
    "css": "38px",
    "resolved": "38px",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "fontSize.4xl",
    "cssVar": "--text-4xl",
    "type": "dimension",
    "value": "{\"value\":48,\"unit\":\"px\"}",
    "css": "48px",
    "resolved": "48px",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "fontSize.5xl",
    "cssVar": "--text-5xl",
    "type": "dimension",
    "value": "{\"value\":60,\"unit\":\"px\"}",
    "css": "60px",
    "resolved": "60px",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "fontSize.6xl",
    "cssVar": "--text-6xl",
    "type": "dimension",
    "value": "{\"value\":76,\"unit\":\"px\"}",
    "css": "76px",
    "resolved": "76px",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "lineHeight.tight",
    "cssVar": "--leading-tight",
    "type": "number",
    "value": "1.08",
    "css": "1.08",
    "resolved": "1.08",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "lineHeight.snug",
    "cssVar": "--leading-snug",
    "type": "number",
    "value": "1.2",
    "css": "1.2",
    "resolved": "1.2",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "lineHeight.heading",
    "cssVar": "--leading-heading",
    "type": "number",
    "value": "1.15",
    "css": "1.15",
    "resolved": "1.15",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "lineHeight.normal",
    "cssVar": "--leading-normal",
    "type": "number",
    "value": "1.5",
    "css": "1.5",
    "resolved": "1.5",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "lineHeight.relaxed",
    "cssVar": "--leading-relaxed",
    "type": "number",
    "value": "1.65",
    "css": "1.65",
    "resolved": "1.65",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "letterSpacing.tight",
    "cssVar": "--tracking-tight",
    "type": "dimension",
    "value": "{\"value\":-0.02,\"unit\":\"em\"}",
    "css": "-0.02em",
    "resolved": "-0.02em",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "letterSpacing.snug",
    "cssVar": "--tracking-snug",
    "type": "dimension",
    "value": "{\"value\":-0.01,\"unit\":\"em\"}",
    "css": "-0.01em",
    "resolved": "-0.01em",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "letterSpacing.normal",
    "cssVar": "--tracking-normal",
    "type": "dimension",
    "value": "{\"value\":0,\"unit\":\"px\"}",
    "css": "0",
    "resolved": "0",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "letterSpacing.wide",
    "cssVar": "--tracking-wide",
    "type": "dimension",
    "value": "{\"value\":0.04,\"unit\":\"em\"}",
    "css": "0.04em",
    "resolved": "0.04em",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "letterSpacing.kicker",
    "cssVar": "--tracking-kicker",
    "type": "dimension",
    "value": "{\"value\":0.09,\"unit\":\"em\"}",
    "css": "0.09em",
    "resolved": "0.09em",
    "tier": "primitive",
    "description": "uppercase eyebrows"
  },
  {
    "path": "space.0",
    "cssVar": "--space-0",
    "type": "dimension",
    "value": "{\"value\":0,\"unit\":\"px\"}",
    "css": "0",
    "resolved": "0",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "space.1",
    "cssVar": "--space-1",
    "type": "dimension",
    "value": "{\"value\":4,\"unit\":\"px\"}",
    "css": "4px",
    "resolved": "4px",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "space.2",
    "cssVar": "--space-2",
    "type": "dimension",
    "value": "{\"value\":8,\"unit\":\"px\"}",
    "css": "8px",
    "resolved": "8px",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "space.3",
    "cssVar": "--space-3",
    "type": "dimension",
    "value": "{\"value\":12,\"unit\":\"px\"}",
    "css": "12px",
    "resolved": "12px",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "space.4",
    "cssVar": "--space-4",
    "type": "dimension",
    "value": "{\"value\":16,\"unit\":\"px\"}",
    "css": "16px",
    "resolved": "16px",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "space.5",
    "cssVar": "--space-5",
    "type": "dimension",
    "value": "{\"value\":20,\"unit\":\"px\"}",
    "css": "20px",
    "resolved": "20px",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "space.6",
    "cssVar": "--space-6",
    "type": "dimension",
    "value": "{\"value\":24,\"unit\":\"px\"}",
    "css": "24px",
    "resolved": "24px",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "space.8",
    "cssVar": "--space-8",
    "type": "dimension",
    "value": "{\"value\":32,\"unit\":\"px\"}",
    "css": "32px",
    "resolved": "32px",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "space.10",
    "cssVar": "--space-10",
    "type": "dimension",
    "value": "{\"value\":40,\"unit\":\"px\"}",
    "css": "40px",
    "resolved": "40px",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "space.12",
    "cssVar": "--space-12",
    "type": "dimension",
    "value": "{\"value\":48,\"unit\":\"px\"}",
    "css": "48px",
    "resolved": "48px",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "space.16",
    "cssVar": "--space-16",
    "type": "dimension",
    "value": "{\"value\":64,\"unit\":\"px\"}",
    "css": "64px",
    "resolved": "64px",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "space.20",
    "cssVar": "--space-20",
    "type": "dimension",
    "value": "{\"value\":80,\"unit\":\"px\"}",
    "css": "80px",
    "resolved": "80px",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "space.24",
    "cssVar": "--space-24",
    "type": "dimension",
    "value": "{\"value\":96,\"unit\":\"px\"}",
    "css": "96px",
    "resolved": "96px",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "space.32",
    "cssVar": "--space-32",
    "type": "dimension",
    "value": "{\"value\":128,\"unit\":\"px\"}",
    "css": "128px",
    "resolved": "128px",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "space.px",
    "cssVar": "--space-px",
    "type": "dimension",
    "value": "{\"value\":1,\"unit\":\"px\"}",
    "css": "1px",
    "resolved": "1px",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "space.0-5",
    "cssVar": "--space-0-5",
    "type": "dimension",
    "value": "{\"value\":2,\"unit\":\"px\"}",
    "css": "2px",
    "resolved": "2px",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "space.1-5",
    "cssVar": "--space-1-5",
    "type": "dimension",
    "value": "{\"value\":6,\"unit\":\"px\"}",
    "css": "6px",
    "resolved": "6px",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "space.2-5",
    "cssVar": "--space-2-5",
    "type": "dimension",
    "value": "{\"value\":10,\"unit\":\"px\"}",
    "css": "10px",
    "resolved": "10px",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "layoutSpace.gutter",
    "cssVar": "--gutter",
    "type": "dimension",
    "value": "{\"value\":24,\"unit\":\"px\"}",
    "css": "24px",
    "resolved": "24px",
    "tier": "semantic",
    "description": "base grid gutter"
  },
  {
    "path": "layoutSpace.gutter-tight",
    "cssVar": "--gutter-tight",
    "type": "dimension",
    "value": "{\"value\":16,\"unit\":\"px\"}",
    "css": "16px",
    "resolved": "16px",
    "tier": "semantic",
    "description": "dense editorial gutter"
  },
  {
    "path": "layoutSpace.section-y",
    "cssVar": "--section-y",
    "type": "dimension",
    "value": "{\"value\":80,\"unit\":\"px\"}",
    "css": "80px",
    "resolved": "80px",
    "tier": "semantic",
    "description": "vertical rhythm between page sections"
  },
  {
    "path": "layoutSpace.card-pad",
    "cssVar": "--card-pad",
    "type": "dimension",
    "value": "{\"value\":20,\"unit\":\"px\"}",
    "css": "20px",
    "resolved": "20px",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "layoutSpace.card-pad-lg",
    "cssVar": "--card-pad-lg",
    "type": "dimension",
    "value": "{\"value\":28,\"unit\":\"px\"}",
    "css": "28px",
    "resolved": "28px",
    "tier": "semantic",
    "description": null
  },
  {
    "path": "radius.none",
    "cssVar": "--radius-none",
    "type": "dimension",
    "value": "{\"value\":0,\"unit\":\"px\"}",
    "css": "0",
    "resolved": "0",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "radius.xs",
    "cssVar": "--radius-xs",
    "type": "dimension",
    "value": "{\"value\":2,\"unit\":\"px\"}",
    "css": "2px",
    "resolved": "2px",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "radius.sm",
    "cssVar": "--radius-sm",
    "type": "dimension",
    "value": "{\"value\":3,\"unit\":\"px\"}",
    "css": "3px",
    "resolved": "3px",
    "tier": "primitive",
    "description": "default control radius"
  },
  {
    "path": "radius.md",
    "cssVar": "--radius-md",
    "type": "dimension",
    "value": "{\"value\":5,\"unit\":\"px\"}",
    "css": "5px",
    "resolved": "5px",
    "tier": "primitive",
    "description": "cards, inputs"
  },
  {
    "path": "radius.lg",
    "cssVar": "--radius-lg",
    "type": "dimension",
    "value": "{\"value\":8,\"unit\":\"px\"}",
    "css": "8px",
    "resolved": "8px",
    "tier": "primitive",
    "description": "modals, large panels"
  },
  {
    "path": "radius.xl",
    "cssVar": "--radius-xl",
    "type": "dimension",
    "value": "{\"value\":12,\"unit\":\"px\"}",
    "css": "12px",
    "resolved": "12px",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "radius.pill",
    "cssVar": "--radius-pill",
    "type": "dimension",
    "value": "{\"value\":999,\"unit\":\"px\"}",
    "css": "999px",
    "resolved": "999px",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "radius.circle",
    "cssVar": "--radius-circle",
    "type": "dimension",
    "value": "{\"value\":50,\"unit\":\"%\"}",
    "css": "50%",
    "resolved": "50%",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "shadow.none",
    "cssVar": "--shadow-none",
    "type": "shadow",
    "value": "{\"color\":\"#00000000\",\"offsetX\":{\"value\":0,\"unit\":\"px\"},\"offsetY\":{\"value\":0,\"unit\":\"px\"},\"blur\":{\"value\":0,\"unit\":\"px\"},\"spread\":{\"value\":0,\"unit\":\"px\"}}",
    "css": "none",
    "resolved": "none",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "shadow.xs",
    "cssVar": "--shadow-xs",
    "type": "shadow",
    "value": "{\"color\":\"#0B24400F\",\"offsetX\":{\"value\":0,\"unit\":\"px\"},\"offsetY\":{\"value\":1,\"unit\":\"px\"},\"blur\":{\"value\":2,\"unit\":\"px\"},\"spread\":{\"value\":0,\"unit\":\"px\"}}",
    "css": "0 1px 2px rgba(11, 36, 64, 0.06)",
    "resolved": "0 1px 2px rgba(11, 36, 64, 0.06)",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "shadow.sm",
    "cssVar": "--shadow-sm",
    "type": "shadow",
    "value": "[{\"color\":\"#0B244014\",\"offsetX\":{\"value\":0,\"unit\":\"px\"},\"offsetY\":{\"value\":1,\"unit\":\"px\"},\"blur\":{\"value\":3,\"unit\":\"px\"},\"spread\":{\"value\":0,\"unit\":\"px\"}},{\"color\":\"#0B24400D\",\"offsetX\":{\"value\":0,\"unit\":\"px\"},\"offsetY\":{\"value\":1,\"unit\":\"px\"},\"blur\":{\"value\":2,\"unit\":\"px\"},\"spread\":{\"value\":0,\"unit\":\"px\"}}]",
    "css": "0 1px 3px rgba(11, 36, 64, 0.08), 0 1px 2px rgba(11, 36, 64, 0.05)",
    "resolved": "0 1px 3px rgba(11, 36, 64, 0.08), 0 1px 2px rgba(11, 36, 64, 0.05)",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "shadow.md",
    "cssVar": "--shadow-md",
    "type": "shadow",
    "value": "[{\"color\":\"#0B244014\",\"offsetX\":{\"value\":0,\"unit\":\"px\"},\"offsetY\":{\"value\":4,\"unit\":\"px\"},\"blur\":{\"value\":10,\"unit\":\"px\"},\"spread\":{\"value\":0,\"unit\":\"px\"}},{\"color\":\"#0B24400F\",\"offsetX\":{\"value\":0,\"unit\":\"px\"},\"offsetY\":{\"value\":1,\"unit\":\"px\"},\"blur\":{\"value\":3,\"unit\":\"px\"},\"spread\":{\"value\":0,\"unit\":\"px\"}}]",
    "css": "0 4px 10px rgba(11, 36, 64, 0.08), 0 1px 3px rgba(11, 36, 64, 0.06)",
    "resolved": "0 4px 10px rgba(11, 36, 64, 0.08), 0 1px 3px rgba(11, 36, 64, 0.06)",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "shadow.lg",
    "cssVar": "--shadow-lg",
    "type": "shadow",
    "value": "[{\"color\":\"#0B24401F\",\"offsetX\":{\"value\":0,\"unit\":\"px\"},\"offsetY\":{\"value\":12,\"unit\":\"px\"},\"blur\":{\"value\":28,\"unit\":\"px\"},\"spread\":{\"value\":0,\"unit\":\"px\"}},{\"color\":\"#0B24400F\",\"offsetX\":{\"value\":0,\"unit\":\"px\"},\"offsetY\":{\"value\":4,\"unit\":\"px\"},\"blur\":{\"value\":8,\"unit\":\"px\"},\"spread\":{\"value\":0,\"unit\":\"px\"}}]",
    "css": "0 12px 28px rgba(11, 36, 64, 0.12), 0 4px 8px rgba(11, 36, 64, 0.06)",
    "resolved": "0 12px 28px rgba(11, 36, 64, 0.12), 0 4px 8px rgba(11, 36, 64, 0.06)",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "shadow.xl",
    "cssVar": "--shadow-xl",
    "type": "shadow",
    "value": "{\"color\":\"#0B24402E\",\"offsetX\":{\"value\":0,\"unit\":\"px\"},\"offsetY\":{\"value\":24,\"unit\":\"px\"},\"blur\":{\"value\":56,\"unit\":\"px\"},\"spread\":{\"value\":0,\"unit\":\"px\"}}",
    "css": "0 24px 56px rgba(11, 36, 64, 0.18)",
    "resolved": "0 24px 56px rgba(11, 36, 64, 0.18)",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "shadow.focus",
    "cssVar": "--shadow-focus",
    "type": "shadow",
    "value": "{focus.ring}",
    "css": "var(--focus-ring)",
    "resolved": "0 0 0 3px #B9D0E8",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "ring.hairline",
    "cssVar": "--ring-hairline",
    "type": "shadow",
    "value": "{\"color\":\"{color.line.200}\",\"offsetX\":{\"value\":0,\"unit\":\"px\"},\"offsetY\":{\"value\":0,\"unit\":\"px\"},\"blur\":{\"value\":0,\"unit\":\"px\"},\"spread\":{\"value\":1,\"unit\":\"px\"},\"inset\":true}",
    "css": "inset 0 0 0 1px var(--color-line-200)",
    "resolved": "inset 0 0 0 1px #E3E6EA",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "grid.columns",
    "cssVar": "--grid-columns",
    "type": "number",
    "value": "12",
    "css": "12",
    "resolved": "12",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "container.max",
    "cssVar": "--container-max",
    "type": "dimension",
    "value": "{\"value\":1280,\"unit\":\"px\"}",
    "css": "1280px",
    "resolved": "1280px",
    "tier": "primitive",
    "description": "standard content shell"
  },
  {
    "path": "container.wide",
    "cssVar": "--container-wide",
    "type": "dimension",
    "value": "{\"value\":1440,\"unit\":\"px\"}",
    "css": "1440px",
    "resolved": "1440px",
    "tier": "primitive",
    "description": "full editorial spread"
  },
  {
    "path": "container.narrow",
    "cssVar": "--container-narrow",
    "type": "dimension",
    "value": "{\"value\":720,\"unit\":\"px\"}",
    "css": "720px",
    "resolved": "720px",
    "tier": "primitive",
    "description": "long-form article measure"
  },
  {
    "path": "container.text",
    "cssVar": "--container-text",
    "type": "dimension",
    "value": "{\"value\":66,\"unit\":\"ch\"}",
    "css": "66ch",
    "resolved": "66ch",
    "tier": "primitive",
    "description": "optimal reading measure"
  },
  {
    "path": "chrome.header-height",
    "cssVar": "--header-height",
    "type": "dimension",
    "value": "{\"value\":64,\"unit\":\"px\"}",
    "css": "64px",
    "resolved": "64px",
    "tier": "component",
    "description": null
  },
  {
    "path": "chrome.subnav-height",
    "cssVar": "--subnav-height",
    "type": "dimension",
    "value": "{\"value\":44,\"unit\":\"px\"}",
    "css": "44px",
    "resolved": "44px",
    "tier": "component",
    "description": null
  },
  {
    "path": "zIndex.base",
    "cssVar": "--z-base",
    "type": "number",
    "value": "0",
    "css": "0",
    "resolved": "0",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "zIndex.sticky",
    "cssVar": "--z-sticky",
    "type": "number",
    "value": "100",
    "css": "100",
    "resolved": "100",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "zIndex.header",
    "cssVar": "--z-header",
    "type": "number",
    "value": "200",
    "css": "200",
    "resolved": "200",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "zIndex.dropdown",
    "cssVar": "--z-dropdown",
    "type": "number",
    "value": "300",
    "css": "300",
    "resolved": "300",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "zIndex.overlay",
    "cssVar": "--z-overlay",
    "type": "number",
    "value": "400",
    "css": "400",
    "resolved": "400",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "zIndex.modal",
    "cssVar": "--z-modal",
    "type": "number",
    "value": "500",
    "css": "500",
    "resolved": "500",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "zIndex.toast",
    "cssVar": "--z-toast",
    "type": "number",
    "value": "600",
    "css": "600",
    "resolved": "600",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "duration.fast",
    "cssVar": "--duration-fast",
    "type": "duration",
    "value": "{\"value\":120,\"unit\":\"ms\"}",
    "css": "120ms",
    "resolved": "120ms",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "duration.base",
    "cssVar": "--duration-base",
    "type": "duration",
    "value": "{\"value\":200,\"unit\":\"ms\"}",
    "css": "200ms",
    "resolved": "200ms",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "duration.slow",
    "cssVar": "--duration-slow",
    "type": "duration",
    "value": "{\"value\":320,\"unit\":\"ms\"}",
    "css": "320ms",
    "resolved": "320ms",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "easing.standard",
    "cssVar": "--ease-standard",
    "type": "cubicBezier",
    "value": "[0.2,0,0,1]",
    "css": "cubic-bezier(0.2, 0, 0, 1)",
    "resolved": "cubic-bezier(0.2, 0, 0, 1)",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "easing.emphasized",
    "cssVar": "--ease-emphasized",
    "type": "cubicBezier",
    "value": "[0.2,0,0,1.15]",
    "css": "cubic-bezier(0.2, 0, 0, 1.15)",
    "resolved": "cubic-bezier(0.2, 0, 0, 1.15)",
    "tier": "primitive",
    "description": null
  },
  {
    "path": "onDark.text",
    "cssVar": "--on-dark-text",
    "type": "color",
    "value": "{color.blue.200}",
    "css": "var(--color-blue-200)",
    "resolved": "#B9D0E8",
    "tier": "component",
    "description": "Body copy on navy"
  },
  {
    "path": "onDark.muted",
    "cssVar": "--on-dark-muted",
    "type": "color",
    "value": "#9DB0C6",
    "css": "#9DB0C6",
    "resolved": "#9DB0C6",
    "tier": "component",
    "description": "Meta / muted copy on navy"
  },
  {
    "path": "onDark.gold",
    "cssVar": "--on-dark-gold",
    "type": "color",
    "value": "{color.gold.400}",
    "css": "var(--color-gold-400)",
    "resolved": "#D6B268",
    "tier": "component",
    "description": "Kickers and accents on navy"
  },
  {
    "path": "onDark.goldSoft",
    "cssVar": "--on-dark-gold-soft",
    "type": "color",
    "value": "{color.gold.200}",
    "css": "var(--color-gold-200)",
    "resolved": "#ECD9A8",
    "tier": "component",
    "description": "Gold link hover on navy"
  },
  {
    "path": "onDark.hairline",
    "cssVar": "--on-dark-hairline",
    "type": "color",
    "value": "#FFFFFF29",
    "css": "rgba(255, 255, 255, 0.16)",
    "resolved": "rgba(255, 255, 255, 0.16)",
    "tier": "component",
    "description": "Hairline rules on navy"
  },
  {
    "path": "onDark.hairlineStrong",
    "cssVar": "--on-dark-hairline-strong",
    "type": "color",
    "value": "#FFFFFF24",
    "css": "rgba(255, 255, 255, 0.14)",
    "resolved": "rgba(255, 255, 255, 0.14)",
    "tier": "component",
    "description": "Dock borders on navy"
  },
  {
    "path": "editorial.kickerSize",
    "cssVar": "--kicker-size",
    "type": "dimension",
    "value": "{\"value\":11,\"unit\":\"px\"}",
    "css": "11px",
    "resolved": "11px",
    "tier": "component",
    "description": "Section kicker font size"
  },
  {
    "path": "editorial.kickerTracking",
    "cssVar": "--kicker-tracking",
    "type": "dimension",
    "value": "{\"value\":0.16,\"unit\":\"em\"}",
    "css": "0.16em",
    "resolved": "0.16em",
    "tier": "component",
    "description": "Section kicker letter-spacing"
  },
  {
    "path": "editorial.metaSize",
    "cssVar": "--meta-size",
    "type": "dimension",
    "value": "{\"value\":10.5,\"unit\":\"px\"}",
    "css": "10.5px",
    "resolved": "10.5px",
    "tier": "component",
    "description": "Mono meta label font size"
  },
  {
    "path": "editorial.metaTracking",
    "cssVar": "--meta-tracking",
    "type": "dimension",
    "value": "{\"value\":0.08,\"unit\":\"em\"}",
    "css": "0.08em",
    "resolved": "0.08em",
    "tier": "component",
    "description": "Mono meta label letter-spacing"
  },
  {
    "path": "editorial.containerMax",
    "cssVar": "--container-editorial",
    "type": "dimension",
    "value": "{\"value\":1360,\"unit\":\"px\"}",
    "css": "1360px",
    "resolved": "1360px",
    "tier": "component",
    "description": "Homepage section container max-width"
  },
  {
    "path": "editorial.containerPad",
    "cssVar": "--gutter-editorial",
    "type": "dimension",
    "value": "{\"value\":48,\"unit\":\"px\"}",
    "css": "48px",
    "resolved": "48px",
    "tier": "component",
    "description": "Homepage section horizontal padding at desktop"
  },
  {
    "path": "editorial.fadeDuration",
    "cssVar": "--duration-fade",
    "type": "duration",
    "value": "{\"value\":200,\"unit\":\"ms\"}",
    "css": "200ms",
    "resolved": "200ms",
    "tier": "component",
    "description": "Section fade-in (advFade) duration"
  },
  {
    "path": "editorial.scrim",
    "cssVar": "--scrim",
    "type": "color",
    "value": "#07182BBF",
    "css": "rgba(7, 24, 43, 0.75)",
    "resolved": "rgba(7, 24, 43, 0.75)",
    "tier": "component",
    "description": "Hero image scrim / overlay base"
  }
];
export const tokenByVar: Record<string, TokenEntry> = Object.fromEntries(tokens.map((t) => [t.cssVar, t]));
