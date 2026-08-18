'use client';
import { useState, useEffect, useContext } from 'react';
import Section from '@/components/Section';
import SocialMedias from '@/components/SocialMedias';
import Skills from '@/components/Skills';
import InfiniteLoopSkills from '@/components/InfiniteLoopSkills';
import { LangContext } from '@/providers/lang';
import { mediaIcons, mediaContents } from '@/utils/getMedias';
import { skillsList } from '@/utils/getSkills';
import { translations, pickLang } from '@/utils/i18n';

export default function About({ socialMedias }) {
  let { lang } = useContext(LangContext);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 1000);
  }, []);

  return (
    <Section
      id="about"
      heading={pickLang(translations.sections.about.heading, lang)}
      intro={pickLang(translations.sections.about.intro, lang)}
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8">
        <SocialMedias data={socialMedias} mediaIcons={mediaIcons} mediaContents={mediaContents} lang={lang} />
        <div className="flex w-full flex-wrap justify-center gap-2 md:hidden">
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
