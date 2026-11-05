'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

/** The nutrition-label panel used across the site: a title, then ruled rows of facts. */
export function FormulaFacts({ title, sub, rows, foot, className = '' }) {
  return (
    <aside className={`facts ${className}`}>
      <h2 className="facts__title">{title}</h2>
      {sub && <p className="facts__sub">{sub}</p>}
      <dl>
        {rows.map((row) => (
          <div key={row.label} className={row.highlight ? 'is-key' : ''}>
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
      {foot && <p className="facts__foot">{foot}</p>}
    </aside>
  );
}

export default function PageHero({ crumb, title, lede, scene = 'science', facts, children }) {
  const { t } = useLanguage();
  return (
    <section className={`phero phero--${scene}`}>
      <div className={`wrap phero__grid ${facts ? '' : 'phero__grid--solo'}`}>
        <div className="phero__copy">
          <nav className="crumbs hero-in" style={{ '--d': '0s' }} aria-label={t("Breadcrumb")}>
            <Link href="/">{t("Home")}</Link>
            <span aria-hidden="true">/</span>
            <span>{crumb}</span>
          </nav>
          <h1 className="hero-in" style={{ '--d': '.08s' }}>{title}</h1>
          <p className="lede hero-in" style={{ '--d': '.16s' }}>{lede}</p>
          {children && <div className="phero__extra hero-in" style={{ '--d': '.24s' }}>{children}</div>}
        </div>
        {facts && (
          <div className="phero__art hero-in" style={{ '--d': '.2s' }}>
            <FormulaFacts {...facts} />
          </div>
        )}
      </div>
    </section>
  );
}
