import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "../schema/login-schema";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  type UserCredential,
} from "firebase/auth";
import { auth, googleProvider } from "../../integrations/firebase/initialize";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useUser } from "../../contexts/user-context";
import type { UserType } from "../../../types/user-type";
import { addUserToFireStore } from "./use-signup-form";
import { v4 as uuidv4 } from "uuid";

export const useLoginForm = () => {
  const navigate = useNavigate();
  const { getUserByEmail, loginUser } = useUser();
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
      const user = await getUserByEmail(userCredential.user.email || "");
      if (user) {
        loginUser(user);
        navigate("/");
        return;
      }
      toast.error("Usuário não encontrado");
      return;
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
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
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        toast.success(
          "Usuário logado com sucesso com Google: " + result.user.email,
        );
        console.log(result);
        const user = await getUserByEmail(result.user.email || "");
        if (!user) {
          const newUser: UserType = {
            firstName: result.user.displayName?.split(" ")[0] || "",
            lastName: result.user.displayName?.split(" ")[1] || "",
            email: result.user.email || "",
            password: "",
          };

          const user = await addUserToFireStore(newUser, uuidv4() || "");
          if (!user) {
            return null;
          }
          loginUser(user);
          navigate("/");
          return user;
        }
        loginUser(user);
        navigate("/");
        return result.user;
      })
      .catch((error) => {
        toast.error("Erro ao logar usuário com Google: " + error.message);
        return null;
      });
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
