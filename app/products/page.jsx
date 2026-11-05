'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PageHero from '../components/PageHero';
import { rich, useLanguage } from '../context/LanguageContext';

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
    id: 'eksit-crd',
    cls: 't-eksit',
    color: '#7B2CBF',
    tags: ['broilers', 'layers', 'breeders', 'resp', 'crd'],
    name: 'EKSIT-CRD',
    kicker: 'CHRONIC RESPIRATORY DISEASE · ANTI-MYCOPLASMA',
    desc: 'Breakthrough synergy of Cinnamon, Curcuminoids, Eucalyptus, Mint, Oregano and Vasaka. Curative properties against resistant Mycoplasma Gallisepticum with superior zone of inhibition.',
    img: '/assets/img/eksit-crd.webp',
    href: '/products/eksit-crd',
    ticksCol1: [
      'Proven curative action against Mycoplasma Gallisepticum',
      'Superior zone of inhibition vs. resistant antibiotic strains'
    ],
    ticksCol2: [
      'Vasaka & Eucalyptus liquefy deep fibrinous plugs',
      'Structured 2-days ON / 2-days OFF drinking water cycle'
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
  { id: 'resp', label: 'Respiratory & CRD' },
  { id: 'egg', label: 'Egg quality' },
  { id: 'pest', label: 'Red mites' },
  { id: 'skin', label: 'Wounds & skin' }
];

export default function ProductsPage() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');

  const filtered = PRODUCTS.filter((p) => {
    if (filter === 'all') return true;
    return p.tags.includes(filter);
  });

  return (
    <div style={{ background: '#FAFBFB', minHeight: '100vh', paddingBottom: '60px' }}>
      {/* Products Page Header */}
      <PageHero
        scene="products"
        crumb={t("Products")}
        title={t("Natural solutions for every stage of production")}
        lede={t("Six targeted formulations across liquids and powders for gut health, chronic respiratory diseases, egg quality, red mites, and wound care. Standard 5 kg & 20 kg HMHDPE liquid cans and 50 kg lined powder bags that seamlessly fit your farm and feed mill routines.")}
        facts={{
          title: t("Range Facts"),
          sub: t("The whole Remevia range at a glance"),
          rows: [
            { label: t("Formulations"), value: '6' },
            { label: t("Format"), value: t("Feed, water & spray") },
            { label: t("Packing"), value: t("5 kg & 20 kg cans, 50 kg bags") },
            { label: t("Shelf life"), value: t("24 months") },
            { label: t("Withdrawal"), value: t("0 days"), highlight: true },
          ],
        }}
      >
        <div className="filters" role="group" aria-label={t("Filter products")}>
          {FILTERS.map((f) => (
            <button key={f.id} type="button" className="filter" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
              {t(f.label)}
            </button>
          ))}
        </div>
      </PageHero>

      {/* Product List */}
      <section style={{ padding: '36px 0 56px' }}>
        <div className="wrap">
          <p style={{ fontSize: '15px', color: 'var(--muted)', marginBottom: '24px' }} aria-live="polite">
            {t("Showing {shown} of {total} products", { shown: filtered.length, total: PRODUCTS.length })}
          </p>

          {filtered.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {filtered.map((p) => (
                <article key={p.id} className={`prow ${p.cls}`} style={{
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
                  <div className="prow__media">
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
                      {t(p.kicker)}
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
                      {t(p.desc)}
                    </p>

                    {/* 2-column Checkmarks */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                      gap: '10px 24px',
                      margin: '6px 0'
                    }}>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {p.ticksCol1.map((tick, idx) => (
                          <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '15px', color: 'var(--ink)', lineHeight: 1.4 }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '18px', height: '18px', flexShrink: 0, color: p.color, marginTop: '2px' }}>
                              <path d="M5 12.5l4.2 4.2L19 7"/>
                            </svg>
                            <span>{t(tick)}</span>
                          </li>
                        ))}
                      </ul>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {p.ticksCol2.map((tick, idx) => (
                          <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '15px', color: 'var(--ink)', lineHeight: 1.4 }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '18px', height: '18px', flexShrink: 0, color: p.color, marginTop: '2px' }}>
                              <path d="M5 12.5l4.2 4.2L19 7"/>
                            </svg>
                            <span>{t(tick)}</span>
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
                            {t(s.label)}
                          </dt>
                          <dd style={{ margin: '4px 0 0', fontWeight: 500, fontSize: '14px', color: 'var(--ink)', lineHeight: 1.35 }}>
                            {t(s.val)}
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
                      >{t("View details")}</Link>

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
                        </svg>{t("Datasheet (PDF)")}</Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty is-on" style={{ background: '#FFFFFF', borderRadius: '18px', padding: '56px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
              <h3 style={{ fontSize: '22px', color: 'var(--ink)', margin: '0 0 8px' }}>{t("No products match this filter")}</h3>
              <p style={{ color: 'var(--slate)', margin: 0 }}>{t("Choose \"All products\" or tell us your challenge and we will recommend one.")}</p>
            </div>
          )}
        </div>
      </section>

      {/* Quick Dosing Guide Table */}
      <section style={{ padding: '24px 0 64px' }} id="dosing">
        <div className="wrap">
          <div style={{ marginBottom: '24px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: '6px' }}>{t("FOR NUTRITIONISTS & FEED MILLS")}</span>
            <h2 style={{ fontSize: 'clamp(28px, 3.2vw, 40px)', fontWeight: 700, color: 'var(--ink)', margin: '0 0 16px', letterSpacing: '-.02em' }}>{t("Quick dosing guide & packaging formats")}</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '12px',
              marginBottom: '20px'
            }}>
              <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '12px', padding: '14px 18px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#1D4ED8', letterSpacing: '.05em', display: 'block', marginBottom: '4px' }}>{t("Liquid Products (EKSIT · CURTECT-CRD · TLREPEAL · TL HEALER)")}</span>
                <p style={{ margin: 0, fontSize: '14px', color: '#1E3A8A', lineHeight: 1.45 }}>
                  {rich(t("Supplied in heavy-duty <b>5 kg & 20 kg HMHDPE bottles/cans</b>. Standardized uniform container design with tamper-evident caps and distinct color-coded product labeling."))}
                </p>
              </div>
              <div style={{ background: '#F7FEE7', border: '1px solid #D9F99D', borderRadius: '12px', padding: '14px 18px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#4D7C0F', letterSpacing: '.05em', display: 'block', marginBottom: '4px' }}>{t("Powder Premixes (TLTREAT · TLEGG)")}</span>
                <p style={{ margin: 0, fontSize: '14px', color: '#365314', lineHeight: 1.45 }}>
                  {rich(t("Packaged in moisture-resistant <b>50 kg PP woven outer laminated bags with inner HMHDPE liners</b> for automated feed mill micro-dosing and maximum free-flow shelf stability."))}
                </p>
              </div>
            </div>
          </div>

          <div className="table-wrap" style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '16px',
            overflowX: 'auto',
            boxShadow: '0 4px 16px -6px rgba(15,27,61,.04)'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '760px', textAlign: 'start' }}>
              <thead>
                <tr style={{ background: '#F8FAFB', borderBottom: '1px solid #E2E8F0' }}>
                  <th style={{ padding: '16px 20px', fontSize: '13px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.05em' }}>{t("PRODUCT")}</th>
                  <th style={{ padding: '16px 20px', fontSize: '13px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.05em' }}>{t("USE")}</th>
                  <th style={{ padding: '16px 20px', fontSize: '13px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.05em' }}>{t("RATE")}</th>
                  <th style={{ padding: '16px 20px', fontSize: '13px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.05em' }}>{t("PROGRAMME")}</th>
                  <th style={{ padding: '16px 20px', fontSize: '13px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.05em' }}>{t("PACKING")}</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <Link href="/products/tltreat" style={{ textDecoration: 'none', color: 'var(--ink)', fontWeight: 700 }}>TLTREAT</Link>
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>{t("Broilers")}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>{t("1–2 kg / 1,000 kg feed")}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>{t("Day 1 to day 40")}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>{t("50 kg laminated bag")}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <Link href="/products/tltreat" style={{ textDecoration: 'none', color: 'var(--ink)', fontWeight: 700 }}>TLTREAT</Link>
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>{t("Layers")}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>{t("2 kg / 1,000 kg feed")}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>{t("Week 60 to week 110")}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>{t("50 kg laminated bag")}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <Link href="/products/curtect-crd" style={{ textDecoration: 'none', color: 'var(--ink)', fontWeight: 700 }}>CURTECT-CRD</Link>
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>{t("Prevention")}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>{t("200 ml / 1,000 L water")}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>{t("Twice a week, 12-hour cycle")}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>{t("5 kg, 20 kg bottles")}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <Link href="/products/curtect-crd" style={{ textDecoration: 'none', color: 'var(--ink)', fontWeight: 700 }}>CURTECT-CRD</Link>
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>{t("Post-vaccination / adjunct")}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>{t("200 ml / 1,000 L water")}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>{t("Twice a day for 4 days, 8 h apart")}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>{t("5 kg, 20 kg bottles")}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <Link href="/products/eksit-crd" style={{ textDecoration: 'none', color: 'var(--ink)', fontWeight: 700 }}>EKSIT-CRD</Link>
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>{t("Mycoplasma Gallisepticum & CRD")}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>{t("200 ml / 1,000 L water")}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>{t("Day 16 to 36 (2-days ON / 2-days OFF)")}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>{t("5 kg, 20 kg bottles")}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <Link href="/products/tlegg" style={{ textDecoration: 'none', color: 'var(--ink)', fontWeight: 700 }}>TLEGG</Link>
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>{t("Layers")}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>{t("1 kg / 1,000 kg feed")}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>{t("Continuous in feed")}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>{t("50 kg laminated bag")}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <Link href="/products/tlrepeal" style={{ textDecoration: 'none', color: 'var(--ink)', fontWeight: 700 }}>TLREPEAL</Link>
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>{t("In water")}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>{t("150 ml / 1,000 L water")}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>{t("Alternate weeks")}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>{t("5 kg, 20 kg bottles")}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <Link href="/products/tlrepeal" style={{ textDecoration: 'none', color: 'var(--ink)', fontWeight: 700 }}>TLREPEAL</Link>
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>{t("Nest spray")}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>{t("300 ml / 1,000 L water")}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>{t("Alternate weeks, rotate with water use")}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>{t("5 kg, 20 kg bottles")}</td>
                </tr>
                <tr>
                  <td style={{ padding: '16px 20px' }}>
                    <Link href="/products/tl-healer" style={{ textDecoration: 'none', color: 'var(--ink)', fontWeight: 700 }}>TL HEALER</Link>
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>{t("Wounds, tick bites")}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>{t("Spray or apply directly")}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>{t("On affected area as needed")}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate)' }}>{t("5 kg, 20 kg bottles")}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '16px' }}>{t("Rates from Remevia product literature. Consult your nutritionist or veterinarian for your flock.")}</p>
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
              }}>{t("Not sure which product fits your flock?")}</h2>
              <p style={{
                color: '#C9D3EA',
                fontSize: '16px',
                lineHeight: 1.55,
                margin: 0
              }}>{t("Share your challenge and flock size. Our technical team will recommend a programme within one working day.")}</p>
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
              >{t("Talk to an expert")}</Link>

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
              >{t("Request a trial")}</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
