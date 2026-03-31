import type { ProductType } from "../../types/product-type";
import { formattedPrice } from "../lib/utils";

interface ProductCardProps {
  product: ProductType;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const formattedPriceValue = formattedPrice(product.price);

  return (
    <div className="flex w-full flex-col">
      <div className="relative w-full overflow-hidden rounded-lg bg-primary aspect-square">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="mt-[10px] flex w-full items-start justify-between gap-2 text-tertiary">
        <p className="truncate text-sm font-medium">{product.name}</p>
        <p className="text-sm font-medium">{formattedPriceValue}</p>
      </div>
    </div>
  );
};

export default ProductCard;
