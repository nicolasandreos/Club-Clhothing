import type { ProductType } from "../../types/product-type";
import ProductCard from "./product-card";

interface ProductsSectionProps {
  products: ProductType[];
}

const ProductsSection = ({ products }: ProductsSectionProps) => {
  return (
    <div className="grid grid-cols-4 gap-8 mt-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsSection;
