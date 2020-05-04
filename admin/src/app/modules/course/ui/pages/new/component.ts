import {
  Component, OnInit
} from '@angular/core';
import { Course } from "../../../domain/interfaces/Course";
import { ActivatedRoute, Router } from "@angular/router";
import { CourseRepository } from "../../../domain/repositories/CourseRepository";
import { MessageService } from "primeng/components/common/messageservice";
import { CourseFactory } from "app/modules/course/domain/factories/CourseFactory";

@Component({
  selector: 'course-pages-new',
  styleUrls: ['./styles.scss'],
  templateUrl: './template.html'
})

export class CoursePagesNew implements OnInit{
  public course: Course;
  public saving: boolean = false;
  public breadcrumbs: Array<{ label: string, link?: any }> = [
    { label: 'Курсы', link: '../' },
    { label: 'Новый' }
  ];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private courseRepository: CourseRepository,
              private messageService: MessageService,
              private courseFactory: CourseFactory) {
  }

  ngOnInit() {
    this.course = this.courseFactory.createEmpty();
  }

  public onFormSuccessSubmit($event: Course): void {
    this.saving = true;
    this.courseRepository.save($event)
      .finally(() => this.saving = false)
      .subscribe((course: Course) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Сохранено'
        });
        this.navigateToList();
      });
  }

  public onCancel() {
    this.navigateToList();
  }

  private navigateToList() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
