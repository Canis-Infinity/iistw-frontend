'use client';
import { useContext } from 'react';
import Section from '@/components/Section';
import ServiceCard from '@/components/ServiceCard';
import styles from './index.module.css';
import { LangContext } from '@/providers/lang';
import { servicesList } from '@/utils/getServices'

export default function Services() {
  let { lang } = useContext(LangContext);

  const langObj = {
    heading: {
      tw: '服務',
      cn: '服务',
      en: 'services',
    },
    intro: {
      tw: `在這個部分，你可以看到我所提供的服務。`,
      cn: `在这个部分，你可以看到我所提供的服务。`,
      en: `In this section, you will find the services I provide.`,
    },
  };

  return (
    <Section id="services" heading={langObj.heading[lang]} intro={langObj.intro[lang]}>
      <div className={styles.serviceGrid}>
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