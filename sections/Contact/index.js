'use client';
import { useContext } from 'react';
import Section from '@/components/Section';
import ContactForm from '@/components/ContactForm';
import { LangContext } from '@/providers/lang';

export default function Contact() {
  let { lang } = useContext(LangContext);

  const langObj = {
    heading: {
      tw: '聯絡',
      cn: '联络',
      en: 'contact',
    },
    intro: {
      tw: `有任何問題或需求？可以透過下方的表單聯絡我，或是透過的社群帳號、電子郵件聯絡我。我看到後會盡快回覆。<strong>建議使用英文或中文詳細描述您的問題、需求</strong>，期待著與你合作。`,
      cn: `有任何问题或需求？可以透过下方的表单联络我，或是透过的社群帐号、电子邮件联络我。我看到后会尽快回复。<strong>建议使用英文或中文详细描述您的问题、需求</strong>，期待着与你合作。`,
      en: `Have any questions or needs? You can contact me through the form or social media accounts and email. I will reply as soon as possible after I see it. <strong>I recommend using English or Chinese to describe your problem or needs in detail</strong>, looking forward to working with you.`,
    },
  };

  return (
    <Section id="contact" heading={langObj.heading[lang]} intro={langObj.intro[lang]}>
      <ContactForm lang={lang} />
    </Section>
  );
}