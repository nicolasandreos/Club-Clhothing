import { FaGoogle } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import Button from "../components/button";
import Input from "../components/input/input";
import { useLoginForm } from "../form/hooks/use-login-form";
import { Link } from "react-router";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    handleGoogleLogin,
  } = useLoginForm();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm px-6">
        <h1 className="text-2xl font-bold text-black text-center mb-8">
          Bem-vindo de volta
        </h1>

        <Button
          text="Entrar com o Google"
          icon={<FaGoogle size={18} />}
          onClick={handleGoogleLogin}
        />

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200" />
          <p className="text-sm text-black">ou entre com o seu e-mail</p>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="seu@email.com"
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            id="password"
            label="Senha"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password")}
          />

          <Button
            text="Entrar"
            icon={<FiLogIn size={18} />}
            type="submit"
            disabled={isSubmitting}
          />
        </form>

        <p className="text-sm flex items-center gap-1 justify-center text-black text-center mt-4">
          Não tem uma conta?{" "}
          <Link className="text-primary hover:underline" to="/signup">
            Crie uma conta
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
