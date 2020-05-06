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
      { label: 'Редактировать', type: 'default', value: 'edit' },
    ];
    this.possibleActions.push({ label: 'Удалить', type: 'danger', value: 'delete' });
  }
}