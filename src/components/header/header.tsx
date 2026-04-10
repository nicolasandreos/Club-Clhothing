import { useNavigate } from "react-router";
import { useUser } from "../../contexts/user-context";
import { useState } from "react";
import HeaderItem from "../header-item";
import { ShoppingCart } from "lucide-react";
import CartSheet from "../cart-sheet";

const Header = () => {
  const navigate = useNavigate();
  const { signOutUser } = useUser();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="bg-primary text-secondary w-full py-4 px-4 sm:px-5">
        <div className="justify-between flex items-center">
          <h1
            className="text-lg sm:text-2xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            CLUB CLOTHING
          </h1>
          <ul className="flex gap-4 sm:gap-8 md:gap-10 items-center font-medium text-sm sm:text-base">
            <HeaderItem text="Sair" onClick={() => signOutUser()} />
            <HeaderItem text="Explorar" onClick={() => navigate("/explore")} />
            <HeaderItem
              text="Carrinho"
              onClick={() => setIsCartOpen(true)}
              icon={<ShoppingCart className="size-4 sm:size-5" />}
            />
          </ul>
        </div>
      </header>

      <CartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
