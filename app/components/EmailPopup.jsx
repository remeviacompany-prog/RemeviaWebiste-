'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';

const DELAY_MS = 3000;
const SEEN_KEY = 'remevia-popup-seen';
const REMIND_AFTER_MS = 30 * 24 * 60 * 60 * 1000;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const hasSeenRecently = () => {
  // While developing, show it on every full page load so it can be reviewed.
  if (process.env.NODE_ENV === 'development') return false;
  try {
    return Date.now() - Number(localStorage.getItem(SEEN_KEY) || 0) < REMIND_AFTER_MS;
  } catch (e) {
    return false;
  }
};

const rememberSeen = () => {
  try {
    localStorage.setItem(SEEN_KEY, String(Date.now()));
  } catch (e) {
    // localStorage unavailable
  }
};

export default function EmailPopup() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const dialog = useRef(null);
  const [email, setEmail] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Someone landing on the contact page is already filling in a form.
    if (pathname === '/contact' || hasSeenRecently()) return undefined;
    const timer = setTimeout(() => {
      dialog.current?.showModal();
      rememberSeen();
    }, DELAY_MS);
    return () => clearTimeout(timer);
    // Runs once per visit: moving between pages must not restart the timer.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const close = () => dialog.current?.close();

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = email.trim();
    if (!value) {
      close();
      return;
    }
    if (!EMAIL.test(value)) {
      setInvalid(true);
      return;
    }
    // Connect the mailing-list service here: send `value` to it.
    setInvalid(false);
    setDone(true);
  };

  return (
    <dialog
      ref={dialog}
      className="popup"
      aria-labelledby="popup-title"
      onClick={(e) => { if (e.target === dialog.current) close(); }}
    >
      <div className="popup__panel">
        <button type="button" className="popup__close" onClick={close} aria-label={t("Close")}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>

        <div className="popup__art" aria-hidden="true">
          <span className="popup__disc popup__disc--a"><img src="/assets/img/tlegg.webp" alt="" /></span>
          <span className="popup__disc popup__disc--b"><img src="/assets/img/eksit-crd.webp" alt="" /></span>
          <span className="popup__disc popup__disc--c"><img src="/assets/img/tl-healer.webp" alt="" /></span>
        </div>

        <div className="popup__body">
          {done ? (
            <div className="popup__done" role="status">
              <span className="popup__tick" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.2 4.2L19 7" /></svg>
              </span>
              <h2 id="popup-title">{t("Thank you. You're on the list.")}</h2>
              <p>{t("We'll send field results and dosing guides to {email}.", { email: email.trim() })}</p>
              <button type="button" className="btn btn--grad" onClick={close}>{t("Continue to the website")}</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <span className="eyebrow">{t("The Remevia field brief")}</span>
              <h2 id="popup-title">{t("Stay ahead of the antibiotic-free shift")}</h2>
              <p>{t("Field results, dosing guides and product news for poultry and livestock producers.")}</p>

              <label className={`field ${invalid ? 'has-error' : ''}`}>
                {t("Work email (optional)")}
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setInvalid(false); }}
                />
                {invalid && <span className="err">{t("Enter a valid email address.")}</span>}
              </label>

              <button type="submit" className="btn btn--grad">
                {email.trim() ? t("Keep me updated") : t("Continue to the website")}
              </button>
              <small>{t("Optional. No spam, and you can unsubscribe at any time.")}</small>
            </form>
          )}
        </div>
      </div>
    </dialog>
  );
}
