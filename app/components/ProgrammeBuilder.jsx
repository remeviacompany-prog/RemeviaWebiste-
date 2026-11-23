'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

const BROILER_DAYS = 40;
// Commercial layers start laying around week 18 and can go up to week 100, so the plan covers weeks 1-100.
const LAYER_DAYS = 700;
const FEED_BAG_KG = 50;

// Dosing days on the label's schedule. Days are 1-based.
const rangeDays = (from, to) => Array.from({ length: to - from + 1 }, (_, i) => from + i);
// EKSIT-CRD: 2 days ON / 2 days OFF. On the label, day 16 to day 36 gives 11 dosing days
// (16-17, 20-21, 24-25, 28-29, 32-33 and 36).
const twoOnTwoOff = (from, to) => rangeDays(from, to).filter((day) => (day - from) % 4 < 2);
const weekOf = (day) => Math.ceil(day / 7);
const firstDayOfWeek = (week) => (week - 1) * 7 + 1;
// Every day from the start of one week to the end of another.
const weekSpan = (fromWeek, toWeek) => [firstDayOfWeek(fromWeek), toWeek * 7];
// Twice a week (the 1st and 4th day of each week) from one week to another.
const twiceWeekly = (fromWeek, toWeek) => rangeDays(...weekSpan(fromWeek, toWeek)).filter((day) => [1, 4].includes(((day - 1) % 7) + 1));
// Every other week from fromWeek: the week itself, fromWeek + 2, fromWeek + 4, ...
const everyOtherWeek = (fromWeek, toWeek) => rangeDays(...weekSpan(fromWeek, toWeek)).filter((day) => (weekOf(day) - fromWeek) % 2 === 0);

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
// Outside the days the technical team worked out, broilers fall back to the standard 1:2 feed-to-water ratio.
const waterMlOn = (flockKey, day) => (flockKey === 'broiler'
  ? BROILER_WATER_ML[day] ?? feedGramsOn(flockKey, day) * 2
  : LAYER_WATER_ML);

// Broiler feed intake, kg per bird per day, days 1-42 (Remevia technical team, "Feed Intake per bird.xlsx", 22 Nov 2026).
const BROILER_FEED_KG = [
  0.015, 0.018, 0.02, 0.023, 0.026, 0.03, 0.033, 0.037, 0.041, 0.045, 0.049, 0.054, 0.059, 0.065,
  0.07, 0.075, 0.08, 0.086, 0.093, 0.099, 0.107, 0.112, 0.118, 0.124, 0.13, 0.135, 0.141, 0.148,
  0.154, 0.158, 0.161, 0.165, 0.168, 0.172, 0.176, 0.181, 0.186, 0.192, 0.197, 0.203, 0.208, 0.213,
];
// Commercial layer feed intake per bird (BV300 Nutrition and Management Guide 2023, VH Group, Table 10):
// 5.6 kg from week 0 to 18, 46.5 kg from week 19 to 80 and 61.2 kg from week 19 to 100.
const LAYER_FEED_PERIODS = [
  { toWeek: 18, grams: 5600 / (18 * 7) }, // about 44 g a day while growing
  { toWeek: 80, grams: 46500 / (62 * 7) }, // about 107 g a day in lay
  { toWeek: 100, grams: (61200 - 46500) / (20 * 7) }, // about 105 g a day late in lay
];
const layerFeedGrams = (day) => (LAYER_FEED_PERIODS.find((period) => weekOf(day) <= period.toWeek) || LAYER_FEED_PERIODS[2]).grams;
const feedGramsOn = (flockKey, day) => (flockKey === 'broiler'
  ? (BROILER_FEED_KG[Math.min(day, BROILER_FEED_KG.length) - 1] || 0) * 1000
  : layerFeedGrams(day));
const feedGramsBetween = (flockKey, from, to) => rangeDays(from, to).reduce((sum, day) => sum + feedGramsOn(flockKey, day), 0);

// Feed-to-water ratio picked by the farmer: litres of water drunk per kg of feed eaten.
// 1:2 is the usual standard; 1:1 suits cool or EC sheds, 1:3 hot weather or open sheds.
const RATIOS = [
  { value: 1, label: '1:1', hint: 'Cool weather or EC shed' },
  { value: 2, label: '1:2', hint: 'Standard (default)' },
  { value: 3, label: '1:3', hint: 'Hot weather or open shed' },
];

// Splits dosing days into blocks of consecutive days (8-14, 16-17, ...).
const dayBlocks = (days) => {
  const blocks = [];
  days.forEach((day) => {
    const last = blocks[blocks.length - 1];
    if (last && last[last.length - 1] === day - 1) last.push(day);
    else blocks.push([day]);
  });
  return blocks;
};

const FLOCKS = {
  broiler: {
    label: 'Broilers',
    days: BROILER_DAYS,
    axis: 'Day',
    tick: 10,
    window: 'One 40-day cycle',
    products: ['tltreat', 'curtect', 'eksit'],
    defaults: ['tltreat', 'curtect', 'eksit'],
  },
  layer: {
    label: 'Commercial layers',
    days: LAYER_DAYS,
    axis: 'Week',
    tick: 70,
    window: 'Weeks 1–100: one laying cycle',
    products: ['tlegg', 'tltreat', 'curtect', 'repeal'],
    defaults: ['tlegg', 'curtect', 'repeal'],
  },
  breeder: {
    label: 'Breeders',
    days: LAYER_DAYS,
    axis: 'Week',
    tick: 70,
    window: 'Weeks 1–100: one laying cycle',
    products: ['tlegg', 'tltreat', 'curtect', 'repeal'],
    defaults: ['tltreat', 'curtect'],
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
    noFeed: true,
    products: ['healer'],
    defaults: ['healer'],
  },
};

// Each product has a label schedule (range, in days for broilers and weeks for layers and breeders)
// that the farmer can move. schedule() lays the label pattern over whatever range is chosen.
const PLANS = {
  tltreat: {
    name: 'TLTREAT', cls: 't-treat', goal: 'Gut health & growth',
    range: (flock) => (flock === 'broiler' ? [1, 40] : flock === 'breeder' ? [18, 100] : [50, 100]),
    schedule: (flock, [from, to]) => {
      if (flock === 'broiler') return { span: [from, to], note: 'From Day 1 to 40th Day continuously in feed mash or pellets' };
      if (flock === 'breeder') return { span: weekSpan(from, to), note: 'From 18th week onwards for better ovulation and more vibrant chicks with a higher weight ratio' };
      return { span: weekSpan(from, to), note: '2 kg per tonne of feed from 50th week onwards to extend the laying cycle & egg quality' };
    },
    rate: (flock) => (flock === 'broiler' ? { kind: 'feed', min: 1, max: 1 } : { kind: 'feed', min: 2, max: 2 }),
  },
  curtect: {
    name: 'CURTECT-CRD', cls: 't-curtect', goal: 'Respiratory support',
    range: (flock) => (flock === 'broiler' ? [8, 14] : [14, 100]),
    schedule: (flock, [from, to]) => (flock === 'broiler'
      ? { days: rangeDays(from, to), note: 'Continuously from 8th day to 14th day' }
      : { days: twiceWeekly(from, to), note: 'Twice a week from 14th week onwards' }),
    // 200 ml per 1,000 L of the standard water intake. Broilers: 650 ml water per bird over days 8-14,
    // so 0.13 ml per bird (130 ml per 1,000 birds). Layers & breeders: 200 ml water, so 0.04 ml per bird each dosing day.
    rate: () => ({ kind: 'water', mlPerLitre: 0.2 }),
  },
  eksit: {
    name: 'EKSIT-CRD', cls: 't-eksit', goal: 'CRD & Mycoplasma',
    range: () => [16, 36],
    schedule: (flock, [from, to]) => ({ days: twoOnTwoOff(from, to), note: 'From 16th day up to 36th day: 2-days ON / 2-days OFF cycle' }),
    // 200 ml per 1,000 L of each day's standard water: 0.533 ml per bird over the 11 dosing days.
    rate: () => ({ kind: 'water', mlPerLitre: 0.2 }),
  },
  tlegg: {
    name: 'TLEGG', cls: 't-egg', goal: 'Egg quality',
    range: () => [14, 100],
    schedule: (flock, [from, to]) => ({ span: weekSpan(from, to), note: 'Added to layer mash feed from 14th week and continued till the end of egg laying. The hen builds the yolk about 30 days before her first egg, so yolks are golden from the very first egg' }),
    rate: () => ({ kind: 'feed', min: 1, max: 1 }),
  },
  repeal: {
    name: 'TLREPEAL', cls: 't-repeal', goal: 'Red mite control',
    // Red mites matter once the birds are in lay, so from week 19: water one week, perimeter spray the next.
    range: () => [19, 100],
    schedule: (flock, [from, to]) => ({
      days: everyOtherWeek(from, to),
      altDays: from < to ? everyOtherWeek(from + 1, to) : [],
      note: 'Alternate between water administration one week and perimeter spray the next week, from week 19 when laying starts',
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
const kgText = (kg) => `${number(kg, kg < 10 ? 2 : 0)} kg`;

const clampNumber = (raw, fallback) => {
  const value = Number(raw);
  return Number.isFinite(value) && value > 0 ? value : fallback;
};

export default function ProgrammeBuilder() {
  const { t } = useLanguage();
  const [flockKey, setFlockKey] = useState('broiler');
  const [birds, setBirds] = useState('10000');
  const [selected, setSelected] = useState(FLOCKS.broiler.defaults);
  const [ratio, setRatio] = useState(2);
  // Dosing range the farmer typed per product, as raw text so the fields can be edited freely.
  const [ranges, setRanges] = useState({});

  const flock = FLOCKS[flockKey];

  const changeFlock = (key) => {
    setFlockKey(key);
    setSelected(FLOCKS[key].defaults);
    setRanges({});
  };

  const unitMax = flock.axis === 'Week' ? flock.days / 7 : flock.days;
  // The range in use for a product: the farmer's own, kept inside the cycle, or the label's.
  const rangeFor = (key) => {
    const label = PLANS[key].range?.(flockKey);
    if (!label) return null;
    const typed = ranges[key];
    if (!typed) return label;
    const clamp = (raw, fallback) => {
      const value = Math.round(Number(raw));
      return Number.isFinite(value) && raw !== '' ? Math.min(unitMax, Math.max(1, value)) : fallback;
    };
    const from = clamp(typed[0], label[0]);
    const to = Math.max(from, clamp(typed[1], label[1]));
    return [from, to];
  };
  const setRange = (key, index, value) => {
    setRanges((all) => {
      const current = all[key] || PLANS[key].range(flockKey).map(String);
      const next = [...current];
      next[index] = value;
      return { ...all, [key]: next };
    });
  };
  const resetRange = (key) => setRanges(({ [key]: _, ...rest }) => rest);

  const toggle = (key) => {
    setSelected((list) => (list.includes(key) ? list.filter((k) => k !== key) : [...list, key]));
  };

  const plan = useMemo(() => {
    const birdCount = clampNumber(birds, 0);
    // Broilers follow the technical team's daily feed curve; layers and breeders the BV300 guide.
    const feedPerBird = flock.noFeed ? 0 : feedGramsBetween(flockKey, 1, flock.days);
    const feedTonnes = (birdCount * feedPerBird) / 1000000;

    const rows = flock.products.filter((key) => selected.includes(key)).map((key) => {
      const def = PLANS[key];
      const range = rangeFor(key);
      const labelRange = def.range?.(flockKey);
      const adjusted = Boolean(range && labelRange && (range[0] !== labelRange[0] || range[1] !== labelRange[1]));
      const schedule = def.schedule(flockKey, range);
      const rate = def.rate(flockKey);
      let quantity = null;
      let mix = null;
      let daily = null;
      let sheet = null;

      if (rate.kind === 'feed') {
        // Only the feed eaten in the product's own weeks (TLEGG from week 14, TLTREAT from week 50, ...).
        const tonnes = schedule.span
          ? (birdCount * feedGramsBetween(flockKey, ...schedule.span)) / 1000000
          : feedTonnes;
        const min = rate.min * tonnes;
        const max = rate.max * tonnes;
        quantity = {
          text: min === max ? `${amount(max)} kg` : `${amount(min)}–${amount(max)} kg`,
          packs: Math.ceil(max / FEED_BAG_KG),
        };
        const span = schedule.span || [1, flock.days];
        const treatmentDays = span[1] - span[0] + 1;
        sheet = {
          how: 'In feed',
          labelRate: `${rate.max} kg ${t('per tonne of feed')}`,
          per1000: birdCount > 0 ? kgText((max / birdCount) * 1000) : '–',
          intake: `${number(feedGramsBetween(flockKey, ...span) / treatmentDays)} g ${t('feed / bird / day')}`,
          inclusion: `${rate.max} kg ${t('per tonne of feed')}`,
          treatmentDays,
          perDay: kgText(max / treatmentDays),
          total: quantity.text,
        };
      } else if (rate.kind === 'water') {
        // The dose per bird is fixed from the technical team's standard water intake, so the bird gets
        // the same amount of product whatever the weather. The farmer's feed-to-water ratio only decides
        // how much water that dose is spread in, which sets the mixing rate per 1,000 L.
        const dosePerBird = (day) => (rate.mlPerLitre * waterMlOn(flockKey, day)) / 1000;
        const waterPerBird = (day) => feedGramsOn(flockKey, day) * ratio; // ml
        const perBirdTotal = schedule.days.reduce((sum, day) => sum + dosePerBird(day), 0);
        quantity = { text: productText(perBirdTotal * birdCount) };
        let runs = dayBlocks(schedule.days).map((block) => {
          const dose = block.reduce((sum, day) => sum + dosePerBird(day), 0);
          const water = block.reduce((sum, day) => sum + waterPerBird(day), 0);
          return {
            from: block[0],
            to: block[block.length - 1],
            count: block.length,
            waterMl: water,
            per1000Birds: water, // ml per bird = L per 1,000 birds
            perKl: water > 0 ? (dose / water) * 1e6 : 0, // ml of product per 1,000 L of water
            flock: dose * birdCount,
            flockWater: (water * birdCount) / 1000,
          };
        });
        // Back-to-back blocks that need exactly the same amounts share one line (layers: weeks 14-18, 19-80, 81-100).
        runs = runs.reduce((list, run) => {
          const last = list[list.length - 1];
          const same = last && last.count === run.count && Math.abs(last.flock - run.flock) < 1e-9 && Math.abs(last.waterMl - run.waterMl) < 1e-9;
          if (same) {
            last.to = run.to;
            last.blocks += 1;
          } else list.push({ ...run, blocks: 1 });
          return list;
        }, []);
        const rates = runs.map((run) => run.perKl);
        mix = { perBirdTotal, per1000Total: perBirdTotal * 1000, dosingDays: schedule.days.length, minKl: Math.min(...rates), maxKl: Math.max(...rates), runs };
        // Exact amounts for every single dosing day (each day's own dose in that day's water).
        if (flock.axis === 'Day' && runs.some((run) => run.count > 1)) {
          daily = schedule.days.map((day) => {
            const water = waterPerBird(day);
            return {
              day,
              waterMl: water,
              perKl: water > 0 ? (dosePerBird(day) / water) * 1e6 : 0,
              flock: dosePerBird(day) * birdCount,
              flockWater: (water * birdCount) / 1000,
            };
          });
        }
        const totalWater = schedule.days.reduce((sum, day) => sum + waterPerBird(day), 0);
        const dosingDays = schedule.days.length || 1;
        sheet = {
          how: 'In drinking water',
          labelRate: `${number(rate.mlPerLitre * 1000)} ml ${t('per 1,000 L of water')}`,
          per1000: productText(perBirdTotal * 1000),
          intake: `${number(totalWater / dosingDays)} ml ${t('water / bird / day')} (1:${ratio})`,
          inclusion: `${Math.abs(mix.maxKl - mix.minKl) < 0.5 ? number(mix.maxKl) : `${number(mix.minKl)}–${number(mix.maxKl)}`} ml ${t('per 1,000 L of water')}`,
          treatmentDays: schedule.days.length,
          perDay: productText((perBirdTotal * birdCount) / dosingDays),
          total: quantity.text,
        };
      } else {
        sheet = { how: 'Spray on the affected area', labelRate: '–', per1000: '–', intake: '–', inclusion: '–', treatmentDays: '–', perDay: t('As needed'), total: t('As needed') };
      }

      return { key, ...def, schedule, range, labelRange, adjusted, quantity, mix, daily, sheet };
    });

    return {
      rows,
      feedTonnes,
      // Remevia's field claim: 1 kg of TLTREAT (the dose for 1 tonne of feed) delivers up to 15 kg of additional meat.
      extraMeat: flockKey === 'broiler' && selected.includes('tltreat') ? feedTonnes * 15 : 0,
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [birds, flock, flockKey, selected, ratio, ranges, t]);

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
                <legend>{t("3. Water intake")}</legend>
                <label className="field">
                  {t("Feed-to-water ratio")}
                  <select className="builder__select" value={ratio} onChange={(e) => setRatio(Number(e.target.value))}>
                    {RATIOS.map((option) => (
                      <option key={option.value} value={option.value}>{option.label} · {t(option.hint)}</option>
                    ))}
                  </select>
                </label>
                <p className="builder__hint">{t("Birds drink about {n} L of water for every 1 kg of feed. Water intake changes with age, breed, weather and shed type, so pick what matches your farm.").replace('{n}', ratio)}</p>
              </fieldset>
            )}
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
                        {row.schedule.span && (
                          <i className="gantt__bar" style={{ insetInlineStart: `${((row.schedule.span[0] - 1) / flock.days) * 100}%`, width: `${((row.schedule.span[1] - row.schedule.span[0] + 1) / flock.days) * 100}%` }} />
                        )}
                        {row.schedule.asNeeded && <i className="gantt__bar gantt__bar--soft" style={{ insetInlineStart: 0, width: '100%' }} />}
                        {row.schedule.days?.map((day) => (
                          <i key={day} className="gantt__bar" style={{ insetInlineStart: `${((day - 1) / flock.days) * 100}%`, width: `max(${100 / flock.days}%, 2px)` }} />
                        ))}
                        {row.schedule.altDays?.map((day) => (
                          <i key={`alt${day}`} className="gantt__bar gantt__bar--soft" style={{ insetInlineStart: `${((day - 1) / flock.days) * 100}%`, width: `max(${100 / flock.days}%, 2px)` }} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="builder__sheet">
                  <h4>{t("Calculation sheet")}</h4>
                  <div className="builder__sheet-scroll">
                    <table>
                      <thead>
                        <tr>
                          <th scope="col"><span className="sr-only">{t("Step")}</span></th>
                          {plan.rows.map((row) => <th key={row.key} scope="col" className={row.cls}>{row.name}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ['How it is given', (row) => t(row.sheet.how)],
                          ['Label rate', (row) => row.sheet.labelRate],
                          ['Dose per 1,000 birds', (row) => row.sheet.per1000],
                          ['Intake', (row) => row.sheet.intake],
                          ['Mix rate', (row) => row.sheet.inclusion, true],
                          [flock.countLabel || 'Number of birds', () => number(clampNumber(birds, 0))],
                          ['Treatment days', (row) => row.sheet.treatmentDays],
                          ['Amount per day', (row) => row.sheet.perDay, true],
                          ['Total amount', (row) => row.sheet.total, true],
                        ].map(([label, value, output]) => (
                          <tr key={label} className={output ? 'is-output' : undefined}>
                            <th scope="row">{output && <span aria-hidden="true">▸ </span>}{t(label)}</th>
                            {plan.rows.map((row) => <td key={row.key}><bdi>{value(row)}</bdi></td>)}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="builder__hint">{t("Amount per day is the average over the treatment days. Use the day-by-day guide below for exact daily amounts.")}</p>
                </div>

                <ul className="builder__orders">
                  {plan.rows.map((row) => (
                    <li key={row.key} className={row.cls}>
                      <div>
                        <b>{row.name}</b>
                        {row.schedule.note && <small>{t(row.schedule.note)}</small>}
                        {row.range && (
                          <details className="builder__days" open={row.adjusted || undefined}>
                            <summary>
                              {t("Dosing days")}: <bdi>{flock.axis === 'Week' ? `${t("Weeks")} ${row.range[0]}–${row.range[1]}` : `${t("Day")} ${row.range[0]}–${row.range[1]}`}</bdi>
                              {row.adjusted && <em> · {t("changed")}</em>}
                            </summary>
                            <div>
                              <label>
                                {flock.axis === 'Week' ? t("From week") : t("From day")}
                                <input type="number" min="1" max={unitMax} inputMode="numeric" value={ranges[row.key]?.[0] ?? row.range[0]} onChange={(e) => setRange(row.key, 0, e.target.value)} />
                              </label>
                              <label>
                                {flock.axis === 'Week' ? t("To week") : t("To day")}
                                <input type="number" min="1" max={unitMax} inputMode="numeric" value={ranges[row.key]?.[1] ?? row.range[1]} onChange={(e) => setRange(row.key, 1, e.target.value)} />
                              </label>
                              {row.adjusted && (
                                <button type="button" className="builder__reset" onClick={() => resetRange(row.key)}>
                                  {t("Back to label schedule")} (<bdi>{row.labelRange[0]}–{row.labelRange[1]}</bdi>)
                                </button>
                              )}
                            </div>
                          </details>
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
                          <div className="builder__results">
                            <div>
                              <span>{t("Total {name} for your flock").replace('{name}', row.name)}</span>
                              <b><bdi>{row.quantity.text}</bdi></b>
                              <small><bdi>{number(row.mix.per1000Total, 1)} ml</bdi> {t("per 1,000 birds over")} <bdi>{row.mix.dosingDays}</bdi> {t("dosing days")}</small>
                            </div>
                            <div>
                              <span>{t("Add to every 1,000 L of drinking water")}</span>
                              <b><bdi>{Math.abs(row.mix.maxKl - row.mix.minKl) < 0.5
                                ? `${number(row.mix.maxKl)} ml`
                                : `${number(row.mix.minKl)}–${number(row.mix.maxKl)} ml`}</bdi></b>
                              <small>{t("At a feed-to-water ratio of")} <bdi>1:{ratio}</bdi></small>
                            </div>
                          </div>
                          <table>
                            <thead>
                              <tr>
                                <th scope="col">{flockKey === 'broiler' ? t("Day") : t("Days")}</th>
                                <th scope="col">{t("Water / bird")}</th>
                                <th scope="col">{t("Per 1,000 birds")}</th>
                                <th scope="col">{t("Per 1,000 L")}</th>
                                <th scope="col">{t("Your flock")}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {row.mix.runs.map((run) => (
                                <tr key={run.from}>
                                  <td>{run.blocks > 1
                                    ? <>{t("Weeks")} <bdi>{`${weekOf(run.from)}–${weekOf(run.to)}`}</bdi> <small>{run.count === 1
                                      ? t("{n} dosing days · each day").replace('{n}', run.blocks)
                                      : t("{n} weeks on · per week").replace('{n}', run.blocks)}</small></>
                                    : run.from === run.to
                                      ? <bdi>{run.from}</bdi>
                                      : <><bdi>{`${run.from}–${run.to}`}</bdi> <small>{t("{n} days, total").replace('{n}', run.count)}</small></>}</td>
                                  <td><bdi>{number(run.waterMl)} ml</bdi></td>
                                  <td><bdi>{number(run.per1000Birds)} L</bdi></td>
                                  <td><bdi>{number(run.perKl)} ml</bdi>{run.count > 1 && run.blocks === 1 && <small>{t("average")}</small>}</td>
                                  <td>
                                    <b><bdi>{productText(run.flock)}</bdi></b> <small>{t("in")} <bdi>{number(run.flockWater)} L</bdi></small>
                                    {run.count > 1 && <small><bdi>{productText(run.flock / run.count)}</bdi> {t("a day")}</small>}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {row.daily && (
                            <details className="builder__daily">
                              <summary>{t("Day-by-day mixing guide")}</summary>
                              <p>{t("Each day's dose goes into that day's water, so the amount per 1,000 L changes as the birds eat and drink more.")}</p>
                              <table>
                                <thead>
                                  <tr>
                                    <th scope="col">{t("Day")}</th>
                                    <th scope="col">{t("Water / bird")}</th>
                                    <th scope="col">{t("Per 1,000 L")}</th>
                                    <th scope="col">{t("Your flock")}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {row.daily.map((d) => (
                                    <tr key={d.day}>
                                      <td><bdi>{d.day}</bdi></td>
                                      <td><bdi>{number(d.waterMl)} ml</bdi></td>
                                      <td><bdi>{number(d.perKl)} ml</bdi></td>
                                      <td><b><bdi>{productText(d.flock)}</bdi></b> <small>{t("in")} <bdi>{number(d.flockWater)} L</bdi></small></td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </details>
                          )}
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
            {flock.axis === 'Week' && (
              <p className="note">{t("Layer feed intake from the BV300 guide (VH Group): 5.6 kg per bird to week 18, 46.5 kg for weeks 19–80 and 61.2 kg for weeks 19–100.")}</p>
            )}
            <p className="note">{t("Planning estimate from Remevia label rates and the figures above. Our technical team will confirm the final programme for your farm.")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
