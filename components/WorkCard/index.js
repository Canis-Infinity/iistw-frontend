import { useState } from 'react';
import Image from 'next/image';
import { IoLogoGithub, IoLink, IoEye } from 'react-icons/io5';
import { TbArticleFilled } from 'react-icons/tb';
import { translations, pickLang } from '@/utils/i18n';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export default function WordCard({
  type,
  title,
  content,
  tags,
  cover,
  link,
  lang,
  handlePreview,
}) {
  const { github, preview, blog, demo } = link;

  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <article className="group flex w-full flex-col gap-6 overflow-hidden md:flex-row md:items-center">
      <div className="relative flex aspect-video w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted md:w-[35%] md:max-w-[450px]">
        {loading && <Skeleton className="absolute inset-0 rounded-none" />}
        <Image
          className="h-full w-full object-cover transition-transform duration-300 md:group-hover:scale-110"
          src={`${process.env.baseUrl}${cover}`}
          alt={title}
          width={640}
          height={360}
          onLoad={handleImageLoad}
        />
      </div>
      <div className="flex w-full flex-col items-start justify-center gap-4">
        <h3 className="relative text-2xl font-semibold after:absolute after:-bottom-2 after:left-0 after:h-[3px] after:w-12 after:bg-primary">
          {title}
        </h3>
        <p className={cn('pt-2 leading-7 text-muted-foreground', lang === 'en' ? 'text-left' : 'text-justify')}>
          {content}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            return (
              <Badge key={tag} variant="secondary" className="rounded-full px-3 py-1 text-xs">
                {tag}
              </Badge>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-3">
          {github && (
              <a className={buttonVariants({ variant: 'secondary', size: 'sm' })} href={github} target="_blank">
                <IoLogoGithub />{pickLang(translations.workCard.github, lang)}
              </a>
          )}
          {blog && (
              <a className={buttonVariants({ variant: 'secondary', size: 'sm' })} href={blog} target="_blank">
                <TbArticleFilled />{pickLang(translations.workCard.blog, lang)}
              </a>
          )}
          {demo && (
              <a className={buttonVariants({ variant: 'secondary', size: 'sm' })} href={demo} target="_blank">
                <IoLink />{pickLang(translations.workCard.demo, lang)}
              </a>
          )}
          {preview && (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                data-src={`${process.env.baseUrl}${preview}`}
                data-title={title}
                onClick={handlePreview}
              >
                <IoEye />{pickLang(translations.workCard.preview, lang)}
              </Button>
          )}
        </div>
      </div>
    </article>
  );
}
