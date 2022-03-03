import {CartItem} from "./cartItem.model";

export interface Cart{
  updatedDate: Date,
  totalPriceGross: number,
  totalPriceNet: number,
  totalItems: number,
  products: CartItem[]
}
