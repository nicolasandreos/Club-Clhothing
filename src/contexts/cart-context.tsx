import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ProductType } from "../../types/product-type";
import type { Cart } from "../../types/cart-type";

interface CartContextType {
  products: Cart[];
  totalPrice: number;
  productsQuantity: number;
  addProductToCart: (product: ProductType) => void;
  removeProductFromCart: (productId: string) => void;
  decrementProductQuantity: (productId: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType>({
  products: [],
  totalPrice: 0,
  productsQuantity: 0,
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  decrementProductQuantity: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Cart[]>(() => {
    const products = localStorage.getItem("products");
    if (products) {
      return JSON.parse(products);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
    console.log("mudou");
  }, [products]);

  const productsQuantity = useMemo(() => {
    return products.reduce((acc, product) => acc + product.quantity, 0);
  }, [products]);

  const totalPrice = useMemo(() => {
    return products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0,
    );
  }, [products]);

  const addProductToCart = (product: ProductType) => {
    const hasProduct = products.some((p) => p.id === product.id);
    if (hasProduct) {
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
        ),
      );
    } else {
      setProducts((prevProducts) => [
        ...prevProducts,
        { ...product, quantity: 1 },
      ]);
    }
  };

  const removeProductFromCart = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((p) => p.id !== productId),
    );
  };

  const decrementProductQuantity = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts
        .map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity - 1 } : p,
        )
        .filter((p) => p.quantity > 0),
    );
  };

  const clearCart = () => {
    setProducts([]);
  };

  return (
    <CartContext.Provider
      value={{
        products,
        totalPrice,
        productsQuantity,
        addProductToCart,
        removeProductFromCart,
        decrementProductQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
