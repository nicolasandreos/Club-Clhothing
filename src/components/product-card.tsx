import type { ProductType } from "../../types/product-type";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../contexts/cart-context";
import { formattedPrice } from "../lib/utils";

interface ProductCardProps {
  product: ProductType;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const formattedPriceValue = formattedPrice(product.price);
  const { addProductToCart } = useCart();

  const handleAddProductToCart = () => {
    addProductToCart(product);
  };

  return (
    <div className="flex w-full flex-col">
      <div className="group relative aspect-square w-full overflow-hidden rounded-lg bg-primary">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
          <button
            type="button"
            onClick={handleAddProductToCart}
            className="pointer-events-auto flex items-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-medium text-primary shadow-md transition-opacity hover:opacity-90"
          >
            <ShoppingCart className="size-4 shrink-0" aria-hidden />
            Adicionar ao carrinho
          </button>
        </div>
      </div>
      <div className="mt-[10px] flex w-full items-start justify-between gap-2 text-tertiary">
        <p className="truncate text-sm font-medium">{product.name}</p>
        <p className="text-sm font-medium">{formattedPriceValue}</p>
      </div>
    </div>
  );
};

export default ProductCard;
