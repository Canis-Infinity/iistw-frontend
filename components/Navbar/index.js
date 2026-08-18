'use client';
import { useState, useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Image from 'next/image';
import Loading from '@/components/Loading';
import Modal from '@/components/Modal';
import {
  RiSunFill,
  RiMoonFill,
  RiMenuLine,
  RiTerminalLine,
  RiTranslate2,
} from 'react-icons/ri';
import { LangContext } from '@/providers/lang';
import { getPromotionsAmount } from '@/utils/getPromotions';
import { langList } from '@/utils/getLang';
import { translations, menuItems, pickLang } from '@/utils/i18n';
import { Button as ShadcnButton, buttonVariants } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const { lang, changeLang } = useContext(LangContext);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('top');
  const [isScrolled, setIsScrolled] = useState(false);
  const [langModalVisible, setLangModalVisible] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const promotionAmount = getPromotionsAmount();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (pathname !== '/works') {
      setActiveSection('top');
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);

      const sections = ['top', 'about', 'services', 'works', 'contact', 'promotions'];
      for (const targetSection of sections) {
        const target = document.getElementById(targetSection);
        if (!target) continue;
        const rect = target.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setActiveSection(targetSection);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const filteredMenuItems = menuItems.filter((item) => (
    item.validation !== 'promotions' || promotionAmount > 0
  ));

  const getHref = (path) => pathname === '/works' ? `/${path}` : path;

  const logo = !mounted ? (
    <Loading type="secondary" />
  ) : (
    <Image
      src={`/logo-text-${theme}.svg`}
      alt="Infinity 資訊"
      width={147}
      height={28}
      priority
    />
  );

  const MenuLinks = ({ onNavigate, mobile = false }) => (
    <>
      {filteredMenuItems.map((item) => {
        const active = pathname !== '/works' && activeSection === item.validation;
        const className = cn(
          buttonVariants({ variant: active ? 'secondary' : 'ghost', size: 'sm' }),
          'capitalize',
          mobile && 'h-9 w-full justify-start px-3 text-sm'
        );

        if (pathname === '/works') {
          return (
            <Link key={item.order} href={getHref(item.path)} className={className} onClick={onNavigate}>
              {item.content[lang]}
            </Link>
          );
        }

        return (
          <a key={item.order} href={item.path} className={className} onClick={onNavigate}>
            {item.content[lang]}
          </a>
        );
      })}
      <a
        href="https://blog.iistw.com/"
        target="_blank"
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'sm' }),
          mobile && 'h-9 w-full justify-start px-3 text-sm'
        )}
        onClick={onNavigate}
      >
        {pickLang(translations.nav.menuBlog, lang)}
      </a>
    </>
  );

  const languageButtons = (
    <Tabs
      value={lang}
      onValueChange={(value) => {
        changeLang(value)();
        setLangModalVisible(false);
      }}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-3">
      {langList.map((item) => (
        <TabsTrigger key={item.id} value={item.lang}>
          {item.title}
        </TabsTrigger>
      ))}
      </TabsList>
    </Tabs>
  );

  return (
    <>
      <nav
        className={cn(
          'fixed inset-x-0 top-0 z-40 px-6 py-6 transition-all duration-200 md:px-10 lg:px-16',
          isScrolled ? 'py-3 shadow-lg before:absolute before:inset-0 before:-z-10 before:bg-background/85 before:backdrop-blur-xl' : ''
        )}
      >
        <div className="mx-auto flex w-full max-w-[1200px] items-center gap-3">
        {pathname === '/works' ? (
          <Link href="/#top" className="mr-auto flex h-8 w-36 items-center">
            {logo}
          </Link>
        ) : (
          <a href="#top" className="mr-auto flex h-8 w-36 items-center">
            {logo}
          </a>
        )}

        <div className="hidden items-center gap-1 lg:flex">
          <MenuLinks />
        </div>

        <div className="hidden items-center gap-1 lg:flex">
          <Tooltip>
            <TooltipTrigger
              render={(
                <ShadcnButton
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setLangModalVisible(true)}
                  disabled={!mounted}
                />
              )}
            >
              <RiTranslate2 />
            </TooltipTrigger>
            <TooltipContent>{pickLang(translations.nav.langBtn, lang)}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              render={(
                <ShadcnButton
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleThemeToggle}
                disabled={!mounted}
                />
              )}
            >
              {!mounted ? <RiTerminalLine /> : theme === 'dark' ? <RiSunFill /> : <RiMoonFill />}
            </TooltipTrigger>
            <TooltipContent>
              {mounted ? pickLang(translations.nav.themeBtn[theme], lang) : ''}
            </TooltipContent>
          </Tooltip>
        </div>

        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger
            render={(
              <ShadcnButton type="button" variant="ghost" size="icon" className="lg:hidden" />
            )}
          >
            <RiMenuLine />
          </SheetTrigger>
          <SheetContent className="w-[min(22rem,90vw)] gap-0">
            <SheetHeader className="border-b px-5 py-4">
              <SheetTitle className="text-lg">
                {pickLang(translations.nav.mobileNav.menu, lang)}
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-1 p-3">
              <MenuLinks mobile onNavigate={() => setSheetOpen(false)} />
            </div>
            <div className="grid gap-3 border-t px-4 py-5">
              <h3 className="flex items-center gap-2 text-sm font-medium text-foreground">
                <RiSunFill className="text-muted-foreground" />
                {pickLang(translations.nav.mobileNav.theme, lang)}
              </h3>
              <Tabs value={theme} onValueChange={setTheme} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="dark">
                    <RiMoonFill />
                    {pickLang(translations.nav.mobileThemeBtn.dark, lang)}
                  </TabsTrigger>
                  <TabsTrigger value="light">
                    <RiSunFill />
                    {pickLang(translations.nav.mobileThemeBtn.light, lang)}
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="grid gap-3 border-t px-4 py-5">
              <h3 className="flex items-center gap-2 text-sm font-medium text-foreground">
                <RiTranslate2 className="text-muted-foreground" />
                {pickLang(translations.nav.mobileNav.lang, lang)}
              </h3>
              {languageButtons}
            </div>
          </SheetContent>
        </Sheet>
        </div>
      </nav>

      {langModalVisible &&
        createPortal(
          <Modal
            size="small"
            title={pickLang(translations.nav.langBtn, lang)}
            close={() => setLangModalVisible(false)}
          >
            {languageButtons}
          </Modal>,
          document.body
        )}
    </>
  );
}
