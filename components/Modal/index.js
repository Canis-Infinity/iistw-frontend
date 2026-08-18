import Button from '@/components/Button';
import { RiCloseLine } from 'react-icons/ri';
import { cn } from '@/lib/utils';

export default function Modal({
  form,
  size,
  title,
  close,
  submit,
  reset,
  children
}) {
  const sizeClass = size === 'large' ? 'max-w-3xl' : size === 'small' ? 'max-w-md' : 'max-w-xl';
  const className = cn(
    'fixed left-1/2 top-1/2 z-50 flex w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl bg-popover text-popover-foreground ring-1 ring-foreground/10 shadow-lg',
    sizeClass
  );

  const content = (
    <>
      <div className="flex items-center justify-between gap-4 border-b p-4">
        <h3 className="text-base font-medium">{title}</h3>
        <Button
          isIconType={true}
          icon={<RiCloseLine />}
          onClick={close}
        />
      </div>
      <div className="p-4">
        {children}
      </div>
    </>
  );

  if (form) {
    return (
      <form action="" method={form} className={className} onSubmit={submit} onReset={reset}>
        {content}
      </form>
    );
  }

  return <div className={className}>{content}</div>;
}
