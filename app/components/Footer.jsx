'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

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
      <footer className="footer">
        <div className="wrap">
          <div className="footer__grid">
            <div className="footer__brand">
              <img src="/assets/img/logo-white.png" alt="Remevia — powered by nature" width="429" height="310" />
              <p>Science-backed botanical solutions for antibiotic-free poultry and livestock.</p>
              <div className="social">
                <a href="#" aria-label="Remevia on LinkedIn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M6 9v9M6 6v.01M10 18v-5a3 3 0 0 1 6 0v5M10 9v9"/>
                  </svg>
                </a>
                <a href="#" aria-label="Remevia on YouTube">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="6" width="18" height="12" rx="4"/>
                    <path d="M10 9.5v5l4.5-2.5z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Remevia on Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="4" y="4" width="16" height="16" rx="5"/>
                    <circle cx="12" cy="12" r="3.5"/>
                    <path d="M17 7v.01"/>
                  </svg>
                </a>
                <a href="https://wa.me/917994764845" aria-label="Chat with Remevia on WhatsApp">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 20l1.3-4.2A8.2 8.2 0 1 1 8.4 19z"/>
                    <path d="M9 8.5c0 3.4 3 6.5 6.5 6.5l1-1.6-2-1-1 1c-1.2-.4-2.5-1.7-2.9-2.9l1-1-1-2z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4>{t('f.products', 'Products')}</h4>
              <ul>
                <li><Link href="/products/tltreat">TLTREAT</Link></li>
                <li><Link href="/products/curtect-crd">CURTECT-CRD</Link></li>
                <li><Link href="/products/tlegg">TLEGG</Link></li>
                <li><Link href="/products/tlrepeal">TLREPEAL</Link></li>
                <li><Link href="/products/tl-healer">TL HEALER</Link></li>
              </ul>
            </div>

            <div>
              <h4>{t('f.company', 'Company')}</h4>
              <ul>
                <li><Link href="/science">Science & quality</Link></li>
                <li><Link href="/about">About us</Link></li>
                <li><Link href="/products#dosing">Dosing guide</Link></li>
                <li><Link href="/contact?type=distributor">Distributors</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4>{t('f.reach', 'Reach us')}</h4>
              <ul>
                <li>Edakulam P.O, Irinjalakuda, Pin 680 688,<br />Thrissur Dist, Kerala, India</li>
                <li><a href="tel:+917994764845">+91 79947 64845</a></li>
                <li><a href="mailto:info@remevia.in">info@remevia.in</a></li>
              </ul>
              <p style={{ marginTop: '22px', color: '#fff', fontWeight: 600 }}>
                {t('f.news', 'Field results in your inbox')}
              </p>
              <form className="footer__news" onSubmit={handleNewsletter} noValidate>
                <label className="sr-only" htmlFor="news-email">Email address</label>
                <input 
                  id="news-email" 
                  type="email" 
                  value={newsEmail}
                  onChange={(e) => setNewsEmail(e.target.value)}
                  placeholder={subscribed ? "Subscribed. Thank you!" : "Work email"} 
                  autoComplete="email" 
                />
                <button className="btn btn--sm btn--grad" type="submit">
                  {subscribed ? "Subscribed" : "Subscribe"}
                </button>
              </form>
            </div>
          </div>

          <div className="footer__bottom">
            <span>© {new Date().getFullYear()} Remevia Pvt. Ltd. All rights reserved.</span>
            <nav aria-label="Legal">
              <a href="#">Privacy policy</a>
              <a href="#">Terms of use</a>
              <a href="#">Cookie settings</a>
            </nav>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Action */}
      <a className="wa-float" href="https://wa.me/917994764845" aria-label="Chat with Remevia on WhatsApp">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 20l1.3-4.2A8.2 8.2 0 1 1 8.4 19z"/>
          <path d="M9 8.5c0 3.4 3 6.5 6.5 6.5l1-1.6-2-1-1 1c-1.2-.4-2.5-1.7-2.9-2.9l1-1-1-2z"/>
        </svg>
      </a>
    </>
  );
}
