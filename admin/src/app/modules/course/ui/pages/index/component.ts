import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { removeFromArray } from 'app/helpers/immutable';
import * as moment from 'moment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CourseStatusEnum } from 'app/modules/course/domain/enums/CourseStatusEnum';
import { Course } from 'app/modules/course/domain/interfaces/Course';
import { HttpClient } from '@angular/common/http';
import { CourseRepository } from 'app/modules/course/domain/repositories/CourseRepository';

@Component({
  selector: 'course-pages-index',
  templateUrl: './template.html'
})

export class CoursePagesIndex {
  private defaultPaginationParams = { per_page: 10, page: 1 };
  public loading: boolean = false;
  public courses: ArrayMeta<Course>;
  public coursesItemTotal: number;
  public filters: any = Object.assign({}, this.defaultPaginationParams, {
    name:'',
    level: null,
  });
  public filterForm: FormGroup;
  public showFormErrors: boolean = false;
  public CourseStatusEnum = CourseStatusEnum;



  constructor(private route: ActivatedRoute,
              private router: Router,
              private courseRepository: CourseRepository,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private fb: FormBuilder) {

  }

  ngOnInit() {
    this.filterForm = this.buildForm();
    const queryParams = this.route.snapshot.queryParams;
    this.changeFiltersAndLoad(queryParams);
  }

  public onPaginationChange(changes): void {
    this.filters = Object.assign({}, this.filters, changes);
    this.changeUrlQueryParams(this.filters);
    this.loadCourses();
  }

  public coursesTrackByFunc(index, courses: Course): number {
    return courses.id;
  }

  public nextPage(can: boolean) {
    if (can) {
      this.onPaginationChange({ page: this.filters.page + 1 });
    }
  }

  public prevPage(can: boolean) {
    if (can) {
      this.onPaginationChange({ page: this.filters.page - 1 });
    }
  }

  private changeUrlQueryParams(queryParams): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams
    });
  }

  private changeFiltersAndLoad(changes) {
    this.filters = Object.assign({}, this.filters, changes);
    this.loadCourses();
  }

  private loadCourses(): void {

    const fValue = this.filterForm.value;
    this.filters.name = fValue.name;

    this.loading = true;
    this.courseRepository.search(this.filters)
      .finally(() => this.loading = false)
      .subscribe((courses: ArrayMeta<Course>) => {
        this.courses = courses;
        this.coursesItemTotal = courses.meta.total;
      });
  }


  public onCourseAction(actionType, course, index: number): void {
    switch (actionType) {
      case 'ACTIVE':
        this.showActiveConfirmationDialog(course, index);
        break;
        case 'UNACTIVE':
        this.showUnActiveConfirmationDialog(course, index);
        break;
    }
  }

  

  private showActiveConfirmationDialog(course: Course, index: number) {
    course.status = CourseStatusEnum.UnActive;
    this.confirmationService.confirm({
      header: 'Подтверждение изменения',
      message: `Вы уверены что хотите активировать "${course.name}"?`,
      acceptLabel: 'Активировать',
      rejectLabel: 'Отмена',
      icon: 'fa fa-trash',
      accept: () => {
        this.courseRepository.update(course)
          .subscribe(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Успешно',
              detail: `${course.name} Активирован`
            });
          }, () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: `${course.name} не был активирован`
            });
          });
      }
    });
  }

  private showUnActiveConfirmationDialog(course: Course, index: number) {
    course.status = CourseStatusEnum.Active;
    this.confirmationService.confirm({
      header: 'Подтверждение изменения',
      message: `Вы уверены что хотите деактивировать "${course.name}" ?`,
      acceptLabel: 'Деактивировать',
      rejectLabel: 'Отмена',
      icon: 'fa fa-trash',
      accept: () => {
        this.courseRepository.update(course)
          .subscribe(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Успешно',
              detail: `${course.name} деактивирован`
            });
          }, () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: `${course.name} не получилось деактивировать`
            });
          });
      }
    });
  }

  

  public onSubmit($event) {
    $event.preventDefault();
    this.loadCourses();

  }

  private buildForm() {
    return this.fb.group({
      type: [''],
      course_name:['']
    });
  }

  public onFiltersChange(changes): void {
    this.filters = Object.assign({}, this.defaultPaginationParams, changes);
    this.changeUrlQueryParams(this.filters);
    this.loadCourses();
  }

}