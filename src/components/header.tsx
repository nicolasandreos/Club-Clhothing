import { ShoppingCart } from "lucide-react";
import HeaderItem from "./header-item";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-primary text-secondary w-full py-4 px-5">
      <div className="justify-between flex">
        <h1 className="text-2xl font-bold" onClick={() => navigate("/")}>
          CLUB CLOTHING
        </h1>
        <ul className="flex gap-10 items-center font-medium">
          <HeaderItem text="Explorar" onClick={() => navigate("/explore")} />
          <HeaderItem
            text="Carrinho"
            onClick={() => {}}
            icon={<ShoppingCart />}
          />
        </ul>
      </div>
    </header>
  );
};

export default Header;
