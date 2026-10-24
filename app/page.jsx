'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from './context/LanguageContext';
import ChallengeFinder from './components/ChallengeFinder';
import CtaSection from './components/CtaSection';

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <svg className="hero__net" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="netGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#5B7BE0" />
              <stop offset=".5" stopColor="#2FC3CF" />
              <stop offset="1" stopColor="#5CDB6B" />
            </linearGradient>
          </defs>
          <path d="M-20 640 L180 520 L330 610 L520 470 L700 560 L880 380 L1060 450 L1240 260 L1460 330" />
          <path d="M180 520 L240 330 L420 250 L520 470 M880 380 L820 190 L1010 110 L1240 260 M1060 450 L1180 620 L1400 560" />
          <path d="M420 250 L600 160 L820 190 M330 610 L360 780 M700 560 L760 760" />
          <circle cx="180" cy="520" r="9" style={{ animationDelay: '.6s' }} />
          <circle cx="330" cy="610" r="6" style={{ animationDelay: '.8s' }} />
          <circle cx="520" cy="470" r="11" style={{ animationDelay: '1s' }} />
          <circle cx="700" cy="560" r="7" style={{ animationDelay: '1.2s' }} />
          <circle cx="880" cy="380" r="12" style={{ animationDelay: '1.4s' }} />
          <circle cx="1060" cy="450" r="8" style={{ animationDelay: '1.6s' }} />
          <circle cx="1240" cy="260" r="13" style={{ animationDelay: '1.8s' }} />
          <circle cx="240" cy="330" r="6" style={{ animationDelay: '1s' }} />
          <circle cx="420" cy="250" r="9" style={{ animationDelay: '1.2s' }} />
          <circle cx="600" cy="160" r="6" style={{ animationDelay: '1.4s' }} />
          <circle cx="820" cy="190" r="8" style={{ animationDelay: '1.6s' }} />
          <circle cx="1010" cy="110" r="7" style={{ animationDelay: '1.8s' }} />
          <circle cx="1180" cy="620" r="9" style={{ animationDelay: '2s' }} />
          <circle cx="1400" cy="560" r="6" style={{ animationDelay: '2.1s' }} />
        </svg>

        <div className="wrap">
          <div className="hero__copy">
            <span className="hero__badge">
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 19c0-8.5 6.2-14 15-14-.6 9-6.2 15-14 15"/>
                  <path d="M5 19l8-8"/>
                </svg>
              </span>
              <b style={{ fontWeight: 500 }}>{t('hero.badge', 'Botanical alternatives to antibiotics')}</b>
            </span>

            <h1>
              <span>{t('hero.h1a', 'Healthier flocks.')}</span>{' '}
              <span className="line-2">{t('hero.h1b', 'Without antibiotics.')}</span>
            </h1>

            <p className="hero__sub">
              {t('hero.sub', 'Plant-based supplements that protect gut health, breathing, egg quality and skin, with no antibiotic residues in meat or eggs.')}
            </p>

            <div className="btn-row">
              <Link className="btn btn--grad" href="/contact?type=trial">
                {t('cta.trial', 'Request a free trial')}
              </Link>
              <Link className="btn btn--ghost-light" href="/products">
                {t('cta.explore', 'Explore products')}
              </Link>
            </div>

            <ul className="hero__checks">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12.5l4.2 4.2L19 7"/>
                </svg>
                <span>{t('hero.c1', '100% plant-based actives')}</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12.5l4.2 4.2L19 7"/>
                </svg>
                <span>{t('hero.c2', 'No antibiotic residues')}</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12.5l4.2 4.2L19 7"/>
                </svg>
                <span>{t('hero.c3', 'Low resistance risk')}</span>
              </li>
            </ul>
          </div>

          <div className="hero__visual">
            <div className="hero__disc">
              <img src="/assets/img/tltreat.webp" alt="Healthy brown hen standing beside a chick" width="923" height="1046" priority="true" />
            </div>
          </div>
        </div>
      </section>

      {/* Ribbon */}
      <section className="ribbon" aria-label="Who we serve">
        <div className="wrap">
          <span className="ribbon__label">Built for</span>
          <span className="ribbon__item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 21V10l5 3V10l5 3V5h4l1 16z"/><path d="M3 21h18"/>
            </svg>
            Feed mills
          </span>
          <span className="ribbon__item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>
            </svg>
            Poultry integrators
          </span>
          <span className="ribbon__item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 20h7M10 20v-3"/>
              <path d="M15 6.5a3 3 0 1 0-5.6 1.4C6 9 4 11.6 4 14a3 3 0 0 0 3 3h6a6 6 0 0 0 6-6V9l2-1-2-1.2A3 3 0 0 0 15 6.5z"/>
            </svg>
            Broiler & layer farms
          </span>
          <span className="ribbon__item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 8c-1.5 0-2-1.5-2-3 1.5 0 3 .5 3.5 2M19 8c1.5 0 2-1.5 2-3-1.5 0-3 .5-3.5 2"/>
              <path d="M6.5 7h11l-.8 9a3 3 0 0 1-3 2.7h-3.4a3 3 0 0 1-3-2.7z"/>
              <circle cx="10" cy="15.5" r=".6"/>
              <circle cx="14" cy="15.5" r=".6"/>
            </svg>
            Livestock farms
          </span>
          <span className="ribbon__item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z"/>
              <circle cx="7" cy="18" r="2"/>
              <circle cx="17" cy="18" r="2"/>
            </svg>
            Distributors
          </span>
        </div>
      </section>

      {/* Challenge & Answer Split */}
      <section className="section">
        <div className="wrap">
          <div className="split">
            <div className="split__side split__side--problem">
              <span className="split__tag">The challenge</span>
              <h2>Antibiotic resistance has reached the farm gate</h2>
              <p>For decades antibiotics were used to grow birds faster and prevent disease. Overuse in human and veterinary medicine created resistant bacteria and left residues in meat and eggs.</p>
              <ul>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12.5l4.2 4.2L19 7"/>
                  </svg>
                  <span>Regulators are restricting antibiotic growth promoters</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12.5l4.2 4.2L19 7"/>
                  </svg>
                  <span>Export buyers test for antibiotic residues</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12.5l4.2 4.2L19 7"/>
                  </svg>
                  <span>Consumers ask for antibiotic-free meat and eggs</span>
                </li>
              </ul>
            </div>
            <div className="split__side split__side--answer">
              <span className="split__tag">The Remevia answer</span>
              <h2>Nature already has the molecules. We make them work.</h2>
              <p style={{ color: 'var(--slate)' }}>
                Plants defend themselves with essential oils and oleoresins. We identify these molecules, extract them gently and blend them into precise, easy-to-dose formulations.
              </p>
              <ul>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12.5l4.2 4.2L19 7"/>
                  </svg>
                  <span>Feed, drinking-water and spray formats</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12.5l4.2 4.2L19 7"/>
                  </svg>
                  <span>Multi-target blends with low resistance risk</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12.5l4.2 4.2L19 7"/>
                  </svg>
                  <span>Safe for birds, animals, workers and consumers</span>
                </li>
              </ul>
              <Link className="link-arrow" href="/science" style={{ marginTop: '6px' }}>
                See the science behind it
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Range Shelf */}
      <section className="section section--mist">
        <div className="wrap">
          <div className="head head--row">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '700px' }}>
              <h2>{t('sec.range', 'One natural solution for every challenge on the farm')}</h2>
              <p className="lede">Five targeted formulations for broilers, layers, breeders and livestock.</p>
            </div>
            <Link className="btn btn--ghost" href="/products">
              Compare all products
            </Link>
          </div>
          <div className="shelf">
            <Link className="pcard t-treat" href="/products/tltreat">
              <div className="pcard__media">
                <span className="pcard__band" aria-hidden="true"><span>TLTREAT</span></span>
                <img src="/assets/img/tltreat.webp" alt="TLTREAT" loading="lazy" width="400" height="400" />
              </div>
              <div className="pcard__body">
                <span className="pcard__cat">Gut health & growth</span>
                <h3>TLTREAT</h3>
                <p>Replaces antibiotic growth promoters. Better FCR, lower mortality, stronger immunity.</p>
                <div className="pcard__meta">
                  <span className="chip">Feed powder</span>
                  <span className="chip">Broilers, layers</span>
                </div>
              </div>
            </Link>

            <Link className="pcard t-curtect" href="/products/curtect-crd">
              <div className="pcard__media">
                <span className="pcard__band" aria-hidden="true"><span>CURTECT-CRD</span></span>
                <img src="/assets/img/curtect-crd.webp" alt="CURTECT-CRD" loading="lazy" width="400" height="400" />
              </div>
              <div className="pcard__body">
                <span className="pcard__cat">Respiratory support</span>
                <h3>CURTECT-CRD</h3>
                <p>Eases breathing after vaccination, dust or heat stress. Relief in 24–48 hours.</p>
                <div className="pcard__meta">
                  <span className="chip">Water-soluble liquid</span>
                  <span className="chip">All poultry</span>
                </div>
              </div>
            </Link>

            <Link className="pcard t-egg" href="/products/tlegg">
              <div className="pcard__media">
                <span className="pcard__band" aria-hidden="true"><span>TLEGG</span></span>
                <img src="/assets/img/tlegg.webp" alt="TLEGG" loading="lazy" width="400" height="400" />
              </div>
              <div className="pcard__body">
                <span className="pcard__cat">Egg quality</span>
                <h3>TLEGG</h3>
                <p>Rich orange-yellow yolks from marigold carotenoids, even on low-maize diets.</p>
                <div className="pcard__meta">
                  <span className="chip">Feed powder</span>
                  <span className="chip">Layers</span>
                </div>
              </div>
            </Link>

            <Link className="pcard t-repeal" href="/products/tlrepeal">
              <div className="pcard__media">
                <span className="pcard__band" aria-hidden="true"><span>TLREPEAL</span></span>
                <img src="/assets/img/tlrepeal.webp" alt="TLREPEAL" loading="lazy" width="400" height="400" />
              </div>
              <div className="pcard__body">
                <span className="pcard__cat">Red mite control</span>
                <h3>TLREPEAL</h3>
                <p>Repels and controls avian red mites through drinking water or nest spraying.</p>
                <div className="pcard__meta">
                  <span className="chip">Water-soluble liquid</span>
                  <span className="chip">Layers, breeders</span>
                </div>
              </div>
            </Link>

            <Link className="pcard t-healer" href="/products/tl-healer">
              <div className="pcard__media">
                <span className="pcard__band" aria-hidden="true"><span>TL HEALER</span></span>
                <img src="/assets/img/tl-healer.webp" alt="TL HEALER" loading="lazy" width="400" height="400" />
              </div>
              <div className="pcard__body">
                <span className="pcard__cat">Wounds & skin</span>
                <h3>TL HEALER</h3>
                <p>Topical spray for septic and non-septic wounds. Also an excellent fly repellent.</p>
                <div className="pcard__meta">
                  <span className="chip">Topical spray</span>
                  <span className="chip">Livestock & poultry</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Challenge Finder */}
      <ChallengeFinder />

      {/* 4-Step Process Section */}
      <section className="section section--dark">
        <div className="wrap">
          <div className="head">
            <h2>{t('sec.process', 'From plant to poultry in four steps')}</h2>
            <p className="lede">Every Remevia formulation follows the same path before it reaches a farm.</p>
          </div>
          <ol className="process">
            <li>
              <span className="process__node"></span>
              <h3>Identify</h3>
              <p>Screen plant compounds with proven antimicrobial, anti-inflammatory and gut-health effects.</p>
            </li>
            <li>
              <span className="process__node"></span>
              <h3>Extract</h3>
              <p>Recover essential oils, oleoresins and carotenoids while keeping the active molecules intact.</p>
            </li>
            <li>
              <span className="process__node"></span>
              <h3>Formulate</h3>
              <p>Blend compounds that act on several targets at once, so pathogens and pests struggle to adapt.</p>
            </li>
            <li>
              <span className="process__node"></span>
              <h3>Validate</h3>
              <p>Test in the lab and on live flocks, then standardise every batch before it ships.</p>
            </li>
          </ol>
          <div style={{ height: 'clamp(48px,6vw,72px)' }}></div>
          <div className="stats">
            <div className="stat">
              <b className="grad-text" style={{ backgroundImage: 'linear-gradient(100deg,#F0B272,#FFD9A8)' }}>1–2 kg</b>
              <span>TLTREAT per tonne of broiler feed</span>
              <small>Day 1 to 40</small>
            </div>
            <div className="stat">
              <b style={{ color: '#7FC4F0' }}>200 ml</b>
              <span>CURTECT-CRD per 1,000 L drinking water</span>
              <small>Prevention and recovery</small>
            </div>
            <div className="stat">
              <b style={{ color: '#A9DA7A' }}>1 kg</b>
              <span>TLEGG per tonne of layer feed</span>
              <small>Continuous feeding</small>
            </div>
            <div className="stat">
              <b style={{ color: '#FF9A9D' }}>150 ml</b>
              <span>TLREPEAL per 1,000 L water</span>
              <small>Alternate weeks</small>
            </div>
          </div>
          <p className="note" style={{ marginTop: '18px' }}>
            * Claims and rates from Remevia product literature. Full trial reports are available to feed mills and distributors on request.
          </p>
        </div>
      </section>

      {/* Quality Section */}
      <section className="section">
        <div className="wrap trust">
          <div className="head" style={{ margin: 0 }}>
            <h2>Quality you can audit</h2>
            <p className="lede">Standardised actives, batch-wise quality control and export-ready packing in 5 kg and 20 kg HMHDPE bottles or 50 kg lined laminated bags.</p>
            <Link className="link-arrow" href="/science#quality">
              Our quality process
            </Link>
          </div>
          <div className="certs">
            <div className="placeholder">[GMP]</div>
            <div className="placeholder">[ISO 9001]</div>
            <div className="placeholder">[FAMI-QS]</div>
            <div className="placeholder">[Export reg.]</div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section--mist">
        <div className="wrap">
          <div className="head head--row">
            <h2>What farmers say</h2>
            <p className="note">Verified field results shared with permission.</p>
          </div>
          <div className="grid grid--3">
            <figure className="card" style={{ margin: 0 }}>
              <blockquote style={{ margin: 0, font: '500 19px/1.5 var(--body)' }}>
                “We replaced chemical AGPs with TLTREAT across 40,000 broilers. Zero drop in final body weight, significantly drier litter, and complete peace of mind on export testing.”
              </blockquote>
              <figcaption style={{ color: 'var(--muted)', fontSize: '15px', marginTop: 'auto' }}>
                Commercial Poultry Integrator, South India
              </figcaption>
            </figure>
            <figure className="card" style={{ margin: 0 }}>
              <blockquote style={{ margin: 0, font: '500 19px/1.5 var(--body)' }}>
                “Post-vaccination respiratory wheezing used to cause major stress. CURTECT-CRD in the water line showed visible ease of breathing within 36 hours.”
              </blockquote>
              <figcaption style={{ color: 'var(--muted)', fontSize: '15px', marginTop: 'auto' }}>
                Farm Manager, Broiler Operations, UAE
              </figcaption>
            </figure>
            <figure className="card" style={{ margin: 0 }}>
              <blockquote style={{ margin: 0, font: '500 19px/1.5 var(--body)' }}>
                “Yolk colour rose from 8 to 12 on the DSM fan using TLEGG without altering our baseline feed formulation. Our premium egg buyers noticed immediately.”
              </blockquote>
              <figcaption style={{ color: 'var(--muted)', fontSize: '15px', marginTop: 'auto' }}>
                Layer Farm Owner, Kerala
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Free Trial CTA */}
      <CtaSection />
    </>
  );
}
