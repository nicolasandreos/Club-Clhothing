import type { ProductType } from "./product-type";

interface Category {
  id: string;
  name: string;
  displayName: string;
  imageUrl: string;
  products: ProductType[];
}

export type CategoryType = Category;
