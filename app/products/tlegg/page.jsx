import ProductDetailPage from '../../components/ProductDetailPage';
import { PRODUCTS_DATA } from '../../data/products';

export const metadata = {
  title: 'TLEGG — Natural Egg Yolk Colour Enhancer | Remevia',
  description: 'Standardised marigold carotenoid powder that delivers rich orange-yellow yolks naturally on broiler breeder and commercial layer farms.'
};

export default function TlEggPage() {
  return <ProductDetailPage product={PRODUCTS_DATA.tlegg} />;
}
