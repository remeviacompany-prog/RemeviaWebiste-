import './globals.css';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import EmailPopup from './components/EmailPopup';
import { LANGUAGES, LANG_KEY } from './i18n/languages';

// Runs before first paint: restores the saved language's direction and hides the
// page until its dictionary is ready, so returning visitors never see English first.
const restoreLanguage = `try{var l=localStorage.getItem(${JSON.stringify(LANG_KEY)}),a=${JSON.stringify(LANGUAGES.filter((x) => x.code !== 'en').map((x) => x.code))};if(a.indexOf(l)>-1){var d=document.documentElement;d.lang=l;d.dir=l==='ar'?'rtl':'ltr';d.setAttribute('data-i18n-pending','');setTimeout(function(){d.removeAttribute('data-i18n-pending')},3000)}}catch(e){}`;

export const metadata = {
  title: 'Remevia — Botanical alternatives to antibiotics for poultry & livestock',
  description: 'Plant-based feed and water additives that improve gut health, breathing, egg quality and skin for poultry and livestock, with no antibiotic residues. Made in Kerala, India.',
  icons: {
    icon: '/assets/img/mark.png',
  },
  openGraph: {
    title: 'Remevia — Botanical alternatives to antibiotics for poultry & livestock',
    description: 'Plant-based feed and water additives that improve gut health, breathing, egg quality and skin for poultry and livestock, with no antibiotic residues. Made in Kerala, India.',
    type: 'website',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: restoreLanguage }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Saira:wght@500;600;700&family=Figtree:wght@400;500;600&family=Noto+Sans+Devanagari:wght@400;600;700&family=Noto+Sans+Arabic:wght@400;600;700&family=Noto+Sans+Thai:wght@400;600;700&family=Noto+Sans:wght@400;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>
        <LanguageProvider>
          <Header />
          <main id="main">
            {children}
          </main>
          <Footer />
          <EmailPopup />
        </LanguageProvider>
      </body>
    </html>
  );
}
