import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { UserType } from "../../types/user-type";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../integrations/firebase/initialize";
import { onAuthStateChanged } from "firebase/auth";

export interface UserContextInterface {
  user: UserType | null;
  loading: boolean;
  loginUser: (user: UserType) => void;
  getUserByEmail: (email: string) => Promise<UserType | null>;
}

export const UserContext = createContext<UserContextInterface>({
  user: null,
  loading: true,
  loginUser: () => {},
  getUserByEmail: () => Promise.resolve(null),
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  const loginUser = (user: UserType) => {
    setUser(user);
  };

  const getUserByEmail = async (email: string): Promise<UserType | null> => {
    const snapshot = await getDocs(
      query(collection(db, "user"), where("email", "==", email)),
    );
    return snapshot.docs.map((doc) => doc.data() as UserType)[0] || null;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser?.email) {
        const dbUser = await getUserByEmail(firebaseUser.email);
        setUser(dbUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const contextValue = useMemo(() => {
    return { user, loading, loginUser, getUserByEmail };
  }, [user, loading]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
