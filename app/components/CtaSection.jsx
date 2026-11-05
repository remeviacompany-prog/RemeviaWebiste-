'use client';

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function CtaSection({ defaultProduct = '' }) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    business: 'Poultry farm',
    consent: false
  });
  const [errors, setErrors] = useState({});
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Enter your name.';
    if (!formData.company.trim()) newErrors.company = 'Enter your company name.';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!formData.country.trim()) newErrors.country = 'Enter your country.';
    if (!formData.consent) newErrors.consent = 'Please agree to the privacy policy.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSent(true);
  };

  return (
    <section className="cta section">
      <div className="wrap">
        <div className="cta__copy">
          <h2>{t("Ready to go antibiotic-free?")}</h2>
          <p className="lede">{t("Tell us about your operation. A Remevia expert will recommend a programme and set up a field trial on your farm or feed mill.")}</p>
          <div className="cta__contact">
            <a href="https://wa.me/917994764845" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 20l1.3-4.2A8.2 8.2 0 1 1 8.4 19z"/>
                <path d="M9 8.5c0 3.4 3 6.5 6.5 6.5l1-1.6-2-1-1 1c-1.2-.4-2.5-1.7-2.9-2.9l1-1-1-2z"/>
              </svg>
              WhatsApp +91 79947 64845
            </a>
            <a href="mailto:info@remevia.in">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2"/>
                <path d="M3 7l9 6 9-6"/>
              </svg>
              info@remevia.in
            </a>
            <a href="/contact?type=distributor">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z"/>
                <circle cx="7" cy="18" r="2"/>
                <circle cx="17" cy="18" r="2"/>
              </svg>{t("Apply to become a distributor")}</a>
          </div>
        </div>

        <form className={`form ${isSent ? 'is-sent' : ''}`} onSubmit={handleSubmit} noValidate>
          <h3>{t("Request a free trial")}</h3>
          
          <label className={`field ${errors.name ? 'has-error' : ''}`}>{t("Full name *")}<input 
              name="name" 
              required 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              autoComplete="name" 
            />
            {errors.name && <span className="err">{t(errors.name)}</span>}
          </label>

          <label className={`field ${errors.company ? 'has-error' : ''}`}>{t("Company *")}<input 
              name="company" 
              required 
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              autoComplete="organization" 
            />
            {errors.company && <span className="err">{t(errors.company)}</span>}
          </label>

          <label className={`field ${errors.email ? 'has-error' : ''}`}>{t("Work email *")}<input 
              name="email" 
              type="email" 
              required 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              autoComplete="email" 
            />
            {errors.email && <span className="err">{t(errors.email)}</span>}
          </label>

          <label className="field">{t("Phone / WhatsApp")}<input 
              name="phone" 
              type="tel" 
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              autoComplete="tel" 
            />
          </label>

          <label className={`field ${errors.country ? 'has-error' : ''}`}>{t("Country *")}<input 
              name="country" 
              required 
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              autoComplete="country-name" 
            />
            {errors.country && <span className="err">{t(errors.country)}</span>}
          </label>

          <label className="field">{t("Business type")}<select 
              name="business"
              value={formData.business}
              onChange={(e) => setFormData({ ...formData, business: e.target.value })}
            >
              <option value="Poultry farm">{t("Poultry farm")}</option>
              <option value="Integrator">{t("Integrator")}</option>
              <option value="Feed mill">{t("Feed mill")}</option>
              <option value="Distributor">{t("Distributor")}</option>
              <option value="Veterinarian">{t("Veterinarian")}</option>
              <option value="Other">{t("Other")}</option>
            </select>
          </label>

          <input type="hidden" name="product" value={defaultProduct} />

          <label className={`consent full ${errors.consent ? 'has-error' : ''}`}>
            <input 
              type="checkbox" 
              required 
              checked={formData.consent}
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
            />
            <span>{t("I agree that Remevia may contact me about this enquiry.")}{' '}<a href="#">{t("Privacy policy")}</a></span>
          </label>

          <button className="btn btn--grad full" type="submit">
            {t("Send enquiry")}
          </button>

          {isSent && (
            <p className="form__ok" role="status">{t("Thank you. Your enquiry was sent and our team will reply within one working day.")}</p>
          )}
        </form>
      </div>
    </section>
  );
}
