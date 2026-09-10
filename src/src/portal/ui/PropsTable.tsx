import type { PropDef } from '../registry/types';
import { inlineCode } from './Doc';

export function PropsTable({ props }: { props: PropDef[] }) {
  if (!props.length) return <p className="doc-prose">This component takes no props beyond standard HTML attributes.</p>;
  return (
    <div className="doc-table-wrap">
      <table className="aba-table">
        <thead>
          <tr><th scope="col">Prop</th><th scope="col">Type</th><th scope="col">Default</th><th scope="col">Description</th></tr>
        </thead>
        <tbody>
          {props.map((p) => (
            <tr key={p.name}>
              <td><code className="doc-code-inline">{p.name}{p.required ? '*' : ''}</code></td>
              <td><code className="doc-code-inline">{p.type}</code></td>
              <td>{p.default ? <code className="doc-code-inline">{p.default}</code> : <span style={{ color: 'var(--text-faint)' }}>—</span>}</td>
              <td>{inlineCode(p.description)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
