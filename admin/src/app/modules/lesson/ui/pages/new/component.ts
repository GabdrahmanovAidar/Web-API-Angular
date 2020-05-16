import {
  Component, OnInit
} from '@angular/core';
import { Lesson } from "../../../domain/interfaces/Lesson";
import { ActivatedRoute, Router } from "@angular/router";
import { LessonRepository } from "../../../domain/repositories/LessonRepository";
import { MessageService } from "primeng/components/common/messageservice";
import { LessonFactory } from "app/modules/lesson/domain/factories/LessonFactory";

@Component({
  selector: 'lesson-pages-new',
  styleUrls: ['./styles.scss'],
  templateUrl: './template.html'
})

export class LessonPagesNew implements OnInit {
  public lesson: Lesson;
  public saving: boolean = false;
  public courseId: number;
  public breadcrumbs: Array<{ label: string, link?: any }> = [
    { label: 'Уроки', link: '../' },
    { label: 'Новый' }
  ];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private lessonRepository: LessonRepository,
    private messageService: MessageService,
    private lessonFactory: LessonFactory) {
  }

  ngOnInit() {
    this.lesson = this.lessonFactory.createEmpty();
  }

  public onFormSuccessSubmit($event: Lesson): void {
    this.saving = true;
    $event.courseId = this.courseId ;
    console.log($event.courseId)
      this.lessonRepository.save($event)
        .finally(() => this.saving = false)
        .subscribe((lesson: Lesson) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Сохранено'
          });
          this.navigateToList();
        });
  }

  public getCourseId($event) {
    this.courseId = $event;
    console.log(this.courseId)
  }


  public onCancel() {
    this.navigateToList();
  }

  private navigateToList() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
