import CategorySection from "../components/category-section";
import Header from "../components/header";

const HomePage = () => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Header />
      <CategorySection />
    </div>
  );
};

export default HomePage;
