import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Lesson } from '../interfaces/Lesson';
@Injectable()
export class LessonFormBuilderService {

  lessonForm: FormGroup;
  constructor(private fb: FormBuilder) {

  }

  public buildForm(lesson: Lesson): FormGroup {
    return this.fb.group({
      name: [lesson.name, [Validators.required, Validators.maxLength(200)]],
      description: [lesson.description, [Validators.required, Validators.maxLength(10000)]],
      //courseId: [lesson.courseId, [Validators.required, Validators.maxLength(200)]],
      duration: [lesson.duration, [Validators.required, Validators.maxLength(200)]],
      videos: [lesson.videos || []]
    })
  }
}
