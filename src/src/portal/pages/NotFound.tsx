import { Link } from 'wouter';
import { EmptyState } from '@workspace/aba-design-system';
import { usePageMeta } from '../lib/meta';

export function NotFound() {
  usePageMeta('Not found');
  return (
    <EmptyState title="There is no page here" action={<Link href="/" className="aba-btn aba-btn--secondary">Back to the overview</Link>}>
      Check the address, or use the search above.
    </EmptyState>
  );
}
