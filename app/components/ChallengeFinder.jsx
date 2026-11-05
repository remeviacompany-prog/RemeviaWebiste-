'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

const FINDER = {
  growth: {
    cls: 't-treat',
    cat: 'Natural AGP replacer',
    name: 'TLTREAT',
    img: '/assets/img/tltreat.webp',
    href: '/products/tltreat',
    text: 'Spice extracts of ginger, turmeric and nutmeg stimulate immunity and replace antibiotic growth promoters. Use 1–2 kg per tonne of broiler feed from day 1 to 40.'
  },
  breath: {
    cls: 't-curtect',
    cat: 'Respiratory support',
    name: 'CURTECT-CRD',
    img: '/assets/img/curtect-crd.webp',
    href: '/products/curtect-crd',
    text: 'Menthol, eucalyptus and rosemary oils open airways, loosen mucus and ease gasping. Visible relief within 24–48 hours at 200 ml per 1,000 L of water.'
  },
  crd: {
    cls: 't-eksit',
    cat: 'Anti-Mycoplasma CRD solution',
    name: 'EKSIT-CRD',
    img: '/assets/img/eksit-crd.webp',
    href: '/products/eksit-crd',
    text: 'Cinnamon, Curcuminoids, Eucalyptus, Mint, Oregano and Vasaka fight resistant Mycoplasma Gallisepticum with superior zone of inhibition. Dose 200 ml / 1,000 L on a 2-days ON / 2-days OFF cycle.'
  },
  yolk: {
    cls: 't-egg',
    cat: 'Egg yolk colour enhancer',
    name: 'TLEGG',
    img: '/assets/img/tlegg.webp',
    href: '/products/tlegg',
    text: 'Marigold carotenoids give yolks a rich orange-yellow colour, even on diets with less maize. Add 1 kg per tonne of layer feed.'
  },
  mites: {
    cls: 't-repeal',
    cat: 'Avian red mite control',
    name: 'TLREPEAL',
    img: '/assets/img/tlrepeal.webp',
    href: '/products/tlrepeal',
    text: 'Basil, camphor, eucalyptus and D-limonene repel and kill red mites. Rotate drinking-water use and nest spraying on alternate weeks.'
  },
  wounds: {
    cls: 't-healer',
    cat: 'Wounds & tick bites',
    name: 'TL HEALER',
    img: '/assets/img/tl-healer.webp',
    href: '/products/tl-healer',
    text: 'Cedarwood, neem, curcumin and terpineol help heal septic and non-septic wounds and keep flies away. Spray directly on the affected area.'
  }
};

export default function ChallengeFinder() {
  const { t } = useLanguage();
  const [activeKey, setActiveKey] = useState('growth');
  const [swapping, setSwapping] = useState(false);

  const handleSelect = (key) => {
    if (key === activeKey) return;
    setSwapping(true);
    setActiveKey(key);
    setTimeout(() => {
      setSwapping(false);
    }, 300);
  };

  const item = FINDER[activeKey];

  return (
    <section className="finder section">
      <div className="wrap">
        <div className="finder__intro">
          <span className="eyebrow">{t("Interactive product guide")}</span>
          <h2>{t("What is holding your flock back?")}</h2>
          <p className="lede">{t("Select your primary concern to see the proven botanical formula developed for it.")}</p>
        </div>

        <div className="finder__grid">
          <div className="finder__list" role="tablist" aria-label={t("Farm challenges")}>
            <button 
              type="button" 
              role="tab"
              aria-selected={activeKey === 'growth'}
              className="finder__opt t-treat"
              onClick={() => handleSelect('growth')}
            >
              <span className="finder__bullet" style={{ background: '#B5692A' }}></span>
              <span>
                <b>{t("Gut health, immunity & growth")}</b>
                <small>{t("Looking for a proven, zero-residue alternative to AGPs")}</small>
              </span>
            </button>

            <button 
              type="button" 
              role="tab"
              aria-selected={activeKey === 'breath'}
              className="finder__opt t-curtect"
              onClick={() => handleSelect('breath')}
            >
              <span className="finder__bullet" style={{ background: '#1B7EC0' }}></span>
              <span>
                <b>{t("Respiratory distress & post-vaccination")}</b>
                <small>{t("Wheezing, gasping, tracheal mucus and seasonal distress")}</small>
              </span>
            </button>

            <button 
              type="button" 
              role="tab"
              aria-selected={activeKey === 'crd'}
              className="finder__opt t-eksit"
              onClick={() => handleSelect('crd')}
            >
              <span className="finder__bullet" style={{ background: '#7B2CBF' }}></span>
              <span>
                <b>{t("Chronic Respiratory Disease (CRD) & Mycoplasma")}</b>
                <small>{t("Resistant Mycoplasma Gallisepticum, deep bronchial mucus & airsacculitis")}</small>
              </span>
            </button>

            <button 
              type="button" 
              role="tab"
              aria-selected={activeKey === 'yolk'}
              className="finder__opt t-egg"
              onClick={() => handleSelect('yolk')}
            >
              <span className="finder__bullet" style={{ background: '#7DBE3F' }}></span>
              <span>
                <b>{t("Pale egg yolks & consumer demand")}</b>
                <small>{t("Need consistent golden-orange yolk colour naturally")}</small>
              </span>
            </button>

            <button 
              type="button" 
              role="tab"
              aria-selected={activeKey === 'mites'}
              className="finder__opt t-repeal"
              onClick={() => handleSelect('mites')}
            >
              <span className="finder__bullet" style={{ background: '#D7262E' }}></span>
              <span>
                <b>{t("Avian red mite infestations")}</b>
                <small>{t("Blood loss, stress, egg stains and mite resistance to chemicals")}</small>
              </span>
            </button>

            <button 
              type="button" 
              role="tab"
              aria-selected={activeKey === 'wounds'}
              className="finder__opt t-healer"
              onClick={() => handleSelect('wounds')}
            >
              <span className="finder__bullet" style={{ background: '#EE8A1C' }}></span>
              <span>
                <b>{t("Skin wounds, tick bites & maggots")}</b>
                <small>{t("Topical antiseptic and fly-repelling wound spray")}</small>
              </span>
            </button>
          </div>

          <div className={`finder__result ${item.cls} ${swapping ? 'is-swapping' : ''}`}>
            <div className="finder__visual">
              <img src={item.img} alt={t("{name} for poultry", { name: item.name })} />
            </div>
            <div className="finder__details">
              <span className="finder__cat">{t(item.cat)}</span>
              <h3 className="finder__name">{item.name}</h3>
              <p className="finder__text">{t(item.text)}</p>
              <div className="finder__action">
                <Link className="btn btn--grad" href={item.href}>
                  {t("View {name} full datasheet & dosing", { name: item.name })}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
