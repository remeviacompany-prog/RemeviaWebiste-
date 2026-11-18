import ProductDetailPage from '../../components/ProductDetailPage';
import { PRODUCTS_DATA } from '../../data/products';

export const metadata = {
  title: 'TLTREAT — Natural AGP Replacer | Remevia',
  description: 'Spice-based immune stimulant with ginger, turmeric, nutmeg and pepper extracts. Replaces antibiotic growth promoters in broiler and layer feed.'
};

export default function TlTreatPage() {
  return <ProductDetailPage product={PRODUCTS_DATA.tltreat} />;
}
