'use client';
import { useContext } from 'react';
import Section from '@/components/Section';
import ServiceCard from '@/components/ServiceCard';
import { LangContext } from '@/providers/lang';
import { servicesList } from '@/utils/getServices'
import { translations, pickLang } from '@/utils/i18n';

export default function Services() {
  let { lang } = useContext(LangContext);

  return (
    <Section
      id="services"
      heading={pickLang(translations.sections.services.heading, lang)}
      intro={pickLang(translations.sections.services.intro, lang)}
    >
      <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {servicesList.map((service) => {
          return (
            <ServiceCard
              key={service.order}
              icon={service.icon}
              title={service.title[lang]}
              content={service.content[lang]}
              currentLang={lang}
            />
          );
        })}
      </div>
    </Section>
  )
}
