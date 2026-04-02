import { ShoppingCart } from "lucide-react";
import HeaderItem from "./header-item";
import { useNavigate } from "react-router";
import { useUser } from "../contexts/user-context";
import { useState } from "react";
import CartSheet from "./cart-sheet";

const Header = () => {
  const navigate = useNavigate();
  const { signOutUser } = useUser();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="bg-primary text-secondary w-full py-4 px-5">
        <div className="justify-between flex">
          <h1 className="text-2xl font-bold" onClick={() => navigate("/")}>
            CLUB CLOTHING
          </h1>
          <ul className="flex gap-10 items-center font-medium">
            <HeaderItem text="Sair" onClick={() => signOutUser()} />
            <HeaderItem text="Explorar" onClick={() => navigate("/explore")} />
            <HeaderItem
              text="Carrinho"
              onClick={() => setIsCartOpen(true)}
              icon={<ShoppingCart />}
            />
          </ul>
        </div>
      </header>

      <CartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
