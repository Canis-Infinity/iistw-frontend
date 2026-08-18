'use client';
import { useContext } from 'react';
import Section from '@/components/Section';
import PromotionCard from '@/components/PromotionCard';
import { LangContext } from '@/providers/lang';
import { translations, pickLang } from '@/utils/i18n';

export default function Promotions({ data }) {
  let { lang } = useContext(LangContext);

  return (
    <Section
      id="promotions"
      heading={pickLang(translations.sections.promotions.heading, lang)}
      intro={pickLang(translations.sections.promotions.intro, lang)}
      className="bg-card"
    >
      <div className="mx-auto grid max-w-4xl gap-4">
        {
          data.map((promotion, index) => {
            return (
              <PromotionCard
                key={index}
                lang={lang}
                title={promotion.title[lang]}
                content={promotion.content[lang]}
                link={promotion.link}
                logo={promotion.logo}
              />
            );
          })
        }
      </div>
    </Section>
  )
}
