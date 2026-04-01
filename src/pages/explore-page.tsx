import { useEffect, useState } from "react";
import type { CategoryType } from "../../types/category-type";
import Header from "../components/header";
import { db } from "../integrations/firebase/initialize";
import { collection, getDocs } from "firebase/firestore";
import ProductsSection from "../components/products-section";
import { capitalizeFirstLetter } from "../lib/utils";

const ExplorePage = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesRef = collection(db, "categories");
      const categoriesSnapshot = await getDocs(categoriesRef);
      const categoriesData = categoriesSnapshot.docs.map(
        (doc) => doc.data() as CategoryType,
      );
      setCategories(categoriesData);
    };
    fetchCategories();
  }, [categories]);

  return (
    <>
      <Header />
      <div className="w-full h-full py-5 px-10">
        {categories.map((category) => (
          <div className="flex flex-col gap-2" key={category.id}>
            <h2 className="text-tertiary font-semibold text-xl">
              {capitalizeFirstLetter(category.name)}
            </h2>
            <ProductsSection
              products={category.products || []}
              props={{ className: "mb-10" }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ExplorePage;
