import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Course } from "../../../domain/interfaces/Course";

@Component({
  selector: 'course-components-course-actions',
  templateUrl: './template.html'
})
export class CourseComponentsCourseActions implements OnChanges {
  @Input() courses: Course;
  @Input() status: string;
  @Output() action = new EventEmitter<string>();


  public possibleActions = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['courses']) {
      this.setupPossibleActions();
    }
  }

  public onCourseAction($event): void {
    this.action.emit($event.item.value);
  }

  private setupPossibleActions() {
    this.possibleActions = [
    ];
    if (this.status == 'ACTIVE') {
      this.possibleActions.push({ label: 'Активировать', type: 'default', value: 'Active' });
    }
    if (this.status == 'UNACTIVE') {
        this.possibleActions.push({ label: 'Сделать не доступным', type: 'default', value: 'UnActive' });
      }
  }
}