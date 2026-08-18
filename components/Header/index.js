'use client';
import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import Loading from '@/components/Loading';
import { TypeAnimation } from 'react-type-animation';
import { RiArrowRightLine, RiTerminalLine, RiFileList2Line } from 'react-icons/ri';
import axios from 'axios';
import { LangContext } from '@/providers/lang';
import { translations, pickLang } from '@/utils/i18n';
import { Button, buttonVariants } from '@/components/ui/button';

export default function Header({ type }) {
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  let { lang } = useContext(LangContext);

  const nextTextDelay = 3000;
  const typingAnimationObj = Object.fromEntries(
    Object.entries(translations.header.typing).map(([key, values]) => [
      key,
      values.flatMap((value) => [value, nextTextDelay]),
    ])
  );

  const useOnChangeSequence = (sequence) => {
    const [animationFlag, setAnimationFlag] = useState(false);

    useEffect(() => {
      setAnimationFlag(false);
    }, [sequence]);

    useEffect(() => {
      if (animationFlag) return;
      setAnimationFlag(true);
    }, [animationFlag]);

    return animationFlag;
  };

  const TypeWriterText = ({ sequence, wrapper, speed, cursor, repeat }) => {
    const animationFlag = useOnChangeSequence(sequence);
    return animationFlag ? (
      <TypeAnimation
        sequence={sequence}
        wrapper={wrapper}
        speed={speed}
        cursor={cursor}
        repeat={repeat}
      />
    ) : null;
  };

  useEffect(() => {
    if (type !== 'home') return;
    async function handleAddVisitHistory() {
      const IP = await axios.get('https://api.ipify.org/');
      const result = await axios.post(`${process.env.baseUrl}/api/visit`, {
        ip: IP.data,
      });
    }
    handleAddVisitHistory();
  }, [type]);

  if (type === 'home') {
    return (
      <>
        <header
          className="site-hero-surface relative isolate flex min-h-screen w-full items-center overflow-hidden px-6 py-24 md:px-10 lg:px-16"
          id="top"
        >
          <div className="relative mx-auto flex w-full max-w-[1200px] flex-col gap-5">
          <div className="pointer-events-none absolute right-0 top-1/2 -z-10 hidden w-[52%] max-w-[680px] -translate-y-1/2 select-none opacity-90 [animation:floating_3s_linear_infinite] md:block">
            {
              !mounted ? <Loading type="secondary" /> : (
                <Image
                  src={`/banner-${theme}.svg`}
                  alt="banner"
                  width={680}
                  height={680}
                  className="h-auto w-full"
                  priority
                />
              )
            }
          </div>
          <h2 className="flex flex-wrap items-center gap-2 text-2xl font-semibold text-primary">
            <RiTerminalLine className="size-7" />
            <TypeWriterText
              sequence={typingAnimationObj[lang]}
              wrapper="span"
              speed={20}
              cursor={false}
              repeat={Infinity}
            />
            <span className="animate-[blink_500ms_linear_infinite_alternate] text-primary">|</span>
          </h2>
          <h1 className="max-w-3xl text-7xl font-bold leading-none text-primary md:text-8xl">
            {pickLang(translations.header.home.name, lang)}
          </h1>
          <p className="max-w-[550px] text-left text-base font-medium leading-7 text-muted-foreground lg:w-1/2">
            {pickLang(translations.header.home.intro, lang)}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              type="button"
              size="lg"
              onClick={() => {
                document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {pickLang(translations.header.home.readMore, lang)}
              <RiArrowRightLine />
            </Button>
            <a
              href="https://resume.iistw.com/"
              className={buttonVariants({ variant: 'secondary', size: 'lg' })}
              target="_blank"
            >
              <RiFileList2Line />
              {pickLang(translations.header.home.resume, lang)}
            </a>
          </div>
          </div>
        </header>
      </>
    );
  }
  if (type === 'works') {
    return (
      <>
        <header className="site-hero-surface relative isolate flex h-80 w-full items-center justify-center px-6 pt-16 md:px-10 lg:px-16">
          {
            !mounted ? null : (
              <h2 className="text-center text-4xl font-bold text-primary">
                {pickLang(translations.header.works, lang)}
              </h2>
            )
          }
        </header>
      </>
    );
  }
}
