import type { TokenEntry } from '../lib/tokens';
import { CopyButton } from './Code';

export function TokenTable({ rows, preview }: { rows: TokenEntry[]; preview?: (t: TokenEntry) => React.ReactNode }) {
  return (
    <div className="doc-table-wrap">
      <table className="aba-table">
        <thead>
          <tr>
            {preview && <th scope="col" style={{ width: 120 }}>Preview</th>}
            <th scope="col">Token</th><th scope="col">CSS variable</th><th scope="col">Value</th><th scope="col">Resolved</th><th scope="col" aria-label="Copy" />
          </tr>
        </thead>
        <tbody>
          {rows.map((t) => (
            <tr key={t.cssVar}>
              {preview && <td>{preview(t)}</td>}
              <td><code className="doc-code-inline">{t.path}</code></td>
              <td><code className="doc-code-inline">{t.cssVar}</code></td>
              <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{t.css}</td>
              <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>{t.resolved !== t.css ? t.resolved : ''}</td>
              <td><CopyButton light text={`var(${t.cssVar})`} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
