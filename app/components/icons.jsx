import React from 'react';
import {
  ArrowRight, Award, Bandage, Bird, Bug, CircleCheck, Clock, Coins, Crosshair, Download, Droplets, Egg, Eye,
  FileCheck2, FileText, FlaskConical, Germ, HeartPlus, HeartPulse, House, Layers, Leaf, Package, RefreshCw, Scale,
  ShieldCheck, ShieldPlus, SprayCan, Sprout, Star, Globe, MapPin, Phone, Mail, MessageCircle, FlaskRound, Microscope, Handshake, Users, Copy, Syringe, ThermometerSnowflake, Timer, TrendingUp, Trophy, Wind,
} from 'lucide-react';

// Product-page icons come from Lucide (lucide.dev, ISC licence). Lucide has no lungs or
// intestine, so those two are drawn here in the same 24 px line style.
const Lungs = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 3v8.5" /><path d="M12 11.5c-.8 1.4-2 2.1-3.5 2.3M12 11.5c.8 1.4 2 2.1 3.5 2.3" />
    <path d="M8.6 6.5C5.8 6.5 3.5 10.6 3.5 15.4c0 2.6 1.2 4.1 3.2 4.1 2.6 0 3.8-1.6 3.8-4.3V8.4a1.9 1.9 0 0 0-1.9-1.9z" />
    <path d="M15.4 6.5c2.8 0 5.1 4.1 5.1 8.9 0 2.6-1.2 4.1-3.2 4.1-2.6 0-3.8-1.6-3.8-4.3V8.4a1.9 1.9 0 0 1 1.9-1.9z" />
  </svg>
);
const Gut = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M8 3.5h7.5a3.25 3.25 0 0 1 0 6.5h-7a3.25 3.25 0 0 0 0 6.5H16a3 3 0 0 1 3 3V21" /><path d="M8 3.5A3 3 0 0 0 5 6.5" />
  </svg>
);

const ICONS = {
  shield: ShieldCheck, antioxidant: ShieldPlus, microbe: Germ, growth: TrendingUp, award: Trophy, leaf: Leaf,
  lungs: Lungs, gut: Gut, syringe: Syringe, wind: Wind, drop: Droplets, cool: ThermometerSnowflake, pulse: HeartPulse,
  bug: Bug, egg: Egg, eye: Eye, coins: Coins, clock: Timer, star: Star, soothe: HeartPlus, spray: SprayCan,
  bandage: Bandage, house: House, layers: Layers, cycle: RefreshCw, bird: Bird, target: Crosshair, scale: Scale,
  package: Package, bottle: FlaskConical, check: CircleCheck, medal: Award, time: Clock, arrow: ArrowRight,
  download: Download, file: FileText, certificate: FileCheck2, sprout: Sprout, globe: Globe, pin: MapPin,
  phone: Phone, mail: Mail, chat: MessageCircle, lab: Microscope, flask: FlaskRound, handshake: Handshake, users: Users, copy: Copy,
};

export function Icon({ name, size = 24, strokeWidth = 1.8, ...props }) {
  const Glyph = ICONS[name] || CircleCheck;
  return <Glyph width={size} height={size} strokeWidth={strokeWidth} aria-hidden="true" focusable="false" {...props} />;
}

// Picks an icon from the meaning of an English benefit or mechanism line. First match wins.
const RULES = [
  [/vaccin/i, 'syringe'],
  [/cornea|\beye\b/i, 'eye'],
  [/cost|saving/i, 'coins'],
  [/premium|brand/i, 'star'],
  [/breeding|oviposition|molting/i, 'cycle'],
  [/disinfect/i, 'microbe'],
  [/maggot/i, 'bug'],
  [/\bmite|fly\b|flies|blowfl|insect|tick/i, 'bug'],
  [/antioxid/i, 'antioxidant'],
  [/inflamm|sooth|nf-κb|pain/i, 'soothe'],
  [/yolk|egg|follic|vitelline|ovari/i, 'egg'],
  [/cool|heat|thermal/i, 'cool'],
  [/mucus|mucolytic|exudate|secretolytic/i, 'drop'],
  [/cilia/i, 'wind'],
  [/oxygen|gasping/i, 'pulse'],
  [/dust|environmental/i, 'wind'],
  [/respirat|bronch|air passage|tidal|pulmon|air sac/i, 'lungs'],
  [/wound|regenerat|collagen|vascular|granulat/i, 'bandage'],
  [/spray|nest/i, 'spray'],
  [/drinking water|water mode/i, 'drop'],
  [/film|barrier/i, 'layers'],
  [/crevice|housing/i, 'house'],
  [/residual|long-lasting|long-term|stabilit/i, 'clock'],
  [/stress|cannibal|pecking/i, 'bird'],
  [/antisept|antimicrob|pathogen|bacteri|mycoplasma|e\. coli|coccid|lysis/i, 'microbe'],
  [/immun|protect|prevent|disease/i, 'shield'],
  [/gut|intestin|villus|absorpt|bioavail/i, 'gut'],
  [/fcr|meat|growth/i, 'growth'],
  [/outperform|agp|curative/i, 'award'],
  [/residue|natural|withdrawal|safe|clean/i, 'leaf'],
  [/sensory|olfactory|gustatory|deterr|attachment|receptor/i, 'target'],
];

export const iconFor = (text = '') => (RULES.find(([re]) => re.test(text)) || [null, 'check'])[1];

// Icons for the facts strip, keyed by the English fact label.
export const factIcon = (label, liquid) => ({
  Format: liquid ? 'bottle' : 'package',
  Species: 'bird',
  Dose: 'scale',
  Speed: 'clock',
  'Field claim': 'growth',
  Target: 'target',
  Cycle: 'cycle',
  Internal: 'drop',
  External: 'spray',
  Use: 'spray',
  Feature: 'bug',
  Source: 'leaf',
  Packing: 'package',
}[label] || 'check');
