import {UserRoleEnum} from "../enums/UserRoleEnum";
export interface User{
   id?:number
   type?:UserRoleEnum
   username?:string,
   phone?:string 
}