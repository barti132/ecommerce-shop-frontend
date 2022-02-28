import {Address} from "./address.model";

export interface UserData{
  name: string,
  lastName: string,
  email: string,
  login: string,
  phoneNumber: string,
  addresses: Address[]
}
