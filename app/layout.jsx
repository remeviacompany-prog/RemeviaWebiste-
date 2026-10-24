import './globals.css';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';

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
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Saira:wght@500;600;700&family=Figtree:wght@400;500;600&family=Noto+Sans+Devanagari:wght@400;600;700&family=Noto+Sans+Arabic:wght@400;600;700&display=swap" 
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
        </LanguageProvider>
      </body>
    </html>
  );
}
