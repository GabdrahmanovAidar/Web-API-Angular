import {LessonStatusEnum} from "../enums/LessonStatusEnum";
export interface Lesson{
   id?:number,
   name?:string,
   description?:string,
   lessonDuration?:string,
   level?:string,
   status?:string,
   createdDate?:Date
}