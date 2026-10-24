'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const PRODUCTS = [
  {
    id: 'tltreat',
    cls: 't-treat',
    color: '#B5692A',
    tags: ['broilers', 'layers', 'gut'],
    name: 'TLTREAT',
    kicker: 'NATURAL AGP REPLACER · GUT HEALTH & GROWTH',
    desc: 'The ultimate health enhancer for poultry. Spice extracts of ginger, turmeric and nutmeg stimulate immunity and replace antibiotic growth promoters.',
    img: '/assets/img/tltreat.webp',
    href: '/products/tltreat',
    ticksCol1: [
      '2 kg of TLTREAT delivers up to 20 kg additional meat',
      'Helps prevent coccidiosis with regular use'
    ],
    ticksCol2: [
      'Reduces mortality and improves FCR',
      'Extends the laying cycle in layers'
    ],
    specs: [
      { label: 'FORMAT', val: 'Feed powder' },
      { label: 'SPECIES', val: 'Broilers, layers' },
      { label: 'PACKING', val: '50 kg PP laminated bag with liner' }
    ]
  },
  {
    id: 'curtect-crd',
    cls: 't-curtect',
    color: '#1B7EC0',
    tags: ['broilers', 'layers', 'breeders', 'resp'],
    name: 'CURTECT-CRD',
    kicker: 'RESPIRATORY SUPPORT',
    desc: 'Quick relief from respiratory distress caused by dust, heat or vaccination. Formulated with menthol, eucalyptus, rosemary, alpha-pinene and limonene.',
    img: '/assets/img/curtect-crd.webp',
    href: '/products/curtect-crd',
    ticksCol1: [
      'Bronchodilator, expectorant and mucolytic action',
      'Helps birds recover from post-vaccination reactions'
    ],
    ticksCol2: [
      'Reduces gasping and improves oxygenation',
      'Visible relief within 24–48 hours'
    ],
    specs: [
      { label: 'FORMAT', val: 'Water soluble liquid' },
      { label: 'SPECIES', val: 'Broilers, layers, breeders' },
      { label: 'PACKING', val: '5 kg and 20 kg HMHDPE bottles' }
    ]
  },
  {
    id: 'tlegg',
    cls: 't-egg',
    color: '#7DBE3F',
    tags: ['layers', 'egg'],
    name: 'TLEGG',
    kicker: 'EGG YOLK COLOUR ENHANCER',
    desc: 'Carotenoids from marigold flowers and spice extracts turn yolks a rich orange-yellow, even on diets with less maize.',
    img: '/assets/img/tlegg.webp',
    href: '/products/tlegg',
    ticksCol1: [
      'Deeper, consistent yolk colour',
      'Strong antioxidant carotenoids (lutein)'
    ],
    ticksCol2: [
      'Natural pigments, no synthetic colourants',
      'Simple 1 kg per tonne inclusion'
    ],
    specs: [
      { label: 'FORMAT', val: 'Feed powder' },
      { label: 'SPECIES', val: 'Layers' },
      { label: 'PACKING', val: '50 kg PP laminated bag with liner' }
    ]
  },
  {
    id: 'tlrepeal',
    cls: 't-repeal',
    color: '#D7262E',
    tags: ['layers', 'breeders', 'pest'],
    name: 'TLREPEAL',
    kicker: 'AVIAN RED MITE CONTROL',
    desc: 'A blend of basil, camphor, eucalyptus and D-limonene that protects flocks from avian red mites through water or nest spraying.',
    img: '/assets/img/tlrepeal.webp',
    href: '/products/tlrepeal',
    ticksCol1: [
      'Repels mites by smell and taste avoidance',
      'Safe for birds and farm workers'
    ],
    ticksCol2: [
      'Contact and vapour action against mites',
      'Long-lasting effect after application'
    ],
    specs: [
      { label: 'FORMAT', val: 'Water soluble liquid' },
      { label: 'SPECIES', val: 'Layers, breeders' },
      { label: 'PACKING', val: '5 kg and 20 kg HMHDPE bottles' }
    ]
  },
  {
    id: 'tl-healer',
    cls: 't-healer',
    color: '#EE8A1C',
    tags: ['livestock', 'layers', 'broilers', 'skin'],
    name: 'TL HEALER',
    kicker: 'WOUNDS & TICK BITES',
    desc: 'Natural spray for wounds, tick bites and skin injuries on livestock and birds. Cedarwood oil, curcumin, neem oil and terpineol.',
    img: '/assets/img/tl-healer.webp',
    href: '/products/tl-healer',
    ticksCol1: [
      'Works on septic and non-septic wounds',
      'Excellent fly repellent'
    ],
    ticksCol2: [
      'Provides fast relief',
      'Low probability of resistance'
    ],
    specs: [
      { label: 'FORMAT', val: 'Topical spray' },
      { label: 'SPECIES', val: 'Cattle, goats, poultry' },
      { label: 'PACKING', val: '5 kg and 20 kg HMHDPE bottles' }
    ]
  }
];

const FILTERS = [
  { id: 'all', label: 'All products' },
  { id: 'broilers', label: 'Broilers' },
  { id: 'layers', label: 'Layers' },
  { id: 'breeders', label: 'Breeders' },
  { id: 'livestock', label: 'Livestock' },
  { id: 'gut', label: 'Gut & growth' },
  { id: 'resp', label: 'Respiratory' },
  { id: 'egg', label: 'Egg quality' },
  { id: 'pest', label: 'Red mites' },
  { id: 'skin', label: 'Wounds & skin' }
];

export default function ProductsPage() {
  const [filter, setFilter] = useState('all');

  const filtered = PRODUCTS.filter((p) => {
    if (filter === 'all') return true;
    return p.tags.includes(filter);
  });

  return (
    <div style={{ background: '#FAFBFB', minHeight: '100vh', paddingBottom: '60px' }}>
      {/* Products Page Header */}
      <section style={{ background: '#FFFFFF', borderBottom: '1px solid #EAEFF2', padding: '40px 0 32px' }}>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb" style={{ marginBottom: '16px' }}>
            <Link href="/" style={{ color: 'var(--blue)', textDecoration: 'none' }}>Home</Link>
            <span aria-hidden="true" style={{ margin: '0 8px', color: '#94A3B8' }}>/</span>
            <span style={{ color: 'var(--muted)' }}>Products</span>
          </nav>
          
          <h1 style={{ 
            fontSize: 'clamp(36px, 4.5vw, 54px)', 
            fontWeight: 700, 
            color: 'var(--ink)', 
            letterSpacing: '-.02em', 
            lineHeight: 1.1,
            margin: '0 0 16px',
            maxWidth: '22ch'
          }}>
            Natural solutions for every stage of production
          </h1>

          <p style={{ 
            fontSize: '18px', 
            color: 'var(--slate)', 
            lineHeight: 1.55, 
            maxWidth: '68ch', 
            margin: '0 0 28px' 
          }}>
            Five targeted formulations for gut health, breathing, egg quality, red mites and wound care. Feed, water and spray formats that fit your existing routine.
          </p>

          {/* Filter Pills */}
          <div className="filters" role="group" aria-label="Filter products" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
                style={{
                  minHeight: '40px',
                  padding: '0 20px',
                  borderRadius: '999px',
                  fontSize: '15px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all .15s ease',
                  border: filter === f.id ? '1.5px solid #0F1B3D' : '1.5px solid #DCE3EA',
                  background: filter === f.id ? '#0F1B3D' : '#FFFFFF',
                  color: filter === f.id ? '#FFFFFF' : '#0F1B3D'
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product List */}
      <section style={{ padding: '36px 0 56px' }}>
        <div className="wrap">
          <p style={{ fontSize: '15px', color: 'var(--muted)', marginBottom: '24px' }} aria-live="polite">
            Showing {filtered.length} of {PRODUCTS.length} products
          </p>

          {filtered.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {filtered.map((p) => (
                <article key={p.id} className={`prow ${p.cls}`} style={{
                  display: 'grid',
                  gridTemplateColumns: '72px minmax(0, 360px) minmax(0, 1.4fr)',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 20px -8px rgba(15,27,61,.06)'
                }}>
                  {/* Left Colored Band */}
                  <div className="prow__band" style={{ background: p.color, display: 'grid', placeItems: 'center' }}>
                    <span style={{
                      writingMode: 'vertical-rl',
                      transform: 'rotate(180deg)',
                      font: '700 32px/1 var(--display)',
                      color: '#FFFFFF',
                      letterSpacing: '.06em'
                    }}>
                      {p.name}
                    </span>
                  </div>

                  {/* Product Media */}
                  <div className="prow__media" style={{
                    background: 'radial-gradient(circle at 50% 50%, #FFFFFF 0%, #F5F7F8 75%)',
                    display: 'grid',
                    placeItems: 'center',
                    padding: '36px'
                  }}>
                    <img 
                      src={p.img} 
                      alt={p.name} 
                      loading="lazy" 
                      width="360" 
                      height="360"
                      style={{ maxHeight: '280px', width: 'auto', objectFit: 'contain' }}
                    />
                  </div>

                  {/* Product Content Body */}
                  <div className="prow__body" style={{
                    padding: 'clamp(24px, 3.5vw, 40px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    justifyContent: 'center'
                  }}>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '.08em',
                      textTransform: 'uppercase',
                      color: 'var(--muted)'
                    }}>
                      {p.kicker}
                    </span>

                    <h2 style={{
                      fontSize: 'clamp(28px, 2.8vw, 36px)',
                      fontWeight: 700,
                      color: 'var(--ink)',
                      margin: 0,
                      letterSpacing: '-.015em'
                    }}>
                      {p.name}
                    </h2>

                    <p style={{
                      fontSize: '16px',
                      lineHeight: 1.55,
                      color: 'var(--slate)',
                      margin: 0
                    }}>
                      {p.desc}
                    </p>

                    {/* 2-column Checkmarks */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                      gap: '10px 24px',
                      margin: '6px 0'
                    }}>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {p.ticksCol1.map((t, idx) => (
                          <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '15px', color: 'var(--ink)', lineHeight: 1.4 }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '18px', height: '18px', flexShrink: 0, color: p.color, marginTop: '2px' }}>
                              <path d="M5 12.5l4.2 4.2L19 7"/>
                            </svg>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {p.ticksCol2.map((t, idx) => (
                          <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '15px', color: 'var(--ink)', lineHeight: 1.4 }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '18px', height: '18px', flexShrink: 0, color: p.color, marginTop: '2px' }}>
                              <path d="M5 12.5l4.2 4.2L19 7"/>
                            </svg>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 3-column Specs Box */}
                    <dl style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                      gap: '12px',
                      background: '#F4F7F6',
                      borderRadius: '12px',
                      padding: '14px 18px',
                      margin: '6px 0 0'
                    }}>
                      {p.specs.map((s, idx) => (
                        <div key={idx}>
                          <dt style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '.06em', color: 'var(--muted)', textTransform: 'uppercase' }}>
                            {s.label}
                          </dt>
                          <dd style={{ margin: '4px 0 0', fontWeight: 500, fontSize: '14px', color: 'var(--ink)', lineHeight: 1.35 }}>
                            {s.val}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    {/* Action Buttons */}
                    <div className="btn-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '8px' }}>
                      <Link 
                        className="btn" 
                        href={p.href}
                        style={{
                          background: 'var(--leaf-d)',
                          color: '#FFFFFF',
                          borderRadius: '999px',
                          padding: '12px 26px',
                          fontWeight: 600,
                          fontSize: '15px',
                          textDecoration: 'none',
                          border: 'none'
                        }}
                      >
                        View details
                      </Link>

                      <Link 
                        className="btn" 
                        href={`/contact?type=quote&product=${p.name}`}
                        style={{
                          background: '#FFFFFF',
                          color: 'var(--ink)',
                          border: '1.5px solid #DCE3EA',
                          borderRadius: '999px',
                          padding: '12px 22px',
                          fontWeight: 500,
                          fontSize: '15px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          textDecoration: 'none'
                        }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '16px', height: '16px' }}>
                          <path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>
                        </svg>
                        Datasheet (PDF)
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty is-on" style={{ background: '#FFFFFF', borderRadius: '18px', padding: '56px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
              <h3 style={{ fontSize: '22px', color: 'var(--ink)', margin: '0 0 8px' }}>No products match this filter</h3>
              <p style={{ color: 'var(--slate)', margin: 0 }}>
                Choose "All products" or tell us your challenge and we will recommend one.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Quick Dosing Guide Table */}
      <section style={{ padding: '24px 0 64px' }} id="dosing">
        <div className="wrap">
          <div style={{ marginBottom: '24px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: '6px' }}>
              FOR NUTRITIONISTS & FEED MILLS
            </span>
            <h2 style={{ fontSize: 'clamp(28px, 3.2vw, 40px)', fontWeight: 700, color: 'var(--ink)', margin: 0, letterSpacing: '-.02em' }}>
              Quick dosing guide
            </h2>
          </div>

          <div className="table-wrap" style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '16px',
            overflowX: 'auto',
            boxShadow: '0 4px 16px -6px rgba(15,27,61,.04)'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '760px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#F8FAFB', borderBottom: '1px solid #E2E8F0' }}>
                  <th style={{ padding: '16px 20px', fontSize: '13px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.05em' }}>PRODUCT</th>
                  <th style={{ padding: '16px 20px', fontSize: '13px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.05em' }}>USE</th>
                  <th style={{ padding: '16px 20px', fontSize: '13px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.05em' }}>RATE</th>
                  <th style={{ padding: '16px 20px', fontSize: '13px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.05em' }}>PROGRAMME</th>
                  <th style={{ padding: '16px 20px', fontSize: '13px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.05em' }}>PACKING</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <Link href="/products/tltreat" style={{ textDecoration: 'none', color: 'var(--ink)', fontWeight: 700 }}>TLTREAT</Link>
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>Broilers</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>1–2 kg / 1,000 kg feed</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>Day 1 to day 40</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>50 kg laminated bag</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <Link href="/products/tltreat" style={{ textDecoration: 'none', color: 'var(--ink)', fontWeight: 700 }}>TLTREAT</Link>
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>Layers</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>2 kg / 1,000 kg feed</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>Week 60 to week 110</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>50 kg laminated bag</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <Link href="/products/curtect-crd" style={{ textDecoration: 'none', color: 'var(--ink)', fontWeight: 700 }}>CURTECT-CRD</Link>
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>Prevention</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>200 ml / 1,000 L water</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>Twice a week, 12-hour cycle</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>5 kg, 20 kg bottles</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <Link href="/products/curtect-crd" style={{ textDecoration: 'none', color: 'var(--ink)', fontWeight: 700 }}>CURTECT-CRD</Link>
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>Post-vaccination / adjunct</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>200 ml / 1,000 L water</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>Twice a day for 4 days, 8 h apart</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>5 kg, 20 kg bottles</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <Link href="/products/tlegg" style={{ textDecoration: 'none', color: 'var(--ink)', fontWeight: 700 }}>TLEGG</Link>
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>Layers</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>1 kg / 1,000 kg feed</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>Continuous in feed</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>50 kg laminated bag</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <Link href="/products/tlrepeal" style={{ textDecoration: 'none', color: 'var(--ink)', fontWeight: 700 }}>TLREPEAL</Link>
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>In water</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>150 ml / 1,000 L water</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>Alternate weeks</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>5 kg, 20 kg bottles</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <Link href="/products/tlrepeal" style={{ textDecoration: 'none', color: 'var(--ink)', fontWeight: 700 }}>TLREPEAL</Link>
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>Nest spray</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>300 ml / 1,000 L water</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>Alternate weeks, rotate with water use</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>5 kg, 20 kg bottles</td>
                </tr>
                <tr>
                  <td style={{ padding: '16px 20px' }}>
                    <Link href="/products/tl-healer" style={{ textDecoration: 'none', color: 'var(--ink)', fontWeight: 700 }}>TL HEALER</Link>
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>Wounds, tick bites</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>Spray or apply directly</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>On affected area as needed</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>5 kg, 20 kg bottles</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '16px' }}>
            Rates from Remevia product literature. Consult your nutritionist or veterinarian for your flock.
          </p>
        </div>
      </section>

      {/* Call To Action Banner (Matching Page 3 of PDF) */}
      <section style={{ padding: '16px 0 32px' }}>
        <div className="wrap">
          <div style={{
            background: '#0E1A38',
            borderRadius: '24px',
            padding: 'clamp(32px, 5vw, 48px)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            color: '#FFFFFF',
            boxShadow: '0 12px 36px -12px rgba(14,26,56,.35)'
          }}>
            <div style={{ maxWidth: '640px' }}>
              <h2 style={{
                color: '#FFFFFF',
                fontSize: 'clamp(24px, 2.8vw, 34px)',
                fontWeight: 700,
                letterSpacing: '-.02em',
                margin: '0 0 10px'
              }}>
                Not sure which product fits your flock?
              </h2>
              <p style={{
                color: '#C9D3EA',
                fontSize: '16px',
                lineHeight: 1.55,
                margin: 0
              }}>
                Share your challenge and flock size. Our technical team will recommend a programme within one working day.
              </p>
            </div>

            <div className="btn-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
              <Link
                href="/contact"
                style={{
                  background: '#FFFFFF',
                  color: 'var(--ink)',
                  borderRadius: '999px',
                  padding: '13px 26px',
                  fontWeight: 600,
                  fontSize: '15px',
                  textDecoration: 'none',
                  border: 'none',
                  transition: 'opacity .15s'
                }}
              >
                Talk to an expert
              </Link>

              <Link
                href="/contact?type=trial"
                style={{
                  background: 'var(--leaf-d)',
                  color: '#FFFFFF',
                  borderRadius: '999px',
                  padding: '13px 26px',
                  fontWeight: 600,
                  fontSize: '15px',
                  textDecoration: 'none',
                  border: 'none',
                  transition: 'opacity .15s'
                }}
              >
                Request a trial
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
