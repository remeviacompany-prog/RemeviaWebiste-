'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

const BROILER_DAYS = 40;
const LAYER_DAYS = 84;
const FEED_BAG_KG = 50;

// Dosing days on the label's schedule. Days are 1-based.
const rangeDays = (from, to) => Array.from({ length: to - from + 1 }, (_, i) => from + i);
// EKSIT-CRD: 2 days ON / 2 days OFF from day 16 to day 36, so 11 dosing days
// (16-17, 20-21, 24-25, 28-29, 32-33 and 36).
const eksitDays = () => {
  const out = [];
  for (let day = 16; day <= 36; day += 4) out.push(...[day, day + 1].filter((d) => d <= 36));
  return out;
};
// Twice a week: the 1st and 4th day of every week.
const twiceWeekly = (days) => Array.from({ length: days }, (_, i) => i + 1).filter((day) => [1, 4].includes(((day - 1) % 7) + 1));
const alternateWeeks = (days, startWeek) => {
  const out = [];
  for (let day = 1; day <= days; day += 1) {
    if (Math.floor((day - 1) / 7) % 2 === startWeek) out.push(day);
  }
  return out;
};

// Standard drinking water, ml per bird per day (Remevia technical team, Excel calculation, 21 Nov 2026).
// The dose is worked out once from this standard, so it stays the same per bird whatever the weather.
const BROILER_WATER_ML = {
  16: 141, 17: 154, 18: 165, 19: 178, 20: 189, 21: 202, 22: 213, 23: 224, 24: 236, 25: 247, 26: 257,
  27: 267, 28: 276, 29: 285, 30: 292, 31: 299, 32: 305, 33: 310, 34: 315, 35: 317, 36: 320,
};
// Days 8 to 14 together come to 650 ml per bird.
for (let day = 8; day <= 14; day += 1) BROILER_WATER_ML[day] = 650 / 7;
// Layers and breeders drink about 200 ml per bird per day.
const LAYER_WATER_ML = 200;
const waterMlOn = (flockKey, day) => (flockKey === 'broiler' ? BROILER_WATER_ML[day] || 0 : LAYER_WATER_ML);

// Vencobb 430Y broiler feed intake, grams per bird per week, weeks 1–6.
const BROILER_FEED_WEEK = [165, 350, 610, 908, 1154, 1380];
const broilerFeedOnDay = (day) => BROILER_FEED_WEEK[Math.min(5, Math.floor((day - 1) / 7))] / 7;

const FLOCKS = {
  broiler: {
    label: 'Broilers',
    days: BROILER_DAYS,
    axis: 'Day',
    tick: 10,
    window: 'One 40-day cycle',
    feed: '',
    products: ['tltreat', 'curtect', 'eksit'],
    defaults: ['tltreat', 'curtect', 'eksit'],
  },
  layer: {
    label: 'Layers & breeders',
    days: LAYER_DAYS,
    axis: 'Week',
    tick: 14,
    window: 'A 12-week window',
    feed: '115',
    products: ['tlegg', 'tltreat', 'curtect', 'repeal'],
    defaults: ['tlegg', 'repeal'],
  },
  // TL HEALER is a topical wound spray, so it is planned here for cattle, goats and other large animals.
  large: {
    label: 'Large animals',
    unit: 'animals',
    countLabel: 'Number of animals',
    days: 30,
    axis: 'Day',
    tick: 10,
    window: 'A 30-day window',
    feed: '',
    noFeed: true,
    products: ['healer'],
    defaults: ['healer'],
  },
};

const PLANS = {
  tltreat: {
    name: 'TLTREAT', cls: 't-treat', goal: 'Gut health & growth',
    schedule: (flock) => (flock === 'broiler'
      ? { continuous: true, note: 'From Day 1 to 40th Day continuously in feed mash or pellets' }
      : {
        continuous: true,
        subs: [
          { label: 'Layers', note: '2 kg per tonne of feed from 50th week onwards to extend the laying cycle & egg quality' },
          { label: 'Breeders', note: 'From 18th week onwards for better ovulation and more vibrant chicks with a higher weight ratio' },
        ],
      }),
    rate: (flock) => (flock === 'broiler' ? { kind: 'feed', min: 1, max: 1 } : { kind: 'feed', min: 2, max: 2 }),
  },
  curtect: {
    name: 'CURTECT-CRD', cls: 't-curtect', goal: 'Respiratory support',
    schedule: (flock, days) => (flock === 'broiler'
      ? { days: rangeDays(8, 14), note: 'Continuously from 8th day to 14th day' }
      : { days: twiceWeekly(days), note: 'Twice a week from 14th week onwards' }),
    // 200 ml per 1,000 L of the standard water intake. Broilers: 650 ml water per bird over days 8-14,
    // so 0.13 ml per bird (130 ml per 1,000 birds). Layers & breeders: 200 ml water, so 0.04 ml per bird each dosing day.
    rate: () => ({ kind: 'water', mlPerLitre: 0.2 }),
  },
  eksit: {
    name: 'EKSIT-CRD', cls: 't-eksit', goal: 'CRD & Mycoplasma',
    schedule: () => ({ days: eksitDays(), note: 'From 16th day up to 36th day: 2-days ON / 2-days OFF cycle' }),
    // 200 ml per 1,000 L of each day's standard water: 0.533 ml per bird over the 11 dosing days.
    rate: () => ({ kind: 'water', mlPerLitre: 0.2 }),
  },
  tlegg: {
    name: 'TLEGG', cls: 't-egg', goal: 'Egg quality',
    schedule: () => ({ continuous: true, note: 'Added to layer mash feed from 14th week and continued till the end of egg laying. The hen builds the yolk about 30 days before her first egg, so yolks are golden from the very first egg' }),
    rate: () => ({ kind: 'feed', min: 1, max: 1 }),
  },
  repeal: {
    name: 'TLREPEAL', cls: 't-repeal', goal: 'Red mite control',
    schedule: (flock, days) => ({
      days: alternateWeeks(days, 0),
      altDays: alternateWeeks(days, 1),
      note: 'Alternate between water administration one week and perimeter spray the next week',
    }),
    // Label rate 150 ml per 1,000 L of the standard 200 ml water = 0.03 ml per bird per dosing day.
    rate: () => ({ kind: 'water', mlPerLitre: 0.15 }),
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

const productText = (ml) => (ml >= 1000 ? `${number(ml / 1000, 2)} L` : `${number(ml, ml < 10 ? 1 : 0)} ml`);

// Groups consecutive dosing days that need exactly the same amount.
const doseRuns = (days, perBirdOn) => {
  const runs = [];
  days.forEach((day) => {
    const perBird = perBirdOn(day);
    const last = runs[runs.length - 1];
    if (last && last.to === day - 1 && Math.abs(last.perBird - perBird) < 1e-9) last.to = day;
    else runs.push({ from: day, to: day, perBird });
  });
  return runs;
};

const clampNumber = (raw, fallback) => {
  const value = Number(raw);
  return Number.isFinite(value) && value > 0 ? value : fallback;
};

export default function ProgrammeBuilder() {
  const { t } = useLanguage();
  const [flockKey, setFlockKey] = useState('broiler');
  const [birds, setBirds] = useState('10000');
  const [selected, setSelected] = useState(FLOCKS.broiler.defaults);

  const flock = FLOCKS[flockKey];

  const changeFlock = (key) => {
    setFlockKey(key);
    setSelected(FLOCKS[key].defaults);
  };

  const toggle = (key) => {
    setSelected((list) => (list.includes(key) ? list.filter((k) => k !== key) : [...list, key]));
  };

  const plan = useMemo(() => {
    const birdCount = clampNumber(birds, 0);
    // Broilers follow the Vencobb feed curve; layers and breeders eat about 115 g a day.
    const feedPerBird = flockKey === 'broiler'
      ? Array.from({ length: flock.days }, (_, i) => broilerFeedOnDay(i + 1)).reduce((a, b) => a + b, 0)
      : Number(flock.feed || 0) * flock.days;
    const feedTonnes = (birdCount * feedPerBird) / 1000000;

    const rows = flock.products.filter((key) => selected.includes(key)).map((key) => {
      const def = PLANS[key];
      const schedule = def.schedule(flockKey, flock.days);
      const rate = def.rate(flockKey);
      let quantity = null;
      let mix = null;

      if (rate.kind === 'feed') {
        const min = rate.min * feedTonnes;
        const max = rate.max * feedTonnes;
        quantity = {
          text: min === max ? `${amount(max)} kg` : `${amount(min)}–${amount(max)} kg`,
          packs: Math.ceil(max / FEED_BAG_KG),
        };
      } else if (rate.kind === 'water') {
        // ml of product per bird on a dosing day = label rate (ml per litre) × standard water (litres per bird).
        const perBirdOn = (day) => (rate.mlPerLitre * waterMlOn(flockKey, day)) / 1000;
        const perBirdTotal = schedule.days.reduce((sum, day) => sum + perBirdOn(day), 0);
        quantity = { text: productText(perBirdTotal * birdCount) };
        let runs = doseRuns(schedule.days, perBirdOn).map((run) => ({
          ...run,
          count: run.to - run.from + 1,
          waterMl: waterMlOn(flockKey, run.from),
          per1000: run.perBird * 1000,
          flock: run.perBird * birdCount,
          flockWater: (waterMlOn(flockKey, run.from) * birdCount) / 1000,
        }));
        // Same amount on every dosing day (layers): one line is enough.
        if (runs.length > 1 && runs.every((run) => Math.abs(run.perBird - runs[0].perBird) < 1e-9)) {
          runs = [{ ...runs[0], all: true, count: schedule.days.length }];
        }
        mix = { labelRate: rate.mlPerLitre * 1000, perBirdTotal, per1000Total: perBirdTotal * 1000, dosingDays: schedule.days.length, runs };
      }

      return { key, ...def, schedule, quantity, mix };
    });

    return {
      rows,
      feedTonnes,
      // Remevia's field claim: 1 kg of TLTREAT (the dose for 1 tonne of feed) delivers up to 15 kg of additional meat.
      extraMeat: flockKey === 'broiler' && selected.includes('tltreat') ? feedTonnes * 15 : 0,
    };
  }, [birds, flock, flockKey, selected]);

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
              <label className="field">
                {t("Flock type")}
                <select className="builder__select" value={flockKey} onChange={(e) => changeFlock(e.target.value)}>
                  {Object.entries(FLOCKS).map(([key, value]) => (
                    <option key={key} value={key}>{t(value.label)}</option>
                  ))}
                </select>
              </label>
              <label className="field">
                {t(flock.countLabel || "Number of birds")}
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

          </form>

          <div className="builder__output" aria-live="polite">
            <div className="builder__summary">
              <h3>{t("Your programme")}</h3>
              <span>{t(flock.window)} · {number(clampNumber(birds, 0))} {t(flock.unit || "birds")}{!flock.noFeed && <> · {amount(plan.feedTonnes)} {t("tonnes of feed")}</>}</span>
            </div>

            {plan.rows.length === 0 ? (
              <p className="builder__empty">{t("Choose at least one goal to see your programme.")}</p>
            ) : (
              <>
                <div className="gantt">
                  <div className="gantt__axis" aria-hidden="true">
                    {ticks.map((day) => (
                      <span key={day} style={{ insetInlineStart: `${(day / flock.days) * 100}%` }}>
                        {t(flock.axis)} {flock.axis === 'Week' ? day / 7 : day}
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
                        {row.schedule.note && <small>{t(row.schedule.note)}</small>}
                        {row.schedule.subs && (
                          <dl className="builder__subs">
                            {row.schedule.subs.map((sub) => (
                              <div key={sub.label}>
                                <dt>{t(sub.label)}</dt>
                                <dd>{t(sub.note)}</dd>
                              </div>
                            ))}
                          </dl>
                        )}
                      </div>
                      <strong>
                        {row.quantity ? <bdi>{row.quantity.text}</bdi> : t("As needed")}
                        {row.quantity?.packs > 0 && (
                          <small><bdi>{row.quantity.packs} × 50 kg</bdi> {t("bags")}</small>
                        )}
                      </strong>
                      {row.mix && (
                        <div className="builder__mix">
                          <p>
                            <b><bdi>{number(row.mix.labelRate)} ml</bdi></b> {t("per 1,000 L of drinking water, worked out on the standard water intake.")}{' '}
                            {t("Total per bird:")} <b><bdi>{number(row.mix.perBirdTotal, 3)} ml</bdi></b> {t("over")} <bdi>{row.mix.dosingDays}</bdi> {t("dosing days")}
                            {' '}(<bdi>{number(row.mix.per1000Total)} ml</bdi> {t("per 1,000 birds")}).{' '}
                            {t("Add this much {name} to the flock's drinking water on each dosing day:").replace('{name}', row.name)}
                          </p>
                          <table>
                            <thead>
                              <tr>
                                <th scope="col">{flockKey === 'broiler' ? t("Day") : t("Days")}</th>
                                <th scope="col">{t("Water / bird")}</th>
                                <th scope="col">{t("Per 1,000 birds")}</th>
                                <th scope="col">{t("Your flock")}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {row.mix.runs.map((run) => (
                                <tr key={run.from}>
                                  <td>{run.all
                                    ? <>{t("Each dosing day")} <small>(<bdi>{run.count}</bdi>)</small></>
                                    : run.from === run.to
                                      ? <bdi>{run.from}</bdi>
                                      : <><bdi>{`${run.from}–${run.to}`}</bdi> <small>{t("each day")}</small></>}</td>
                                  <td><bdi>{number(run.waterMl)} ml</bdi></td>
                                  <td><bdi>{number(run.per1000, 1)} ml</bdi></td>
                                  <td><b><bdi>{productText(run.flock)}</bdi></b> <small>{t("in")} <bdi>{number(run.flockWater)} L</bdi></small></td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>

                {plan.extraMeat > 0 && (
                  <p className="builder__claim">
                    <bdi>+15 kg</bdi>{' '}
                    {t("potential extra meat, based on the Remevia field claim for TLTREAT at 1 kg per tonne")}
                    <small>{t("For this flock:")} <bdi>+{number(plan.extraMeat)} kg</bdi></small>
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
            {plan.rows.some((row) => row.mix) && (
              <p className="note builder__tip">{t("Tip for hot days: mix the full day's dose into the water the birds drink in 2–4 cool morning hours, then switch back to plain water.")}</p>
            )}
            <p className="note">{t("Planning estimate from Remevia label rates and the figures above. Our technical team will confirm the final programme for your farm.")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
