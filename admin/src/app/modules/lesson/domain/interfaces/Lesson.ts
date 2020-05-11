import {LessonStatusEnum} from "../enums/LessonStatusEnum";
export interface Lesson{
   id?:number,
   name?:string,
   description?:string,
   duration?:string,
   courseId?:number,
   status?:string,
   createdDate?:Date
}