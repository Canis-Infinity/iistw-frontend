'use client';
import { useContext } from 'react';
import Section from '@/components/Section';
import ContactForm from '@/components/ContactForm';
import { LangContext } from '@/providers/lang';
import { translations, pickLang } from '@/utils/i18n';

export default function Contact() {
  let { lang } = useContext(LangContext);

  return (
    <Section
      id="contact"
      heading={pickLang(translations.sections.contact.heading, lang)}
      intro={pickLang(translations.sections.contact.intro, lang)}
    >
      <ContactForm lang={lang} />
    </Section>
  );
}
