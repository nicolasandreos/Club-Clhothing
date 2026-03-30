import { useEffect } from "react";
import CategorySection from "../components/category-section";
import Header from "../components/header";
import { useUser } from "../contexts/user-context";

const HomePage = () => {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  return (
    <div className="w-screen h-screen flex flex-col">
      <Header />
      <CategorySection />
    </div>
  );
};

export default HomePage;
