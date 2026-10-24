import ProductDetailPage from '../../components/ProductDetailPage';
import { PRODUCTS_DATA } from '../../data/products';

export const metadata = {
  title: 'TL HEALER — Topical Wound & Fly-Repelling Spray | Remevia',
  description: 'Botanical antiseptic and fly-repelling spray formulated with cedarwood, neem, curcumin and terpineol for livestock and poultry.'
};

export default function TlHealerPage() {
  return <ProductDetailPage product={PRODUCTS_DATA['tl-healer']} />;
}
