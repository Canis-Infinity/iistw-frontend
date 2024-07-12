'use client';
import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import Loading from '@/components/Loading';
import styles from './index.module.css';
import { TypeAnimation } from 'react-type-animation';
import { RiArrowRightLine, RiTerminalLine } from 'react-icons/ri';
import axios from 'axios';
import { LangContext } from '@/providers/lang';

export default function Header({ type }) {
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  let { lang } = useContext(LangContext);

  const nextTextDelay = 3000;
  const typingAnimationObj = {
    tw: ['前端工程師', nextTextDelay, 'UI/UX 設計師', nextTextDelay],
    cn: ['前端程序员', nextTextDelay, 'UI/UX 设计师', nextTextDelay],
    en: ['Front-end Developer', nextTextDelay, 'UI/UX Designer', nextTextDelay],
  };

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

  const translationObj = {
    home: {
      name: {
        tw: `張永昌`,
        cn: `张永昌`,
        en: `Canis`,
      },
      heading: {
        tw: <RiTerminalLine />,
        cn: <RiTerminalLine />,
        en: <RiTerminalLine />,
      },
      intro: {
        tw: `我是一個能設計 UI/UX 的前端工程師。平時有想法的時候，會坐到電腦前開始把想法慢慢地實現出來，這會讓我感到有成就感且滿足。除了這個之外，我主要販售和維修電腦、筆電、零組件、周邊。`,
        cn: `我是一个能设计 UI/UX 的前端程序员。平时有想法的时候，会坐到电脑前开始吧想法慢慢地实现出来，这会让我感到有成就感且满足。除了这个之外，我主要贩售和维修电脑、笔记本、零组件、周边。`,
        en: `I'm a front-end developer who can design UI/UX. When ideas popped into my head, I would be in front of the PC and implement them. I get a lot of sense of achievement and satisfaction from it. In addition to this, I both sell and repair PCs, laptops, peripherals, and hardware.`,
      },
      readMore: {
        tw: `了解我`,
        cn: `了解我`,
        en: `Read More`,
      },
    },
    works: {
      tw: `作品列表`,
      cn: `作品列表`,
      en: `Works List`,
    },
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
        <header className={styles.header} id="top">
          <div className={styles.bannerImg} style={mounted ? {} : {aspectRatio: '1 / 1'}}>
            {
              !mounted ? <Loading type="secondary" /> : (
                <Image
                  src={`/banner-${theme}.svg`}
                  alt="banner"
                  width={200}
                  height={200}
                  priority
                />
              )
            }
          </div>
          <h2>
            {translationObj.home.heading[lang]}
            <TypeWriterText
              sequence={typingAnimationObj[lang]}
              wrapper="span"
              speed={20}
              cursor={false}
              repeat={Infinity}
            />
          </h2>
          <h1>{translationObj.home.name[lang]}</h1>
          <p>{translationObj.home.intro[lang]}</p>
          <button
            type="button"
            className={styles.headerBtn}
            onClick={() => {
              sectionRefs.about.current.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {translationObj.home.readMore[lang]}
            <RiArrowRightLine />
          </button>
        </header>
      </>
    );
  }
  if (type === 'works') {
    return (
      <>
        <header className={styles.header2}>
          {
            !mounted ? null : (
              <h2>{translationObj.works[lang]}</h2>
            )
          }
        </header>
      </>
    );
  }
}