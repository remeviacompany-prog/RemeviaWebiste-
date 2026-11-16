'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import { Icon } from './icons';

const EVENT = 'remevia:datasheet';
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY = { name: '', company: '', phone: '', email: '', website: '' };

// Any button on the site opens the one shared dialog by firing this event.
export function DatasheetButton({ product, doc = 'Datasheet', className = 'btn', style, children }) {
  const open = () => window.dispatchEvent(new CustomEvent(EVENT, { detail: { product, doc } }));
  return (
    <button type="button" className={className} style={style} onClick={open} aria-haspopup="dialog">
      {children}
    </button>
  );
}

// "View details" button that requests buyer details (Name, Company, WhatsApp) before viewing full product specifications
export function ViewDetailsButton({ product, href, className = 'btn', style, children }) {
  const handleClick = (e) => {
    // If buyer details have already been captured in this browsing session, allow direct navigation
    try {
      if (sessionStorage.getItem('remevia_user_captured')) {
        return; // default Link navigation proceeds
      }
    } catch {}

    e.preventDefault();
    window.dispatchEvent(
      new CustomEvent(EVENT, {
        detail: {
          product,
          doc: 'Product Details',
          targetUrl: href,
          isViewDetails: true,
        },
      })
    );
  };

  return (
    <Link href={href} className={className} style={style} onClick={handleClick} aria-haspopup="dialog">
      {children}
    </Link>
  );
}

// Asks for contact details before a datasheet or product details access, and passes the request to the team.
export default function DatasheetRequest() {
  const { t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname() || '/';
  const dialog = useRef(null);
  const [request, setRequest] = useState({ product: '', doc: 'Datasheet', targetUrl: null, isViewDetails: false });
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | failed

  useEffect(() => {
    // Prefill form from localStorage if the user previously submitted
    try {
      const saved = localStorage.getItem('remevia_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          setForm((prev) => ({ ...prev, ...parsed }));
        }
      }
    } catch {}

    const onOpen = (e) => {
      setRequest({
        product: e.detail?.product || '',
        doc: e.detail?.doc || 'Datasheet',
        targetUrl: e.detail?.targetUrl || null,
        isViewDetails: Boolean(e.detail?.isViewDetails),
      });
      setStatus((s) => (s === 'sent' ? 'idle' : s));
      setErrors({});
      dialog.current?.showModal();
    };

    window.addEventListener(EVENT, onOpen);
    return () => window.removeEventListener(EVENT, onOpen);
  }, []);

  const close = () => dialog.current?.close();

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = 'Enter your name.';
    if (!form.company.trim()) er.company = 'Enter your company name.';
    if (form.phone.replace(/\D/g, '').length < 7) er.phone = 'Enter your WhatsApp number with country code.';
    if (form.email.trim() && !EMAIL.test(form.email.trim())) er.email = 'Enter a valid email address.';
    setErrors(er);
    if (Object.keys(er).length) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          kind: 'document',
          type: request.isViewDetails ? 'Product details request' : `${request.doc} request`,
          products: request.product ? [request.product] : [],
          page: pathname,
        }),
      });

      if (res.ok) {
        // Save user details so they don't have to fill them again in this session
        try {
          localStorage.setItem('remevia_user', JSON.stringify(form));
          sessionStorage.setItem('remevia_user_captured', 'true');
        } catch {}

        if (request.targetUrl) {
          dialog.current?.close();
          router.push(request.targetUrl);
        } else {
          setForm(EMPTY);
          setStatus('sent');
        }
      } else {
        setStatus('failed');
      }
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

  const title = request.product ? `${request.product} · ${t(request.doc)}` : t(request.doc);

  return (
    <dialog
      ref={dialog}
      className="popup popup--enquiry popup--sheet"
      aria-labelledby="sheet-title"
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
          <h2 id="sheet-title">{t("Thank you. We will send the document to your WhatsApp shortly.")}</h2>
          <button type="button" className="btn btn--grad" onClick={close}>{t("Continue to the website")}</button>
        </div>
      ) : (
        <form className="enq" onSubmit={submit} noValidate>
          <div className="enq__head">
            <span className="sheet__badge"><Icon name="file" size={18} />{title}</span>
            <h2 id="sheet-title">
              {request.isViewDetails ? t("View product details") : t("Get the datasheet")}
            </h2>
            <p>
              {request.isViewDetails
                ? t("Please enter your details to view full formulation specifications and dosing protocols.")
                : t("Share your details and we will send the document to your WhatsApp.")}
            </p>
          </div>

          {field('name', 'Full name *', { autoComplete: 'name', required: true })}
          {field('company', 'Company name *', { autoComplete: 'organization', required: true })}
          {field('phone', 'WhatsApp number *', { type: 'tel', autoComplete: 'tel', inputMode: 'tel', placeholder: '+91 98765 43210', required: true })}
          {field('email', 'Email (optional)', { type: 'email', autoComplete: 'email' })}

          {/* Honeypot: hidden from people, filled in by bots */}
          <input className="enq__trap" name="website" tabIndex="-1" autoComplete="off" value={form.website} onChange={set('website')} aria-hidden="true" />

          {status === 'failed' && (
            <p className="enq__fail full" role="alert">{t("Something went wrong. Please try again or email care@remevia.in.")}</p>
          )}

          <button className="btn btn--grad full" type="submit" disabled={status === 'sending'}>
            {status === 'sending'
              ? (request.isViewDetails ? t("Opening…") : t("Sending…"))
              : (request.isViewDetails ? t("Continue to product details →") : t("Send me the datasheet"))}
          </button>
        </form>
      )}
    </dialog>
  );
}