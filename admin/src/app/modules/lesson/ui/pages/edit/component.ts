import {
    Component
  } from '@angular/core';
  import { Lesson } from "../../../domain/interfaces/Lesson";
  import { ActivatedRoute, Router } from "@angular/router";
  import { LessonRepository } from "../../../domain/repositories/LessonRepository";
  import { MessageService } from "primeng/components/common/messageservice";
  import { LoginService } from "app/modules/auth/domain/services/LoginService";

  
  
  @Component({
    selector: 'lesson-pages-edit',
    styleUrls: ['./styles.scss'],
    templateUrl: './template.html'
  })
  
  export class LessonPagesEdit {
    public breadcrumbs = [
        { label: 'Уроки', link: '../' }
      ];
    
      public lesson: Lesson;
      public loading: boolean = false;
      public saving: boolean = false;
    
      constructor(private lessonRepository: LessonRepository,
                  private messageService: MessageService,
                  private router: Router,
                  private route: ActivatedRoute,
                  private loginService: LoginService) {
      }
    
      ngOnInit() {
        this.loadAndSetupStocks();
      }
    
      public onFormSuccessSubmit($event: Lesson): void {
        this.saving = true;
        this.lessonRepository.save($event)
          .finally(() => this.saving = false)
          .subscribe((lesson: Lesson) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Сохранено',
                detail: `Урок ${lesson.name} сохранен`
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
        const lessonId = this.route.snapshot.params['id'];
        this.loading = true;
    
        this.lessonRepository.loadById(lessonId)
          .finally(() => this.loading = false)
          .subscribe((lesson: Lesson) => {
            this.lesson = lesson;
            this.breadcrumbs.push({ label: lesson.name, link: null });
          });
      }
  }