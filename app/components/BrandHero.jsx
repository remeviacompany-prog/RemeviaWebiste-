'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export default function BrandHero() {
  const { t } = useLanguage();

  return (
    <section className="bhero">
      <div className="bhero__stage">
        <div className="wrap bhero__grid">
          <div className="bhero__copy">
            <h1 className="hero-in" style={{ '--d': '0s' }}>
              <span>{t("Nature's design.")}</span>{' '}
              <span className="bhero__accent">{t("Reinforced by science.")}</span>
            </h1>
            <p className="bhero__lead hero-in" style={{ '--d': '.1s' }}>
              {t("Nature provides the molecules. Remevia finds the formulation.")}
            </p>
            <p className="bhero__sub hero-in" style={{ '--d': '.2s' }}>
              {t("Dedicated to unlocking the power of botanical molecules for global poultry health. We bridge evolutionary biology with advanced veterinary science to deliver world-class, biosecure formulations that protect and enhance performance.")}
            </p>
            <div className="btn-row hero-in" style={{ '--d': '.3s' }}>
              <Link className="btn btn--marigold" href="/products">{t("Explore products")}</Link>
              <Link className="btn btn--ghost-light" href="/contact?type=trial">{t("Request a free trial")}</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bhero__band">
        <div className="wrap bhero__band-in">
          <img src="/assets/img/logo.png" alt="Remevia" width="429" height="310" />
          <span>{t("Advanced botanical science for poultry immunity")}</span>
        </div>
      </div>
    </section>
  );
}
