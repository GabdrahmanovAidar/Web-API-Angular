import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
const validationMessages = require('./validation-messages.json');
import { AbstractControl } from "@angular/forms/src/model";
import { UploadImage } from 'app/modules/ud-upload/domain/interfaces/UploadImage';
import { removeFromArray } from "app/helpers/immutable";
import { UploadFactory } from 'app/modules/ud-upload/domain/factories/UploadFactory';
import { UploadFile } from 'app/modules/ud-upload/domain/interfaces/UploadFile';
import { UploadFileRepository } from 'app/modules/ud-upload/domain/repositories/UploadFileRepository';
import { CourseFormBuilderService } from 'app/modules/course/domain/service/CourseFormBuilderService';
import { Course } from 'app/modules/course/domain/interfaces/Course';
import { CourseRepository } from 'app/modules/course/domain/repositories/CourseRepository';

@Component({
  selector: 'course-components-course-form',
  styleUrls: ['./styles.scss'],
  templateUrl: './template.html',
  providers: [CourseFormBuilderService]
})

export class CourseComponentsCourseForm implements OnInit {
  @Input() course: Course;
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Output() cancel = new EventEmitter<{ originalEvent: Event }>();
  @Output() successSubmit = new EventEmitter<Course>();

  public showFormErrors: boolean = false;
  public courseForm: FormGroup;
  public validationMessages = validationMessages;
  private fieldsRequirement = {
    title: true,
    description: true,
    duration: true,
    level: true,
    covers: true
  };
  public imageOptions = {
    size: { w: 200, h: 200 },
    crop: { aspectRatio: 1 }
  };

  public uploadTempModel: any;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private courseRepository: CourseRepository,
              private fb: FormBuilder,
              private courseFormBuilderService: CourseFormBuilderService,
              private uploadFactory: UploadFactory,
              private uploadFileRepository: UploadFileRepository) {
  }

  ngOnInit() {
    this.courseForm = this.courseFormBuilderService.buildForm(this.course);
  }

  /*public onCoverUpload(cover: UploadImage): void {
    const control = this.courseForm.get('covers');
    control.setValue([...control.value, cover]);
    this.uploadTempModel = null;
  } */

  public onDeleteClicked($event, index: number): void {
    $event.preventDefault();
    const control = this.courseForm.get('covers');
    const newValue = removeFromArray(control.value, index);
    control.setValue(newValue);
  }

  public onCancelClicked($event): void {
    $event.preventDefault();
    this.cancel.emit({ originalEvent: $event });
  }

  public onSubmit($event): void {
    $event.preventDefault();
    this.sendSubmitEvent();
  }
  public get uploadForms(): AbstractControl[] {
    return (this.courseForm.get('covers') as FormArray).controls;
  }
  private sendSubmitEvent() {
    if (this.courseForm.valid) {
      const course = Object.assign({}, this.course, this.courseForm.value, {});
      this.successSubmit.emit(course);
    } else {
      this.showFormErrors = true;
    }
  }
  public isRequired(fieldName): boolean {
    return this.fieldsRequirement[fieldName];
  }

}
