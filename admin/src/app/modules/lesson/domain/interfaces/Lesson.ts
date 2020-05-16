import {LessonStatusEnum} from "../enums/LessonStatusEnum";
import { UploadVideo } from 'app/modules/ud-upload/domain/interfaces/UploadVideo';

export interface Lesson{
   id?:number,
   name?:string,
   description?:string,
   duration?:string,
   courseId?:number,
   status?:string,
   createdDate?:Date,
   videos?: UploadVideo[]
}