import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { User } from "../../../domain/interfaces/User";

@Component({
  selector: 'user-components-user-actions',
  templateUrl: './template.html'
})
export class UserComponentsUserActions implements OnChanges {
  @Input() users: User;
  @Input() role: string;
  @Output() action = new EventEmitter<string>();


  public possibleActions = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['users']) {
      this.setupPossibleActions();
    }
  }

  public onUserAction($event): void {
    this.action.emit($event.item.value);
  }

  private setupPossibleActions() {
    this.possibleActions = [
    ];
    if (this.role == 'USER') {
      this.possibleActions.push({ label: 'Сделать доставщиком', type: 'default', value: 'deliveler' });
    }
    if (this.role == 'DELIVELER') {
        this.possibleActions.push({ label: 'Сделать пользователем', type: 'default', value: 'user' });
      }
  }
}