import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Lesson } from "../../../domain/interfaces/Lesson";

@Component({
  selector: 'lesson-components-lesson-actions',
  templateUrl: './template.html'
})
export class LessonComponentsLessonActions implements OnChanges {
  @Input() lesson: Lesson;
  @Input() status: string;
  @Output() action = new EventEmitter<string>();


  public possibleActions = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['lesson']) {
      this.setupPossibleActions();
    }
  }

  public onLessonAction($event): void {
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