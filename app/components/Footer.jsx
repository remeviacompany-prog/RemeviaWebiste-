'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { Icon } from './icons';

const ADDRESS = 'Remevia Pvt. Ltd., Padiyur P.O, Pin - 680688, Thrissur Dist., Kerala, India';

// Copies a contact detail with one tap, so visitors don't have to select text on a phone.
function CopyButton({ text, label }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement('textarea');
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }
    setDone(true);
    setTimeout(() => setDone(false), 1600);
  };
  return (
    <button type="button" className={`copy ${done ? 'is-done' : ''}`} onClick={copy} aria-label={label} title={label}>
      <Icon name={done ? 'check' : 'copy'} size={15} />
    </button>
  );
}

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
  return (
    <>
      <footer className="footer footer--seo">
        <div className="wrap">
          <div className="footer__top">
            <div className="footer__brand">
              <Link href="/" aria-label={t("Remevia home")}>
                <img src="/assets/img/logo.png" alt="Remevia, powered by nature" width="429" height="310" />
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

            <nav className="footer__col footer__col--blue" aria-label={t("Products")}>
              <h4>{t("Products")}</h4>
              <ul>
                {PRODUCT_LINKS.map(([name, href]) => (
                  <li key={name}><Link href={href}>{name}</Link></li>
                ))}
              </ul>
            </nav>

            <nav className="footer__col footer__col--teal" aria-label={t("Solutions")}>
              <h4>{t("Solutions")}</h4>
              <ul>
                {SOLUTION_LINKS.map(([label, href]) => (
                  <li key={label}><Link href={href}>{t(label)}</Link></li>
                ))}
              </ul>
            </nav>

            <nav className="footer__col footer__col--green" aria-label={t("Company")}>
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

            <div className="footer__col footer__col--navy footer__contact">
              <h4>{t("Reach us")}</h4>
              <address>
                <span className="footer__line">
                  <Icon name="pin" size={18} />
                  <span>Padiyur P.O, Thrissur, Kerala 680688, India</span>
                  <CopyButton text={ADDRESS} label={t("Copy address")} />
                </span>
                <span className="footer__line">
                  <Icon name="phone" size={18} />
                  <a href="tel:+917994764845">+91 799 476 4845</a>
                  <CopyButton text="+91 799 476 4845" label={t("Copy phone number")} />
                </span>
                <span className="footer__line">
                  <Icon name="mail" size={18} />
                  <a href="mailto:care@remevia.in">care@remevia.in</a>
                  <CopyButton text="care@remevia.in" label={t("Copy email address")} />
                </span>
                <span className="footer__line">
                  <Icon name="chat" size={18} />
                  <a href="https://wa.me/917994764845">{t("WhatsApp us")}</a>
                </span>
                <span className="footer__line">
                  <Icon name="globe" size={18} />
                  <a href="https://www.remevia.in">www.remevia.in</a>
                </span>
              </address>
              <p className="footer__cin">CIN: U15499KL2007PTC021494</p>
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
