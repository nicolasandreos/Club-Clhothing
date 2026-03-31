import { useParams } from "react-router";
import Header from "../components/header";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../integrations/firebase/initialize";
import type { CategoryType } from "../../types/category-type";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState<CategoryType | null>(null);

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
    <div>
      <Header />
      {category && (
        <div>
          <h1>{category.name}</h1>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
