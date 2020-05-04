import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from '../interfaces/Course';
@Injectable()
export class CourseFormBuilderService {

  courseForm: FormGroup;
  constructor(private fb: FormBuilder) {

  }

  public buildForm(course: Course): FormGroup {
    return this.fb.group({
      name: [course.name, [Validators.required, Validators.maxLength(200)]],
      description: [course.description, [Validators.required, Validators.maxLength(10000)]],
      level: [course.level, [Validators.required, Validators.maxLength(200)]],
      courseDuration: [course.courseDuration, [Validators.required, Validators.maxLength(200)]]
    })
  }
}
