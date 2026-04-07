import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { CheckCircle, XCircle, Home } from "lucide-react";
import { useCart } from "../contexts/cart-context";

const PaymentConfirmationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const isSuccess = searchParams.get("success") === "true";
  const isCanceled = searchParams.get("canceled") === "true";

  useEffect(() => {
    if (isSuccess) {
      clearCart();
    }
  }, [isSuccess, clearCart]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-6 px-4">
      {isSuccess && (
        <>
          <CheckCircle className="w-20 h-20 text-green-500" />
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Pagamento confirmado!
            </h1>
            <p className="text-gray-500 mt-2">
              Sua compra foi realizada com sucesso. Obrigado!
            </p>
          </div>
        </>
      )}

      {isCanceled && (
        <>
          <XCircle className="w-20 h-20 text-red-500" />
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Pagamento não realizado
            </h1>
            <p className="text-gray-500 mt-2">
              Sua compra foi cancelada. Nenhum valor foi cobrado.
            </p>
          </div>
        </>
      )}

      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 bg-primary text-white font-medium py-3 px-6 rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
      >
        <Home className="w-5 h-5" />
        Voltar para a loja
      </button>
    </div>
  );
};

export default PaymentConfirmationPage;
