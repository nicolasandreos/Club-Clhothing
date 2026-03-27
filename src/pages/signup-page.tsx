import { FiLogIn } from "react-icons/fi";
import Input from "../components/input";
import { useSignupForm } from "../form/hooks/use-signup-form";
import Button from "../components/button";

const SignupPage = () => {
  const { register, handleSubmit, errors, isSubmitting, onSubmit } =
    useSignupForm();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm px-6">
        <h1 className="text-2xl font-bold text-black text-center mb-8">
          Crie sua conta
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            id="firstName"
            label="Nome"
            type="text"
            placeholder="Digite seu nome"
            error={errors.firstName?.message}
            {...register("firstName")}
          />

          <Input
            id="lastName"
            label="Sobrenome"
            type="text"
            placeholder="Digite seu sobrenome"
            error={errors.lastName?.message}
            {...register("lastName")}
          />

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

          <Input
            id="confirmPassword"
            label="Confirmar senha"
            type="password"
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          <Button
            text="Criar conta"
            icon={<FiLogIn size={18} />}
            type="submit"
            disabled={isSubmitting}
          />
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
