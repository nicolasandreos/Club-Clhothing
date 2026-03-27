import z from "zod";

export const signupSchema = z
  .object({
    firstName: z.string().min(2, "O nome é obrigatório."),
    lastName: z.string().min(2, "O sobrenome é obrigatório."),
    email: z
      .string()
      .min(1, "O e-mail é obrigatório.")
      .email("Insira um e-mail válido."),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
    confirmPassword: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não coincidem.",
  });

export type SignupFormData = z.infer<typeof signupSchema>;
