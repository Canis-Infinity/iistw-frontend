import { cn } from '@/lib/utils';

export default function ServiceCard({ icon, title, content, currentLang }) {
  return (
    <article className="group flex h-full flex-col items-center overflow-hidden rounded-xl border-2 border-transparent transition-all duration-200 hover:border-primary hover:bg-primary hover:shadow-[0_0_20px_0_var(--theme-primary)]">
      <div className="relative flex w-full items-center justify-center p-6 after:absolute after:bottom-0 after:h-[3px] after:w-20 after:bg-primary after:transition-colors group-hover:after:bg-primary-foreground">
        <div className="flex items-center justify-center text-muted-foreground transition-colors group-hover:text-primary-foreground [&_svg]:size-20">
          {icon}
        </div>
      </div>
      <div className="flex w-full flex-col items-center gap-4 p-6">
        <h3 className="text-center text-2xl font-semibold">{title}</h3>
        <p className={cn('text-center leading-7 text-muted-foreground transition-colors group-hover:text-primary-foreground', currentLang === 'en' ? 'text-left' : 'text-balance')}>
          {content}
        </p>
      </div>
    </article>
  );
}
