'use client';

import React from 'react';
import Link from 'next/link';
import CtaSection from '../components/CtaSection';

export default function SciencePage() {
  return (
    <>
      <section className="phero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Science</span>
          </nav>
          <h1>Backed by data. Powered by nature.</h1>
          <p className="lede">
            How we turn the molecules plants use to defend themselves into reliable, standardised solutions for poultry and livestock.
          </p>
        </div>
      </section>

      {/* Quote */}
      <section className="section">
        <div className="wrap quote">
          <span className="card__icon" style={{ width: '64px', height: '64px' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 19c0-8.5 6.2-14 15-14-.6 9-6.2 15-14 15"/><path d="M5 19l8-8"/>
            </svg>
          </span>
          <blockquote>“Let food be thy medicine.”</blockquote>
          <cite>Commonly attributed to Hippocrates</cite>
          <p>
            Every living thing has natural enemies, and nature has already made the molecules to fight them. Plants use essential oils and oleoresins to protect themselves from bacteria, fungi and pests. We don't reinvent these molecules. We find them, purify them and put them to work.
          </p>
        </div>
      </section>

      {/* Bio-active Library */}
      <section className="section section--mist">
        <div className="wrap">
          <div className="head">
            <h2>Our bio-active library</h2>
            <p className="lede">The plant actives inside Remevia products, what they do, and where you will find them.</p>
          </div>
          <div className="library">
            <article className="ing">
              <h3>Turmeric & curcumin</h3>
              <span className="ing__mol">Curcuminoids</span>
              <p>Anti-inflammatory, antioxidant and wound-healing spice active.</p>
              <div className="ing__used">
                <Link className="t-treat" href="/products/tltreat">TLTREAT</Link>
                <Link className="t-healer" href="/products/tl-healer">TL HEALER</Link>
              </div>
            </article>

            <article className="ing">
              <h3>Ginger & nutmeg</h3>
              <span className="ing__mol">Gingerols, myristicin</span>
              <p>Spice extracts that support digestion and the immune response.</p>
              <div className="ing__used">
                <Link className="t-treat" href="/products/tltreat">TLTREAT</Link>
              </div>
            </article>

            <article className="ing">
              <h3>Marigold</h3>
              <span className="ing__mol">Lutein carotenoids</span>
              <p>Fat-soluble pigments and antioxidants that colour the yolk.</p>
              <div className="ing__used">
                <Link className="t-egg" href="/products/tlegg">TLEGG</Link>
              </div>
            </article>

            <article className="ing">
              <h3>Menthol & eucalyptus</h3>
              <span className="ing__mol">Menthol, 1,8-cineole</span>
              <p>Open airways, loosen mucus and give a cooling effect in heat stress.</p>
              <div className="ing__used">
                <Link className="t-curtect" href="/products/curtect-crd">CURTECT-CRD</Link>
                <Link className="t-repeal" href="/products/tlrepeal">TLREPEAL</Link>
              </div>
            </article>

            <article className="ing">
              <h3>Rosemary & pine terpenes</h3>
              <span className="ing__mol">Alpha-pinene, limonene</span>
              <p>Terpenes with antimicrobial, antioxidant and decongestant action.</p>
              <div className="ing__used">
                <Link className="t-curtect" href="/products/curtect-crd">CURTECT-CRD</Link>
                <Link className="t-repeal" href="/products/tlrepeal">TLREPEAL</Link>
              </div>
            </article>

            <article className="ing">
              <h3>Basil & camphor</h3>
              <span className="ing__mol">Estragole, camphor</span>
              <p>Strong-smelling oils that repel mites through smell and contact.</p>
              <div className="ing__used">
                <Link className="t-repeal" href="/products/tlrepeal">TLREPEAL</Link>
              </div>
            </article>

            <article className="ing">
              <h3>Neem & cedarwood</h3>
              <span className="ing__mol">Azadirachtin, cedrol</span>
              <p>Traditional antiseptic and insect-repellent oils for skin care.</p>
              <div className="ing__used">
                <Link className="t-healer" href="/products/tl-healer">TL HEALER</Link>
              </div>
            </article>

            <article className="ing">
              <h3>Terpineol</h3>
              <span className="ing__mol">Alpha-terpineol</span>
              <p>Antimicrobial terpene alcohol that supports wound cleaning.</p>
              <div className="ing__used">
                <Link className="t-healer" href="/products/tl-healer">TL HEALER</Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* R&D Process */}
      <section className="section section--dark">
        <div className="wrap">
          <div className="head">
            <h2>Our R&D process</h2>
            <p className="lede">Four steps take a plant molecule from the field to a proven product.</p>
          </div>
          <ol className="process">
            <li>
              <span className="process__node"></span>
              <h3>Identify</h3>
              <p>Screen botanical compounds with known antimicrobial, anti-inflammatory and repellent properties.</p>
            </li>
            <li>
              <span className="process__node"></span>
              <h3>Extract</h3>
              <p>Recover pure essential oils and oleoresins without damaging the active molecules.</p>
            </li>
            <li>
              <span className="process__node"></span>
              <h3>Formulate for synergy</h3>
              <p>Combine compounds that hit a problem from several angles, lowering the chance of resistance.</p>
            </li>
            <li>
              <span className="process__node"></span>
              <h3>Validate</h3>
              <p>In-vitro lab work and in-vivo flock trials back every claim with data.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* Synergy Section */}
      <section className="section">
        <div className="wrap">
          <div className="head">
            <h2>One molecule can be beaten. A combination is much harder.</h2>
            <p className="lede">Bacteria and pests adapt to a single mode of action. Blends that act on several targets at once give them far fewer ways out.</p>
          </div>
          <div className="compare" style={{ marginBottom: '24px' }}>
            <div style={{ background: 'var(--mist)' }}>
              <h3 style={{ marginBottom: '12px' }}>Single active</h3>
              <svg viewBox="0 0 320 160" role="img" aria-label="One compound acting on one target">
                <circle cx="60" cy="80" r="22" fill="#94A3BF"/>
                <path d="M84 80h120" stroke="#94A3BF" strokeWidth="3" strokeDasharray="6 6"/>
                <circle cx="240" cy="80" r="34" fill="none" stroke="#B3261E" strokeWidth="3"/>
                <circle cx="240" cy="80" r="8" fill="#B3261E"/>
                <text x="240" y="140" textAnchor="middle" fontSize="13" fill="#4A5873" fontFamily="Figtree">1 target · easier to resist</text>
              </svg>
            </div>
            <div style={{ background: 'linear-gradient(140deg,#EEF2FB,#E6F5EC)' }}>
              <h3 style={{ marginBottom: '12px' }}>Remevia synergy blend</h3>
              <svg viewBox="0 0 320 160" role="img" aria-label="Several compounds acting on several targets">
                <defs>
                  <linearGradient id="sg" x1="0" x2="1">
                    <stop offset="0" stopColor="#2C49A6"/>
                    <stop offset=".5" stopColor="#1A97A4"/>
                    <stop offset="1" stopColor="#3BB54A"/>
                  </linearGradient>
                </defs>
                <circle cx="50" cy="40" r="14" fill="#2C49A6"/><circle cx="50" cy="80" r="14" fill="#1A97A4"/><circle cx="50" cy="120" r="14" fill="#3BB54A"/>
                <path d="M66 40C140 40 160 60 214 70M66 80h146M66 120C140 120 160 100 214 90M66 40C150 30 170 120 222 106" stroke="url(#sg)" strokeWidth="3" fill="none"/>
                <circle cx="240" cy="80" r="34" fill="none" stroke="#1E7A34" strokeWidth="3"/>
                <circle cx="240" cy="80" r="8" fill="#1E7A34"/>
                <text x="240" y="140" textAnchor="middle" fontSize="13" fill="#4A5873" fontFamily="Figtree">Many targets · hard to resist</text>
              </svg>
            </div>
          </div>
          <div className="synergy">
            <div className="syn t-curtect">
              <div className="syn__head"><h3>CURTECT-CRD</h3><span>6 actions</span></div>
              <div className="syn__body">
                <span>Bronchodilator</span>
                <span>Expectorant</span>
                <span>Mucolytic</span>
                <span>Decongestant</span>
                <span>Anti-inflammatory</span>
                <span>Antimicrobial & immune support</span>
              </div>
            </div>
            <div className="syn t-repeal">
              <div className="syn__head"><h3>TLREPEAL</h3><span>4 modes against mites</span></div>
              <div className="syn__body">
                <span>Taste avoidance</span>
                <span>Smell repellency</span>
                <span>Contact toxicity</span>
                <span>Vapour toxicity</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Control */}
      <section className="section section--mist" id="quality">
        <div className="wrap two-col">
          <div className="head" style={{ margin: 0 }}>
            <h2>Consistent from batch to batch</h2>
            <p className="lede">Natural raw materials vary. Our quality process makes sure what reaches your farm does not.</p>
          </div>
          <div className="grid grid--2">
            <div className="card">
              <span className="card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 19c0-8.5 6.2-14 15-14-.6 9-6.2 15-14 15"/><path d="M5 19l8-8"/>
                </svg>
              </span>
              <h3>Raw material checks</h3>
              <p>Every lot of spice, flower and oil is tested for identity and quality on arrival.</p>
            </div>
            <div className="card">
              <span className="card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 3h6M10 3v6.2L4.8 18a2 2 0 0 0 1.7 3h11a2 2 0 0 0 1.7-3L14 9.2V3"/><path d="M7.5 14h9"/>
                </svg>
              </span>
              <h3>Standardised actives</h3>
              <p>Formulations are adjusted so active content stays within specification.</p>
            </div>
            <div className="card">
              <span className="card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 13h6M9 17h6"/>
                </svg>
              </span>
              <h3>Batch QC & COA</h3>
              <p>Each batch is released with a certificate of analysis, available to buyers.</p>
            </div>
            <div className="card">
              <span className="card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>
                </svg>
              </span>
              <h3>Protective packing</h3>
              <p>HMHDPE bottles and lined laminated bags protect actives from light and moisture.</p>
            </div>
          </div>
        </div>
        <div className="wrap" style={{ marginTop: '32px' }}>
          <div className="grid grid--4">
            <div className="placeholder" style={{ minHeight: '180px' }}>[GMP Certified Facility]</div>
            <div className="placeholder" style={{ minHeight: '180px' }}>[QC Analytical Laboratory]</div>
            <div className="placeholder" style={{ minHeight: '180px' }}>[ISO 9001 Quality System]</div>
            <div className="placeholder" style={{ minHeight: '180px' }}>[Export Registrations]</div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
