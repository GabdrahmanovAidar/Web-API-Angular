import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { EntityFilterTypeEnum } from "app/modules/entity-filter/domain/enums/EntityFilterTypeEnum";

@Component({
  selector: 'entity-filter-kind',
  templateUrl: './template.html'
})
export class EntityFilterKind {
  @Input() type: string;
  @Input() settings: any;
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();

  public EntityFilterTypeEnum = EntityFilterTypeEnum;

}
