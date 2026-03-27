import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "../schema/login-schema";
import { signInWithEmailAndPassword, type UserCredential } from "firebase/auth";
import { auth } from "../../integrations/firebase/initialize";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useLoginForm = () => {
  const navigate = useNavigate();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    const loginFormData = {
      email: data.email,
      password: data.password,
    };

    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        loginFormData.email,
        loginFormData.password,
      );
      toast.success(
        "Usuário logado com sucesso no email: " + userCredential.user.email,
      );
      navigate("/");
      return userCredential.user;
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.log(error.code);
        switch (error.code) {
          case "auth/invalid-credential":
            toast.error("Credenciais inválidas");
            return null;
          case "auth/wrong-password":
            toast.error("Senha inválida");
            return null;
          case "auth/user-not-found":
            toast.error("Usuário não encontrado");
            return null;
          case "auth/user-disabled":
            toast.error("Usuário desativado");
            return null;
          case "auth/too-many-requests":
            toast.error("Muitas requisições. Tente novamente mais tarde");
            return null;
        }
        toast.error("Erro ao logar usuário: " + error.message);
        return null;
      }
    }
  };

  const handleGoogleLogin = () => {
    console.log("Login com Google");
  };

  return {
    register: form.register,
    handleSubmit: form.handleSubmit,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    onSubmit,
    handleGoogleLogin,
  };
};
