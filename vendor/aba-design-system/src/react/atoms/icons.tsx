import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 16, ...rest }: IconProps) {
  return { width: size, height: size, viewBox: '0 0 16 16', fill: 'none', 'aria-hidden': true as const, ...rest };
}

/** Right arrow — the link glyph used across the homepage ("All →"). */
export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M2 8h11M8.5 3.5L13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
/** Diagonal arrow used by the hero link and mega-menu featured CTA. */
export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 12L12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
export function CloseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
export function CheckIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
export function SearchIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
export function InfoIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 7v4M8 5v.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
export function MenuIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
