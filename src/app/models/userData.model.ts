import {Address} from "./address.model";

export interface UserData{
  firstname: string,
  lastname: string,
  email: string,
  login: string,
  phoneNumber: string,
  addresses: Address[]
}
