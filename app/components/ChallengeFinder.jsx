'use client';

import React, { useState } from 'react';
import Link from 'next/link';

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
          <span className="badge">Interactive product guide</span>
          <h2>What is holding your flock back?</h2>
          <p className="lede">Select your primary concern to see the proven botanical formula developed for it.</p>
        </div>

        <div className="finder__grid">
          <div className="finder__list" role="tablist" aria-label="Farm challenges">
            <button 
              type="button" 
              role="tab"
              aria-selected={activeKey === 'growth'}
              className="finder__opt"
              onClick={() => handleSelect('growth')}
            >
              <span className="finder__bullet" style={{ background: '#B5692A' }}></span>
              <span>
                <b>Gut health, immunity & growth</b>
                <small>Looking for a proven, zero-residue alternative to AGPs</small>
              </span>
            </button>

            <button 
              type="button" 
              role="tab"
              aria-selected={activeKey === 'breath'}
              className="finder__opt"
              onClick={() => handleSelect('breath')}
            >
              <span className="finder__bullet" style={{ background: '#1B7EC0' }}></span>
              <span>
                <b>Respiratory distress & CRD</b>
                <small>Wheezing, gasping, tracheal mucus and seasonal distress</small>
              </span>
            </button>

            <button 
              type="button" 
              role="tab"
              aria-selected={activeKey === 'yolk'}
              className="finder__opt"
              onClick={() => handleSelect('yolk')}
            >
              <span className="finder__bullet" style={{ background: '#7DBE3F' }}></span>
              <span>
                <b>Pale egg yolks & consumer demand</b>
                <small>Need consistent golden-orange yolk colour naturally</small>
              </span>
            </button>

            <button 
              type="button" 
              role="tab"
              aria-selected={activeKey === 'mites'}
              className="finder__opt"
              onClick={() => handleSelect('mites')}
            >
              <span className="finder__bullet" style={{ background: '#D7262E' }}></span>
              <span>
                <b>Avian red mite infestations</b>
                <small>Blood loss, stress, egg stains and mite resistance to chemicals</small>
              </span>
            </button>

            <button 
              type="button" 
              role="tab"
              aria-selected={activeKey === 'wounds'}
              className="finder__opt"
              onClick={() => handleSelect('wounds')}
            >
              <span className="finder__bullet" style={{ background: '#EE8A1C' }}></span>
              <span>
                <b>Skin wounds, tick bites & maggots</b>
                <small>Topical antiseptic and fly-repelling wound spray</small>
              </span>
            </button>
          </div>

          <div className={`finder__result ${item.cls} ${swapping ? 'is-swapping' : ''}`}>
            <div className="finder__visual">
              <img src={item.img} alt={`${item.name} for poultry`} />
            </div>
            <div className="finder__details">
              <span className="finder__cat">{item.cat}</span>
              <h3 className="finder__name">{item.name}</h3>
              <p className="finder__text">{item.text}</p>
              <div className="finder__action">
                <Link className="btn btn--grad" href={item.href}>
                  View {item.name} full datasheet & dosing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
