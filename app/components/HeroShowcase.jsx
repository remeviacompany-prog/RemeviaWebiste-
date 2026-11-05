'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

const ROTATE_MS = 4500;

// Every value here is the product's own label data, already in the dictionaries.
const SHOWCASE = [
  { cls: 't-treat', color: '#E08A3C', name: 'TLTREAT', img: '/assets/img/tltreat.webp', href: '/products/tltreat', cat: 'Gut health & growth', claim: '2 kg → 20 kg extra meat', dose: '1–2 kg / 1,000 kg feed' },
  { cls: 't-curtect', color: '#2E9BE6', name: 'CURTECT-CRD', img: '/assets/img/curtect-crd.webp', href: '/products/curtect-crd', cat: 'Respiratory support', claim: 'Relief in 24–48 hours', dose: '200 ml / 1,000 L water' },
  { cls: 't-eksit', color: '#A855F7', name: 'EKSIT-CRD', img: '/assets/img/eksit-crd.webp', href: '/products/eksit-crd', cat: 'CRD & Mycoplasma', claim: '2-days ON / 2-days OFF', dose: '200 ml / 1,000 L water' },
  { cls: 't-egg', color: '#84CC3F', name: 'TLEGG', img: '/assets/img/tlegg.webp', href: '/products/tlegg', cat: 'Egg quality', claim: 'Marigold carotenoids', dose: '1 kg / 1,000 kg feed' },
  { cls: 't-repeal', color: '#F0474F', name: 'TLREPEAL', img: '/assets/img/tlrepeal.webp', href: '/products/tlrepeal', cat: 'Red mite control', claim: '300 ml / 1,000 L spray', dose: '150 ml / 1,000 L water' },
  { cls: 't-healer', color: '#F59E2C', name: 'TL HEALER', img: '/assets/img/tl-healer.webp', href: '/products/tl-healer', cat: 'Wounds & skin', claim: 'Fly & maggot repellent', dose: 'Direct wound spray' },
];

const METRICS = [
  { value: 6, label: 'targeted formulations' },
  { value: 3, label: 'delivery formats: feed, water, spray' },
  { value: 0, label: 'days withdrawal period' },
  { value: 24, label: 'months shelf life' },
];

function CountUp({ to }) {
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (to === 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const started = performance.now();
    let frame;
    const tick = (now) => {
      const progress = Math.min((now - started) / 1200, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [to]);

  return <>{value}</>;
}

export default function HeroShowcase() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const stage = useRef(null);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = setInterval(() => setActive((i) => (i + 1) % SHOWCASE.length), ROTATE_MS);
    return () => clearInterval(timer);
  }, [paused]);

  // The stage leans gently toward the pointer.
  const handlePointer = (e) => {
    if (!stage.current || e.pointerType !== 'mouse') return;
    const box = stage.current.getBoundingClientRect();
    stage.current.style.setProperty('--tilt-x', `${((e.clientX - box.left) / box.width - 0.5) * 8}deg`);
    stage.current.style.setProperty('--tilt-y', `${((e.clientY - box.top) / box.height - 0.5) * -8}deg`);
  };
  const resetPointer = () => {
    stage.current?.style.setProperty('--tilt-x', '0deg');
    stage.current?.style.setProperty('--tilt-y', '0deg');
  };

  const item = SHOWCASE[active];

  return (
    <section className="hero" style={{ '--hero-c': item.color }}>
      <div className="hero__aurora" aria-hidden="true"><i /><i /><i /></div>

      <div className="wrap hero__main">
        <div className="hero__copy">
          <span className="hero__badge hero-in" style={{ '--d': '0s' }}>
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 19c0-8.5 6.2-14 15-14-.6 9-6.2 15-14 15" />
                <path d="M5 19l8-8" />
              </svg>
            </span>
            <b style={{ fontWeight: 500 }}>{t("Botanical alternatives to antibiotics")}</b>
          </span>

          <h1 className="hero-in" style={{ '--d': '.1s' }}>
            <span>{t("Healthier flocks.")}</span>{' '}
            <span className="line-2">{t("Without antibiotics.")}</span>
          </h1>

          <p className="hero__sub hero-in" style={{ '--d': '.2s' }}>
            {t("Plant-based supplements that protect gut health, breathing, egg quality and skin, with no antibiotic residues in meat or eggs.")}
          </p>

          <div className="btn-row hero-in" style={{ '--d': '.3s' }}>
            <Link className="btn btn--marigold" href="/contact?type=trial">{t("Request a free trial")}</Link>
            <a className="btn btn--ghost-light" href="#programme">{t("Build your flock programme")}</a>
          </div>

          <ul className="hero__checks hero-in" style={{ '--d': '.4s' }}>
            {['100% plant-based actives', 'No antibiotic residues', 'Low resistance risk'].map((text) => (
              <li key={text}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12.5l4.2 4.2L19 7" />
                </svg>
                <span>{t(text)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="hero__visual hero-in"
          style={{ '--d': '.25s' }}
          ref={stage}
          onPointerMove={handlePointer}
          onPointerLeave={resetPointer}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="stage">
            <span className="stage__ring" aria-hidden="true" />
            <span className="stage__ring stage__ring--dash" aria-hidden="true" />

            <div className="hero__disc">
              {SHOWCASE.map((p, i) => (
                <img
                  key={p.name}
                  className={i === active ? 'is-on' : ''}
                  src={p.img}
                  alt={i === active ? t("{name} for poultry", { name: p.name }) : ''}
                />
              ))}
            </div>

            <div className="stage__picks" role="group" aria-label={t("Our products")}>
              {SHOWCASE.map((p, i) => (
                <button
                  key={p.name}
                  type="button"
                  className={`stage__pick ${i === active ? 'is-on' : ''}`}
                  style={{ '--i': i, '--pick': p.color }}
                  aria-pressed={i === active}
                  aria-label={p.name}
                  onClick={() => setActive(i)}
                >
                  <img src={p.img} alt="" />
                </button>
              ))}
            </div>

            <Link key={item.name} className="stage__card" href={item.href}>
              <span className="stage__cat" style={{ color: item.color }}>{t(item.cat)}</span>
              <b>{item.name}</b>
              <span className="stage__claim">{t(item.claim)}</span>
              <span className="stage__dose"><small>{t("Dose")}</small> {t(item.dose)}</span>
              {!paused && <i className="stage__timer" style={{ animationDuration: `${ROTATE_MS}ms` }} aria-hidden="true" />}
            </Link>
          </div>
        </div>
      </div>

      <div className="wrap">
        <dl className="hero__metrics hero-in" style={{ '--d': '.5s' }}>
          {METRICS.map((m) => (
            <div key={m.label}>
              <dt>{t(m.label)}</dt>
              <dd><CountUp to={m.value} /></dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
