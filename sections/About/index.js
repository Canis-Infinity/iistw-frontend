'use client';
import { useState, useEffect, useContext } from 'react';
import Section from '@/components/Section';
import SocialMedias from '@/components/SocialMedias';
import Skills from '@/components/Skills';
import InfiniteLoopSkills from '@/components/InfiniteLoopSkills';
import styles from './index.module.css';
import { LangContext } from '@/providers/lang';
import { mediaIcons, mediaContents } from '@/utils/getMedias';
import { skillsList } from '@/utils/getSkills';

export default function About({ socialMedias }) {
  let { lang } = useContext(LangContext);

  const langObj = {
    heading: {
      tw: '關於',
      cn: '关于',
      en: 'about',
    },
    intro: {
      tw: `在這裡，你可以看到更多關於我的故事和專業背景，包括我的技能、社群帳號、聯絡方式等。`,
      cn: `在这里，你可以看到更多关于我的故事和专业背景，包括我的技能、社群帐号、联络方式等。`,
      en: `Here, you will find more about my story and professional background, including my skills, social media accounts, contact information, etc.`,
    },
    navigateBtn: {
      tw: '聯絡',
      cn: '联络',
      en: 'contact',
    },
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 1000);
  }, []);

  return (
    <Section id="about" heading={langObj.heading[lang]} intro={langObj.intro[lang]}>
      <div className={styles.wrapper}>
        <SocialMedias data={socialMedias} mediaIcons={mediaIcons} mediaContents={mediaContents} lang={lang} />
        <div className={styles.skills} data-mobile>
          {skillsList.map((skill) => (
            <Skills
              key={skill.order}
              icon={skill.icon}
              content={skill.content[lang]}
            />
          ))}
        </div>
        {mounted && <InfiniteLoopSkills skillsObj={skillsList} currentLang={lang} />}
      </div>
    </Section>
  );
}