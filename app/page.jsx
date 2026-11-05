'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from './context/LanguageContext';
import HeroShowcase from './components/HeroShowcase';
import ChallengeFinder from './components/ChallengeFinder';
import ProgrammeBuilder from './components/ProgrammeBuilder';
import CtaSection from './components/CtaSection';

const icon = (paths) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths}</svg>
);
const TICK = icon(<path d="M5 12.5l4.2 4.2L19 7" />);
const CROSS = icon(<path d="M7 7l10 10M17 7L7 17" />);

const AUDIENCES = [
  { label: 'Feed mills', icon: <><path d="M3 21V10l5 3V10l5 3V5h4l1 16z" /><path d="M3 21h18" /></> },
  { label: 'Poultry integrators', icon: <><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5" /></> },
  { label: 'Broiler & layer farms', icon: <><path d="M7 20h7M10 20v-3" /><path d="M15 6.5a3 3 0 1 0-5.6 1.4C6 9 4 11.6 4 14a3 3 0 0 0 3 3h6a6 6 0 0 0 6-6V9l2-1-2-1.2A3 3 0 0 0 15 6.5z" /></> },
  { label: 'Livestock farms', icon: <><path d="M5 8c-1.5 0-2-1.5-2-3 1.5 0 3 .5 3.5 2M19 8c1.5 0 2-1.5 2-3-1.5 0-3 .5-3.5 2" /><path d="M6.5 7h11l-.8 9a3 3 0 0 1-3 2.7h-3.4a3 3 0 0 1-3-2.7z" /></> },
  { label: 'Distributors', icon: <><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></> },
];

const ACTIVES = [
  'Curcumin', 'Ginger extract', 'Eucalyptus oil', 'Menthol', 'Rosemary oil', 'Oregano Essential Oil',
  'Cinnamon Essential Oil', 'Extract of Marigold (Tagetes erecta)', 'Basil oil', 'Neem oil', 'Cedarwood oil', 'D-Limonene',
];

const SHELF = [
  { cls: 't-treat', name: 'TLTREAT', href: '/products/tltreat', img: '/assets/img/tltreat.webp', cat: 'Gut health & growth', text: 'Replaces antibiotic growth promoters. Better FCR, lower mortality, stronger immunity.', chips: ['Feed powder', 'Broilers, layers'] },
  { cls: 't-curtect', name: 'CURTECT-CRD', href: '/products/curtect-crd', img: '/assets/img/curtect-crd.webp', cat: 'Respiratory support', text: 'Eases breathing after vaccination, dust or heat stress. Relief in 24–48 hours.', chips: ['Water-soluble liquid', 'All poultry'] },
  { cls: 't-eksit', name: 'EKSIT-CRD', href: '/products/eksit-crd', img: '/assets/img/eksit-crd.webp', cat: 'CRD & Mycoplasma', text: 'Curative properties against Mycoplasma Gallisepticum with superior zone of inhibition.', chips: ['Water-soluble liquid', 'Broilers, layers'] },
  { cls: 't-egg', name: 'TLEGG', href: '/products/tlegg', img: '/assets/img/tlegg.webp', cat: 'Egg quality', text: 'Rich orange-yellow yolks from marigold carotenoids, even on low-maize diets.', chips: ['Feed powder', 'Layers'] },
  { cls: 't-repeal', name: 'TLREPEAL', href: '/products/tlrepeal', img: '/assets/img/tlrepeal.webp', cat: 'Red mite control', text: 'Repels and controls avian red mites through drinking water or nest spraying.', chips: ['Water-soluble liquid', 'Layers, breeders'] },
  { cls: 't-healer', name: 'TL HEALER', href: '/products/tl-healer', img: '/assets/img/tl-healer.webp', cat: 'Wounds & skin', text: 'Topical spray for septic and non-septic wounds. Also an excellent fly repellent.', chips: ['Topical spray', 'Livestock & poultry'] },
];

const STEPS = [
  { title: 'Identify', text: 'Screen plant compounds with proven antimicrobial, anti-inflammatory and gut-health effects.' },
  { title: 'Extract', text: 'Recover essential oils, oleoresins and carotenoids while keeping the active molecules intact.' },
  { title: 'Formulate', text: 'Blend compounds that act on several targets at once, so pathogens and pests struggle to adapt.' },
  { title: 'Validate', text: 'Test in the lab and on live flocks, then standardise every batch before it ships.' },
];

// Figures come straight from each product's results section in data/products.js.
const RESULTS = [
  { cls: 't-treat', value: '-56%', label: 'Reduction in flock mortality', name: 'TLTREAT', href: '/products/tltreat', wide: true, extra: { value: '6.5%', label: 'Net improvement in FCR' } },
  { cls: 't-repeal', value: '-85%', label: 'Flock mite population drop', name: 'TLREPEAL', href: '/products/tlrepeal' },
  { cls: 't-curtect', value: '-78%', label: 'Audible tracheal rales reduction', name: 'CURTECT-CRD', href: '/products/curtect-crd' },
  { cls: 't-egg', value: '11–13', label: 'Target DSM yolk color rating', name: 'TLEGG', href: '/products/tlegg' },
  { cls: 't-healer', value: '3–5 Days', label: 'Average dry granulation onset', name: 'TL HEALER', href: '/products/tl-healer' },
];

const QUOTES = [
  { text: '“We replaced chemical AGPs with TLTREAT across 40,000 broilers. Zero drop in final body weight, significantly drier litter, and complete peace of mind on export testing.”', by: 'Commercial Poultry Integrator, South India', cls: 't-treat' },
  { text: '“Post-vaccination respiratory wheezing used to cause major stress. CURTECT-CRD in the water line showed visible ease of breathing within 36 hours.”', by: 'Farm Manager, Broiler Operations, UAE', cls: 't-curtect' },
  { text: '“Yolk colour rose from 8 to 12 on the DSM fan using TLEGG without altering our baseline feed formulation. Our premium egg buyers noticed immediately.”', by: 'Layer Farm Owner, Kerala', cls: 't-egg' },
];

const QUALITY = [
  { title: 'Standardised actives', text: 'Every formula is built on measured botanical actives.', icon: <><path d="M9 3h6M10 3v6.2L4.8 18a2 2 0 0 0 1.7 3h11a2 2 0 0 0 1.7-3L14 9.2V3" /><path d="M7.5 14h9" /></> },
  { title: 'Batch-wise quality control', text: 'Each batch is checked before it ships.', icon: <><path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6z" /><path d="M8.5 12l2.4 2.4 4.6-4.8" /></> },
  { title: 'Export-ready packing', text: '5 kg & 20 kg HMHDPE bottles and 50 kg lined bags.', icon: <><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" /><path d="M4 7.5l8 4.5 8-4.5M12 12v9" /></> },
  { title: '24-month shelf life', text: 'Stable storage from the date of manufacture.', icon: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></> },
];

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      <HeroShowcase />

      {/* Who it is for, and what it is made from */}
      <section className="ribbon" aria-label={t("Who we serve")}>
        <div className="wrap">
          <span className="ribbon__label">{t("Built for")}</span>
          {AUDIENCES.map((a) => (
            <span className="ribbon__item" key={a.label}>{icon(a.icon)}{t(a.label)}</span>
          ))}
        </div>
        <div className="marquee" dir="ltr" aria-hidden="true">
          <div className="marquee__track">
            {[...ACTIVES, ...ACTIVES].map((name, i) => (
              <span key={`${name}${i}`} className={`marquee__pill marquee__pill--${i % 6}`}><bdi>{t(name)}</bdi></span>
            ))}
          </div>
        </div>
      </section>

      {/* Step 1: why change */}
      <section className="section">
        <div className="wrap">
          <div className="split">
            <div className="split__side split__side--problem">
              <span className="split__tag">{t("The challenge")}</span>
              <h2>{t("Antibiotic resistance has reached the farm gate")}</h2>
              <p>{t("For decades antibiotics were used to grow birds faster and prevent disease. Overuse in human and veterinary medicine created resistant bacteria and left residues in meat and eggs.")}</p>
              <ul>
                {['Regulators are restricting antibiotic growth promoters', 'Export buyers test for antibiotic residues', 'Consumers ask for antibiotic-free meat and eggs'].map((text) => (
                  <li key={text}>{CROSS}<span>{t(text)}</span></li>
                ))}
              </ul>
            </div>
            <span className="split__arrow" aria-hidden="true">
              {icon(<path d="M5 12h14M13 6l6 6-6 6" />)}
            </span>
            <div className="split__side split__side--answer">
              <span className="split__tag">{t("The Remevia answer")}</span>
              <h2>{t("Nature already has the molecules. We make them work.")}</h2>
              <p>{t("Plants defend themselves with essential oils and oleoresins. We identify these molecules, extract them gently and blend them into precise, easy-to-dose formulations.")}</p>
              <ul>
                {['Feed, drinking-water and spray formats', 'Multi-target blends with low resistance risk', 'Safe for birds, animals, workers and consumers'].map((text) => (
                  <li key={text}>{TICK}<span>{t(text)}</span></li>
                ))}
              </ul>
              <Link className="link-arrow" href="/science">{t("See the science behind it")}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Step 2: the range */}
      <section className="section section--mist">
        <div className="wrap">
          <div className="head head--row">
            <div className="head__text">
              <span className="eyebrow">{t("The range")}</span>
              <h2>{t("One natural solution for every challenge on the farm")}</h2>
              <p className="lede">{t("Six targeted formulations across liquids and powders for broilers, layers, breeders and livestock.")}</p>
            </div>
            <Link className="btn btn--ghost" href="/products">{t("Compare all products")}</Link>
          </div>
          <div className="shelf">
            {SHELF.map((p) => (
              <Link className={`pcard ${p.cls}`} href={p.href} key={p.name}>
                <div className="pcard__media">
                  <span className="pcard__band" aria-hidden="true"><span>{p.name}</span></span>
                  <img src={p.img} alt={p.name} loading="lazy" width="400" height="400" />
                </div>
                <div className="pcard__body">
                  <span className="pcard__cat">{t(p.cat)}</span>
                  <h3>{p.name}</h3>
                  <p>{t(p.text)}</p>
                  <div className="pcard__meta">
                    {p.chips.map((chip) => <span className="chip" key={chip}>{t(chip)}</span>)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Step 3: find the right one */}
      <ChallengeFinder />

      {/* Step 4: plan it (signature tool) */}
      <ProgrammeBuilder />

      {/* Step 5: how it is made */}
      <section className="section section--dark">
        <div className="wrap">
          <div className="head">
            <span className="eyebrow eyebrow--light">{t("The process")}</span>
            <h2>{t("From plant to poultry in four steps")}</h2>
            <p className="lede">{t("Every Remevia formulation follows the same path before it reaches a farm.")}</p>
          </div>
          <ol className="process">
            {STEPS.map((step) => (
              <li key={step.title}>
                <span className="process__node"></span>
                <h3>{t(step.title)}</h3>
                <p>{t(step.text)}</p>
              </li>
            ))}
          </ol>
          <div className="quality">
            {QUALITY.map((q) => (
              <div className="quality__item" key={q.title}>
                <i>{icon(q.icon)}</i>
                <b>{t(q.title)}</b>
                <span>{t(q.text)}</span>
              </div>
            ))}
          </div>
          <Link className="link-arrow link-arrow--light" href="/science#quality">{t("Our quality process")}</Link>
        </div>
      </section>

      {/* Step 6: proof */}
      <section className="section section--mist">
        <div className="wrap">
          <div className="head">
            <span className="eyebrow">{t("Proof from the field")}</span>
            <h2>{t("Measured results, product by product")}</h2>
            <p className="lede">{t("Trial figures from Remevia product literature, with what farmers say about them.")}</p>
          </div>
          <div className="bento">
            {RESULTS.map((r) => (
              <Link key={`${r.name}${r.value}`} href={r.href} className={`bento__tile ${r.cls} ${r.wide ? 'bento__tile--wide' : ''}`}>
                <b>{t(r.value)}</b>
                <span>{t(r.label)}</span>
                {r.extra && <em><b>{r.extra.value}</b> {t(r.extra.label)}</em>}
                <small>{r.name}</small>
              </Link>
            ))}
          </div>
          <div className="quotes">
            {QUOTES.map((q) => (
              <figure className={`quotes__card ${q.cls}`} key={q.by}>
                <blockquote>{t(q.text)}</blockquote>
                <figcaption>{t(q.by)}</figcaption>
              </figure>
            ))}
          </div>
          <p className="note">{t("* Claims and rates from Remevia product literature. Full trial reports are available to feed mills and distributors on request.")}</p>
        </div>
      </section>

      {/* Step 7: start */}
      <CtaSection />
    </>
  );
}
