import { ShoppingCart } from "lucide-react";
import HeaderItem from "./header-item";

const Header = () => {
  return (
    <header className="bg-bg-header text-txt-primary w-full py-4 px-5">
      <div className="justify-between flex">
        <h1 className="text-2xl font-bold">Header</h1>
        <ul className="flex gap-10 items-center font-medium">
          <HeaderItem text="Explorar" onClick={() => {}} />
          <HeaderItem text="Login" onClick={() => {}} />
          <HeaderItem text="Criar Conta" onClick={() => {}} />
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
