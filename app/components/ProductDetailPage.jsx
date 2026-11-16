'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import DoseCalculator from './DoseCalculator';
import { FormulaFacts } from './PageHero';
import { Icon, iconFor } from './icons';
import { DatasheetButton, ViewDetailsButton } from './DatasheetRequest';
import { PRODUCTS_DATA } from '../data/products';
import { useLanguage } from '../context/LanguageContext';

/** Section heading used by every block below the hero: section number, title, optional intro. */
function Head({ num, title, lede, aside, row = false }) {
  return (
    <div className={`pd-head ${row ? 'pd-head--row' : ''}`}>
      <div>
        <span className="pd-num" aria-hidden="true">{num}</span>
        <h2>{title}</h2>
        {lede && <p className="lede">{lede}</p>}
      </div>
      {aside}
    </div>
  );
}

// "Bicyclic monoterpene — bronchodilator…" → ["Bicyclic monoterpene", "bronchodilator…"], with no dash shown.
const splitNote = (note = '') => {
  const m = note.match(/^(.+?)\s*(?:—|–|:)\s+(.+)$/);
  return m ? [m[1], m[2]] : ['', note];
};

export default function ProductDetailPage({ product: source }) {
  const { t, tx } = useLanguage();
  const root = useRef(null);

  // Cards fade up as they scroll into view. Only switched on once this runs, so nothing
  // is ever hidden without JavaScript, and skipped for people who prefer less motion.
  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return undefined;
    const items = el.querySelectorAll('.pd-card, .flow li, .pd-compo > div, .pd-stats > div, .rcard');
    el.classList.add('pd--reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach((item, i) => { item.style.setProperty('--i', i % 6); io.observe(item); });
    return () => io.disconnect();
  }, [source]);

  // Highlight the tab of the section being read.
  useEffect(() => {
    const el = root.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    const links = [...el.querySelectorAll('.pd-tabs a')];
    const targets = links.map((a) => el.querySelector(a.getAttribute('href'))).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => {
          const on = a.getAttribute('href') === `#${entry.target.id}`;
          a.classList.toggle('is-active', on);
          // On narrow screens the tab row scrolls sideways: keep the active tab in view.
          if (on && a.parentElement.scrollWidth > a.parentElement.clientWidth) {
            a.parentElement.scrollTo({ left: a.offsetLeft - 16, behavior: 'smooth' });
          }
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    targets.forEach((target) => io.observe(target));
    return () => io.disconnect();
  }, [source]);
  if (!source) return null;
  const product = tx(source);
  const liquid = source.packagingType === 'liquid';

  return (
    <div className={`pd ${product.cls}`} ref={root}>
      {/* Product hero */}
      <section className={`dhero ${product.cls}`}>
        <img className="hero-leaf" src="/assets/img/hero-leaf.webp" alt="" aria-hidden="true" width="1672" height="941" />
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
              <DatasheetButton className="btn btn--ghost-light" product={product.name}>
                <Icon name="download" size={20} />{t("Datasheet & price")}</DatasheetButton>
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
                <Icon name="check" size={20} strokeWidth={2} />
                <span>{kp}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* On-this-page tabs */}
      <nav className={`subnav pd-tabs ${product.cls}`} aria-label={t("On this page")}>
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

      {/* 1. Benefits */}
      <section className="pd-sec" id="benefits">
        <div className="wrap pd-benefits">
          <div className="pd-benefits__intro">
            <Head num="01" title={product.whyChooseTitle} lede={product.whyChooseLede} />
            <ul className="pd-ticks">
              {product.whyTicks.map((tick, idx) => (
                <li key={idx}><Icon name="check" /><span>{tick}</span></li>
              ))}
            </ul>
          </div>
          <div className="pd-row pd-cards">
            {product.benefits.map((b, idx) => (
              <article key={idx} className="pd-card">
                <i className="pd-icon"><Icon name={iconFor(source.benefits[idx].title)} /></i>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 2. How it works */}
      <section className="pd-sec pd-sec--tint" id="how">
        <div className="wrap">
          <Head num="02" title={t("How it works")} lede={product.howLede} />
          <ol className="flow" style={{ '--n': product.mechanisms.length }}>
            {product.mechanisms.map((m, idx) => (
              <li key={idx}>
                <i className="flow__icon"><Icon name={iconFor(source.mechanisms[idx])} /></i>
                <div className="flow__card">
                  <span className="flow__num" aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
                  <p>{m}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3. Composition */}
      <section className="pd-sec" id="composition">
        <div className="wrap">
          <Head
            row
            num="03"
            title={t("Composition")}
            aside={<p className="pd-note">{t("Natural actives from plants and spices. Exact formula available to registered partners.")}</p>}
          />
          <div className="pd-row pd-compo">
            {product.composition.map((c, idx) => (
              <div key={idx}>
                <b>{c.name}</b>
                {splitNote(c.note)[0] && <span className="pd-compo__kind">{splitNote(c.note)[0]}</span>}
                <small>{splitNote(c.note)[1]}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Dosage & packing */}
      <section className="pd-sec pd-sec--tint" id="dosage">
        <div className="wrap">
          <Head num="04" title={t("Dosage & packing")} />
          <div className="pd-dose">
            <div className="pd-dose__main">
              <div className="pd-table">
                <table>
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

              <dl className="pd-specs">
                {product.specs.map((s, idx) => (
                  <div key={idx}>
                    <dt>{s.dt}</dt>
                    <dd>{s.dd}</dd>
                  </div>
                ))}
              </dl>

              <p className="pd-pack">
                <Icon name={liquid ? 'bottle' : 'package'} />
                <span>
                  {liquid ? (
                    <><b>{t("Liquid Product Packaging Note:")}</b>{' '}{t("All Remevia liquid formulations (EKSIT, CURTECT-CRD, TLREPEAL, TL HEALER) are supplied in standardized, export-grade 5 kg and 20 kg HMHDPE cans/bottles with specialized, tamper-evident product-specific labeling.")}</>
                  ) : (
                    <><b>{t("Powder Product Packaging Note:")}</b>{' '}{t("Remevia powder premixes (TLTREAT, TLEGG) are packaged in durable 50 kg PP woven outer laminated bags with inner HMHDPE liners to prevent moisture absorption and ensure high free-flow mixing.")}</>
                  )}
                </span>
              </p>
              <p className="pd-note">{t("Rates from Remevia product literature. Consult your nutritionist or veterinarian for your flock.")}</p>
            </div>

            {product.rates ? (
              <DoseCalculator rates={source.rates} productName={source.name} />
            ) : (
              <div className="calc">
                <h3>{t("How to apply")}</h3>
                <ol className="pd-steps">
                  <li><b>{t("Clean the area")}</b><span>{t("Remove dirt and debris from the wound if possible.")}</span></li>
                  <li><b>{t("Spray or apply")}</b><span>{t("Cover the wound, tick bite or injury with TL HEALER.")}</span></li>
                  <li><b>{t("Repeat")}</b><span>{t("Reapply as needed until the skin has healed.")}</span></li>
                </ol>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. Results */}
      <section className="pd-sec" id="results">
        <div className="wrap pd-results">
          <div>
            <Head num="05" title={product.resultsTitle} lede={product.resultsLede} />
            <Link className="btn btn--grad pd-results__btn" href={`/contact?type=quote&product=${product.name}`}>{t("Request the full trial report")}</Link>
          </div>

          <div className="pd-evidence">
            {product.resultsStudy ? (
              <>
                <div className="pd-evidence__top">
                  <span className="pd-label">{t("LIVE-CULTURE VERIFIED TRIAL")}</span>
                  <span className="pd-chip">{t("Method: {method}", { method: product.resultsStudy.method })}</span>
                </div>
                <div className="pd-compare">
                  <div className="pd-compare__bad">
                    <span>{t("Standard Market Antibiotic")}</span>
                    <p>{product.resultsStudy.standardResult}</p>
                  </div>
                  <div className="pd-compare__good">
                    <span>{t("EKSIT-CRD Botanical Synergy")}</span>
                    <p>{product.resultsStudy.eksitResult}</p>
                  </div>
                </div>
                <p className="pd-evidence__foot">
                  <b>{t("Target Subject:")}</b>{' '}{product.resultsStudy.subject}{' · '}
                  <b>{t("Conclusion:")}</b>{' '}{product.resultsStudy.verdict}
                </p>
              </>
            ) : (
              <span className="pd-label">{t("AUDITED COMMERCIAL FIELD METRICS")}</span>
            )}

            {product.resultsStats && (
              <div className="pd-stats">
                {product.resultsStats.map((st, sidx) => (
                  <div key={sidx}>
                    <b>{st.val}</b>
                    <span>{st.label}</span>
                  </div>
                ))}
              </div>
            )}

            {!product.resultsStudy && (
              <p className="pd-evidence__foot">{t("Full trial records, flock sheets, and comparative necropsy photos are available to veterinarians and commercial integrators upon request.")}</p>
            )}
          </div>
        </div>
      </section>

      {/* 6. Downloads & FAQ */}
      <section className="pd-sec pd-sec--tint">
        <div className="wrap pd-split">
          <div id="downloads">
            <Head num="06" title={t("Downloads")} />
            <div className="downloads">
              {[
                ['Product brochure', 'PDF · English', 'Product brochure'],
                ['MSDS (Material Safety Data Sheet)', 'PDF · on request', 'MSDS'],
                ['COA (Certificate of Analysis)', 'For registered buyers', 'COA'],
              ].map(([name, sub, doc], idx) => (
                <DatasheetButton key={name} className="dl" product={product.name} doc={doc}>
                  <i><Icon name={idx === 2 ? 'certificate' : 'file'} size={22} /></i>
                  <span><b>{t(name)}</b><small>{t(sub)}</small></span>
                  <span className="dl__go">
                    <Icon name="download" size={20} />
                  </span>
                </DatasheetButton>
              ))}
            </div>
          </div>

          <div id="faq" className="faq pd-faq">
            <Head num="07" title={t("Questions about {name}", { name: product.name })} />
            {product.faqs.map((f, idx) => (
              <details key={idx} open={idx === 0}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Often used with */}
      <section className="pd-sec">
        <div className="wrap">
          <Head
            row
            num="08"
            title={t("Often used with {name}", { name: product.name })}
            aside={<Link className="link-arrow" href="/products">{t("All products")}</Link>}
          />
          <div className="rcards">
            {product.related.map((relKey) => {
              const rel = PRODUCTS_DATA[relKey];
              if (!rel) return null;
              return (
                <ViewDetailsButton key={rel.slug} className={`rcard ${rel.cls}`} href={`/products/${rel.slug}`} product={rel.name}>
                  <span className="rcard__media">
                    <img src={rel.img} alt="" loading="lazy" width="400" height="400" />
                  </span>
                  <span className="rcard__body">
                    <small className="rcard__cat">{t(rel.cat).split('·')[0].trim()}</small>
                    <b className="rcard__name">{rel.name}</b>
                    <span className="rcard__text">{t(rel.tagline)}</span>
                    <span className="rcard__more">{t("View details")}<Icon name="arrow" size={18} strokeWidth={2.2} /></span>
                  </span>
                </ViewDetailsButton>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
