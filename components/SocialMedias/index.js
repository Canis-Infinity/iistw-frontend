import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export default function SocialMedias({ data, mediaIcons, mediaContents, lang, className }) {
  return (
    <div className={cn('flex w-full flex-wrap items-center justify-center gap-2', className)}>
      {data?.map((item) => {
        const content = item.title === 'mobile' ? `tel:+886${item.content.replace('0', '')}` : item.title === 'email' ? `mailto:${item.content}` : item.content
        return (
          <Tooltip key={item.title}>
            <TooltipTrigger
              render={
                <a
                  className="inline-flex size-9 items-center justify-center rounded-lg border bg-background/60 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary [&_svg]:size-4"
                  href={content}
                  target={['email', 'mobile'].includes(item.target) ? undefined : '_blank'}
                  rel={['email', 'mobile'].includes(item.target) ? undefined : 'noreferrer'}
                />
              }
            >
              {mediaIcons[item.title]}
            </TooltipTrigger>
            <TooltipContent>{mediaContents[item.title][lang]}</TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  )
}
