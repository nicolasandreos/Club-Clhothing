import CategorySection from "./components/category-section";
import Header from "./components/header";

const App = () => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Header />
      <CategorySection />
    </div>
  );
};

export default App;
