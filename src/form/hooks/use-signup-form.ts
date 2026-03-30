import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupFormData } from "../schema/signup-shema";
import { useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../integrations/firebase/initialize";
import type { UserType } from "../../../types/user-type";
import { useNavigate } from "react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "sonner";
import { FirebaseError } from "firebase/app";

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

  const addUserToFirebaseAuthentication = async (newUser: UserType) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password,
      );
      return userCredential.user;
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/email-already-in-use":
            toast.error("Email já em uso");
            return null;
          case "auth/invalid-email":
            toast.error("Email inválido");
            return null;
          case "auth/weak-password":
            toast.error("Senha fraca");
            return null;
        }
        toast.error(
          "Erro ao criar usuário em Firebase Authentication: " + error.message,
        );
        return null;
      }
    }
  };

  const addUserToFireStore = async (newUser: UserType, userId: string) => {
    try {
      const docRef = await addDoc(collection(db, "user"), {
        userId: userId,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password,
      });
      console.log("Usuário criado com sucesso em Firestore: ", docRef.id);
    } catch (error) {
      toast.error("Erro ao criar usuário em Firestore: " + error);
      return null;
    }
  };

  const onSubmit = async (data: SignupFormData) => {
    const newUser: UserType = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim(),
      password: data.password.trim(),
    };

    const user = await addUserToFirebaseAuthentication(newUser);
    if (!user) {
      return;
    }

    await addUserToFireStore(newUser, user.uid);
    if (!user) {
      return;
    }

    toast.success("Usuário criado com sucesso");
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
