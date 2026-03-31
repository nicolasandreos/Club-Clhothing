import CategorySection from "../components/category-section";
import Header from "../components/header";
import { useUser } from "../contexts/user-context";
import { Navigate } from "react-router";

const HomePage = () => {
  const { user, loading } = useUser();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="w-screen h-screen flex flex-col">
      <Header />
      <CategorySection />
    </div>
  );
};

export default HomePage;
