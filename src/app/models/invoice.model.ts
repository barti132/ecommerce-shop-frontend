import {Address} from "./address.model";

export interface Invoice{
  id: number,
  invoiceDate: Date,
  address: Address,
  totalPriceGross: number,
  totalPriceNet: number,
  totalItems: number,
  cardNumber: string
}
