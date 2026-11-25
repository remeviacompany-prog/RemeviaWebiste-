'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Icon } from './icons';

// Wraps the given English words in a gold highlight. Translations without those words render plainly.
// Words listed in `green` get the green highlight instead.
const gold = (text, words, green = []) => {
  const all = [...words, ...green];
  const re = new RegExp(`(${all.join('|')})`, 'g');
  return text.split(re).map((part, i) => (all.includes(part)
    ? <em key={i} className={green.includes(part) ? 'is-green' : undefined}>{part}</em>
    : part));
};

const CHAIN = [
  { icon: 'leaf', label: 'Plants', tone: 'green' },
  { icon: 'flask', label: 'Protective molecules', tone: 'teal' },
  { icon: 'shield', label: 'Remevia formula', tone: 'blue' },
  { icon: 'bird', label: 'Healthy flocks', tone: 'navy' },
  { icon: 'egg', label: 'Safe food', tone: 'gold' },
];

// Opening story: Hippocrates and Fleming either side of Remevia, then the natural food chain.
export default function FoodChain() {
  const { t } = useLanguage();

  return (
    <>
      <section className="triad" aria-label={t("From ancient medicine to modern science")}>
        <article className="triad__panel triad__panel--past">
          <img className="triad__portrait" src="/assets/img/portrait-hippocrates.png" alt={t("Portrait of Hippocrates")} width="224" height="288" loading="lazy" />
          <blockquote>
            <p>{gold(t("“Let food be thy medicine, and medicine be thy food.”"), ['medicine', 'food'])}</p>
            <footer>{t("Hippocrates, ancient Greek physician")}</footer>
          </blockquote>
          <span className="triad__rule" aria-hidden="true" />
          <p className="triad__note">{t("True health begins at the cellular level, through pure nutrition.")}</p>
        </article>

        <div className="triad__panel triad__panel--brand">
          <video className="triad__video" src="/assets/video/remevia-flock.mp4" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
        </div>

        <article className="triad__panel triad__panel--modern">
          <img className="triad__portrait" src="/assets/img/portrait-fleming.png" alt={t("Portrait of Alexander Fleming")} width="224" height="288" loading="lazy" />
          <blockquote>
            <p>{gold(t("“Nature gave us penicillin; nature gives us its replacement.”"), ['nature'], ['gives us its'])}</p>
            <footer>{t("Alexander Fleming's legacy")}</footer>
          </blockquote>
          <span className="triad__rule" aria-hidden="true" />
          <p className="triad__note">{t("The discovery of penicillin saved millions, yet antibiotic resistance became a global threat, empowering us to return to plant-based protection.")}</p>
        </article>
      </section>

      <section className="chainflow" aria-labelledby="chainflow-title">
        <div className="wrap chainflow__grid">
          <div className="chainflow__copy">
            <span className="chainflow__kicker">{t("The natural food chain")}</span>
            <h2 id="chainflow-title">{t("Plants make protective molecules that keep flocks healthy.")}</h2>
            <p>{t("When nature creates a threat, it also creates the cure. Remevia gives your poultry the pathogen-fighting power of plants.")}</p>
          </div>
          <ol className="chainflow__steps">
            {CHAIN.map((step, i) => (
              <li key={step.label} className={`chainflow__step chainflow__step--${step.tone}`} style={{ '--i': i }}>
                <span className="chainflow__node"><Icon name={step.icon} size={28} /></span>
                <b>{t(step.label)}</b>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
