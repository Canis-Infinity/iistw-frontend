'use client';
import { useState, useEffect, useContext, Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import clsx from 'clsx';
import styles from './index.module.css';
import CountUp from 'react-countup';
import SocialMedias from '@/components/SocialMedias';
import { SiBuymeacoffee } from 'react-icons/si';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import axios from 'axios';
import { LangContext } from '@/providers/lang';
import { mediaIcons, mediaContents } from '@/utils/getMedias';
import { langList } from '@/utils/getLang';

export default function Footer({ socialMedias }) {
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  let { lang, changeLang } = useContext(LangContext);

  const langObj = {
    langSwitcher: {
      cn: {
        tw: `部分内容未翻译为简体中文`,
        cn: `部分内容未翻译为简体中文`,
        en: `部分内容未翻译为简体中文`,
      },
      en: {
        tw: `Some contents are not in tradition.`,
        cn: `Some contents are not in tradition.`,
        en: `Some contents are not in tradition.`,
      },
    },
    coffee: {
      tw: `請我喝杯咖啡`,
      cn: `请我喝杯咖啡`,
      en: `Buy Me A Coffee`,
    },
  };

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
          <footer className={styles.footer}>
            <div className={styles.logo}>
              <Image
                src={`/logo-icon-${theme}.svg`}
                alt="banner"
                width={100}
                height={100}
                priority
              />
            </div>
            <SocialMedias data={socialMedias} mediaIcons={mediaIcons} mediaContents={mediaContents} lang={lang} />
            <a href="https://www.buymeacoffee.com/iistw" target="_blank" className={styles.coffee}>
              <SiBuymeacoffee />
              {langObj.coffee[lang]}
            </a>
            <p>
              Copyright © 2024{' '}
              <Link href="/" className="link">
                Infinity 資訊
              </Link>
              . All rights reserved.
            </p>
            <div className={styles.langSwitcher}>
              {
                langList.map((item, index) => {
                  if (item.lang !== 'tw') {
                    return (
                      <Fragment key={item.id}>
                        <Tippy content={langObj.langSwitcher[item.lang][lang]} placement="auto">
                          <button
                            type="button"
                            className={clsx({
                              [styles.active]: lang === item.lang,
                            })}
                            onClick={changeLang(item.lang)}
                          >
                            {item.title}
                          </button>
                        </Tippy>
                        {
                          langList.length !== index + 1 ? (
                            <span className={styles.seperator}></span>
                          ) : null
                        }
                      </Fragment>
                    );
                  }
                  return (
                    <Fragment key={item.id}>
                      <button
                        type="button"
                        className={clsx({
                          [styles.active]: lang === item.lang,
                        })}
                        onClick={changeLang(item.lang)}
                      >
                        {item.title}
                      </button>
                      {
                        langList.length !== index + 1 ? (
                          <span className={styles.seperator}></span>
                        ) : null
                      }
                    </Fragment>
                  );
                })
              }
            </div>
            {
              visitors > 0 ? <p>造訪人數：<CountUp end={visitors} separator="," useGrouping={true} enableScrollSpy={true}/></p> : null
            }
          </footer>
        )
      }
    </>
  );
}
