import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Request } from "../../../domain/interfaces/Request";

@Component({
  selector: 'request-components-request-actions',
  templateUrl: './template.html'
})
export class RequestComponentsRequestActions implements OnChanges {
  @Input() courses: Request;
  @Input() status: string;
  @Output() action = new EventEmitter<string>();


  public possibleActions = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['requests']) {
      this.setupPossibleActions();
    }
  }

  public onRequestAction($event): void {
    this.action.emit($event.item.value);
  }

  private setupPossibleActions() {

    this.possibleActions = [
      { label: 'Принять', type: 'default', value: 'accepted' },
    ];
    this.possibleActions.push({ label: 'Отклонить', type: 'danger', value: 'unaccepted' });
  }
}