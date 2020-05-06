import { Injectable } from "@angular/core";
import { Lesson } from '../interfaces/Lesson';

@Injectable()
export class LessonFactory {
  public createEmpty(): Lesson {
    return { createdDate: new Date };
  }
}
