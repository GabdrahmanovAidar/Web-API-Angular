import {
    Component
  } from '@angular/core';
  import { Course } from "../../../domain/interfaces/Course";
  import { ActivatedRoute, Router } from "@angular/router";
  import { CourseRepository } from "../../../domain/repositories/CourseRepository";
  import { MessageService } from "primeng/components/common/messageservice";
  import { LoginService } from "app/modules/auth/domain/services/LoginService";

  
  
  @Component({
    selector: 'course-pages-edit',
    styleUrls: ['./styles.scss'],
    templateUrl: './template.html'
  })
  
  export class CoursePagesEdit {
    public breadcrumbs = [
        { label: 'Курсы', link: '../' }
      ];
    
      public course: Course;
      public loading: boolean = false;
      public saving: boolean = false;
    
      constructor(private courseRepository: CourseRepository,
                  private messageService: MessageService,
                  private router: Router,
                  private route: ActivatedRoute,
                  private loginService: LoginService) {
      }
    
      ngOnInit() {
        this.loadAndSetupStocks();
      }
    
      public onFormSuccessSubmit($event: Course): void {
        this.saving = true;
        this.courseRepository.save($event)
          .finally(() => this.saving = false)
          .subscribe((course: Course) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Сохранено',
                detail: `Курс ${course.name} сохранен`
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
    
      private loadAndSetupStocks(): void {
        const courseId = this.route.snapshot.params['id'];
        this.loading = true;
    
        this.courseRepository.loadById(courseId)
          .finally(() => this.loading = false)
          .subscribe((course: Course) => {
            this.course = course;
            this.breadcrumbs.push({ label: course.name, link: null });
          });
      }
  }