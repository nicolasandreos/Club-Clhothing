import { useParams } from "react-router";
import Header from "../components/header";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../integrations/firebase/initialize";
import type { CategoryType } from "../../types/category-type";
import { ChevronLeft } from "lucide-react";
import { capitalizeFirstLetter } from "../lib/utils";
import { useNavigate } from "react-router";
import ProductsSection from "../components/products-section";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState<CategoryType | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategory = async () => {
      const categoryRef = collection(db, "categories");
      const categorySnapshot = await getDocs(categoryRef);
      const categoryData = categorySnapshot.docs.map(
        (doc) => doc.data() as CategoryType,
      );
      setCategory(
        categoryData.find((category) => category.id === categoryId) || null,
      );
    };
    fetchCategory();
  }, [categoryId]);

  return (
    <>
      <Header />
      <div className="w-full h-full py-5 px-10">
        <div className="flex items-center gap-1 w-full mb-8">
          <ChevronLeft
            onClick={() => navigate(-1)}
            className="text-2xl cursor-pointer hover:bg-secondary"
          />
          {category && (
            <div>
              <h1 className="text-tertiary font-semibold text-xl">
                {capitalizeFirstLetter(category.name)}
              </h1>
            </div>
          )}
        </div>
        <ProductsSection products={category?.products || []} />
      </div>
    </>
  );
};

export default CategoryPage;
