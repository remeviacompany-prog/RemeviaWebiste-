'use client';

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { LANGUAGES, LANG_KEY } from '../i18n/languages';

// Each dictionary loads only when its language is selected.
const LOADERS = {
  es: () => import('../i18n/locales/es.json'),
  ar: () => import('../i18n/locales/ar.json'),
  kk: () => import('../i18n/locales/kk.json'),
  hi: () => import('../i18n/locales/hi.json'),
  id: () => import('../i18n/locales/id.json'),
  th: () => import('../i18n/locales/th.json'),
};

const isRtlLang = (code) => Boolean(LANGUAGES.find((l) => l.code === code)?.rtl);

const interpolate = (text, vars) =>
  vars ? text.replace(/\{(\w+)\}/g, (match, key) => (key in vars ? vars[key] : match)) : text;

const LanguageContext = createContext({
  lang: 'en',
  setLang: () => {},
  t: (text, vars) => interpolate(text, vars),
  tx: (value) => value,
  isRtl: false,
});

/**
 * Renders a translated string containing <b>…</b> or <a>…</a> markup, so a
 * translation can move the emphasised words or link to fit its grammar.
 */
export function rich(text, linkProps = {}) {
  return text.split(/(<(?:b|a)>.*?<\/(?:b|a)>)/g).map((part, idx) => {
    const match = part.match(/^<(b|a)>(.*)<\/\1>$/);
    if (!match) return part;
    return match[1] === 'b'
      ? <b key={idx}>{match[2]}</b>
      : <a key={idx} {...linkProps}>{match[2]}</a>;
  });
}

export function LanguageProvider({ children }) {
  const [state, setState] = useState({ lang: 'en', dict: null });
  const requestId = useRef(0);
  const dictRef = useRef(null);
  const englishTitle = useRef(null);
  const appliedTitle = useRef(null);

  const applyLang = useCallback(async (code) => {
    const id = ++requestId.current;
    let dict = null;
    try {
      if (LOADERS[code]) dict = (await LOADERS[code]()).default;
      // A newer selection was made while this dictionary was loading.
      if (id !== requestId.current) return;
      setState({ lang: code, dict });
    } catch (e) {
      // The dictionary failed to load, so stay on the current language.
    } finally {
      if (id === requestId.current) {
        document.documentElement.removeAttribute('data-i18n-pending');
      }
    }
  }, []);

  useEffect(() => {
    let saved = null;
    try {
      saved = localStorage.getItem(LANG_KEY);
    } catch (e) {
      // localStorage unavailable
    }
    if (saved && LOADERS[saved]) applyLang(saved);
    else document.documentElement.removeAttribute('data-i18n-pending');
  }, [applyLang]);

  const setLang = useCallback((code) => {
    try {
      localStorage.setItem(LANG_KEY, code);
    } catch (e) {
      // localStorage unavailable
    }
    applyLang(code);
  }, [applyLang]);

  useEffect(() => {
    document.documentElement.lang = state.lang;
    document.documentElement.dir = isRtlLang(state.lang) ? 'rtl' : 'ltr';
  }, [state.lang]);

  // Next.js sets each page's English <title> on navigation; translate it in place.
  useEffect(() => {
    dictRef.current = state.dict;
    const syncTitle = () => {
      const current = document.title;
      // Any title we did not set ourselves is a new English one from Next.js.
      if (current !== appliedTitle.current) englishTitle.current = current;
      const wanted = dictRef.current?.[englishTitle.current] ?? englishTitle.current;
      appliedTitle.current = wanted;
      if (wanted !== current) document.title = wanted;
    };
    syncTitle();
    const observer = new MutationObserver(syncTitle);
    observer.observe(document.head, { subtree: true, childList: true, characterData: true });
    return () => observer.disconnect();
  }, [state.dict]);

  const t = useCallback(
    (text, vars) => interpolate(state.dict?.[text] ?? text, vars),
    [state.dict]
  );

  // Translates every string in a data object. Product names, paths and other
  // values with no dictionary entry pass through unchanged.
  const tx = useCallback(function walk(value) {
    if (typeof value === 'string') return state.dict?.[value] ?? value;
    if (Array.isArray(value)) return value.map(walk);
    if (value && typeof value === 'object') {
      return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, walk(v)]));
    }
    return value;
  }, [state.dict]);

  return (
    <LanguageContext.Provider value={{ lang: state.lang, setLang, t, tx, isRtl: isRtlLang(state.lang) }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
