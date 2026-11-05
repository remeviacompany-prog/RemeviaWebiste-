import ProductDetailPage from '../../components/ProductDetailPage';
import { PRODUCTS_DATA } from '../../data/products';

export const metadata = {
  title: 'EKSIT-CRD — Natural Anti-Mycoplasma CRD Solution | Remevia',
  description: 'Natural molecule synergy of Cinnamon, Curcuminoids, Eucalyptus, Mint, Oregano and Vasaka against Mycoplasma Gallisepticum and Chronic Respiratory Disease.'
};

export default function EksitCrdPage() {
  return <ProductDetailPage product={PRODUCTS_DATA['eksit-crd']} />;
}

