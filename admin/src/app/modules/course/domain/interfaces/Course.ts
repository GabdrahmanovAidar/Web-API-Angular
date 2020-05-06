import {CourseStatusEnum} from "../enums/CourseStatusEnum";
import { UploadImage } from 'app/modules/ud-upload/domain/interfaces/UploadImage';
export interface Course{
   id?:number,
   name?:string,
   description?:string,
   courseDuration?:string,
   level?:string,
   status?:string,
   covers?: UploadImage[],
   createdDate?:Date
}