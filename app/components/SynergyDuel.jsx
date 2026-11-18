'use client';

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

// Shards and dissolving bubbles for Remevia's multi-target breakdown
const SHARDS = [
  'M 346 92 L 358 86 L 360 98 Z',
  'M 352 108 L 368 112 L 362 122 Z',
  'M 340 78 L 352 70 L 356 82 Z',
  'M 348 126 L 362 134 L 354 142 Z',
  'M 364 96 L 376 94 L 372 104 Z',
  'M 360 80 L 370 74 L 374 86 Z',
];

const BUBBLES = [
  [348, 68, 4], [364, 88, 3.5], [378, 62, 3], [358, 44, 4.5], [384, 82, 2.5],
  [342, 118, 3], [372, 110, 3.5], [392, 68, 4], [354, 28, 3], [330, 38, 2.5],
];

// Precision Bio-Chamber shared by both panels (harmonized center at cx=325, cy=105)
function BioChamber({ rimColor, agarFill, gridColor }) {
  return (
    <g className="sd-chamber">
      {/* Outer ambient shadow */}
      <ellipse cx="325" cy="186" rx="68" ry="7" fill="#0B1B3A" opacity="0.05" />
      {/* Glass dish base and rim */}
      <circle cx="325" cy="105" r="78" fill="#FFFFFF" opacity="0.75" />
      <circle cx="325" cy="105" r="78" fill="none" stroke={rimColor} strokeWidth="2.5" />
      <circle cx="325" cy="105" r="74" fill={agarFill} stroke={rimColor} strokeWidth="1" opacity="0.9" />
      {/* Fine scientific radar coordinate grid */}
      <circle cx="325" cy="105" r="54" fill="none" stroke={gridColor} strokeWidth="1" strokeDasharray="3 3" opacity="0.25" />
      <circle cx="325" cy="105" r="28" fill="none" stroke={gridColor} strokeWidth="1" opacity="0.15" />
      {/* Reticle tick marks */}
      <line x1="325" y1="29" x2="325" y2="35" stroke={gridColor} strokeWidth="1.5" opacity="0.4" />
      <line x1="325" y1="175" x2="325" y2="181" stroke={gridColor} strokeWidth="1.5" opacity="0.4" />
      <line x1="249" y1="105" x2="255" y2="105" stroke={gridColor} strokeWidth="1.5" opacity="0.4" />
      <line x1="395" y1="105" x2="401" y2="105" stroke={gridColor} strokeWidth="1.5" opacity="0.4" />
      {/* Precision glass reflection arcs */}
      <path d="M 268 64 A 70 70 0 0 1 352 42" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" fill="none" />
      <path d="M 378 142 A 70 70 0 0 1 360 160" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" fill="none" />
    </g>
  );
}

export default function SynergyDuel() {
  const { t } = useLanguage();
  const [run, setRun] = useState(0);

  return (
    <div className="sduel">
      <div className="compare duel sduel__grid" key={run}>
        {/* ========================================================
            CARD 1: Single synthetic active (Resistance & Mutation)
           ======================================================== */}
        <div className="duel__card duel__card--single">
          <div className="duel__top">
            <h3 className="duel__title">{t("Single synthetic active")}</h3>
            <span className="duel__chip duel__chip--bad">
              <span className="duel__chip-dot"></span>
              {t("1 mode of action")}
            </span>
          </div>

          <svg viewBox="0 0 460 210" role="img" aria-label={t("One compound acting on one target")}>
            <defs>
              <linearGradient id="sd-pill-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#94A3B8" />
                <stop offset="50%" stopColor="#CBD5E1" />
                <stop offset="50%" stopColor="#F87171" />
                <stop offset="100%" stopColor="#DC2626" />
              </linearGradient>
              <linearGradient id="sd-shield-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F87171" />
                <stop offset="60%" stopColor="#DC2626" />
                <stop offset="100%" stopColor="#991B1B" />
              </linearGradient>
              <pattern id="sd-shield-mesh" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 0 4 L 4 0 L 8 4 L 4 8 Z" fill="none" stroke="#FECACA" strokeWidth="0.8" opacity="0.6" />
              </pattern>
              <marker id="sd-ricochet-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 9 5 L 0 9 Z" fill="#94A3B8" />
              </marker>
              <radialGradient id="sd-agar-left" cx="40%" cy="40%" r="65%">
                <stop offset="0%" stopColor="#FFF5F5" />
                <stop offset="100%" stopColor="#FEE2E2" />
              </radialGradient>
              <filter id="sd-glow-red" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Scientific observation chamber */}
            <BioChamber rimColor="#FECDD3" agarFill="url(#sd-agar-left)" gridColor="#DC2626" />

            {/* Attack & Deflection trajectories */}
            <line x1="56" y1="105" x2="235" y2="105" stroke="#CBD5E1" strokeWidth="2.5" strokeDasharray="6 6" />
            <path d="M 235 105 L 140 178" stroke="#94A3B8" strokeWidth="2.5" strokeDasharray="6 6" markerEnd="url(#sd-ricochet-arrow)" className="syn-ricochet-line" />

            {/* Surviving & Mutating Bacterial Colony */}
            <g className="syn-bacteria-group">
              {/* Mutating daughter cell */}
              <g className="syn-bacteria-daughter">
                <circle cx="360" cy="74" r="22" fill="#FCA5A5" stroke="#DC2626" strokeWidth="3.5" />
                <circle cx="362" cy="73" r="8" fill="#B91C1C" />
                {/* Mutation alert ring */}
                <circle cx="360" cy="74" r="28" fill="none" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 3" className="syn-mutation-halo" />
              </g>

              {/* Mother cell */}
              <g className="syn-bacteria-mother">
                <circle cx="315" cy="110" r="32" fill="#FECACA" stroke="#DC2626" strokeWidth="4" />
                <circle cx="318" cy="110" r="11" fill="#B91C1C" />
                {/* Surface antigens */}
                {[
                  [286, 100], [290, 126], [315, 144], [342, 128], [340, 94], [312, 76]
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="2.5" fill="#DC2626" opacity="0.6" />
                ))}
              </g>
            </g>

            {/* Defensive barrier shield */}
            <g className="syn-shield-group">
              <path d="M 235 72 L 260 82 V 104 C 260 124, 248 136, 235 144 C 222 136, 210 124, 210 104 V 82 Z" fill="url(#sd-shield-grad)" stroke="#991B1B" strokeWidth="2.5" strokeLinejoin="round" />
              <path d="M 235 76 L 255 84 V 102 C 255 119, 245 130, 235 137 C 225 130, 215 119, 215 102 V 84 Z" fill="url(#sd-shield-mesh)" />
              <path d="M 222 84 L 235 77" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
            </g>

            {/* Impact flash burst */}
            <g className="syn-impact-burst">
              <circle cx="235" cy="105" r="18" fill="none" stroke="#EF4444" strokeWidth="3" opacity="0.9" filter="url(#sd-glow-red)" />
              <path d="M 235 90 L 237 101 L 248 105 L 237 109 L 235 120 L 233 109 L 222 105 L 233 101 Z" fill="#F87171" opacity="0.9" />
            </g>

            {/* Traveling Synthetic Compound / Capsule */}
            <g className="syn-capsule-runner">
              {/* Propulsion wake lines */}
              <line x1="-34" y1="-4" x2="-18" y2="-4" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="-40" y1="0" x2="-20" y2="0" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
              <line x1="-34" y1="4" x2="-18" y2="4" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
              {/* Capsule body */}
              <rect x="-18" y="-9" width="36" height="18" rx="9" fill="url(#sd-pill-grad)" stroke="#94A3B8" strokeWidth="1.5" />
              <line x1="0" y1="-9" x2="0" y2="9" stroke="#94A3B8" strokeWidth="1.5" />
              <rect x="-13" y="-6" width="10" height="3" rx="1.5" fill="#FFFFFF" opacity="0.6" />
            </g>
          </svg>

          {/* Clean, centered footer status */}
          <div className="duel__footer">
            <div className="duel__footer-pill duel__footer-pill--bad">
              <span className="duel__footer-icon">✕</span>
              <span>{t("1 target · Rapid mutation & resistance")}</span>
            </div>
          </div>
        </div>

        {/* ========================================================
            CARD 2: Remevia synergy blend (Multi-Target Lysis)
           ======================================================== */}
        <div className="duel__card duel__card--blend">
          <div className="duel__top">
            <h3 className="duel__title">{t("Remevia synergy blend")}</h3>
            <span className="duel__chip duel__chip--good">
              <span className="duel__chip-dot"></span>
              {t("Multi-target")}
            </span>
          </div>

          <svg viewBox="0 0 460 210" role="img" aria-label={t("Several compounds acting on several targets")}>
            <defs>
              <radialGradient id="sd-agar-right" cx="40%" cy="40%" r="65%">
                <stop offset="0%" stopColor="#F0FDF4" />
                <stop offset="100%" stopColor="#DCFCE7" />
              </radialGradient>
              <filter id="sd-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <linearGradient id="sd-stream-a" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
              <linearGradient id="sd-stream-b" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#0284C7" />
              </linearGradient>
              <linearGradient id="sd-stream-c" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#4ADE80" />
                <stop offset="100%" stopColor="#15803D" />
              </linearGradient>
              <radialGradient id="sd-drop-a" cx="35%" cy="35%" r="70%">
                <stop offset="0%" stopColor="#93C5FD" />
                <stop offset="50%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </radialGradient>
              <radialGradient id="sd-drop-b" cx="35%" cy="35%" r="70%">
                <stop offset="0%" stopColor="#7DD3FC" />
                <stop offset="50%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#0369A1" />
              </radialGradient>
              <radialGradient id="sd-drop-c" cx="35%" cy="35%" r="70%">
                <stop offset="0%" stopColor="#86EFAC" />
                <stop offset="50%" stopColor="#22C55E" />
                <stop offset="100%" stopColor="#15803D" />
              </radialGradient>
              <marker id="sd-tip-a" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M 0 1 L 9 5 L 0 9 Z" fill="#1D4ED8" />
              </marker>
              <marker id="sd-tip-b" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M 0 1 L 9 5 L 0 9 Z" fill="#0284C7" />
              </marker>
              <marker id="sd-tip-c" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M 0 1 L 9 5 L 0 9 Z" fill="#15803D" />
              </marker>
            </defs>

            {/* Scientific observation chamber */}
            <BioChamber rimColor="#A7F3D0" agarFill="url(#sd-agar-right)" gridColor="#16A34A" />

            {/* Three Tri-Vector Synergy Streams */}
            {[
              { id: 'a', d: 'M 72 52 C 160 52, 230 76, 288 94', grad: 'url(#sd-stream-a)', tip: 'url(#sd-tip-a)', glow: '#3B82F6' },
              { id: 'b', d: 'M 72 105 C 150 105, 220 105, 282 105', grad: 'url(#sd-stream-b)', tip: 'url(#sd-tip-b)', glow: '#0284C7' },
              { id: 'c', d: 'M 72 158 C 160 158, 230 134, 288 116', grad: 'url(#sd-stream-c)', tip: 'url(#sd-tip-c)', glow: '#22C55E' },
            ].map(({ id, d, grad, tip, glow }) => (
              <g key={id} className={`syn-stream-group syn-stream-group--${id}`}>
                {/* Luminous glow underlayer */}
                <path d={d} stroke={glow} strokeWidth="10" strokeLinecap="round" fill="none" filter="url(#sd-glow)" opacity="0.32" />
                {/* Core gradient stream */}
                <path d={d} stroke={grad} strokeWidth="3.5" strokeLinecap="round" fill="none" markerEnd={tip} />
                {/* Continuous flowing laser dash */}
                <path d={d} stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" fill="none" className="syn-stream-core" />
                {/* Traveling photon bead */}
                <circle r="4.5" fill="#FFFFFF" stroke={glow} strokeWidth="2" filter="url(#sd-glow)">
                  <animateMotion
                    dur="3.5s"
                    repeatCount="indefinite"
                    path={d}
                  />
                </circle>
              </g>
            ))}

            {/* Target Pathogen & Synergistic Breakdown */}
            <g className="syn-pathogen-target">
              {/* Outer Membrane / Target Reticle */}
              <circle cx="325" cy="105" r="38" fill="none" strokeWidth="3.5" className="syn-target-reticle" />

              {/* Bacterial Cell Core (transitions red -> green) */}
              <circle cx="325" cy="105" r="16" className="syn-target-core" />

              {/* Fissure crack lines */}
              <path
                d="M 312 92 L 322 102 L 334 98 M 308 112 L 320 110 L 325 122 M 332 118 L 340 125"
                stroke="#064E3B"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                className="syn-target-cracks"
              />

              {/* Dispersing Shards */}
              <g className="syn-shards-group">
                {SHARDS.map((d, i) => (
                  <path key={i} d={d} fill={i % 2 === 0 ? '#22C55E' : '#10B981'} opacity="0.9" />
                ))}
              </g>

              {/* Dissolving micro-bubbles */}
              {BUBBLES.map(([cx, cy, r], i) => (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill={i % 3 === 0 ? '#86EFAC' : 'none'}
                  stroke="#22C55E"
                  strokeWidth="1.5"
                  className="syn-bubble-drifter"
                  style={{ animationDelay: `${(i % 4) * 0.12}s` }}
                />
              ))}
            </g>

            {/* Three Botanical Droplets (separated position and float to prevent disappearance) */}
            {[
              { id: 'a', y: 52, fill: 'url(#sd-drop-a)', glow: '#3B82F6' },
              { id: 'b', y: 105, fill: 'url(#sd-drop-b)', glow: '#0284C7' },
              { id: 'c', y: 158, fill: 'url(#sd-drop-c)', glow: '#22C55E' },
            ].map(({ id, y, fill, glow }) => (
              <g key={id} transform={`translate(56, ${y})`}>
                <g className={`syn-drop-bob syn-drop-bob--${id}`}>
                  {/* Droplet ambient glow */}
                  <path d="M 0 -18 C 8 -7 13 0 13 8 A 13 13 0 0 1 -13 8 C -13 0 -8 -7 0 -18 Z" fill={glow} filter="url(#sd-glow)" opacity="0.4" />
                  {/* 3D Liquid Drop */}
                  <path d="M 0 -18 C 8 -7 13 0 13 8 A 13 13 0 0 1 -13 8 C -13 0 -8 -7 0 -18 Z" fill={fill} />
                  {/* Specular curved gloss reflection */}
                  <path d="M -6 4 C -6 0 -3 -6 0 -11" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" fill="none" />
                  <circle cx="3" cy="11" r="2" fill="#FFFFFF" opacity="0.55" />
                </g>
              </g>
            ))}
          </svg>

          {/* Clean, centered footer status */}
          <div className="duel__footer">
            <div className="duel__footer-pill duel__footer-pill--good">
              <span className="duel__footer-icon">✓</span>
              <span>{t("Multiple targets · Hard to resist")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Simulation Trigger */}
      <div className="sduel__controls">
        <button type="button" className="sduel__replay-btn" onClick={() => setRun((n) => n + 1)}>
          <svg className="sduel__replay-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12a8 8 0 0 1 14.93-4M20 12a8 8 0 0 1-14.93 4M20 4v4h-4M4 20v-4h4" />
          </svg>
          <span>{t("Simulate microbial attack")}</span>
        </button>
      </div>
    </div>
  );
}
