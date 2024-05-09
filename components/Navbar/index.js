'use client';
import { useState, useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Button from '@/components/Button';
import Loading from '@/components/Loading';
import Modal from '@/components/Modal';
import clsx from 'clsx';
import styles from './index.module.css';
import Image from 'next/image';
import {
  RiSunFill,
  RiMoonFill,
  RiMenuLine,
  RiMenu2Fill,
  RiCloseLine,
  RiTerminalLine,
  RiTranslate2,
  RiArrowLeftRightLine,
  RiCheckDoubleLine,
} from 'react-icons/ri';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { LangContext } from '@/providers/lang';
import { getPromotionsAmount } from '@/utils/getPromotions';
import { langList } from '@/utils/getLang';

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const pathname = usePathname();

  let { lang, changeLang } = useContext(LangContext);

  const [activeSection, setActiveSection] = useState('top');

  const promotionAmount = getPromotionsAmount();

  const translationObj = {
    langBtn: {
      tw: '語言設定',
      cn: '语言设置',
      en: 'Language Setting',
    },
    themeBtn: {
      dark: {
        tw: '淺色主題',
        cn: '浅色主题',
        en: 'Light Theme',
      },
      light: {
        tw: '深色主題',
        cn: '深色主题',
        en: 'Dark Theme',
      },
    },
    mobileTthemeBtn: {
      dark: {
        tw: '深色主題',
        cn: '深色主题',
        en: 'Dark Theme',
      },
      light: {
        tw: '淺色主題',
        cn: '浅色主题',
        en: 'Light Theme',
      },
    },
    menuBlog: {
      tw: '部落格',
      cn: '部落格',
      en: 'Blog',
    },
    mobileNav: {
      menu: {
        tw: '選單',
        cn: '选单',
        en: 'Menu',
      },
      theme: {
        tw: '主題',
        cn: '主题',
        en: 'Theme',
      },
      lang: {
        tw: '語言',
        cn: '语言',
        en: 'Language',
      },
    },
  };

  const menuItems = [
    {
      order: 1,
      content: {
        tw: '首頁',
        cn: '首页',
        en: 'home',
      },
      path: `#top`,
      validation: 'top',
    },
    {
      order: 2,
      content: {
        tw: '關於',
        cn: '关于',
        en: 'about',
      },
      path: `#about`,
      validation: 'about',
    },
    {
      order: 3,
      content: {
        tw: '服務',
        cn: '服务',
        en: 'services',
      },
      path: `#services`,
      validation: 'services',
    },
    {
      order: 4,
      content: {
        tw: '作品',
        cn: '作品',
        en: 'works',
      },
      path: `#works`,
      validation: 'works',
    },
    {
      order: 5,
      content: {
        tw: '聯絡',
        cn: '联络',
        en: 'contact',
      },
      path: `#contact`,
      validation: 'contact',
    },
    {
      order: 6,
      content: {
        tw: '優惠活動',
        cn: '优惠活动',
        en: 'Promotions',
      },
      path: `#promotions`,
      validation: 'promotions',
    },
  ];

  const [menuActive, setMenuActive] = useState(false);

  const handleMenuToggle = () => {
    setMenuActive(!menuActive);
    if (menuActive) {
      document.body.classList.remove('overflowHidden');
    } else {
      document.body.classList.add('overflowHidden');
    }
  };

  const [langModalVisible, setLangModalVisible] = useState(false);

  const handleLangModalToggle = () => {
    setLangModalVisible(!langModalVisible);
  };

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (pathname !== '/works') {
      setActiveSection('top');
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      let scrolled = window.scrollY;
      if (scrolled > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = ['top', 'about', 'services', 'works', 'contact', 'promotions']

      for (const section in sections) {
        const targetSection = sections[section];
        if (document.getElementById(targetSection)) {
          const rect = document.getElementById(targetSection).getBoundingClientRect();
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            setActiveSection(targetSection);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <nav className={clsx(styles.nav, { [styles.active]: isScrolled })}>
        {pathname === '/works' ? (
          <Link href="/#top" className={styles.logo}>
            {!mounted ? (
              <Loading type="secondary" />
            ) : (
              <Image
                src={`/logo-text-${theme}.svg`}
                alt="banner"
                width={2944 / 20}
                height={560 / 20}
                priority
              />
            )}
          </Link>
        ) : (
          <a href="#top" className={styles.logo}>
            {!mounted ? (
              <Loading type="secondary" />
            ) : (
              <Image
                src={`/logo-text-${theme}.svg`}
                alt="banner"
                width={2944 / 20}
                height={560 / 20}
                priority
              />
            )}
          </a>
        )}
        <div className={styles.navMenu} data-desktop>
          <ul>
            {pathname === '/works'
              ? menuItems.map((item) => {
                  if (item.validation === 'promotions' && promotionAmount === 0)
                    return;
                  return (
                    <li key={item.order}>
                      <Link
                        href={`/${item.path}`}
                      >
                        {item.content[lang]}
                      </Link>
                    </li>
                  );
                })
              : menuItems.map((item) => {
                  if (item.validation === 'promotions' && promotionAmount === 0) return;
                  return (
                    <li key={item.order}>
                      <a
                        href={item.path}
                        className={clsx({
                          [styles.navActive]: activeSection === item.validation,
                        })}
                      >
                        {item.content[lang]}
                      </a>
                    </li>
                  );
                })}
            <li>
              <a href="https://blog.iistw.com/" target="_blank">
                {translationObj.menuBlog[lang]}
              </a>
            </li>
          </ul>
        </div>
        <Tippy content={translationObj.langBtn[lang]} placement="auto">
          <button
            type="button"
            className={styles.settingBtn}
            onClick={handleLangModalToggle}
            disabled={mounted ? false : true}
            data-desktop
          >
            <RiTranslate2 />
          </button>
        </Tippy>
        {!mounted ? (
          <button
            type="button"
            className={styles.settingBtn}
            onClick={handleThemeToggle}
            disabled
            data-desktop
          >
            <RiTerminalLine />
          </button>
        ) : (
          <Tippy
            content={translationObj.themeBtn[theme][lang]}
            placement="auto"
          >
            <button
              type="button"
              className={styles.settingBtn}
              onClick={handleThemeToggle}
              data-desktop
            >
              {theme === 'dark' ? <RiSunFill /> : <RiMoonFill />}
            </button>
          </Tippy>
        )}
        <button
          type="button"
          className={styles.menuBtn}
          onClick={handleMenuToggle}
          data-mobile
        >
          <RiMenuLine />
        </button>
      </nav>
      {langModalVisible &&
        createPortal(
          <Modal
            size="small"
            title={translationObj.langBtn[lang]}
            close={handleLangModalToggle}
          >
            <div className={styles.langModal}>
              {
                langList.map((item) => {
                  return (
                    <>
                      <Button
                        key={item.id}
                        icon={item.lang === lang ? <RiCheckDoubleLine /> : <RiArrowLeftRightLine />}
                        content={item.title}
                        color={item.lang === lang ? 'primary' : 'secondary'}
                        flex={true}
                        onClick={changeLang(item.lang)}
                        desktop={true}
                      />
                      <Button
                        key={item.id}
                        icon={item.lang === lang ? <RiCheckDoubleLine /> : <RiArrowLeftRightLine />}
                        content={item.title}
                        color={item.lang === lang ? 'primary' : 'secondary'}
                        flex={true}
                        size="large"
                        onClick={changeLang(item.lang)}
                        mobile={true}
                      />
                    </>
                  )
                })
              }
            </div>
          </Modal>,
          document.body
        )}
      {menuActive &&
        createPortal(
          <div className={styles.mobileNav} data-mobile>
            <div className={styles.mobileTop}>
              <button
                type="button"
                className={styles.mobileMenuBtn}
                onClick={handleMenuToggle}
                data-mobile
              >
                <RiCloseLine />
              </button>
            </div>
            <div className={styles.mobileNavMenu}>
              <h2>
                <RiMenu2Fill />
                {translationObj.mobileNav.menu[lang]}
              </h2>
              <ul>
                {pathname === '/works'
                  ? menuItems.map((item) => {
                      if (
                        item.validation === 'promotions' &&
                        promotionAmount === 0
                      )
                        return;
                      return (
                        <li key={item.order}>
                          <Link
                            href={`/${item.path}`}
                            onClick={handleMenuToggle}
                          >
                            {item.content[lang]}
                          </Link>
                        </li>
                      );
                    })
                  : menuItems.map((item) => {
                      if (
                        item.validation === 'promotions' &&
                        promotionAmount === 0
                      )
                        return;
                      return (
                        <li key={item.order}>
                          <a
                            href={item.path}
                            className={clsx({
                              [styles.mobileNavActive]:
                                activeSection === item.validation,
                            })}
                            onClick={handleMenuToggle}
                          >
                            {item.content[lang]}
                          </a>
                        </li>
                      );
                    })}
                <li>
                  <a
                    href="https://blog.iistw.com/"
                    target="_blank"
                    onClick={handleMenuToggle}
                  >
                    {translationObj.menuBlog[lang]}
                  </a>
                </li>
              </ul>
              <h2>
                {
                  !mounted ? <RiTerminalLine /> : theme === 'dark' ? <RiSunFill /> : <RiMoonFill />
                }
                {translationObj.mobileNav.theme[lang]}
              </h2>
              <div className={styles.mobileNavItems}>
                <Button
                  icon={<RiMoonFill />}
                  content={translationObj.mobileTthemeBtn.dark[lang]}
                  color={theme === 'dark' ? 'primary' : 'secondary'}
                  flex={true}
                  onClick={() => {
                    setTheme('dark')
                  }}
                />
                <Button
                  icon={<RiSunFill />}
                  content={translationObj.mobileTthemeBtn.light[lang]}
                  color={theme === 'light' ? 'primary' : 'secondary'}
                  flex={true}
                  onClick={() => {
                    setTheme('light')
                  }}
                />
              </div>
              <h2>
                <RiTranslate2 />
                {translationObj.mobileNav.lang[lang]}
              </h2>
              <div className={styles.mobileNavItems}>
                {
                  langList.map((item) => {
                    return (
                      <Button
                        key={item.id}
                        icon={item.lang === lang ? <RiCheckDoubleLine /> : <RiArrowLeftRightLine />}
                        content={item.title}
                        color={item.lang === lang ? 'primary' : 'secondary'}
                        flex={true}
                        onClick={changeLang(item.lang)}
                      />
                    )
                  })
                }
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
