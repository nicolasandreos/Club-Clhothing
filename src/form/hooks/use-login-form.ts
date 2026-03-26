import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "../schema/login-schema";

export const useLoginForm = () => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
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
