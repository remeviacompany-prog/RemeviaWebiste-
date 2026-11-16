'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';

// Second section requested by the client: a Greek philosopher's quote, a looping
// video of green chickens at the centre, and the science of the natural food chain.
export default function FoodChain() {
  const { t } = useLanguage();

  return (
    <section className="foodchain" aria-label={t("The science of the food chain")}>
      <div className="foodchain__panel foodchain__panel--quote">
        <blockquote>
          <p>{t("“Let food be thy medicine, and medicine be thy food.”")}</p>
          <footer>{t("Attributed to Hippocrates, ancient Greek physician")}</footer>
        </blockquote>
        <p className="foodchain__note">{t("True health begins at the cellular level, through pure nutrition.")}</p>
      </div>

      <div className="foodchain__panel foodchain__panel--video">
        <video src="/assets/video/green-chickens.mp4" autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
      </div>

      <div className="foodchain__panel foodchain__panel--chain">
        <h2>
          <span>{t("The natural food chain")}</span>
          {t("Plants make protective molecules that keep flocks healthy.")}
        </h2>
        <p className="foodchain__note">{t("When nature creates a threat, it also creates the cure. Remevia gives your poultry the pathogen-fighting power of plants.")}</p>
      </div>
    </section>
  );
}
