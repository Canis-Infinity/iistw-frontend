'use client';
import { useState, useEffect, createContext } from 'react';
export const LangContext = createContext();

export function LangProviders({ children }) {
  const [lang, setLang] = useState('tw');

  useEffect(() => {
    const currentLang = localStorage.getItem('iistw-lang');
    if (currentLang) {
      setLang(currentLang);
    }
  }, []);

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