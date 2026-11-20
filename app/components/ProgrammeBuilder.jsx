'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

const BROILER_DAYS = 40;
const LAYER_DAYS = 84;
const FEED_BAG_KG = 50;

// Dosing days on the label's schedule. Days are 1-based.
const courseDays = (length) => Array.from({ length }, (_, i) => i + 1);
// 2 days ON / 2 days OFF from day 16: days 16-17, 20-21, 24-25, 28-29 and 32-33, so 10 dosing days.
const eksitDays = () => {
  const out = [];
  for (let day = 16; day <= 33; day += 4) out.push(day, day + 1);
  return out;
};
// CURTECT-CRD runs continuously from day 8 to day 14.
const rangeDays = (from, to) => Array.from({ length: to - from + 1 }, (_, i) => from + i);
const alternateWeeks = (days, startWeek) => {
  const out = [];
  for (let day = 1; day <= days; day += 1) {
    if (Math.floor((day - 1) / 7) % 2 === startWeek) out.push(day);
  }
  return out;
};

// Shed weather. Birds drink far more in the heat, but the dose each bird needs does not change,
// so weather only changes how much water the day's product is mixed into.
const CLIMATES = [
  { key: 'normal', label: 'Normal', temp: '~21°C' },
  { key: 'warm', label: 'Warm', temp: '~27°C' },
  { key: 'hot', label: 'Hot', temp: '~32°C' },
  { key: 'extreme', label: 'Extreme heat', temp: '40°C+' },
];

// Broiler drinking water, litres per 1,000 birds per day, by age and shed temperature
// (Venkateshwara Hatcheries / Vencobb broiler management standard).
const BROILER_WATER = [
  { to: 7, normal: 27, warm: 28, hot: 32, extreme: 78 },
  { to: 14, normal: 72, warm: 85, hot: 122, extreme: 216 },
  { to: 21, normal: 108, warm: 153, hot: 248, extreme: 324 },
  { to: 28, normal: 144, warm: 200, hot: 324, extreme: 432 },
  { to: 35, normal: 184, warm: 256, hot: 400, extreme: 552 },
  { to: 42, normal: 221, warm: 302, hot: 464, extreme: 663 },
];
// Layer drinking water, litres per 1,000 birds per day. BV-300 standard is about 250 L at 28°C;
// the other bands follow the same heat curve as the broiler chart.
const LAYER_WATER = { normal: 180, warm: 250, hot: 380, extreme: 550 };
// Vencobb 430Y broiler feed intake, grams per bird per week, weeks 1–6.
const BROILER_FEED_WEEK = [165, 350, 610, 908, 1154, 1380];
const broilerFeedOnDay = (day) => BROILER_FEED_WEEK[Math.min(5, Math.floor((day - 1) / 7))] / 7;

const waterPer1000 = (flockKey, day, climate) => {
  if (flockKey === 'broiler') {
    const band = BROILER_WATER.find((b) => day <= b.to) || BROILER_WATER[BROILER_WATER.length - 1];
    return band[climate];
  }
  return LAYER_WATER[climate];
};

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
          { label: 'Layers', note: '2 kg per tonne of feed from 60th week to extend the laying cycle & egg quality' },
          { label: 'Breeders', note: 'From 40th week for better ovulation and more vibrant chicks with a higher weight ratio' },
        ],
      }),
    rate: (flock) => (flock === 'broiler' ? { kind: 'feed', min: 1, max: 1 } : { kind: 'feed', min: 2, max: 2 }),
  },
  curtect: {
    name: 'CURTECT-CRD', cls: 't-curtect', goal: 'Respiratory support',
    schedule: (flock, days) => (flock === 'broiler'
      ? { days: rangeDays(8, 14), note: 'Continuously from 8th day to 14th day' }
      : { days: courseDays(Math.min(14, days)), note: 'Twice a day for 7–14 days', waterShare: 1 }),
    // Broilers: the same per-bird daily dose as EKSIT-CRD (0.0533 ml per bird per day).
    // Layers: label rate 200 ml per 1,000 L at the BV-300 standard of 250 L per 1,000 birds = 0.05 ml per bird per day.
    rate: (flock) => (flock === 'broiler' ? { kind: 'bird', mlPerDay: 0.0533 } : { kind: 'bird', mlPerDay: 0.05 }),
  },
  eksit: {
    name: 'EKSIT-CRD', cls: 't-eksit', goal: 'CRD & Mycoplasma',
    schedule: () => ({ days: eksitDays(), note: 'From 16th day up to 36th day: 2-days ON / 2-days OFF cycle' }),
    // 0.533 ml per bird over the 10 dosing days, so 5.3 L for 10,000 birds.
    rate: () => ({ kind: 'bird', mlPerDay: 0.0533 }),
  },
  tlegg: {
    name: 'TLEGG', cls: 't-egg', goal: 'Egg quality',
    schedule: () => ({ continuous: true, note: 'Added to layer mash feed from 14th week. Laying starts around week 18 and the hen builds the yolk about 30 days before her first egg, so yolks are golden from the very first egg' }),
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
    // Label rate 150 ml per 1,000 L at the BV-300 standard of 250 L per 1,000 birds = 0.0375 ml per bird per day.
    rate: () => ({ kind: 'bird', mlPerDay: 0.0375 }),
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

// Groups the dosing days into runs of consecutive days that share the same water figure.
const mixingRuns = (days, waterOn) => {
  const runs = [];
  days.forEach((day) => {
    const water = waterOn(day);
    const last = runs[runs.length - 1];
    if (last && last.to === day - 1 && last.water === water) last.to = day;
    else runs.push({ from: day, to: day, water });
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
  const [feed, setFeed] = useState(FLOCKS.broiler.feed);
  const [water, setWater] = useState('');
  const [climate, setClimate] = useState('warm');
  const [selected, setSelected] = useState(FLOCKS.broiler.defaults);

  const flock = FLOCKS[flockKey];

  const changeFlock = (key) => {
    setFlockKey(key);
    setFeed(FLOCKS[key].feed);
    setWater('');
    setSelected(FLOCKS[key].defaults);
  };

  const toggle = (key) => {
    setSelected((list) => (list.includes(key) ? list.filter((k) => k !== key) : [...list, key]));
  };

  const plan = useMemo(() => {
    const birdCount = clampNumber(birds, 0);
    const ownFeed = clampNumber(feed, 0);
    // Broilers follow the Vencobb feed curve unless the farm enters its own average.
    const feedPerBird = ownFeed > 0 || flockKey !== 'broiler'
      ? ownFeed * flock.days
      : Array.from({ length: flock.days }, (_, i) => broilerFeedOnDay(i + 1)).reduce((a, b) => a + b, 0);
    const feedTonnes = (birdCount * feedPerBird) / 1000000;
    const ownWater = clampNumber(water, 0);
    // Litres of drinking water for the whole flock on a given day.
    const flockWaterOn = (day) => ((ownWater || waterPer1000(flockKey, day, climate)) * birdCount) / 1000;

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
      } else if (rate.kind === 'bird') {
        // Fixed dose per bird per day: the total never changes with the weather.
        const dailyMl = birdCount * rate.mlPerDay;
        const litres = (schedule.days.length * dailyMl) / 1000;
        quantity = { text: `${amount(litres)} L` };
        let runs = mixingRuns(schedule.days, flockWaterOn).map((run) => ({
          ...run, product: dailyMl, strength: run.water > 0 ? dailyMl / run.water : 0,
        }));
        // Same water every dosing day (layers, or a measured figure): one line is enough.
        if (runs.length > 1 && runs.every((run) => run.water === runs[0].water)) {
          runs = [{ ...runs[0], all: true, count: schedule.days.length }];
        }
        mix = { perBird: rate.mlPerDay, per1000: rate.mlPerDay * 1000, runs };
      }

      return { key, ...def, schedule, quantity, mix };
    });

    return {
      rows,
      feedTonnes,
      // Remevia's field claim: 1 kg of TLTREAT (the dose for 1 tonne of feed) delivers up to 15 kg of additional meat.
      extraMeat: flockKey === 'broiler' && selected.includes('tltreat') ? feedTonnes * 15 : 0,
    };
  }, [birds, feed, water, climate, flock, flockKey, selected]);

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

            {!flock.noFeed && (
              <fieldset>
                <legend>{t("3. Weather in the shed")}</legend>
                <div className="builder__climate" role="radiogroup" aria-label={t("Weather in the shed")}>
                  {CLIMATES.map((c) => (
                    <label key={c.key} className={climate === c.key ? 'is-on' : undefined}>
                      <input type="radio" name="climate" value={c.key} checked={climate === c.key} onChange={() => setClimate(c.key)} />
                      <b>{t(c.label)}</b>
                      <small><bdi>{c.temp}</bdi></small>
                    </label>
                  ))}
                </div>
                <p className="builder__principle">
                  <b>{t("Same dose per bird, whatever the weather")}</b>
                  {t("Birds can drink twice as much water in hot weather. The product each bird needs stays the same, so the daily dose per bird is fixed and only the amount of water it is mixed into changes. No overdose in summer, no underdose in winter.")}
                </p>
              </fieldset>
            )}

            {!flock.noFeed && <details className="builder__assume">
              <summary>{t("Adjust feed and water figures")}</summary>
              <p>{t("Leave blank to use the breed standard for each age (Vencobb broilers, BV-300 layers). Enter your own farm's figures for a closer estimate.")}</p>
              <div className="builder__pair">
                <label className="field">
                  {t("Feed per bird per day (g)")}
                  <input type="number" min="1" inputMode="decimal" placeholder={t("Breed standard")} value={feed} onChange={(e) => setFeed(e.target.value)} />
                </label>
                <label className="field">
                  {t("Measured water use (L per 1,000 birds per day)")}
                  <input type="number" min="1" step="1" inputMode="decimal" placeholder={t("Breed standard")} value={water} onChange={(e) => setWater(e.target.value)} />
                </label>
              </div>
            </details>}
          </form>

          <div className="builder__output" aria-live="polite">
            <div className="builder__summary">
              <h3>{t("Your programme")}</h3>
              <span>{t(flock.window)} · {number(clampNumber(birds, 0))} {t(flock.unit || "birds")}{!flock.noFeed && <> · {amount(plan.feedTonnes)} {t("tonnes of feed")} · {t(CLIMATES.find((c) => c.key === climate).label)}</>}</span>
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
                            {t("Fixed dose:")} <b><bdi>{number(row.mix.per1000, 1)} ml</bdi></b> {t("per 1,000 birds per day.")}{' '}
                            {t("Mix the day's product into the water the flock will drink that day:")}
                          </p>
                          <table>
                            <thead>
                              <tr>
                                <th scope="col">{t("Days")}</th>
                                <th scope="col">{t("Water / day")}</th>
                                <th scope="col">{t("Add / day")}</th>
                                <th scope="col">{t("Strength")}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {row.mix.runs.map((run) => (
                                <tr key={run.from}>
                                  <td>{run.all
                                    ? <>{t("Each dosing day")} <small>(<bdi>{run.count}</bdi>)</small></>
                                    : <bdi>{run.from === run.to ? run.from : `${run.from}–${run.to}`}</bdi>}</td>
                                  <td><bdi>{number(run.water)} L</bdi></td>
                                  <td><bdi>{productText(run.product)}</bdi></td>
                                  <td><bdi>{number(run.strength, 2)} ml/L</bdi></td>
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
