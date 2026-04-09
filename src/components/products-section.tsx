import type { ProductType } from "../../types/product-type";
import { cn } from "../lib/utils";
import ProductCard from "./product-card";

interface ProductsSectionProps {
  products: ProductType[];
  props?: {
    className?: string;
  };
}

const ProductsSection = ({ products, props }: ProductsSectionProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8",
        props?.className,
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsSection;
