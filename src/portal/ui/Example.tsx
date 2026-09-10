import { useEffect, useRef, useState, type ReactNode } from 'react';
import { SegmentedControl } from '@workspace/aba-design-system';
import { CodeTabs } from './Code';

export type Viewport = 'desktop' | 'tablet' | 'mobile';
export const VIEWPORTS: Record<Viewport, number> = { desktop: 1440, tablet: 768, mobile: 390 };

/** Inline example: renders children directly (no iframe) with optional code tabs. */
export function Example({ title, desc, dark, stack, flush, code, css, html, children }: {
  title?: string;
  desc?: string;
  dark?: boolean;
  stack?: boolean;
  flush?: boolean;
  code?: string;
  css?: string;
  html?: string;
  children: ReactNode;
}) {
  const tabs = [
    { label: 'JSX', code: code ?? '', language: 'tsx' },
    { label: 'CSS', code: css ?? '', language: 'css' },
    { label: 'HTML', code: html ?? '', language: 'html' },
  ];
  return (
    <figure className="ex">
      {(title || desc) && (
        <div className="ex__bar">
          {title && <span className="ex__title">{title}</span>}
          {desc && <span className="ex__desc">{desc}</span>}
        </div>
      )}
      <div className={`ex__stage${dark ? ' ex__stage--dark' : ''}${stack ? ' ex__stage--stack' : ''}${flush ? ' ex__stage--flush' : ''}`}>{children}</div>
      {(code || css || html) && <div className="ex__code"><CodeTabs tabs={tabs} /></div>}
    </figure>
  );
}

/**
 * Framed example: renders the given preview route inside an iframe whose width
 * follows the viewport toggle, so the component's real media queries apply.
 */
export function FramedExample({ title, desc, src, code, css, defaultViewport = 'desktop', minHeight = 120, anatomy, children }: {
  title?: string;
  desc?: string;
  /** Path relative to BASE_URL, e.g. `preview/organisms/hero/default`. */
  src: string;
  code?: string;
  css?: string;
  defaultViewport?: Viewport;
  minHeight?: number;
  /** Extra toolbar content (e.g. anatomy toggle). */
  anatomy?: ReactNode;
  children?: ReactNode;
}) {
  const [vp, setVp] = useState<Viewport>(defaultViewport);
  const [height, setHeight] = useState(minHeight);
  const ref = useRef<HTMLIFrameElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const url = `${import.meta.env.BASE_URL}${src}`;

  // Scale the frame down when the chosen viewport is wider than the stage.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => setScale(Math.min(1, el.clientWidth / VIEWPORTS[vp]));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [vp]);

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (!ref.current || e.source !== ref.current.contentWindow) return;
      if (e.data && e.data.type === 'aba-preview-height') setHeight(Math.max(48, Math.ceil(e.data.height)));
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, [minHeight]);

  return (
    <figure className="ex">
      <div className="ex__bar">
        {title && <span className="ex__title">{title}</span>}
        {desc && <span className="ex__desc">{desc}</span>}
        <span className="ex__spacer" />
        {anatomy}
        <SegmentedControl
          label="Viewport"
          value={vp}
          onChange={(v) => setVp(v as Viewport)}
          items={[{ id: 'desktop', label: 'Desktop' }, { id: 'tablet', label: 'Tablet' }, { id: 'mobile', label: 'Mobile' }]}
        />
        <a href={url} target="_blank" rel="noopener" className="ex__desc" style={{ color: 'var(--color-blue-800)', fontWeight: 600 }}>Open ↗</a>
      </div>
      <div className="ex__frame-wrap" ref={wrapRef} style={{ height: Math.ceil(height * scale) }}>
        <iframe ref={ref} className="ex__frame" title={title ?? 'Example'} src={url} style={{ width: VIEWPORTS[vp], maxWidth: 'none', height, border: 0, transform: `scale(${scale})`, transformOrigin: 'top left' }} loading="lazy" />
        {scale < 1 && <span className="ex__scale">{VIEWPORTS[vp]}px · {Math.round(scale * 100)}%</span>}
      </div>
      {children}
      {(code || css) && <div className="ex__code"><CodeTabs tabs={[{ label: 'JSX', code: code ?? '', language: 'tsx' }, { label: 'CSS', code: css ?? '', language: 'css' }]} /></div>}
    </figure>
  );
}
