import { useEffect, useState } from "react";
import type Category from "../../types/category-type";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../integrations/firebase/initialize.ts";

const CategorySection = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesRef = collection(db, "categories");
      const categoriesSnapshot = await getDocs(categoriesRef);
      const categoriesData = categoriesSnapshot.docs.map(
        (doc) => doc.data() as Category,
      );
      setCategories(categoriesData);
    };
    fetchCategories();
  }, [categories]);

  return (
    <div className="w-full min-w-0 py-7.5 px-10 grid grid-cols-[1fr_1fr] grid-rows-[300px_250px_300px] gap-4">
      {categories.map((category, index) => (
        <div
          key={category.id}
          className={`relative min-w-0 overflow-hidden rounded-2xl ${index === 2 ? "col-span-2" : ""}`}
        >
          <img
            src={category.imageUrl}
            alt={category.name}
            className="w-full h-full object-cover"
          />
          {/* overlay escuro */}
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute flex flex-col items-center justify-center gap-2.5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-2.5 px-7.5 bg-category-description rounded-lg border-primary border-2">
            <h3 className="text-2xl font-bold text-secondary">
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            </h3>
            <p className="text-2xl font-bold text-secondary">Explorar</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategorySection;
