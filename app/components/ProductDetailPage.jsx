'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import DoseCalculator from './DoseCalculator';
import CtaSection from './CtaSection';
import { PRODUCTS_DATA } from '../data/products';

export default function ProductDetailPage({ product }) {
  if (!product) return null;

  return (
    <>
      {/* Product Hero */}
      <section className={`dhero ${product.cls}`}>
        <div className="wrap">
          <div className="dhero__media">
            <span className="dhero__band" aria-hidden="true">
              <span>{product.band}</span>
            </span>
            <img src={product.img} alt={product.name} width="600" height="600" priority="true" />
          </div>

          <div className="dhero__copy">
            <nav className="crumbs crumbs--dark" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/products">Products</Link>
              <span aria-hidden="true">/</span>
              <span>{product.name}</span>
            </nav>

            <span className="dhero__tag">{product.cat}</span>
            <h1>{product.name}</h1>
            <p className="dhero__tagline">{product.tagline}</p>
            <p className="lede">{product.lede}</p>

            <ul className="keypoints">
              {product.keypoints.map((kp, idx) => (
                <li key={idx}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12.5l4.2 4.2L19 7"/>
                  </svg>
                  <span>{kp}</span>
                </li>
              ))}
            </ul>

            <div className="dhero__facts">
              {product.facts.map((f, idx) => (
                <div key={idx} className="fact" style={f.highlight ? { borderColor: 'var(--c)' } : {}}>
                  <small>{f.label}</small>
                  <b>{f.val}</b>
                </div>
              ))}
            </div>

            <div className="btn-row">
              <Link className="btn" href={`/contact?type=trial&product=${product.name}`}>
                Request a free trial
              </Link>
              <Link className="btn btn--ghost" href={`/contact?type=quote&product=${product.name}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>
                </svg>
                Datasheet & price
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Subnav */}
      <nav className={`subnav ${product.cls}`} aria-label="On this page">
        <div className="wrap">
          <a href="#benefits">Benefits</a>
          <a href="#how">How it works</a>
          <a href="#composition">Composition</a>
          <a href="#dosage">Dosage</a>
          <a href="#results">Results</a>
          <a href="#downloads">Downloads</a>
          <a href="#faq">FAQ</a>
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
            <h2>How it works</h2>
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
            <h2>Composition</h2>
            <p className="note">Natural actives from plants and spices. Exact formula available to registered partners.</p>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2>Dosage & packing</h2>
            <div className="table-wrap">
              <table style={{ minWidth: '560px' }}>
                <thead>
                  <tr>
                    <th>Use</th>
                    <th>Rate</th>
                    <th>Programme</th>
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
            <p className="note">Rates from Remevia product literature. Consult your nutritionist or veterinarian for your flock.</p>
          </div>

          {product.rates ? (
            <DoseCalculator rates={product.rates} productName={product.name} />
          ) : (
            <div className="calc">
              <h3>How to apply</h3>
              <ol className="process" style={{ gridTemplateColumns: '1fr' }}>
                <li><span className="process__node"></span><h3>Clean the area</h3><p>Remove dirt and debris from the wound if possible.</p></li>
                <li><span className="process__node"></span><h3>Spray or apply</h3><p>Cover the wound, tick bite or injury with TL HEALER.</p></li>
                <li><span className="process__node"></span><h3>Repeat</h3><p>Reapply as needed until the skin has healed.</p></li>
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
            <Link className="btn btn--ghost" href={`/contact?type=quote&product=${product.name}`} style={{ alignSelf: 'flex-start' }}>
              Request the full trial report
            </Link>
          </div>
          <div className="placeholder">
            [Controlled trial charts, flock records, and comparative field reports available upon verification.]
          </div>
        </div>
      </section>

      {/* Downloads & FAQ */}
      <section className={`section section--mist ${product.cls}`}>
        <div className="wrap two-col">
          <div id="downloads" className="downloads">
            <h2 style={{ marginBottom: '8px' }}>Downloads</h2>
            <Link className="dl" href={`/contact?type=quote&product=${product.name}`}>
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 13h6M9 17h6"/>
                </svg>
              </i>
              <span><b>Product brochure</b><small>PDF · English</small></span>
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
              <span><b>Technical datasheet</b><small>PDF · on request</small></span>
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
              <span><b>Safety data sheet & COA</b><small>For registered buyers</small></span>
              <span className="dl__go">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>
                </svg>
              </span>
            </Link>
          </div>

          <div id="faq" className="faq">
            <h2 style={{ marginBottom: '8px' }}>Questions about {product.name}</h2>
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
            <h2>Often used with {product.name}</h2>
            <Link className="link-arrow" href="/products">All products</Link>
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
                    <span className="pcard__cat">{rel.cat}</span>
                    <h3>{rel.name}</h3>
                    <p>{rel.tagline}</p>
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
