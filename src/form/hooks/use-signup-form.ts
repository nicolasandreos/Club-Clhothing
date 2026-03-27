import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupFormData } from "../schema/signup-shema";
import { useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../integrations/firebase/initialize";
import type { UserType } from "../../../types/user-type";
import { useNavigate } from "react-router";

export const useSignupForm = () => {
  const navigate = useNavigate();
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const addUserToFireStore = async (newUser: UserType) => {
    try {
      const docRef = await addDoc(collection(db, "user"), {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password,
      });
      console.log("Usuário criado com sucesso: ", docRef.id);
    } catch (error) {
      console.error("Erro ao criar usuário: ", error);
    }
  };

  const onSubmit = async (data: SignupFormData) => {
    const newUser: UserType = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim(),
      password: data.password.trim(),
    };

    await addUserToFireStore(newUser);
    form.reset();
    navigate("/");
  };

  return {
    register: form.register,
    handleSubmit: form.handleSubmit,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    onSubmit,
  };
};
