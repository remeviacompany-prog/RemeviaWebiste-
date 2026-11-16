'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';

// The original credo and vision cards, shared by the home page and the About page.
export default function MissionVision() {
  const { t } = useLanguage();
  return (
    <div className="mv">
      <div className="mv__m">
        <small>{t("Our credo")}</small>
        <p style={{ fontStyle: 'italic', fontWeight: 600 }}>{t("“Nature Provides the Molecules. Remevia Finds the Formulation.”")}</p>
      </div>
      <div className="mv__v">
        <small>{t("Our vision")}</small>
        <p>{t("A world where livestock thrive, farmers prosper and every family eats residue-free food.")}</p>
      </div>
    </div>
  );
}
