'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { Icon } from './icons';

const PRODUCT_LINKS = [
  ['TLTREAT', '/products/tltreat', 'Gut health & growth'],
  ['CURTECT-CRD', '/products/curtect-crd', 'Respiratory support'],
  ['EKSIT-CRD', '/products/eksit-crd', 'CRD & Mycoplasma'],
  ['TLEGG', '/products/tlegg', 'Egg quality'],
  ['TLREPEAL', '/products/tlrepeal', 'Red mite control'],
  ['TL HEALER', '/products/tl-healer', 'Wounds & skin'],
];

// Descriptive anchor text for the problems farmers search for.
const SOLUTION_LINKS = [
  ['Natural AGP alternative for broilers', '/products/tltreat'],
  ['Poultry respiratory support', '/products/curtect-crd'],
  ['Mycoplasma & CRD control', '/products/eksit-crd'],
  ['Egg yolk colour & quality', '/products/tlegg'],
  ['Red mite control for layers', '/products/tlrepeal'],
  ['Wound care & fly repellent', '/products/tl-healer'],
  ['Antibiotic-free poultry farming', '/science'],
];

export default function Footer() {
  const { t } = useLanguage();
  const [newsEmail, setNewsEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsEmail)) {
      setSubscribed(true);
      setNewsEmail('');
    }
  };

  return (
    <>
      <footer className="footer footer--seo">
        <div className="wrap">
          <div className="footer__top">
            <div className="footer__brand">
              <Link href="/" aria-label={t("Remevia home")}>
                <img src="/assets/img/logo-footer.png" alt="Remevia" width="369" height="256" />
              </Link>
              <p>{t("Remevia makes plant-based feed and water additives that replace antibiotics in poultry and livestock farming. Every formula is made in Kerala, India from standardised botanical actives, with no antibiotic residues.")}</p>
              <div className="social">
                <a href="#" aria-label={t("Remevia on LinkedIn")}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M6 9v9M6 6v.01M10 18v-5a3 3 0 0 1 6 0v5M10 9v9"/>
                  </svg>
                </a>
                <a href="#" aria-label={t("Remevia on YouTube")}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="6" width="18" height="12" rx="4"/>
                    <path d="M10 9.5v5l4.5-2.5z"/>
                  </svg>
                </a>
                <a href="#" aria-label={t("Remevia on Instagram")}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="4" y="4" width="16" height="16" rx="5"/>
                    <circle cx="12" cy="12" r="3.5"/>
                    <path d="M17 7v.01"/>
                  </svg>
                </a>
                <a href="https://wa.me/917994764845" aria-label={t("Chat with Remevia on WhatsApp")}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 20l1.3-4.2A8.2 8.2 0 1 1 8.4 19z"/>
                    <path d="M9 8.5c0 3.4 3 6.5 6.5 6.5l1-1.6-2-1-1 1c-1.2-.4-2.5-1.7-2.9-2.9l1-1-1-2z"/>
                  </svg>
                </a>
              </div>
            </div>

            <nav className="footer__col" aria-label={t("Products")}>
              <h4>{t("Products")}</h4>
              <ul>
                {PRODUCT_LINKS.map(([name, href, cat]) => (
                  <li key={name}><Link href={href}><b>{name}</b><small>{t(cat)}</small></Link></li>
                ))}
              </ul>
            </nav>

            <nav className="footer__col" aria-label={t("Solutions")}>
              <h4>{t("Solutions")}</h4>
              <ul>
                {SOLUTION_LINKS.map(([label, href]) => (
                  <li key={label}><Link href={href}>{t(label)}</Link></li>
                ))}
              </ul>
            </nav>

            <nav className="footer__col" aria-label={t("Company")}>
              <h4>{t("Company")}</h4>
              <ul>
                <li><Link href="/about">{t("About us")}</Link></li>
                <li><Link href="/science">{t("Science & quality")}</Link></li>
                <li><Link href="/science#quality">{t("Quality control")}</Link></li>
                <li><Link href="/products">{t("All products")}</Link></li>
                <li><Link href="/products#dosing">{t("Dosing guide")}</Link></li>
                <li><Link href="/#programme">{t("Flock Programme Builder")}</Link></li>
                <li><Link href="/contact?type=distributor">{t("Distributors")}</Link></li>
                <li><Link href="/contact">{t("Contact")}</Link></li>
              </ul>
            </nav>

            <div className="footer__col footer__contact">
              <h4>{t("Reach us")}</h4>
              <address>
                <span><Icon name="pin" size={18} /><span>Remevia Pvt. Ltd.<br />Edakulam P.O, Irinjalakuda, Pin 680 688,<br />Thrissur Dist, Kerala, India</span></span>
                <a href="tel:+917994764845"><Icon name="phone" size={18} />+91 79947 64845</a>
                <a href="https://wa.me/917994764845"><Icon name="chat" size={18} />{t("WhatsApp us")}</a>
                <a href="mailto:care@remevia.in"><Icon name="mail" size={18} />care@remevia.in</a>
              </address>
            </div>
          </div>

          <div className="footer__band">
            <div className="footer__markets">
              <h4>{t("Markets we serve")}</h4>
              <ul>
                {['India', 'Middle East', 'South Asia', 'Southeast Asia'].map((m) => <li key={m}><Icon name="globe" size={15} />{t(m)}</li>)}
              </ul>
            </div>
            <div className="footer__newsbox">
              <h4>{t("Field results in your inbox")}</h4>
              <form className="footer__news" onSubmit={handleNewsletter} noValidate>
                <label className="sr-only" htmlFor="news-email">{t("Email address")}</label>
                <input
                  id="news-email"
                  type="email"
                  value={newsEmail}
                  onChange={(e) => setNewsEmail(e.target.value)}
                  placeholder={subscribed ? t("Subscribed. Thank you!") : t("Work email")}
                  autoComplete="email"
                />
                <button className="btn btn--sm footer__subscribe" type="submit">
                  {subscribed ? t("Subscribed") : t("Subscribe")}
                </button>
              </form>
            </div>
          </div>

          <div className="footer__bottom">
            <span>{t("© {year} Remevia Pvt. Ltd. All rights reserved.", { year: new Date().getFullYear() })}</span>
            <span className="footer__made"><Icon name="sprout" size={15} />{t("Made in God's Own Country, Kerala, India")}</span>
            <nav aria-label={t("Legal")}>
              <a href="#">{t("Privacy policy")}</a>
              <a href="#">{t("Terms of use")}</a>
              <a href="#">{t("Cookie settings")}</a>
            </nav>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Action */}
      <a className="wa-float" href="https://wa.me/917994764845" aria-label={t("Chat with Remevia on WhatsApp")}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 20l1.3-4.2A8.2 8.2 0 1 1 8.4 19z"/>
          <path d="M9 8.5c0 3.4 3 6.5 6.5 6.5l1-1.6-2-1-1 1c-1.2-.4-2.5-1.7-2.9-2.9l1-1-1-2z"/>
        </svg>
      </a>
    </>
  );
}
