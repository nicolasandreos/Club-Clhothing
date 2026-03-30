import { createContext, useContext, useMemo, useState } from "react";
import type { UserType } from "../../types/user-type";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../integrations/firebase/initialize";

export interface UserContextInterface {
  user: UserType | null;
  loginUser: (user: UserType) => void;
  getUserByEmail: (email: string) => Promise<UserType | null>;
}

export const UserContext = createContext<UserContextInterface>({
  user: null,
  loginUser: () => {},
  getUserByEmail: () => Promise.resolve(null),
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  const loginUser = (user: UserType) => {
    setUser(user);
  };

  const getUserByEmail = async (email: string): Promise<UserType | null> => {
    const snapshot = await getDocs(
      query(collection(db, "user"), where("email", "==", email)),
    );
    return snapshot.docs.map((doc) => doc.data() as UserType)[0] || null;
  };

  const contextValue = useMemo(() => {
    return { user, loginUser, getUserByEmail };
  }, [user]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
