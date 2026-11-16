'use client';

import React, { useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import { PRODUCTS_DATA } from '../data/products';
import { Icon } from './icons';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PRODUCTS = ['TLTREAT', 'CURTECT-CRD', 'EKSIT-CRD', 'TLEGG', 'TLREPEAL', 'TL HEALER'];
const EMPTY = { name: '', company: '', email: '', phone: '', country: '', business: '', flock: '', message: '', website: '', consent: false };

// The product a visitor is looking at, so the form starts with it ticked.
const productFromPath = (path) => {
  const slug = path.split('/').filter(Boolean).pop();
  return Object.values(PRODUCTS_DATA).find((p) => p.slug === slug)?.name;
};

export default function CtaSection() {
  const { t } = useLanguage();
  const pathname = usePathname() || '/';
  const dialog = useRef(null);
  const [form, setForm] = useState(EMPTY);
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | failed

  // The contact page is already the full enquiry form.
  if (pathname.startsWith('/contact')) return null;

  const set = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const open = () => {
    if (status === 'sent') { setForm(EMPTY); setStatus('idle'); }
    const current = productFromPath(pathname);
    setProducts((p) => (current && !p.includes(current) ? [...p, current] : p));
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();

  const toggle = (name) => setProducts((p) => (p.includes(name) ? p.filter((x) => x !== name) : [...p, name]));

  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = 'Enter your name.';
    if (!EMAIL.test(form.email.trim())) er.email = 'Enter a valid email address.';
    if (!form.phone.trim()) er.phone = 'Enter a phone number.';
    if (!form.country.trim()) er.country = 'Enter your country.';
    if (!form.consent) er.consent = 'Please agree to the privacy policy.';
    setErrors(er);
    if (Object.keys(er).length) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, products, type: 'Free trial', page: pathname }),
      });
      setStatus(res.ok ? 'sent' : 'failed');
    } catch {
      setStatus('failed');
    }
  };

  const field = (key, label, props = {}) => (
    <label className={`field ${errors[key] ? 'has-error' : ''}`}>
      {t(label)}
      <input name={key} value={form[key]} onChange={set(key)} {...props} />
      {errors[key] && <span className="err">{t(errors[key])}</span>}
    </label>
  );

  return (
    <>
      <section className="cta cta--compact">
        <div className="wrap">
          <h2><span className="cta__badge" aria-hidden="true"><Icon name="leaf" size={20} strokeWidth={2} /></span>{t("Ready to go antibiotic-free?")}</h2>
          <button type="button" className="btn btn--marigold cta__btn" onClick={open} aria-haspopup="dialog">
            {t("Request a free trial")}
            <Icon name="arrow" size={18} strokeWidth={2.2} className="cta__arrow" />
          </button>
        </div>
      </section>

      <dialog
        ref={dialog}
        className="popup popup--enquiry"
        aria-labelledby="enquiry-title"
        onClick={(e) => { if (e.target === dialog.current) close(); }}
      >
        <button type="button" className="popup__close" onClick={close} aria-label={t("Close")}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>

        {status === 'sent' ? (
          <div className="enq__done" role="status">
            <span className="popup__tick" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.2 4.2L19 7" /></svg>
            </span>
            <h2 id="enquiry-title">{t("Thank you. Your enquiry was sent and our team will reply within one working day.")}</h2>
            <button type="button" className="btn btn--grad" onClick={close}>{t("Continue to the website")}</button>
          </div>
        ) : (
          <form className="enq" onSubmit={submit} noValidate>
            <div className="enq__head">
              <h2 id="enquiry-title">{t("Request a free trial")}</h2>
              <p>{t("Tell us about your operation. A Remevia expert will recommend a programme and set up a field trial on your farm or feed mill.")}</p>
            </div>

            {field('name', 'Full name *', { autoComplete: 'name', required: true })}
            {field('company', 'Company', { autoComplete: 'organization' })}
            {field('email', 'Work email *', { type: 'email', autoComplete: 'email', required: true })}
            {field('phone', 'Phone / WhatsApp *', { type: 'tel', autoComplete: 'tel', required: true })}
            {field('country', 'Country *', { autoComplete: 'country-name', required: true })}

            <label className="field">{t("Business type")}
              <select name="business" value={form.business} onChange={set('business')}>
                <option value="">{t("Choose one")}</option>
                {['Poultry farm', 'Integrator', 'Feed mill', 'Distributor', 'Veterinarian', 'Other'].map((b) => (
                  <option key={b} value={b}>{t(b)}</option>
                ))}
              </select>
            </label>

            <label className="field full">{t("Flock size")}
              <select name="flock" value={form.flock} onChange={set('flock')}>
                <option value="">{t("Choose one")}</option>
                <option value="Under 10,000 birds">{t("Under 10,000 birds")}</option>
                <option>10,000 – 50,000</option>
                <option>50,000 – 200,000</option>
                <option value="Over 200,000">{t("Over 200,000")}</option>
                <option value="Not applicable">{t("Not applicable")}</option>
              </select>
            </label>

            <fieldset className="full enq__products">
              <legend>{t("Products of interest")}</legend>
              <div className="checks">
                {PRODUCTS.map((name) => (
                  <label key={name}>
                    <input type="checkbox" checked={products.includes(name)} onChange={() => toggle(name)} />
                    {name}
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="field full">{t("Message")}
              <textarea name="message" rows="3" value={form.message} onChange={set('message')} placeholder={t("Your challenge, current programme or questions")} />
            </label>

            {/* Honeypot: hidden from people, filled in by bots */}
            <input className="enq__trap" name="website" tabIndex="-1" autoComplete="off" value={form.website} onChange={set('website')} aria-hidden="true" />

            <label className={`consent full ${errors.consent ? 'has-error' : ''}`}>
              <input type="checkbox" checked={form.consent} onChange={set('consent')} />
              <span>{t("I agree that Remevia may contact me about this enquiry.")}</span>
            </label>
            {errors.consent && <span className="err full enq__err">{t(errors.consent)}</span>}

            {status === 'failed' && (
              <p className="enq__fail full" role="alert">{t("Something went wrong. Please try again or email care@remevia.in.")}</p>
            )}

            <button className="btn btn--grad full" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? t("Sending…") : t("Send enquiry")}
            </button>
          </form>
        )}
      </dialog>
    </>
  );
}
