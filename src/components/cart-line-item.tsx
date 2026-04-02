import { Minus, Plus, X } from "lucide-react";
import type { Cart } from "../../types/cart-type";
import { useCart } from "../contexts/cart-context";
import { formattedPrice } from "../lib/utils";

type CartLineItemProps = {
  item: Cart;
};

const CartLineItem = ({ item }: CartLineItemProps) => {
  const { addProductToCart, removeProductFromCart, decrementProductQuantity } =
    useCart();

  const { id, imageUrl, name, price, quantity } = item;
  const lineTotal = price * quantity;

  const productPayload = { id, imageUrl, name, price };

  return (
    <div className="relative flex gap-3 rounded-lg border border-gray-200 bg-white p-3 pr-10 shadow-sm">
      <button
        type="button"
        onClick={() => removeProductFromCart(id)}
        className="absolute right-2 top-2 rounded-full p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
        aria-label={`Remover ${name} do carrinho`}
      >
        <X className="size-4" />
      </button>

      <div className="relative aspect-square h-[88px] w-[88px] shrink-0 overflow-hidden rounded-lg bg-primary">
        <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5 pt-0.5">
        <p className="pr-6 text-sm font-medium leading-snug text-gray-900 line-clamp-2">
          {name}
        </p>
        <p className="text-sm font-semibold text-gray-800">
          {formattedPrice(lineTotal)}
        </p>

        <div className="mt-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => decrementProductQuantity(id)}
            className="flex size-8 items-center justify-center rounded-lg border border-gray-300 text-gray-700 transition-colors hover:bg-gray-50"
            aria-label="Diminuir quantidade"
          >
            <Minus className="size-4" />
          </button>
          <span className="min-w-6 text-center text-sm font-medium tabular-nums text-gray-900">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => addProductToCart(productPayload)}
            className="flex size-8 items-center justify-center rounded-lg border border-gray-300 text-gray-700 transition-colors hover:bg-gray-50"
            aria-label="Aumentar quantidade"
          >
            <Plus className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartLineItem;
