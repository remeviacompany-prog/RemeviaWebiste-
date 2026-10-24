import ProductDetailPage from '../../components/ProductDetailPage';
import { PRODUCTS_DATA } from '../../data/products';

export const metadata = {
  title: 'TLREPEAL — Avian Red Mite Botanical Solution | Remevia',
  description: 'Natural solution against poultry red mites (Dermanyssus gallinae) for use in drinking water and house spraying without chemical residues.'
};

export default function TlRepealPage() {
  return <ProductDetailPage product={PRODUCTS_DATA.tlrepeal} />;
}
