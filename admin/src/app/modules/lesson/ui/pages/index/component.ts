import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { removeFromArray } from 'app/helpers/immutable';
import * as moment from 'moment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LessonStatusEnum } from 'app/modules/lesson/domain/enums/LessonStatusEnum';
import { Lesson } from 'app/modules/lesson/domain/interfaces/Lesson';
import { HttpClient } from '@angular/common/http';
import { LessonRepository } from 'app/modules/lesson/domain/repositories/LessonRepository';

@Component({
  selector: 'lesson-pages-index',
  templateUrl: './template.html'
})

export class LessonPagesIndex {
  private defaultPaginationParams = { per_page: 10, page: 1 };
  public loading: boolean = false;
  public lessons: ArrayMeta<Lesson>;
  public lessonsItemTotal: number;
  public filters: any = Object.assign({}, this.defaultPaginationParams, {
    name:'',
    level: null,
  });
  public filterForm: FormGroup;
  public showFormErrors: boolean = false;
  public LessonStatusEnum = LessonStatusEnum;



  constructor(private route: ActivatedRoute,
              private router: Router,
              private lessonRepository: LessonRepository,
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
    this.loadLessons();
  }

  public lessonsTrackByFunc(index, lesson: Lesson): number {
    return lesson.id;
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
    this.loadLessons();
  }

  private loadLessons(): void {

    const fValue = this.filterForm.value;
    this.filters.name = fValue.name;

    this.loading = true;
    this.lessonRepository.search(this.filters)
      .finally(() => this.loading = false)
      .subscribe((lessons: ArrayMeta<Lesson>) => {
        this.lessons = lessons;
        this.lessonsItemTotal = lessons.meta.total;
      });
  }


  public onLessonAction(actionType, lesson, index: number): void {
    switch (actionType) {
      case 'ACTIVE':
        this.showActiveConfirmationDialog(lesson, index);
        break;
        case 'UNACTIVE':
        this.showUnActiveConfirmationDialog(lesson, index);
        break;
    }
  }

  

  private showActiveConfirmationDialog(lesson: Lesson, index: number) {
    lesson.status = LessonStatusEnum.UnActive;
    this.confirmationService.confirm({
      header: 'Подтверждение изменения',
      message: `Вы уверены что хотите активировать "${lesson.name}"?`,
      acceptLabel: 'Активировать',
      rejectLabel: 'Отмена',
      icon: 'fa fa-trash',
      accept: () => {
        this.lessonRepository.update(lesson)
          .subscribe(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Успешно',
              detail: `${lesson.name} Активирован`
            });
          }, () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: `${lesson.name} не был активирован`
            });
          });
      }
    });
  }

  private showUnActiveConfirmationDialog(lesson: Lesson, index: number) {
    lesson.status = LessonStatusEnum.Active;
    this.confirmationService.confirm({
      header: 'Подтверждение изменения',
      message: `Вы уверены что хотите деактивировать "${lesson.name}" ?`,
      acceptLabel: 'Деактивировать',
      rejectLabel: 'Отмена',
      icon: 'fa fa-trash',
      accept: () => {
        this.lessonRepository.update(lesson)
          .subscribe(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Успешно',
              detail: `${lesson.name} деактивирован`
            });
          }, () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: `${lesson.name} не получилось деактивировать`
            });
          });
      }
    });
  }

  

  public onSubmit($event) {
    $event.preventDefault();
    this.loadLessons();

  }

  private buildForm() {
    return this.fb.group({
      type: [''],
      lesson_name:['']
    });
  }

  public onFiltersChange(changes): void {
    this.filters = Object.assign({}, this.defaultPaginationParams, changes);
    this.changeUrlQueryParams(this.filters);
    this.loadLessons();
  }

}