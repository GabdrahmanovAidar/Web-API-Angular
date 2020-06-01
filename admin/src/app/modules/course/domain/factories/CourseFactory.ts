import { Injectable } from "@angular/core";
import { Course } from '../interfaces/Course';

@Injectable()
export class CourseFactory {
  public createEmpty(): Course {
    return { createdDate: new Date };
  }
}
