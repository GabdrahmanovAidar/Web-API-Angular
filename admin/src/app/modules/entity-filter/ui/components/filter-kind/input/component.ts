import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'entity-filter-kind-input',
  templateUrl: './template.html'
})
export class EntityFilterKindInput {
  @Input() settings: any;
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();

}
