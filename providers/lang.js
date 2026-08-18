'use client';
import { useState, useEffect, createContext } from 'react';
export const LangContext = createContext();

const htmlLangMap = {
  tw: 'zh-Hant-TW',
  cn: 'zh-Hans-CN',
  en: 'en',
};

export function LangProviders({ children }) {
  const [lang, setLang] = useState('tw');

  useEffect(() => {
    const currentLang = localStorage.getItem('iistw-lang');
    if (currentLang) {
      setLang(currentLang);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = htmlLangMap[lang] ?? htmlLangMap.tw;
  }, [lang]);

  const changeLang = (newLang) => () => {
    setLang(newLang);
    localStorage.setItem('iistw-lang', newLang);
  };

  return (
    <LangContext.Provider
      value={{
        lang,
        changeLang,
      }}
    >
      {children}
    </LangContext.Provider>
  );
}
