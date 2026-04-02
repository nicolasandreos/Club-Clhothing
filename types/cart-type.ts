import type { ProductType } from "./product-type";

export interface Cart extends ProductType {
  quantity: number;
}

export type CartType = Cart;
