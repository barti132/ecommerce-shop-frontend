import {Product} from "./product.model";

export interface Stock{
  id: number,
  product: Product,
  amount: number,
  updatedDate: Date
}
