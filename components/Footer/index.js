'use client';
import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import CountUp from 'react-countup';
import SocialMedias from '@/components/SocialMedias';
import { SiBuymeacoffee } from 'react-icons/si';
import axios from 'axios';
import { LangContext } from '@/providers/lang';
import { mediaIcons, mediaContents } from '@/utils/getMedias';
import { langList } from '@/utils/getLang';
import { translations, pickLang } from '@/utils/i18n';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';

export default function Footer({ socialMedias }) {
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  let { lang, changeLang } = useContext(LangContext);

  const [visitors, setVisitors] = useState(0);

  useEffect(() => {
    const fetchVisitors = () => {
      axios
        .get(`${process.env.baseUrl}/api/visit`).then((res) => {
          if (res.status === 200) {
            const { message, data } = res.data;
            setVisitors(data);
          } else {
            console.log(res.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    fetchVisitors();
  }, []);

  return (
    <>
      {
        !mounted ? null : (
          <footer className="mt-16 w-full border-t bg-card/50 px-6 md:px-10 lg:px-16">
            <div className="mx-auto grid w-full max-w-[1200px] gap-10 py-12 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="flex max-w-md items-start gap-5">
                <div className="flex size-16 shrink-0 items-center justify-center rounded-xl border bg-background/60 p-3">
                  <Image
                    src={`/logo-icon-${theme}.svg`}
                    alt="Infinity 資訊"
                    width={64}
                    height={64}
                    priority
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Link href="/" className="w-fit text-xl font-semibold text-foreground">
                    Infinity 資訊
                  </Link>
                  <p className="text-left text-sm leading-6 text-muted-foreground">
                    {pickLang(translations.footer.summary, lang)}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 lg:items-end">
                <p className="text-left text-sm font-medium text-foreground lg:text-right">
                  {pickLang(translations.footer.connect, lang)}
                </p>
                <SocialMedias
                  data={socialMedias}
                  mediaIcons={mediaIcons}
                  mediaContents={mediaContents}
                  lang={lang}
                  className="justify-start lg:justify-end"
                />
                <a
                  href="https://www.buymeacoffee.com/iistw"
                  target="_blank"
                  rel="noreferrer"
                  className={buttonVariants({ size: 'sm', className: 'w-fit rounded-full' })}
                >
                  <SiBuymeacoffee />
                  {pickLang(translations.footer.coffee, lang)}
                </a>
              </div>

              <Separator className="lg:col-span-2" />

              <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:gap-4">
                <span>
                  © 2026{' '}
                  <Link href="/" className="font-medium text-foreground underline-offset-4 hover:text-primary hover:underline">
                    Infinity 資訊
                  </Link>
                </span>
                {visitors > 0 ? (
                  <span>
                    {pickLang(translations.footer.visitors, lang)}
                    <CountUp end={visitors} separator="," useGrouping={true} enableScrollSpy={true}/>
                  </span>
                ) : null}
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center lg:justify-end">
                <span className="text-sm text-muted-foreground">
                  {pickLang(translations.footer.language, lang)}
                </span>
                <div className="flex flex-wrap items-center gap-1">
                  {langList.map((item) => {
                    const className = lang === item.lang
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground';

                    if (item.lang === 'tw') {
                      return (
                        <Button
                          key={item.id}
                          type="button"
                          variant="ghost"
                          size="sm"
                          className={className}
                          onClick={changeLang(item.lang)}
                        >
                          {item.title}
                        </Button>
                      );
                    }

                    return (
                      <Tooltip key={item.id}>
                        <TooltipTrigger
                          render={(
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className={className}
                              onClick={changeLang(item.lang)}
                            />
                          )}
                        >
                          {item.title}
                        </TooltipTrigger>
                        <TooltipContent>
                          {pickLang(translations.footer.langSwitcher[item.lang], lang)}
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            </div>
          </footer>
        )
      }
    </>
  );
}
