'use client';
import { useContext } from 'react';
import Section from '@/components/Section';
import PromotionCard from '@/components/PromotionCard';
import pageStyles from '@/styles/page.module.css';
import styles from './index.module.css';
import { LangContext } from '@/providers/lang';

export default function Promotions({ data }) {
  let { lang } = useContext(LangContext);

  const langObj = {
    heading: {
      tw: '優惠活動',
      cn: '优惠活动',
      en: 'Promotions',
    },
    intro: {
      tw: `在這個部分，你可以看到我所提供的優惠活動或是合作的優惠。`,
      cn: `在这个部分，你可以看到我所提供的优惠活动或是合作的优惠。`,
      en: `In this section, you will find the promotions I offer or the promotions I collaborate with.`,
    },
  };

  return (
    <Section id="promotions" heading={langObj.heading[lang]} intro={langObj.intro[lang]} className={pageStyles.promotions}>
      <div className={styles.wrapper}>
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