'use client';

import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <section className="phero">
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: '40px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>About</span>
            </nav>
            <h1>Built on science. Driven by purpose.</h1>
            <p className="lede">
              We started Remevia to help farmers raise healthier animals without antibiotics, and to give families safer food.
            </p>
          </div>
          <div className="placeholder" style={{ minHeight: '360px', background: 'rgba(255,255,255,.08)', color: '#C9D3EA', borderColor: 'rgba(255,255,255,.35)' }}>
            [Remevia R&D Facility & Extraction Center, Kerala]
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section">
        <div className="wrap two-col">
          <h2>Our story</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '19px', color: 'var(--slate)', maxWidth: '64ch' }}>
            <p>
              Remevia began in Irinjalakuda, Kerala, when our founders saw how heavily poultry farming had come to rely on antibiotics, and how much risk that created for people and the planet.
            </p>
            <p>
              They believed the answer already existed in nature. Kerala's spices and medicinal plants have protected people and animals for centuries. Today we combine that botanical heritage with modern supercritical extraction and standardized formulation to give poultry and livestock producers a reliable, scientifically validated natural alternative.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap mv">
          <div className="mv__m">
            <small>Our mission</small>
            <p>To replace antibiotics in animal farming with high-performing botanical solutions.</p>
          </div>
          <div className="mv__v">
            <small>Our vision</small>
            <p>A world where livestock thrive, farmers prosper and every family eats residue-free food.</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section section--mist">
        <div className="wrap">
          <div className="head"><h2>What we stand for</h2></div>
          <div className="grid grid--4">
            <div className="card">
              <span className="card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 3h6M10 3v6.2L4.8 18a2 2 0 0 0 1.7 3h11a2 2 0 0 0 1.7-3L14 9.2V3"/><path d="M7.5 14h9"/>
                </svg>
              </span>
              <h3>Science first</h3>
              <p>Every claim is tested in the lab and on the farm before it goes on a label.</p>
            </div>
            <div className="card">
              <span className="card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 19c0-8.5 6.2-14 15-14-.6 9-6.2 15-14 15"/><path d="M5 19l8-8"/>
                </svg>
              </span>
              <h3>Nature as partner</h3>
              <p>We use the molecules plants already make, not synthetic copies.</p>
            </div>
            <div className="card">
              <span className="card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 20h16M7 20V11M12 20V5M17 20v-6"/>
                </svg>
              </span>
              <h3>Farmer success</h3>
              <p>Our products have to pay back in weight, eggs and fewer losses.</p>
            </div>
            <div className="card">
              <span className="card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3l8 3.5V12c0 4.6-3.4 8-8 9-4.6-1-8-4.4-8-9V6.5z"/>
                  <path d="M8.5 12l2.5 2.5 4.5-5"/>
                </svg>
              </span>
              <h3>Honest results</h3>
              <p>We share trial data openly with customers and partners.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="section">
        <div className="wrap">
          <div className="head"><h2>Our journey</h2></div>
          <ol className="timeline">
            <li><b>Origin</b><span>Remevia founded in Irinjalakuda, Kerala to pioneer botanical animal health</span></li>
            <li><b>R&D</b><span>TLTREAT developed and proven in field trials as an effective AGP alternative</span></li>
            <li><b>Portfolio</b><span>CURTECT-CRD, TLEGG, TLREPEAL and TL HEALER formulated and standardized</span></li>
            <li><b>Global</b><span>Expansion into Middle Eastern, South Asian and Southeast Asian export markets</span></li>
          </ol>
        </div>
      </section>

      {/* Impact */}
      <section className="section section--dark">
        <div className="wrap">
          <div className="head">
            <h2>Better for birds, farmers and the food chain</h2>
            <p className="lede">Replacing antibiotics on the farm has effects far beyond the farm gate.</p>
          </div>
          <div className="grid grid--3">
            <div className="card" style={{ background: 'rgba(255,255,255,.06)', borderColor: 'rgba(255,255,255,.14)', color: '#fff' }}>
              <span className="card__icon" style={{ color: '#8EE09A', background: 'rgba(255,255,255,.08)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3c3.5 0 6.5 5.5 6.5 10a6.5 6.5 0 0 1-13 0C5.5 8.5 8.5 3 12 3z"/>
                </svg>
              </span>
              <h3>Safer food</h3>
              <p style={{ color: '#C9D3EA' }}>No antibiotic residues in the meat and eggs that reach consumers.</p>
            </div>
            <div className="card" style={{ background: 'rgba(255,255,255,.06)', borderColor: 'rgba(255,255,255,.14)', color: '#fff' }}>
              <span className="card__icon" style={{ color: '#7FD3DD', background: 'rgba(255,255,255,.08)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>
                </svg>
              </span>
              <h3>Protecting medicine</h3>
              <p style={{ color: '#C9D3EA' }}>Less antibiotic use on farms helps keep antibiotics working for people.</p>
            </div>
            <div className="card" style={{ background: 'rgba(255,255,255,.06)', borderColor: 'rgba(255,255,255,.14)', color: '#fff' }}>
              <span className="card__icon" style={{ color: '#A9C4FF', background: 'rgba(255,255,255,.08)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 19c0-8.5 6.2-14 15-14-.6 9-6.2 15-14 15"/><path d="M5 19l8-8"/>
                </svg>
              </span>
              <h3>Gentle on the environment</h3>
              <p style={{ color: '#C9D3EA' }}>Plant-based actives that are safe for farm workers, animals and soil.</p>
            </div>
          </div>
          <div className="btn-row" style={{ marginTop: '36px' }}>
            <Link className="btn btn--light" href="/contact?type=distributor">
              Partner with us
            </Link>
            <Link className="btn btn--ghost-light" href="/products">
              See our products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
