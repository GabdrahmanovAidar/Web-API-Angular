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
import { LessonFormBuilderService } from 'app/modules/lesson/domain/service/LessonFormBuilderService';
import { Lesson } from 'app/modules/lesson/domain/interfaces/Lesson';
import { LessonRepository } from 'app/modules/lesson/domain/repositories/LessonRepository';
import { HttpClient } from '@angular/common/http';
import { Course } from 'app/modules/course/domain/interfaces/Course';
import { Observable } from 'rxjs';
import { UploadVideo } from 'app/modules/ud-upload/domain/interfaces/UploadVideo';

@Component({
  selector: 'lesson-components-lesson-form',
  styleUrls: ['./styles.scss'],
  templateUrl: './template.html',
  providers: [LessonFormBuilderService]
})

export class LessonComponentsLessonForm implements OnInit {
  @Input() lesson: Lesson;
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Output() cancel = new EventEmitter<{ originalEvent: Event }>();
  @Output() successSubmit = new EventEmitter<Lesson>();
  @Output() getId = new EventEmitter<number>();
  public courses: ArrayMeta<Course>;
  
  

  public showFormErrors: boolean = false;
  public lessonForm: FormGroup;
  public validationMessages = validationMessages;
  private fieldsRequirement = {
    name: true,
    description: true,
    duration: true,
    courseId: true

  };
  public imageOptions = {
    size: { w: 200, h: 200 },
    crop: { aspectRatio: 1 }
  };

  public videoOptions = {
    size: {w: 200, h: 200}
  }

  public uploadTempModel: any;
  public uploadVideoModel: any;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private lessonRepository: LessonRepository,
    private fb: FormBuilder,
    private lessonFormBuilderService: LessonFormBuilderService,
    private uploadFactory: UploadFactory,
    private uploadFileRepository: UploadFileRepository,
    private http: HttpClient) {
  }

  ngOnInit() {
    this.lessonForm = this.lessonFormBuilderService.buildForm(this.lesson);
    this.http.get<any>("https://localhost:44325/api/course").subscribe(x => {
      this.courses = x.list
    })
  }

  public onCoverUpload(cover: UploadImage): void {
    const control = this.lessonForm.get('covers');
    control.setValue([control.value, cover]);
    this.uploadTempModel = null;
  } 

  public onDeleteClicked($event, index: number): void {
    $event.preventDefault();
    const control = this.lessonForm.get('covers');
    const newValue = removeFromArray(control.value, index);
    control.setValue(newValue);
  }

  public onVideoUpload(video: UploadVideo): void {
    const control = this.lessonForm.get('videos');
    control.setValue([control.value, video]);
    this.uploadVideoModel = null;
  }

  public deleteVideo($event, index: number) {
    $event.preventDefault();
    const control = this.lessonForm.get('videos');
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
    return (this.lessonForm.get('covers') as FormArray).controls;
  }
  private sendSubmitEvent() {
    if (this.lessonForm.valid) {
      const lesson = Object.assign({}, this.lesson, this.lessonForm.value, {});
      this.successSubmit.emit(lesson);
    } else {
      this.showFormErrors = true;
      
    }
  }
  public isRequired(fieldName): boolean {
    return this.fieldsRequirement[fieldName];
  }

  public onClicked(id:number){
    this.getId.emit(id);
    
  }
}
