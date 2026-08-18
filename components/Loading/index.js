import { Spinner } from '@/components/ui/spinner';

export default function Loading({ type, content }) {
  return (
    <div className="flex min-h-16 w-full items-center justify-center gap-2 text-sm text-muted-foreground">
      <Spinner className={type === 'secondary' ? 'text-primary' : undefined} />
      {content && <div>{content}</div>}
    </div>
  );
}
