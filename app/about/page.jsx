'use client';

import React from 'react';
import Link from 'next/link';
import PageHero from '../components/PageHero';
import MissionVision from '../components/MissionVision';
import { Icon } from '../components/icons';
import { useLanguage } from '../context/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        scene="about"
        crumb={t("About")}
        title={t("Built on science. Driven by purpose.")}
        lede={t("We started Remevia to help farmers raise healthier animals without antibiotics, and to give families safer food.")}
        facts={{
          title: t("Company Facts"),
          sub: t("Who we are, at a glance"),
          rows: [
            { label: t("Origin"), value: t("Kerala, India") },
            { label: t("Heritage"), value: t("Spices & medicinal plants") },
            { label: t("Method"), value: t("Supercritical extraction") },
            { label: t("Formulations"), value: '6' },
            { label: t("Antibiotics"), value: '0', highlight: true },
          ],
          foot: t("“Nature Provides the Molecules. Remevia Finds the Formulation.”"),
        }}
      />

      {/* Story */}
      <section className="section story">
        <div className="wrap story__grid">
          <div className="story__text">
            <span className="eyebrow">{t("Who we are")}</span>
            <h2>{t("Our story")}</h2>
            <p className="story__lead">{t("Remevia began in God's Own Country, Kerala, when our founders saw how heavily poultry farming had come to rely on antibiotics, and how much risk that created for people and the planet.")}</p>
            <p>{t("They believed the answer already existed in nature. Kerala's spices and medicinal plants have protected people and animals for centuries. Today we combine that botanical heritage with modern supercritical extraction and standardized formulation to give poultry and livestock producers a reliable, scientifically validated natural alternative.")}</p>
            <ul className="story__points">
              <li><Icon name="leaf" size={20} />{t("Spices & medicinal plants")}</li>
              <li><Icon name="lab" size={20} />{t("Supercritical extraction")}</li>
              <li><Icon name="check" size={20} />{t("Standardised formulations")}</li>
            </ul>
          </div>
          <figure className="story__art">
            <img src="/assets/img/hero-leaf.webp" alt={t("A leaf with its natural active molecules highlighted")} width="1672" height="941" loading="lazy" />
            <div className="story__badge story__badge--a"><b>6</b><span>{t("Formulations")}</span></div>
            <div className="story__badge story__badge--b"><b>0</b><span>{t("Antibiotic residues")}</span></div>
            <figcaption><Icon name="pin" size={16} />{t("Kerala, India")}</figcaption>
          </figure>
        </div>
        <div className="wrap story__mv">
          <MissionVision />
        </div>
      </section>

      {/* Values */}
      <section className="section section--mist">
        <div className="wrap">
          <div className="head"><h2>{t("What we stand for")}</h2></div>
          <div className="grid grid--4">
            <div className="card">
              <span className="card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 3h6M10 3v6.2L4.8 18a2 2 0 0 0 1.7 3h11a2 2 0 0 0 1.7-3L14 9.2V3"/><path d="M7.5 14h9"/>
                </svg>
              </span>
              <h3>{t("Science first")}</h3>
              <p>{t("Every claim is tested in the lab and on the farm before it goes on a label.")}</p>
            </div>
            <div className="card">
              <span className="card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 19c0-8.5 6.2-14 15-14-.6 9-6.2 15-14 15"/><path d="M5 19l8-8"/>
                </svg>
              </span>
              <h3>{t("Nature as partner")}</h3>
              <p>{t("We use the molecules plants already make, not synthetic copies.")}</p>
            </div>
            <div className="card">
              <span className="card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 20h16M7 20V11M12 20V5M17 20v-6"/>
                </svg>
              </span>
              <h3>{t("Farmer success")}</h3>
              <p>{t("Our products have to pay back in weight, eggs and fewer losses.")}</p>
            </div>
            <div className="card">
              <span className="card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3l8 3.5V12c0 4.6-3.4 8-8 9-4.6-1-8-4.4-8-9V6.5z"/>
                  <path d="M8.5 12l2.5 2.5 4.5-5"/>
                </svg>
              </span>
              <h3>{t("Honest results")}</h3>
              <p>{t("We share trial data openly with customers and partners.")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="section journey">
        <div className="wrap">
          <div className="head"><span className="eyebrow">{t("Milestones")}</span><h2>{t("Our journey")}</h2></div>
        </div>
        <ol className="journey__line">
          {[
            ['sprout', 'Origin', "Remevia founded in God's Own Country, Kerala to pioneer botanical animal health"],
            ['lab', 'R&D', 'TLTREAT developed and proven in field trials as an effective AGP alternative'],
            ['layers', 'Portfolio', 'CURTECT-CRD, TLEGG, TLREPEAL and TL HEALER formulated and standardized'],
            ['globe', 'Global', 'Expansion into Middle Eastern, South Asian and Southeast Asian export markets'],
          ].map(([icon, title, text], i) => (
            <li key={title} className="journey__step">
              <span className="journey__node"><Icon name={icon} size={22} /></span>
              <div className="journey__card">
                <span className="journey__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{t(title)}</h3>
                <p>{t(text)}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Impact */}
      <section className="section impact">
        <div className="wrap">
          <div className="head">
            <span className="eyebrow eyebrow--light">{t("Our impact")}</span>
            <h2>{t("Better for birds, farmers and the food chain")}</h2>
            <p className="lede">{t("Replacing antibiotics on the farm has effects far beyond the farm gate.")}</p>
          </div>
          <div className="impact__grid">
            {[
              ['egg', 'Safer food', 'No antibiotic residues in the meat and eggs that reach consumers.'],
              ['pulse', 'Protecting medicine', 'Less antibiotic use on farms helps keep antibiotics working for people.'],
              ['sprout', 'Gentle on the environment', 'Plant-based actives that are safe for farm workers, animals and soil.'],
            ].map(([icon, title, text]) => (
              <article key={title} className="impact__card">
                <span className="impact__icon"><Icon name={icon} size={26} /></span>
                <h3>{t(title)}</h3>
                <p>{t(text)}</p>
              </article>
            ))}
          </div>
          <div className="btn-row impact__actions">
            <Link className="btn impact__btn" href="/contact?type=distributor">{t("Partner with us")}</Link>
            <Link className="btn btn--ghost-light" href="/products">{t("See our products")}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
