'use client';

import React from 'react';
import Link from 'next/link';
import PageHero from '../components/PageHero';
import SynergyDuel from '../components/SynergyDuel';
import { Icon } from '../components/icons';
import { useLanguage } from '../context/LanguageContext';

export default function SciencePage() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        scene="science"
        crumb={t("Science")}
        title={t("Backed by data. Powered by nature.")}
        lede={t("How we turn the molecules plants use to defend themselves into reliable, standardised solutions for poultry and livestock.")}
        facts={{
          title: t("Formula Facts"),
          sub: t("What goes into every Remevia blend"),
          rows: [
            { label: t("Source"), value: t("Essential oils, oleoresins & carotenoids") },
            { label: t("Action"), value: t("Multi-target") },
            { label: t("Resistance risk"), value: t("Low") },
            { label: t("Batch control"), value: t("Standardised") },
            { label: t("Antibiotic residues"), value: '0', highlight: true },
          ],
          foot: t("Actives include curcumin, menthol, carvacrol, thymol, lutein and vasicine."),
        }}
      />

      {/* Nature's defence */}
      <section className="section">
        <div className="wrap quote">
          <span className="quote__mark" aria-hidden="true"><Icon name="sprout" size={34} strokeWidth={1.7} /></span>
          <h2 className="quote__title">{t("Nature already makes the molecules")}</h2>
          <p>{t("Every living thing has natural enemies, and nature has already made the molecules to fight them. Plants use essential oils and oleoresins to protect themselves from bacteria, fungi and pests. We don't reinvent these molecules. We find them, purify them and put them to work.")}</p>
        </div>
      </section>

      {/* Bio-active Library */}
      <section className="section section--mist">
        <div className="wrap">
          <div className="head">
            <h2>{t("Our bio-active library")}</h2>
            <p className="lede">{t("The plant actives inside Remevia products, what they do, and where you will find them.")}</p>
          </div>
          <div className="library">
            <article className="ing">
              <h3>{t("Turmeric & curcumin")}</h3>
              <span className="ing__mol">{t("Curcuminoids")}</span>
              <p>{t("Anti-inflammatory, antioxidant and tissue-protective spice active.")}</p>
              <div className="ing__used">
                <Link className="t-treat" href="/products/tltreat">TLTREAT</Link>
                <Link className="t-eksit" href="/products/eksit-crd">EKSIT-CRD</Link>
                <Link className="t-healer" href="/products/tl-healer">TL HEALER</Link>
              </div>
            </article>

            <article className="ing">
              <h3>{t("Ginger & nutmeg")}</h3>
              <span className="ing__mol">{t("Gingerols, myristicin")}</span>
              <p>{t("Spice extracts that support digestion, gut immunity and FCR.")}</p>
              <div className="ing__used">
                <Link className="t-treat" href="/products/tltreat">TLTREAT</Link>
              </div>
            </article>

            <article className="ing">
              <h3>{t("Marigold")}</h3>
              <span className="ing__mol">{t("Lutein carotenoids")}</span>
              <p>{t("Fat-soluble pigments and antioxidants that colour the yolk and protect human eye cornea.")}</p>
              <div className="ing__used">
                <Link className="t-egg" href="/products/tlegg">TLEGG</Link>
              </div>
            </article>

            <article className="ing">
              <h3>{t("Menthol & 1,8-cineole")}</h3>
              <span className="ing__mol">{t("Menthol, 1,8-cineole")}</span>
              <p>{t("Open airways, loosen mucus and give a cooling effect in heat stress.")}</p>
              <div className="ing__used">
                <Link className="t-curtect" href="/products/curtect-crd">CURTECT-CRD</Link>
                <Link className="t-eksit" href="/products/eksit-crd">EKSIT-CRD</Link>
                <Link className="t-repeal" href="/products/tlrepeal">TLREPEAL</Link>
              </div>
            </article>

            <article className="ing">
              <h3>{t("Cinnamon & Oregano")}</h3>
              <span className="ing__mol">{t("Cinnamaldehyde, carvacrol, thymol")}</span>
              <p>{t("Direct cell membrane disruption against antibiotic-resistant Mycoplasma and CRD pathogens.")}</p>
              <div className="ing__used">
                <Link className="t-eksit" href="/products/eksit-crd">EKSIT-CRD</Link>
              </div>
            </article>

            <article className="ing">
              <h3>{t("Vasaka (Adhatoda vasica)")}</h3>
              <span className="ing__mol">{t("Vasicine & vasicinone")}</span>
              <p>{t("Clinically proven natural bronchodilator and secretolytic agent that liquefies bronchial mucus.")}</p>
              <div className="ing__used">
                <Link className="t-eksit" href="/products/eksit-crd">EKSIT-CRD</Link>
              </div>
            </article>

            <article className="ing">
              <h3>{t("Rosemary & terpenes")}</h3>
              <span className="ing__mol">{t("Alpha-pinene, limonene")}</span>
              <p>{t("Terpenes with antimicrobial, antioxidant and decongestant action.")}</p>
              <div className="ing__used">
                <Link className="t-curtect" href="/products/curtect-crd">CURTECT-CRD</Link>
                <Link className="t-repeal" href="/products/tlrepeal">TLREPEAL</Link>
              </div>
            </article>

            <article className="ing">
              <h3>{t("Basil & camphor")}</h3>
              <span className="ing__mol">{t("Estragole, camphor")}</span>
              <p>{t("Strong-smelling oils that repel mites through smell and contact.")}</p>
              <div className="ing__used">
                <Link className="t-repeal" href="/products/tlrepeal">TLREPEAL</Link>
              </div>
            </article>

            <article className="ing">
              <h3>{t("Neem & cedarwood")}</h3>
              <span className="ing__mol">{t("Azadirachtin, cedrol")}</span>
              <p>{t("Traditional antiseptic and insect-repellent oils for skin care.")}</p>
              <div className="ing__used">
                <Link className="t-healer" href="/products/tl-healer">TL HEALER</Link>
              </div>
            </article>

            <article className="ing">
              <h3>{t("Terpineol")}</h3>
              <span className="ing__mol">{t("Alpha-terpineol")}</span>
              <p>{t("Antimicrobial terpene alcohol that supports wound cleaning.")}</p>
              <div className="ing__used">
                <Link className="t-healer" href="/products/tl-healer">TL HEALER</Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Our R&D Process */}
      <section className="section section--dark">
        <div className="wrap">
          <div className="head">
            <span className="eyebrow eyebrow--light">{t("R&D Pipeline")}</span>
            <h2>{t("Our R&D process")}</h2>
            <p className="lede">{t("Four steps take a plant molecule from the field to a proven product.")}</p>
          </div>
          <ol className="process">
            <li>
              <span className="process__node"></span>
              <h3>{t("Identify")}</h3>
              <p>{t("Screen botanical compounds with known antimicrobial, anti-inflammatory and repellent properties.")}</p>
            </li>
            <li>
              <span className="process__node"></span>
              <h3>{t("Extract")}</h3>
              <p>{t("Isolate individual active molecules from each plant extract.")}</p>
            </li>
            <li>
              <span className="process__node"></span>
              <h3>{t("Formulate for synergy")}</h3>
              <p>{t("Combine molecules that hit a problem from several angles, lowering the chance of resistance.")}</p>
            </li>
            <li>
              <span className="process__node"></span>
              <h3>{t("Validate")}</h3>
              <p>{t("In-vivo, in-vitro and field flock trials back every claim with data.")}</p>
            </li>
          </ol>
        </div>
      </section>

      {/* Synergy Section */}
      <section className="section">
        <div className="wrap">
          <div className="head head--line">
            <h2>{t("One molecule can be beaten. A combination is much harder.")}</h2>
            <p className="lede">{t("Bacteria and pests adapt to a single mode of action. Blends that act on several targets at once give them far fewer ways out.")}</p>
          </div>
          <SynergyDuel />
          <div className="synergy">
            <div className="syn t-curtect">
              <div className="syn__head"><h3>CURTECT-CRD</h3><span>{t("6 actions")}</span></div>
              <div className="syn__body">
                <span>{t("Bronchodilator")}</span>
                <span>{t("Expectorant")}</span>
                <span>{t("Mucolytic")}</span>
                <span>{t("Decongestant")}</span>
                <span>{t("Anti-inflammatory")}</span>
                <span>{t("Antimicrobial & immune support")}</span>
              </div>
            </div>
            <div className="syn t-eksit">
              <div className="syn__head"><h3>EKSIT-CRD</h3><span>{t("6 modes against Mycoplasma")}</span></div>
              <div className="syn__body">
                <span>{t("Breaks Mycoplasma cell membranes")}</span>
                <span>{t("Blocks bacterial attachment")}</span>
                <span>{t("Bronchodilator")}</span>
                <span>{t("Mucolytic & expectorant")}</span>
                <span>{t("Anti-inflammatory")}</span>
                <span>{t("Antioxidant protection")}</span>
              </div>
            </div>
            <div className="syn t-repeal">
              <div className="syn__head"><h3>TLREPEAL</h3><span>{t("4 modes against mites")}</span></div>
              <div className="syn__body">
                <span>{t("Taste avoidance")}</span>
                <span>{t("Smell repellency")}</span>
                <span>{t("Contact toxicity")}</span>
                <span>{t("Vapour toxicity")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Control */}
      <section className="section qc" id="quality">
        <div className="wrap">
          <div className="qc__head">
            <div>
              <span className="eyebrow">{t("Quality control")}</span>
              <h2>{t("Consistent from batch to batch")}</h2>
            </div>
            <p className="lede">{t("Natural raw materials vary. Our quality process makes sure what reaches your farm does not.")}</p>
          </div>
          <ol className="qc__steps">
            {[
              ['leaf', 'Raw material checks', 'Every lot of spice, flower and oil is tested for identity and quality on arrival.', 'On arrival'],
              ['bottle', 'Standardised actives', 'Formulations are adjusted so active content stays within specification.', 'During production'],
              ['certificate', 'Batch QC & COA', 'Each batch is released with a certificate of analysis, available to buyers.', 'Before release'],
              ['package', 'Protective packing', 'HMHDPE bottles and lined laminated bags protect actives from light and moisture.', 'At packing'],
            ].map(([icon, title, text, when], i) => (
              <li key={title} className="qc__step">
                <div className="qc__top">
                  <span className="qc__icon"><Icon name={icon} size={24} /></span>
                  <span className="qc__num">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <span className="qc__when">{t(when)}</span>
                <h3>{t(title)}</h3>
                <p>{t(text)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

    </>
  );
}
