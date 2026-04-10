import { useCart } from "../contexts/cart-context";
import CartLineItem from "../components/cart-line-item";
import Header from "../components/header/header";
import { formattedPrice } from "../lib/utils";
import { ShoppingCart } from "lucide-react";
import Button from "../components/button";
import axios from "axios";

const CheckoutPage = () => {
  const { products, totalPrice } = useCart();

  const handleCheckout = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-checkout-session`,
        { products },
      );
      window.location.href = data.url;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <div className="w-full flex flex-col items-center py-6 px-4 sm:py-8">
        <h2 className="text-xl sm:text-2xl font-bold">Checkout</h2>
        <div className="w-full max-w-2xl mt-4 sm:mt-6">
          <div className="flex flex-col gap-3 overflow-y-auto max-h-[60vh] sm:max-h-[500px]">
            {products.map((item) => (
              <CartLineItem key={item.id} item={item} />
            ))}
          </div>
          <div className="w-full">
            <p className="text-lg sm:text-xl font-semibold text-gray-900 py-5 sm:py-6">
              Total: {formattedPrice(totalPrice)}
            </p>
          </div>

          <div className="pb-6 border-t border-gray-200 pt-4">
            <Button
              text="Finalizar Compra"
              icon={<ShoppingCart />}
              onClick={() => {
                handleCheckout();
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
