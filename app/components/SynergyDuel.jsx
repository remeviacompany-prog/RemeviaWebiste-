'use client';

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

// Two petri dishes on a 6-second loop, drawn after George's reference:
// left, synthetic capsules ricochet off a shield while the microbe divides;
// right, three botanical drops hit the microbe together and it breaks apart.
// Timings live in globals.css under "Science: synergy duel v3".
const BUBBLES = [
  [340, 70, 7], [358, 92, 5], [372, 60, 4], [352, 46, 6], [380, 84, 3],
  [330, 50, 3], [366, 112, 4], [388, 66, 5], [344, 30, 4], [320, 36, 3],
];
const SHARDS = [
  'M340 104l14-4 1 12-11 2z', 'M342 126l15 3-8 11-8-5z', 'M334 86l10-11 6 11-9 3z', 'M338 146l12 6-9 8-6-7z', 'M346 112l9 1-3 7z',
];
// Dish dressing shared by both panels: shadow, glass rim, agar and specks.
function PetriDish({ rim, agar, tint }) {
  return (
    <g className="sd-dish">
      <ellipse cx="300" cy="216" rx="82" ry="9" fill="#0B1B3A" opacity=".08" />
      <circle cx="300" cy="124" r="94" fill="#FFF" opacity=".6" />
      <circle cx="300" cy="124" r="94" fill="none" stroke={rim} strokeWidth="3" />
      <circle cx="300" cy="124" r="88" fill="none" stroke="#FFF" strokeWidth="2" opacity=".8" />
      <circle cx="300" cy="124" r="84" fill={agar} stroke={rim} strokeWidth="1" opacity=".95" />
      {[[258, 160], [336, 172], [350, 150], [262, 92], [318, 186], [248, 132]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="1.6" fill={tint} opacity=".35" />
      ))}
      <path d="M232 76a86 86 0 0 1 44-30" stroke="#FFF" strokeWidth="6" strokeLinecap="round" opacity=".95" fill="none" />
      <path d="M364 178a86 86 0 0 1-22 20" stroke="#FFF" strokeWidth="4" strokeLinecap="round" opacity=".7" fill="none" />
    </g>
  );
}

export default function SynergyDuel() {
  const { t } = useLanguage();
  const [run, setRun] = useState(0);

  return (
    <div className="sduel">
      <div className="compare duel sduel__grid" key={run}>
        {/* ---------- Single synthetic active ---------- */}
        <div className="duel__card duel__card--single">
          <div className="duel__top">
            <h3>{t("Single synthetic active")}</h3>
            <span className="duel__chip duel__chip--bad">{t("1 mode of action")}</span>
          </div>
          <svg viewBox="0 0 400 240" role="img" aria-label={t("One compound acting on one target")}>
            <defs>
              <linearGradient id="sd-pill" x1="0" x2="1">
                <stop offset="0" stopColor="#64748B" />
                <stop offset=".5" stopColor="#64748B" />
                <stop offset=".5" stopColor="#A3B1C6" />
                <stop offset="1" stopColor="#A3B1C6" />
              </linearGradient>
              <linearGradient id="sd-shield" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#FCA5A5" />
                <stop offset="1" stopColor="#DC2626" />
              </linearGradient>
              <pattern id="sd-brick" width="8" height="6" patternUnits="userSpaceOnUse">
                <path d="M0 .5H8M0 3.5H8M4 .5V3.5M0 3.5V6.5M8 3.5V6.5" stroke="#FECACA" strokeWidth=".8" opacity=".7" />
              </pattern>
              <marker id="sd-tip-grey" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M0 0L10 5L0 10z" fill="#A3B1C6" />
              </marker>
            </defs>

            <PetriDish rim="#F3C9C2" agar="#FFF3F0" tint="#DC2626" />

            {/* trajectories */}
            <path d="M96 128H214" stroke="#A3B1C6" strokeWidth="3" strokeDasharray="7 7" fill="none" className="duel__line" />
            <path d="M150 34L212 108" stroke="#C3CCDA" strokeWidth="3" strokeDasharray="7 7" fill="none" />
            <path d="M214 134L168 196" stroke="#C3CCDA" strokeWidth="3" strokeDasharray="7 7" fill="none" markerEnd="url(#sd-tip-grey)" className="sd-ricochet" />

            {/* the microbe divides */}
            <g className="sd-daughter">
              <circle cx="336" cy="84" r="36" fill="#FCA5A5" stroke="#DC2626" strokeWidth="6" />
              <circle cx="342" cy="80" r="13" fill="#DC2626" />
            </g>
            <g className="sd-mother">
              <circle cx="292" cy="134" r="40" fill="#FCA5A5" stroke="#DC2626" strokeWidth="6" />
              <circle cx="296" cy="136" r="14" fill="#DC2626" />
            </g>

            {/* resistance shield */}
            <g className="sd-shield">
              <path d="M240 92l27 10v24c0 20-12 31-27 39-15-8-27-19-27-39v-24z" fill="url(#sd-shield)" stroke="#B91C1C" strokeWidth="3" strokeLinejoin="round" />
              <path d="M240 98l21 8v20c0 16-9 25-21 32-12-7-21-16-21-32v-20z" fill="url(#sd-brick)" />
              <path d="M226 104l14-5" stroke="#FFF" strokeWidth="3" strokeLinecap="round" opacity=".8" />
            </g>

            {/* capsules with speed lines */}
            <g className="sd-pill sd-pill--a">
              <path d="M-52 -6H-32M-58 0H-32M-50 6H-32" stroke="#C3CCDA" strokeWidth="2" strokeLinecap="round" />
              <rect x="-26" y="-12" width="52" height="24" rx="12" fill="url(#sd-pill)" />
              <rect x="-20" y="-8" width="16" height="4" rx="2" fill="#FFF" opacity=".35" />
            </g>
            <g className="sd-pill sd-pill--b">
              <path d="M-48 -5H-30M-54 0H-30M-46 5H-30" stroke="#C3CCDA" strokeWidth="2" strokeLinecap="round" />
              <rect x="-22" y="-10" width="44" height="20" rx="10" fill="url(#sd-pill)" />
            </g>

            <text x="200" y="232" textAnchor="middle" fontSize="15" fontFamily="Figtree" fill="#1F2A44" className="sd-caption">{t("1 target · Rapid mutation & resistance")}</text>
          </svg>
        </div>

        {/* ---------- Remevia synergy blend ---------- */}
        <div className="duel__card duel__card--blend">
          <div className="duel__top">
            <h3>{t("Remevia synergy blend")}</h3>
            <span className="duel__chip duel__chip--good">{t("Multi-target")}</span>
          </div>
          <svg viewBox="0 0 400 240" role="img" aria-label={t("Several compounds acting on several targets")}>
            <defs>
              <filter id="sd-glow" filterUnits="userSpaceOnUse" x="0" y="0" width="400" height="240">
                <feGaussianBlur stdDeviation="5" />
              </filter>
              {[['a', '#1D4ED8', '#60A5FA'], ['b', '#0F766E', '#2DD4BF'], ['c', '#15803D', '#4ADE80']].map(([k, c1, c2]) => (
                <React.Fragment key={k}>
                  <linearGradient id={`sd-arrow-${k}`} x1="0" x2="1">
                    <stop offset="0" stopColor={c2} stopOpacity=".25" />
                    <stop offset="1" stopColor={c1} />
                  </linearGradient>
                  <radialGradient id={`sd-drop-${k}`} cx="35%" cy="55%" r="70%">
                    <stop offset="0" stopColor={c2} />
                    <stop offset="1" stopColor={c1} />
                  </radialGradient>
                  <marker id={`sd-tip-${k}`} viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto">
                    <path d="M0 0L10 5L0 10z" fill={c1} />
                  </marker>
                </React.Fragment>
              ))}
            </defs>

            <PetriDish rim="#B7E4C7" agar="#F0FBF4" tint="#16A34A" />

            {/* glowing arrows */}
            {[
              ['a', 'M80 62C150 30 230 44 262 92'],
              ['b', 'M66 126C140 104 210 112 252 124'],
              ['c', 'M86 192C170 214 236 196 264 158'],
            ].map(([k, d], i) => (
              <g key={k} className="sd-arrow" style={{ animationDelay: `${i * 0.15}s` }}>
                <path d={d} stroke={`url(#sd-arrow-${k})`} strokeWidth="12" strokeLinecap="round" fill="none" filter="url(#sd-glow)" opacity=".7" />
                <path d={d} stroke={`url(#sd-arrow-${k})`} strokeWidth="6" strokeLinecap="round" fill="none" markerEnd={`url(#sd-tip-${k})`} pathLength="100" className="sd-arrow__line" style={{ animationDelay: `${i * 0.15}s` }} />
              </g>
            ))}

            {[['a', '#BFDBFE'], ['b', '#99F6E4'], ['c', '#BBF7D0']].map(([k, fill], i) => (
              <circle key={k} r="6" fill={fill} stroke="#FFF" strokeWidth="2" className={`sd-spark sd-spark--${k}`} style={{ animationDelay: `${i * 0.15}s` }} />
            ))}

            {/* microbe that cracks and breaks apart */}
            <g className="sd-microbe">
              <circle cx="300" cy="124" r="42" strokeWidth="9" className="sd-microbe__ring" pathLength="100" />
              <circle cx="298" cy="126" r="15" className="sd-microbe__core" />
              <path d="M268 98l10 7-5 8M260 122l13 3M272 152l8-8 5 7M330 100l-9 8 4 6M334 146l-11-5" stroke="#14532D" strokeWidth="2.5" fill="none" strokeLinecap="round" className="sd-cracks" />
            </g>
            {SHARDS.map((d, i) => (
              <path key={d} d={d} fill="#22C55E" className="sd-shard" style={{ animationDelay: `${i * 0.05}s` }} />
            ))}
            {BUBBLES.map(([cx, cy, r], i) => (
              <circle key={i} cx={cx} cy={cy} r={r} fill={i % 3 ? 'none' : '#86EFAC'} stroke="#4ADE80" strokeWidth="2"
                className="sd-bubble" style={{ animationDelay: `${(i % 5) * 0.08}s` }} />
            ))}

            {/* botanical drops */}
            {[['a', 64, 56], ['b', 46, 122], ['c', 72, 190]].map(([k, x, y], i) => (
              <g key={k} transform={`translate(${x} ${y})`}>
                <path d="M0-28C10-12 18-2 18 8A18 18 0 0 1-18 8C-18-2-10-12 0-28z" fill={`url(#sd-drop-${k})`} filter="url(#sd-glow)" opacity=".6" />
                <path d="M0-28C10-12 18-2 18 8A18 18 0 0 1-18 8C-18-2-10-12 0-28z" fill={`url(#sd-drop-${k})`} className="sd-drop" style={{ animationDelay: `${i * 0.15}s` }} />
                <path d="M-8 2c0-6 3-11 6-15" stroke="#FFF" strokeWidth="3" strokeLinecap="round" opacity=".6" fill="none" />
              </g>
            ))}

            <text x="200" y="232" textAnchor="middle" fontSize="15" fontFamily="Figtree" fill="#1F2A44">{t("Multiple targets · Hard to resist")}</text>
          </svg>
        </div>
      </div>
      <button type="button" className="btn btn--ghost sduel__replay" onClick={() => setRun((n) => n + 1)}>
        ↻ {t("Simulate microbial attack")}
      </button>
    </div>
  );
}
