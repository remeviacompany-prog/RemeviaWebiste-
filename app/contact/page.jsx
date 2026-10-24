'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const ETYPE = {
  trial: { title: 'Tell us about your flock', btn: 'Request my free trial' },
  quote: { title: 'Request a quotation', btn: 'Send quote request' },
  distributor: { title: 'Distributor application', btn: 'Apply as a distributor' }
};

function ContactForm() {
  const searchParams = useSearchParams();
  const [etype, setEtype] = useState('trial');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    business: '',
    flock: '10,000 – 50,000',
    message: '',
    consent: false
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const qType = searchParams.get('type');
    if (qType && ETYPE[qType]) {
      setEtype(qType);
    }
    const qProduct = searchParams.get('product');
    if (qProduct && !selectedProducts.includes(qProduct)) {
      setSelectedProducts([qProduct]);
    }
  }, [searchParams]);

  const handleProductToggle = (prod) => {
    if (selectedProducts.includes(prod)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== prod));
    } else {
      setSelectedProducts([...selectedProducts, prod]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Enter your name.';
    if (!formData.company.trim()) newErrors.company = 'Enter your company name.';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Enter a phone number.';
    if (!formData.country.trim()) newErrors.country = 'Enter your country.';
    if (!formData.business) newErrors.business = 'Choose your business type.';
    if (!formData.consent) newErrors.consent = 'Please agree to the privacy policy.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSent(true);
  };

  const currentType = ETYPE[etype] || ETYPE.trial;

  return (
    <>
      <section className="phero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Contact</span>
          </nav>
          <h1>Let's grow healthier flocks together</h1>
          <p className="lede">
            Request a field trial, get a quote, or join our distributor network. We reply within one working day.
          </p>

          <div className="etypes" role="group" aria-label="Type of enquiry">
            <button
              className="etype"
              type="button"
              aria-pressed={etype === 'trial'}
              onClick={() => setEtype('trial')}
            >
              <b>Request a free trial</b>
              <span>Test a Remevia programme on your own flock with our technical support.</span>
            </button>
            <button
              className="etype"
              type="button"
              aria-pressed={etype === 'quote'}
              onClick={() => setEtype('quote')}
            >
              <b>Get a quote</b>
              <span>Pricing, datasheets and lead times for feed mills, integrators and farms.</span>
            </button>
            <button
              className="etype"
              type="button"
              aria-pressed={etype === 'distributor'}
              onClick={() => setEtype('distributor')}
            >
              <b>Become a distributor</b>
              <span>Represent Remevia in your country or region.</span>
            </button>
          </div>
        </div>
      </section>

      <section className="section" id="enquiry">
        <div className="wrap contact-grid">
          <form className={`form ${isSent ? 'is-sent' : ''}`} onSubmit={handleSubmit} noValidate>
            <h3>{currentType.title}</h3>
            <input type="hidden" name="type" value={etype} />

            <label className={`field ${errors.name ? 'has-error' : ''}`}>
              Full name *
              <input 
                name="name" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                autoComplete="name" 
              />
              {errors.name && <span className="err">{errors.name}</span>}
            </label>

            <label className={`field ${errors.company ? 'has-error' : ''}`}>
              Company name *
              <input 
                name="company" 
                required 
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                autoComplete="organization" 
              />
              {errors.company && <span className="err">{errors.company}</span>}
            </label>

            <label className={`field ${errors.email ? 'has-error' : ''}`}>
              Work email *
              <input 
                name="email" 
                type="email" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                autoComplete="email" 
              />
              {errors.email && <span className="err">{errors.email}</span>}
            </label>

            <label className={`field ${errors.phone ? 'has-error' : ''}`}>
              Phone / WhatsApp *
              <input 
                name="phone" 
                type="tel" 
                required 
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                autoComplete="tel" 
              />
              {errors.phone && <span className="err">{errors.phone}</span>}
            </label>

            <label className={`field ${errors.country ? 'has-error' : ''}`}>
              Country *
              <input 
                name="country" 
                required 
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                autoComplete="country-name" 
              />
              {errors.country && <span className="err">{errors.country}</span>}
            </label>

            <label className="field">
              State / city
              <input 
                name="city" 
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                autoComplete="address-level2" 
              />
            </label>

            <label className={`field ${errors.business ? 'has-error' : ''}`}>
              Business type *
              <select 
                name="business" 
                required
                value={formData.business}
                onChange={(e) => setFormData({ ...formData, business: e.target.value })}
              >
                <option value="">Choose one</option>
                <option>Poultry farm</option>
                <option>Integrator</option>
                <option>Feed mill</option>
                <option>Distributor</option>
                <option>Veterinarian</option>
                <option>Other</option>
              </select>
              {errors.business && <span className="err">{errors.business}</span>}
            </label>

            <label className="field">
              Flock size
              <select 
                name="flock"
                value={formData.flock}
                onChange={(e) => setFormData({ ...formData, flock: e.target.value })}
              >
                <option>Under 10,000 birds</option>
                <option>10,000 – 50,000</option>
                <option>50,000 – 200,000</option>
                <option>Over 200,000</option>
                <option>Not applicable</option>
              </select>
            </label>

            <fieldset className="full" style={{ border: 0, margin: 0, padding: 0 }}>
              <legend style={{ fontSize: '15px', fontWeight: 500, marginBottom: '10px' }}>
                Products of interest
              </legend>
              <div className="checks">
                {['TLTREAT', 'CURTECT-CRD', 'TLEGG', 'TLREPEAL', 'TL HEALER'].map((prod) => (
                  <label key={prod}>
                    <input 
                      type="checkbox" 
                      name="products" 
                      value={prod}
                      checked={selectedProducts.includes(prod)}
                      onChange={() => handleProductToggle(prod)}
                    />
                    {prod}
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="field full">
              Message
              <textarea 
                name="message" 
                placeholder="Your challenge, current programme or questions"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </label>

            <label className={`consent full ${errors.consent ? 'has-error' : ''}`}>
              <input 
                type="checkbox" 
                required
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
              />
              <span>I agree that Remevia may store my details and contact me about this enquiry, as described in the <a href="#">Privacy policy</a>.</span>
              {errors.consent && <span className="err">{errors.consent}</span>}
            </label>

            <button className="btn btn--grad full" type="submit">
              {currentType.btn}
            </button>

            {isSent && (
              <p className="form__ok" role="status">
                Thank you. Your enquiry was sent and our team will reply within one working day.
              </p>
            )}
          </form>

          <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="info">
              <h3>Contact us directly</h3>
              <div className="info__row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>
                </svg>
                <span>
                  Remevia Pvt. Ltd.<br />
                  Edakulam P.O, Irinjalakuda, Pin 680 688<br />
                  Thrissur Dist, Kerala, India
                </span>
              </div>
              <div className="info__row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>
                </svg>
                <a href="tel:+917994764845">+91 79947 64845</a>
              </div>
              <div className="info__row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>
                </svg>
                <a href="mailto:info@remevia.in">info@remevia.in</a>
              </div>
              <div className="info__row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>
                </svg>
                <span>Monday to Saturday, 9:00–18:00 IST</span>
              </div>
              <a className="btn btn--light" href="https://wa.me/917994764845" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 20l1.3-4.2A8.2 8.2 0 1 1 8.4 19z"/>
                  <path d="M9 8.5c0 3.4 3 6.5 6.5 6.5l1-1.6-2-1-1 1c-1.2-.4-2.5-1.7-2.9-2.9l1-1-1-2z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>

            <div className="map">
              <iframe
                title="Map of Remevia office in Irinjalakuda, Kerala"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Edakulam,+Irinjalakuda,+Kerala+680688&output=embed"
                style={{ border: 0, width: '100%', height: '280px' }}
              ></iframe>
            </div>
          </aside>
        </div>
      </section>

      {/* Distributor info */}
      <section className="section section--mist">
        <div className="wrap">
          <div className="head">
            <span className="kicker">Distributor programme</span>
            <h2>Become a Remevia partner in your region</h2>
            <p className="lede">We are building a global network of veterinary and feed-additive distributors.</p>
          </div>
          <div className="grid grid--3">
            <div className="card">
              <span className="card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 20h16M7 20V11M12 20V5M17 20v-6"/>
                </svg>
              </span>
              <h3>Growing demand</h3>
              <p>Producers everywhere are moving to antibiotic-free programmes, and buyers are asking for proof.</p>
            </div>
            <div className="card">
              <span className="card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 3v6a4 4 0 0 0 8 0V3"/><path d="M10 13v3a4 4 0 0 0 8 0v-2"/><circle cx="18" cy="12" r="2"/>
                </svg>
              </span>
              <h3>Technical support</h3>
              <p>Product training, field trial support and marketing material in your language.</p>
            </div>
            <div className="card">
              <span className="card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>
                </svg>
              </span>
              <h3>Export-ready range</h3>
              <p>Five products in feed, water and spray formats, in bulk packs for distribution.</p>
            </div>
          </div>
          <div className="btn-row" style={{ marginTop: '28px' }}>
            <button className="btn" onClick={() => { setEtype('distributor'); window.scrollTo({ top: 300, behavior: 'smooth' }); }}>
              Apply as a distributor
            </button>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section">
        <div className="wrap two-col">
          <h2>Common questions</h2>
          <div className="faq">
            <details open>
              <summary>Do you offer free trials?</summary>
              <p>Yes. Choose "Request a free trial" above and our technical team will plan a trial for your flock or feed mill.</p>
            </details>
            <details>
              <summary>Which products go in drinking water?</summary>
              <p>CURTECT-CRD and TLREPEAL are water soluble. TLTREAT and TLEGG are mixed into feed. TL HEALER is applied to the skin.</p>
            </details>
            <details>
              <summary>What pack sizes are available?</summary>
              <p>Liquids come in 5 kg and 20 kg HMHDPE bottles. Powders come in 50 kg PP woven laminated bags with an HMHDPE liner.</p>
            </details>
            <details>
              <summary>What is the minimum order quantity?</summary>
              <p>MOQ depends on whether products are shipped domestically or via export cargo. Contact our export desk for details.</p>
            </details>
            <details>
              <summary>Do you export to my country?</summary>
              <p>Remevia exports across the Middle East, Southeast Asia and South Asia with full export registration documentation.</p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="wrap" style={{ padding: '60px 0' }}>Loading contact page...</div>}>
      <ContactForm />
    </Suspense>
  );
}
