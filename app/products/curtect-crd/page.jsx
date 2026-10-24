import ProductDetailPage from '../../components/ProductDetailPage';
import { PRODUCTS_DATA } from '../../data/products';

export const metadata = {
  title: 'CURTECT-CRD — Respiratory Support for Poultry | Remevia',
  description: 'Water-soluble botanical blend of menthol, eucalyptus and rosemary oils. Relieves respiratory distress and post-vaccination stress within 24-48 hours.'
};

export default function CurtectCrdPage() {
  return <ProductDetailPage product={PRODUCTS_DATA['curtect-crd']} />;
}
