import {CourseStatusEnum} from "../enums/CourseStatusEnum";
export interface Course{
   id?:number,
   name?:string,
   description?:string,
   courseDuration?:string,
   level?:string,
   status?:string,
   createdDate?:Date
}