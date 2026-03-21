import { ShoppingCart } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-bg-header text-txt-primary w-full py-4 px-5">
      <div className="justify-between flex">
        <h1 className="text-2xl font-bold">Header</h1>
        <ul className="flex gap-10 items-center font-medium">
          <li>Explorar</li>
          <li>Login</li>
          <li>Criar Conta</li>
          <ShoppingCart />
        </ul>
      </div>
    </header>
  );
};

export default Header;
