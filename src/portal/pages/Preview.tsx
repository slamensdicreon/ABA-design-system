import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { findComponent, type Tier } from '../registry';
import { organismBySlug } from '../registry/organisms';

/**
 * Iframe target. Renders a single example with the system CSS only (no shell),
 * reports its height to the parent, and optionally overlays anatomy markers.
 */
export function Preview({ tier, slug, example, anatomy }: { tier: Tier; slug: string; example: string; anatomy: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [markers, setMarkers] = useState<Array<{ n: number; x: number; y: number; w: number; h: number }>>([]);
  const org = tier === 'organisms' ? organismBySlug[slug] : undefined;
  const def = findComponent(tier, slug);

  useEffect(() => {
    document.documentElement.classList.add('is-preview');
    document.body.style.background = '#fff';
    const post = () => {
      const h = Math.max(ref.current?.scrollHeight ?? 0, ref.current?.getBoundingClientRect().height ?? 0);
      window.parent?.postMessage({ type: 'aba-preview-height', height: h + (anatomy ? 40 : 0) }, '*');
    };
    post();
    const ro = new ResizeObserver(post);
    if (ref.current) ro.observe(ref.current);
    const t = setInterval(post, 800);
    return () => { ro.disconnect(); clearInterval(t); };
  }, [org, anatomy]);

  useLayoutEffect(() => {
    if (!anatomy || !org?.anatomy || !ref.current) { setMarkers([]); return; }
    const root = ref.current;
    const compute = () => {
      const base = root.getBoundingClientRect();
      const out: typeof markers = [];
      org.anatomy!.forEach((p, i) => {
        if (!p.className) return;
        const els = Array.from(root.getElementsByClassName(p.className)).filter((el) => (el as HTMLElement).offsetParent !== null || getComputedStyle(el).position === 'fixed');
        const targets = p.first === false ? els : els.slice(0, 1);
        targets.forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.width === 0 && r.height === 0) return;
          out.push({ n: i + 1, x: r.left - base.left + root.scrollLeft, y: r.top - base.top + root.scrollTop, w: r.width, h: r.height });
        });
      });
      setMarkers(out);
    };
    compute();
    const t1 = setTimeout(compute, 400);
    const t2 = setTimeout(compute, 1500);
    window.addEventListener('resize', compute);
    return () => { clearTimeout(t1); clearTimeout(t2); window.removeEventListener('resize', compute); };
  }, [anatomy, org, example]);

  let node: React.ReactNode = null;
  if (org) {
    const C = org.Component as React.ComponentType<Record<string, unknown>>;
    node = <C {...(org.previewProps ?? {})} />;
  } else if (def) {
    const ex = def.examples.find((e) => e.id === example) ?? def.examples[0];
    node = ex ? <div className={`preview-root--pad${ex.dark ? ' preview-root--dark' : ''}`} style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>{ex.render()}</div> : null;
  }

  return (
    <div ref={ref} className="preview-root" style={{ position: 'relative' }}>
      {node ?? <p style={{ padding: 24 }}>Unknown preview.</p>}
      {anatomy && markers.map((m, i) => (
        <span key={i} style={{ display: 'contents' }}>
          <span className="anatomy-outline" style={{ left: m.x, top: m.y, width: m.w, height: m.h }} />
          <span className="anatomy-marker" style={{ left: Math.max(0, m.x - 10), top: Math.max(0, m.y - 10) }}>{m.n}</span>
        </span>
      ))}
    </div>
  );
}
