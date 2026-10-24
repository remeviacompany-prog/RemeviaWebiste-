'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [prodDropdownOpen, setProdDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setMenuOpen(false);
    setProdDropdownOpen(false);
  }, [pathname]);

  // Click outside dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProdDropdownOpen(false);
      }
    };
    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, []);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>

      {/* Main Header */}
      <header className={`header ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="wrap">
          <Link className="brand" href="/" aria-label="Remevia home">
            <img src="/assets/img/logo.png" alt="Remevia — powered by nature" width="429" height="310" />
          </Link>

          <nav className={`nav ${menuOpen ? 'is-open' : ''}`} id="site-nav" aria-label="Main">
            <Link href="/" aria-current={pathname === '/' ? 'page' : undefined}>
              {t('nav.home', 'Home')}
            </Link>

            <div className={`has-menu ${prodDropdownOpen ? 'is-open' : ''}`} ref={dropdownRef}>
              <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                <Link 
                  href="/products" 
                  aria-current={pathname.startsWith('/products') ? 'page' : undefined}
                  onClick={() => setProdDropdownOpen(false)}
                >
                  {t('nav.products', 'Products')}
                </Link>
                <button 
                  className="nav__drop-toggle" 
                  type="button" 
                  aria-expanded={prodDropdownOpen}
                  aria-label="Toggle products dropdown"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setProdDropdownOpen(!prodDropdownOpen);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px 6px 8px 0',
                    display: 'inline-flex',
                    alignItems: 'center',
                    color: 'inherit'
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '16px', height: '16px' }}>
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
              </div>
              
              <div className="menu" id="menu-products">
                <Link href="/products/tltreat" onClick={() => setProdDropdownOpen(false)}>
                  <span className="menu__swatch" style={{ background: '#B5692A' }}></span>
                  <span><b>TLTREAT</b><small>Natural AGP replacer</small></span>
                </Link>
                <Link href="/products/curtect-crd" onClick={() => setProdDropdownOpen(false)}>
                  <span className="menu__swatch" style={{ background: '#1B7EC0' }}></span>
                  <span><b>CURTECT-CRD</b><small>Respiratory support for CRD</small></span>
                </Link>
                <Link href="/products/tlegg" onClick={() => setProdDropdownOpen(false)}>
                  <span className="menu__swatch" style={{ background: '#7DBE3F' }}></span>
                  <span><b>TLEGG</b><small>Egg yolk colour enhancer</small></span>
                </Link>
                <Link href="/products/tlrepeal" onClick={() => setProdDropdownOpen(false)}>
                  <span className="menu__swatch" style={{ background: '#D7262E' }}></span>
                  <span><b>TLREPEAL</b><small>Avian red mite solution</small></span>
                </Link>
                <Link href="/products/tl-healer" onClick={() => setProdDropdownOpen(false)}>
                  <span className="menu__swatch" style={{ background: '#EE8A1C' }}></span>
                  <span><b>TL HEALER</b><small>Wounds & tick bites</small></span>
                </Link>
                <Link className="menu__all" href="/products" onClick={() => setProdDropdownOpen(false)}>
                  View all products and dosing guide
                </Link>
              </div>
            </div>

            <Link href="/science" aria-current={pathname === '/science' ? 'page' : undefined}>
              {t('nav.science', 'Science')}
            </Link>
            <Link href="/about" aria-current={pathname === '/about' ? 'page' : undefined}>
              {t('nav.about', 'About')}
            </Link>
            <Link href="/contact" aria-current={pathname === '/contact' ? 'page' : undefined}>
              {t('nav.contact', 'Contact')}
            </Link>
            <Link className="btn nav__cta" href="/contact?type=trial">
              {t('cta.trial', 'Request a free trial')}
            </Link>
          </nav>

          <div className="header__tools">
            <label className="lang">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9"/>
                <path d="M3 12h18M12 3c2.6 2.6 3.9 5.6 3.9 9s-1.3 6.4-3.9 9c-2.6-2.6-3.9-5.6-3.9-9S9.4 5.6 12 3z"/>
              </svg>
              <span className="sr-only">Language</span>
              <select value={lang} onChange={(e) => setLang(e.target.value)}>
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
                <option value="ar">العربية</option>
                <option value="vi">Tiếng Việt</option>
                <option value="es">Español</option>
              </select>
            </label>

            <Link className="btn btn--sm" href="/contact?type=trial">
              {t('cta.trial', 'Request a free trial')}
            </Link>

            <button 
              className="burger" 
              type="button" 
              aria-expanded={menuOpen}
              aria-controls="site-nav" 
              aria-label="Open menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16"/>
              </svg>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
