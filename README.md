# Remevia Website — Next.js Application

A modern, high-performance Next.js web application for **Remevia** (Botanical alternatives to antibiotics for poultry & livestock).

---

## Getting Started Locally

### 1. Install dependencies (if not already installed)
```bash
npm install
```

### 2. Start the local development server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 3. Build for production
```bash
npm run build
npm run start
```

---

## Project Structure

```
remevia-website/
├── app/
│   ├── components/
│   │   ├── Header.jsx           # Main navigation, mobile drawer, language switcher
│   │   ├── Footer.jsx           # Brand footer, newsletter, social links, legal
│   │   ├── ChallengeFinder.jsx  # Interactive farm challenge switcher
│   │   ├── DoseCalculator.jsx   # Interactive per-unit dosage calculator
│   │   ├── ProductDetailPage.jsx# Unified product page layout
│   │   └── CtaSection.jsx       # Free trial enquiry form with validation
│   ├── context/
│   │   └── LanguageContext.jsx  # Real-time EN / HI / AR (RTL) / VI / ES translations
│   ├── data/
│   │   └── products.js          # Structured data for all Remevia products
│   ├── products/
│   │   ├── page.jsx             # All products directory with interactive category filter
│   │   ├── tltreat/page.jsx     # TLTREAT AGP replacer
│   │   ├── curtect-crd/page.jsx # CURTECT-CRD respiratory support
│   │   ├── tlegg/page.jsx       # TLEGG yolk colour enhancer
│   │   ├── tlrepeal/page.jsx    # TLREPEAL avian red mite solution
│   │   └── tl-healer/page.jsx   # TL HEALER wounds & tick bites
│   ├── science/page.jsx         # Science, bio-active library, R&D & synergy
│   ├── about/page.jsx           # Story, mission, values, impact
│   ├── contact/page.jsx         # Contact form, distributor application, map
│   ├── globals.css              # Design tokens, typography & components
│   └── page.jsx                 # Remevia Homepage
├── public/
│   └── assets/                  # Brand logos, product images, favicons
├── next.config.mjs
└── package.json
```

---

## Routes

| Route | Page Description |
| --- | --- |
| `/` | Home (Hero, challenge finder, process, quality) |
| `/products` | Product directory with category filtering & dosing table |
| `/products/tltreat` & `/tltreat` | TLTREAT product details & dose calculator |
| `/products/curtect-crd` & `/curtect-crd` | CURTECT-CRD product details & dose calculator |
| `/products/tlegg` & `/tlegg` | TLEGG product details & dose calculator |
| `/products/tlrepeal` & `/tlrepeal` | TLREPEAL product details & dose calculator |
| `/products/tl-healer` & `/tl-healer` | TL HEALER product details & wound care guide |
| `/science` | Science, botanical library & synergy mechanisms |
| `/about` | About Remevia, mission & values |
| `/contact` | Contact, free trial request & distributor application |
