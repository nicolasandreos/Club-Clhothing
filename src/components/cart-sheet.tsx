import { X } from "lucide-react";
import Button from "./button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../contexts/cart-context";
import { useEffect } from "react";
import { formattedPrice } from "../lib/utils";

type CartSheetProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CartSheet = ({ isOpen, onClose }: CartSheetProps) => {
  const { products, totalPrice } = useCart();
  const hasProducts = products.length > 0;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
          style={{ top: "var(--header-height, 72px)" }}
        />
      )}

      <div
        className={`fixed right-0 bg-white z-50 w-full max-w-md shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          top: "var(--header-height, 72px)",
          height: "calc(100vh - var(--header-height, 72px))",
        }}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Seu Carrinho</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Fechar carrinho"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {hasProducts ? (
            <div>{/* Produtos serão exibidos aqui */}</div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">Seu carrinho está vazio</p>
            </div>
          )}
        </div>

        <div className="w-full px-6">
          <p className="text-xl font-semibold text-gray-900">
            Total: {formattedPrice(totalPrice)}
          </p>
        </div>

        <div className="p-6 border-t border-gray-200">
          <Button
            text="Finalizar Compra"
            icon={<ShoppingCart />}
            disabled={!hasProducts}
            onClick={() => {
              console.log("Finalizar compra");
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CartSheet;
