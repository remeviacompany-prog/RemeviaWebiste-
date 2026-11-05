'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import DoseCalculator from './DoseCalculator';
import CtaSection from './CtaSection';
import { FormulaFacts } from './PageHero';
import { PRODUCTS_DATA } from '../data/products';
import { useLanguage } from '../context/LanguageContext';

export default function ProductDetailPage({ product: source }) {
  const { t, tx } = useLanguage();
  if (!source) return null;
  const product = tx(source);

  return (
    <>
      {/* Product Hero */}
      <section className={`dhero ${product.cls}`}>
        <div className="wrap dhero__grid">
          <div className="dhero__copy">
            <nav className="crumbs hero-in" style={{ '--d': '0s' }} aria-label={t("Breadcrumb")}>
              <Link href="/">{t("Home")}</Link>
              <span aria-hidden="true">/</span>
              <Link href="/products">{t("Products")}</Link>
              <span aria-hidden="true">/</span>
              <span>{product.name}</span>
            </nav>
            <div className="dhero__tags hero-in" style={{ '--d': '.06s' }}>
              <span className="dhero__tag">{product.cat}</span>
              {product.packagingBadge && <span className="dhero__pack">{product.packagingBadge}</span>}
            </div>
            <h1 className="hero-in" style={{ '--d': '.12s' }}>{product.name}</h1>
            <p className="dhero__tagline hero-in" style={{ '--d': '.18s' }}>{product.tagline}</p>
            <p className="lede hero-in" style={{ '--d': '.24s' }}>{product.lede}</p>
            <div className="btn-row hero-in" style={{ '--d': '.3s' }}>
              <Link className="btn btn--marigold" href={`/contact?type=trial&product=${product.name}`}>{t("Request a free trial")}</Link>
              <Link className="btn btn--ghost-light" href={`/contact?type=quote&product=${product.name}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>
                </svg>{t("Datasheet & price")}</Link>
            </div>
          </div>

          <div className="dhero__art hero-in" style={{ '--d': '.2s' }}>
            <div className="dhero__disc">
              <img src={product.img} alt={product.name} width="600" height="600" />
            </div>
            <FormulaFacts
              title={t("Formula Facts")}
              sub={product.name}
              rows={product.facts.map((f) => ({ label: f.label, value: f.val, highlight: f.highlight }))}
              foot={`${t("Actives:")} ${source.composition
                .filter((c) => !/carrier|base|excipient|emulsifier|stabilizer/i.test(c.name))
                .map((c) => t(c.name))
                .join(', ')}`}
            />
          </div>
        </div>
        <div className="wrap">
          <ul className="dhero__points hero-in" style={{ '--d': '.36s' }}>
            {product.keypoints.map((kp, idx) => (
              <li key={idx}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12.5l4.2 4.2L19 7"/>
                </svg>
                <span>{kp}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Subnav */}
      <nav className={`subnav ${product.cls}`} aria-label={t("On this page")}>
        <div className="wrap">
          <a href="#benefits">{t("Benefits")}</a>
          <a href="#how">{t("How it works")}</a>
          <a href="#composition">{t("Composition")}</a>
          <a href="#dosage">{t("Dosage")}</a>
          <a href="#results">{t("Results")}</a>
          <a href="#downloads">{t("Downloads")}</a>
          <a href="#faq">{t("FAQ")}</a>
        </div>
      </nav>

      {/* Benefits */}
      <section className={`section ${product.cls}`} id="benefits">
        <div className="wrap two-col">
          <div className="head" style={{ margin: 0 }}>
            <h2>{product.whyChooseTitle}</h2>
            <p className="lede">{product.whyChooseLede}</p>
            <ul className="ticks">
              {product.whyTicks.map((tick, idx) => (
                <li key={idx}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12.5l4.2 4.2L19 7"/>
                  </svg>
                  <span>{tick}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="benefits">
            {product.benefits.map((b, idx) => (
              <div key={idx} className="benefit">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3l8 3.5V12c0 4.6-3.4 8-8 9-4.6-1-8-4.4-8-9V6.5z"/>
                  <path d="M8.5 12l2.5 2.5 4.5-5"/>
                </svg>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className={`section section--mist ${product.cls}`} id="how">
        <div className="wrap">
          <div className="head">
            <h2>{t("How it works")}</h2>
            <p className="lede">{product.howLede}</p>
          </div>
          <div className="mechs">
            {product.mechanisms.map((m, idx) => (
              <div key={idx} className="mech">
                <i>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 19c0-8.5 6.2-14 15-14-.6 9-6.2 15-14 15"/><path d="M5 19l8-8"/>
                  </svg>
                </i>
                <span>{m}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Composition */}
      <section className={`section ${product.cls}`} id="composition">
        <div className="wrap">
          <div className="head head--row">
            <h2>{t("Composition")}</h2>
            <p className="note">{t("Natural actives from plants and spices. Exact formula available to registered partners.")}</p>
          </div>
          <div className="compo">
            {product.composition.map((c, idx) => (
              <div key={idx}>
                <b>{c.name}</b>
                <small>{c.note}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dosage & Packaging */}
      <section className={`section section--mist ${product.cls}`} id="dosage">
        <div className="wrap dose">
          <div className="dose__main" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2>{t("Dosage & packing")}</h2>
            <div className="table-wrap">
              <table style={{ minWidth: '560px' }}>
                <thead>
                  <tr>
                    <th>{t("Use")}</th>
                    <th>{t("Rate")}</th>
                    <th>{t("Programme")}</th>
                  </tr>
                </thead>
                <tbody>
                  {product.dosageTable.map((row, idx) => (
                    <tr key={idx}>
                      <td><b>{row.use}</b></td>
                      <td>{row.rate}</td>
                      <td>{row.prog}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <dl className="specs" style={{ background: '#fff' }}>
              {product.specs.map((s, idx) => (
                <div key={idx}>
                  <dt>{s.dt}</dt>
                  <dd>{s.dd}</dd>
                </div>
              ))}
            </dl>

            <div className="packnote" style={{
              background: product.packagingType === 'liquid' ? '#EFF6FF' : '#F7FEE7',
              border: `1.5px solid ${product.packagingType === 'liquid' ? '#BFDBFE' : '#D9F99D'}`,
              borderRadius: '12px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px'
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '20px', height: '20px', color: product.packagingType === 'liquid' ? '#2563EB' : '#4D7C0F', flexShrink: 0, marginTop: '2px' }}>
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <div style={{ fontSize: '14px', lineHeight: 1.5, color: 'var(--ink)' }}>
                {product.packagingType === 'liquid' ? (
                  <>
                    <b>{t("Liquid Product Packaging Note:")}</b>{' '}{t("All Remevia liquid formulations (EKSIT, CURTECT-CRD, TLREPEAL, TL HEALER) are supplied in standardized, export-grade 5 kg and 20 kg HMHDPE cans/bottles with specialized, tamper-evident product-specific labeling.")}</>
                ) : (
                  <>
                    <b>{t("Powder Product Packaging Note:")}</b>{' '}{t("Remevia powder premixes (TLTREAT, TLEGG) are packaged in durable 50 kg PP woven outer laminated bags with inner HMHDPE liners to prevent moisture absorption and ensure high free-flow mixing.")}</>
                )}
              </div>
            </div>

            <p className="note">{t("Rates from Remevia product literature. Consult your nutritionist or veterinarian for your flock.")}</p>
          </div>

          {product.rates ? (
            <DoseCalculator rates={source.rates} productName={source.name} />
          ) : (
            <div className="calc">
              <h3>{t("How to apply")}</h3>
              <ol className="process" style={{ gridTemplateColumns: '1fr' }}>
                <li><span className="process__node"></span><h3>{t("Clean the area")}</h3><p>{t("Remove dirt and debris from the wound if possible.")}</p></li>
                <li><span className="process__node"></span><h3>{t("Spray or apply")}</h3><p>{t("Cover the wound, tick bite or injury with TL HEALER.")}</p></li>
                <li><span className="process__node"></span><h3>{t("Repeat")}</h3><p>{t("Reapply as needed until the skin has healed.")}</p></li>
              </ol>
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      <section className={`section ${product.cls}`} id="results">
        <div className="wrap results">
          <div className="head" style={{ margin: 0 }}>
            <h2>{product.resultsTitle}</h2>
            <p className="lede">{product.resultsLede}</p>
            <Link className="btn btn--ghost" href={`/contact?type=quote&product=${product.name}`} style={{ alignSelf: 'flex-start' }}>{t("Request the full trial report")}</Link>
          </div>

          {product.resultsStudy ? (
            <div style={{
              background: '#FFFFFF',
              border: '1.5px solid var(--c)',
              borderRadius: '20px',
              padding: '28px',
              boxShadow: '0 8px 30px -10px rgba(15,27,61,.12)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--c)' }}>{t("LIVE-CULTURE VERIFIED TRIAL")}</span>
                <span style={{ fontSize: '13px', background: 'var(--mist)', padding: '4px 12px', borderRadius: '999px', color: 'var(--slate)' }}>
                  {t("Method: {method}", { method: product.resultsStudy.method })}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '14px', padding: '18px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#DC2626', textTransform: 'uppercase', letterSpacing: '.05em', display: 'block', marginBottom: '6px' }}>{t("Standard Market Antibiotic")}</span>
                  <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.5, color: '#7F1D1D' }}>
                    {product.resultsStudy.standardResult}
                  </p>
                </div>

                <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '14px', padding: '18px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#16A34A', textTransform: 'uppercase', letterSpacing: '.05em', display: 'block', marginBottom: '6px' }}>{t("EKSIT-CRD Botanical Synergy")}</span>
                  <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.5, color: '#14532D' }}>
                    {product.resultsStudy.eksitResult}
                  </p>
                </div>
              </div>

              <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: 'var(--ink)' }}>{t("Target Subject:")}{' '}<span style={{ fontWeight: 400, color: 'var(--slate)' }}>{product.resultsStudy.subject}</span> <i aria-hidden="true" style={{ fontStyle: 'normal' }}>·</i>{' '}{t("Conclusion:")}{' '}<span style={{ fontWeight: 400, color: 'var(--slate)' }}>{product.resultsStudy.verdict}</span>
              </p>

              {product.resultsStats && (
                <div className="stats" style={{ marginTop: '8px', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))' }}>
                  {product.resultsStats.map((st, sidx) => (
                    <div key={sidx} className="stat" style={{ padding: '14px', background: '#FAFBFB', border: '1px solid #EAEFF2' }}>
                      <b style={{ color: 'var(--c)', fontSize: '24px' }}>{st.val}</b>
                      <span style={{ fontSize: '13px' }}>{st.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : product.resultsStats ? (
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '20px',
              padding: '28px',
              boxShadow: '0 8px 30px -10px rgba(15,27,61,.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--c)' }}>{t("AUDITED COMMERCIAL FIELD METRICS")}</span>
              <div className="stats" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
                {product.resultsStats.map((st, sidx) => (
                  <div key={sidx} className="stat" style={{ padding: '16px', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                    <b style={{ color: 'var(--c)', fontSize: '28px' }}>{st.val}</b>
                    <span style={{ fontSize: '14px', marginTop: '4px' }}>{st.label}</span>
                  </div>
                ))}
              </div>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--slate)', lineHeight: 1.5 }}>{t("Full trial records, flock sheets, and comparative necropsy photos are available to veterinarians and commercial integrators upon request.")}</p>
            </div>
          ) : (
            <div className="placeholder">{t("[Controlled trial charts, flock records, and comparative field reports available upon verification.]")}</div>
          )}
        </div>
      </section>

      {/* Downloads & FAQ */}
      <section className={`section section--mist ${product.cls}`}>
        <div className="wrap two-col">
          <div id="downloads" className="downloads">
            <h2 style={{ marginBottom: '8px' }}>{t("Downloads")}</h2>
            <Link className="dl" href={`/contact?type=quote&product=${product.name}`}>
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 13h6M9 17h6"/>
                </svg>
              </i>
              <span><b>{t("Product brochure")}</b><small>{t("PDF · English")}</small></span>
              <span className="dl__go">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>
                </svg>
              </span>
            </Link>
            <Link className="dl" href={`/contact?type=quote&product=${product.name}`}>
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 13h6M9 17h6"/>
                </svg>
              </i>
              <span><b>{t("Technical datasheet")}</b><small>{t("PDF · on request")}</small></span>
              <span className="dl__go">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>
                </svg>
              </span>
            </Link>
            <Link className="dl" href={`/contact?type=quote&product=${product.name}`}>
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3l8 3.5V12c0 4.6-3.4 8-8 9-4.6-1-8-4.4-8-9V6.5z"/>
                  <path d="M8.5 12l2.5 2.5 4.5-5"/>
                </svg>
              </i>
              <span><b>{t("Safety data sheet & COA")}</b><small>{t("For registered buyers")}</small></span>
              <span className="dl__go">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>
                </svg>
              </span>
            </Link>
          </div>

          <div id="faq" className="faq">
            <h2 style={{ marginBottom: '8px' }}>{t("Questions about {name}", { name: product.name })}</h2>
            {product.faqs.map((f, idx) => (
              <details key={idx} open={idx === 0}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="section">
        <div className="wrap">
          <div className="head head--row">
            <h2>{t("Often used with {name}", { name: product.name })}</h2>
            <Link className="link-arrow" href="/products">{t("All products")}</Link>
          </div>
          <div className="grid grid--3">
            {product.related.map((relKey) => {
              const rel = PRODUCTS_DATA[relKey];
              if (!rel) return null;
              return (
                <Link key={rel.slug} className={`pcard ${rel.cls}`} href={`/products/${rel.slug}`}>
                  <div className="pcard__media">
                    <span className="pcard__band" aria-hidden="true"><span>{rel.name}</span></span>
                    <img src={rel.img} alt={rel.name} loading="lazy" width="400" height="400" />
                  </div>
                  <div className="pcard__body">
                    <span className="pcard__cat">{t(rel.cat)}</span>
                    <h3>{rel.name}</h3>
                    <p>{t(rel.tagline)}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trial CTA */}
      <CtaSection defaultProduct={product.name} />
    </>
  );
}
