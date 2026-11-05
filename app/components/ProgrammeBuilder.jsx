'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

const BROILER_DAYS = 40;
const LAYER_DAYS = 84;
const FEED_BAG_KG = 50;

// Dosing days on the label's schedule. Days are 1-based.
const twiceWeekly = (days) => {
  const out = [];
  for (let day = 3; day <= days; day += 7) {
    out.push(day);
    if (day + 3 <= days) out.push(day + 3);
  }
  return out;
};
const eksitDays = () => {
  const out = [];
  for (let day = 16; day <= 36; day += 4) {
    out.push(day);
    if (day + 1 <= 36) out.push(day + 1);
  }
  return out;
};
const alternateWeeks = (days, startWeek) => {
  const out = [];
  for (let day = 1; day <= days; day += 1) {
    if (Math.floor((day - 1) / 7) % 2 === startWeek) out.push(day);
  }
  return out;
};

const FLOCKS = {
  broiler: {
    label: 'Broilers',
    days: BROILER_DAYS,
    axis: 'Day',
    tick: 10,
    window: 'One 40-day cycle',
    feed: 90,
    water: 0.2,
    products: ['tltreat', 'curtect', 'eksit', 'healer'],
    defaults: ['tltreat', 'curtect', 'eksit'],
  },
  layer: {
    label: 'Layers & breeders',
    days: LAYER_DAYS,
    axis: 'Week',
    tick: 14,
    window: 'A 12-week window',
    feed: 115,
    water: 0.25,
    products: ['tlegg', 'tltreat', 'curtect', 'repeal', 'healer'],
    defaults: ['tlegg', 'repeal'],
  },
};

const PLANS = {
  tltreat: {
    name: 'TLTREAT', cls: 't-treat', goal: 'Gut health & growth',
    schedule: (flock) => ({ continuous: true, note: flock === 'broiler' ? 'From Day 1 to 40th Day continuously in feed mash or pellets' : 'From 60th to 110th week to support extended laying cycle & egg quality' }),
    rate: (flock) => (flock === 'broiler' ? { kind: 'feed', min: 1, max: 2 } : { kind: 'feed', min: 2, max: 2 }),
  },
  curtect: {
    name: 'CURTECT-CRD', cls: 't-curtect', goal: 'Respiratory support',
    // Each dose runs for a 12-hour cycle, so it treats half a day of water.
    schedule: (flock, days) => ({ days: twiceWeekly(days), note: 'Twice a week in a continuous 12-hour cycle', waterShare: 0.5 }),
    rate: () => ({ kind: 'water', ml: 200 }),
  },
  eksit: {
    name: 'EKSIT-CRD', cls: 't-eksit', goal: 'CRD & Mycoplasma',
    schedule: () => ({ days: eksitDays(), note: 'From 16th day up to 36th day: 2-days ON / 2-days OFF cycle', waterShare: 1 }),
    rate: () => ({ kind: 'water', ml: 200 }),
  },
  tlegg: {
    name: 'TLEGG', cls: 't-egg', goal: 'Egg quality',
    schedule: () => ({ continuous: true, note: 'Continuous inclusion in layer mash or pellets' }),
    rate: () => ({ kind: 'feed', min: 1, max: 1 }),
  },
  repeal: {
    name: 'TLREPEAL', cls: 't-repeal', goal: 'Red mite control',
    schedule: (flock, days) => ({
      days: alternateWeeks(days, 0),
      altDays: alternateWeeks(days, 1),
      note: 'Alternate between water administration one week and perimeter spray the next week',
      waterShare: 1,
    }),
    rate: () => ({ kind: 'water', ml: 150 }),
  },
  healer: {
    name: 'TL HEALER', cls: 't-healer', goal: 'Wounds & skin',
    schedule: () => ({ asNeeded: true, note: 'Spray or apply directly on affected area' }),
    rate: () => ({ kind: 'none' }),
  },
};

const number = (value, digits = 0) =>
  value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: digits });
const amount = (value) => number(value, value < 10 ? 1 : 0);

const clampNumber = (raw, fallback) => {
  const value = Number(raw);
  return Number.isFinite(value) && value > 0 ? value : fallback;
};

export default function ProgrammeBuilder() {
  const { t } = useLanguage();
  const [flockKey, setFlockKey] = useState('broiler');
  const [birds, setBirds] = useState('10000');
  const [feed, setFeed] = useState(String(FLOCKS.broiler.feed));
  const [water, setWater] = useState(String(FLOCKS.broiler.water));
  const [selected, setSelected] = useState(FLOCKS.broiler.defaults);

  const flock = FLOCKS[flockKey];

  const changeFlock = (key) => {
    setFlockKey(key);
    setFeed(String(FLOCKS[key].feed));
    setWater(String(FLOCKS[key].water));
    setSelected(FLOCKS[key].defaults);
  };

  const toggle = (key) => {
    setSelected((list) => (list.includes(key) ? list.filter((k) => k !== key) : [...list, key]));
  };

  const plan = useMemo(() => {
    const birdCount = clampNumber(birds, 0);
    const feedTonnes = (birdCount * clampNumber(feed, 0) * flock.days) / 1000000;
    const dailyWater = birdCount * clampNumber(water, 0);

    const rows = flock.products.filter((key) => selected.includes(key)).map((key) => {
      const def = PLANS[key];
      const schedule = def.schedule(flockKey, flock.days);
      const rate = def.rate(flockKey);
      let quantity = null;

      if (rate.kind === 'feed') {
        const min = rate.min * feedTonnes;
        const max = rate.max * feedTonnes;
        quantity = {
          text: min === max ? `${amount(max)} kg` : `${amount(min)}–${amount(max)} kg`,
          packs: Math.ceil(max / FEED_BAG_KG),
        };
      } else if (rate.kind === 'water') {
        const litres = (schedule.days.length * schedule.waterShare * dailyWater * rate.ml) / 1000 / 1000;
        quantity = { text: `${amount(litres)} L` };
      }

      return { key, ...def, schedule, quantity };
    });

    return {
      rows,
      feedTonnes,
      // Remevia's field claim: 2 kg of TLTREAT delivers up to 20 kg of additional meat.
      extraMeat: flockKey === 'broiler' && selected.includes('tltreat') ? feedTonnes * 2 * 10 : 0,
    };
  }, [birds, feed, water, flock, flockKey, selected]);

  const ticks = [];
  for (let day = flock.tick; day <= flock.days; day += flock.tick) ticks.push(day);

  const printPlan = () => {
    document.body.classList.add('print-plan');
    window.addEventListener('afterprint', () => document.body.classList.remove('print-plan'), { once: true });
    window.print();
  };

  const names = plan.rows.map((row) => row.name).join(', ');

  return (
    <section className="programme section" id="programme">
      <div className="wrap">
        <div className="head">
          <span className="eyebrow eyebrow--light">{t("Flock Programme Builder")}</span>
          <h2>{t("Plan your antibiotic-free programme in under a minute")}</h2>
          <p className="lede">{t("Enter your flock and goals. Get a day-by-day dosing calendar and the quantities to order, worked out from Remevia label rates.")}</p>
        </div>

        <div className="builder">
          <form className="builder__inputs" onSubmit={(e) => e.preventDefault()}>
            <fieldset>
              <legend>{t("1. Your flock")}</legend>
              <div className="builder__tabs">
                {Object.entries(FLOCKS).map(([key, value]) => (
                  <button key={key} type="button" aria-pressed={flockKey === key} onClick={() => changeFlock(key)}>
                    {t(value.label)}
                  </button>
                ))}
              </div>
              <label className="field">
                {t("Number of birds")}
                <input type="number" min="1" step="1000" inputMode="numeric" value={birds} onChange={(e) => setBirds(e.target.value)} />
              </label>
            </fieldset>

            <fieldset>
              <legend>{t("2. Your goals")}</legend>
              <div className="builder__goals">
                {flock.products.map((key) => {
                  const def = PLANS[key];
                  return (
                    <label key={key} className={def.cls}>
                      <input type="checkbox" checked={selected.includes(key)} onChange={() => toggle(key)} />
                      <span>
                        <b>{t(def.goal)}</b>
                        <small>{def.name}</small>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <details className="builder__assume">
              <summary>{t("Adjust feed and water figures")}</summary>
              <p>{t("Starting figures are typical averages for planning. Replace them with your own farm's numbers.")}</p>
              <div className="builder__pair">
                <label className="field">
                  {t("Feed per bird per day (g)")}
                  <input type="number" min="1" inputMode="decimal" value={feed} onChange={(e) => setFeed(e.target.value)} />
                </label>
                <label className="field">
                  {t("Water per bird per day (L)")}
                  <input type="number" min="0.01" step="0.01" inputMode="decimal" value={water} onChange={(e) => setWater(e.target.value)} />
                </label>
              </div>
            </details>
          </form>

          <div className="builder__output" aria-live="polite">
            <div className="builder__summary">
              <h3>{t("Your programme")}</h3>
              <span>{t(flock.window)} · {number(clampNumber(birds, 0))} {t("birds")} · {amount(plan.feedTonnes)} {t("tonnes of feed")}</span>
            </div>

            {plan.rows.length === 0 ? (
              <p className="builder__empty">{t("Choose at least one goal to see your programme.")}</p>
            ) : (
              <>
                <div className="gantt">
                  <div className="gantt__axis" aria-hidden="true">
                    {ticks.map((day) => (
                      <span key={day} style={{ insetInlineStart: `${(day / flock.days) * 100}%` }}>
                        {t(flock.axis)} {flockKey === 'broiler' ? day : day / 7}
                      </span>
                    ))}
                  </div>
                  {plan.rows.map((row) => (
                    <div key={row.key} className={`gantt__row ${row.cls}`}>
                      <b>{row.name}</b>
                      <div className="gantt__track">
                        {row.schedule.continuous && <i className="gantt__bar" style={{ insetInlineStart: 0, width: '100%' }} />}
                        {row.schedule.asNeeded && <i className="gantt__bar gantt__bar--soft" style={{ insetInlineStart: 0, width: '100%' }} />}
                        {row.schedule.days?.map((day) => (
                          <i key={day} className="gantt__bar" style={{ insetInlineStart: `${((day - 1) / flock.days) * 100}%`, width: `${100 / flock.days}%` }} />
                        ))}
                        {row.schedule.altDays?.map((day) => (
                          <i key={`alt${day}`} className="gantt__bar gantt__bar--soft" style={{ insetInlineStart: `${((day - 1) / flock.days) * 100}%`, width: `${100 / flock.days}%` }} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <ul className="builder__orders">
                  {plan.rows.map((row) => (
                    <li key={row.key} className={row.cls}>
                      <div>
                        <b>{row.name}</b>
                        <small>{t(row.schedule.note)}</small>
                      </div>
                      <strong>
                        {row.quantity ? <bdi>{row.quantity.text}</bdi> : t("As needed")}
                        {row.quantity?.packs > 0 && (
                          <small><bdi>{row.quantity.packs} × 50 kg</bdi> {t("bags")}</small>
                        )}
                      </strong>
                    </li>
                  ))}
                </ul>

                {plan.extraMeat > 0 && (
                  <p className="builder__claim">
                    <bdi>+{number(plan.extraMeat)} kg</bdi>{' '}
                    {t("potential extra meat, based on the Remevia field claim for TLTREAT at 2 kg per tonne")}
                  </p>
                )}
              </>
            )}

            <div className="builder__actions">
              <Link className="btn btn--marigold" href={`/contact?type=quote${names ? `&product=${encodeURIComponent(names)}` : ''}`}>
                {t("Request a quote for this programme")}
              </Link>
              <button type="button" className="btn btn--ghost" onClick={printPlan}>{t("Print or save as PDF")}</button>
            </div>
            <p className="note">{t("Planning estimate from Remevia label rates and the figures above. Our technical team will confirm the final programme for your farm.")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
