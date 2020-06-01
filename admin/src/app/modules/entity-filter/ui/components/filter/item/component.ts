import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterSettings } from "app/modules/entity-filter/domain/interfaces/FilterSettings";

@Component({
  selector: 'entity-filter-item',
  templateUrl: './template.html'
})
export class EntityFilterItem {
  @Input() availableFiltersList: Array<{ label: string, value: string }>;
  @Input() filters: FilterSettings[];
  @Input() filter: FilterSettings;
  @Input() value: any;
  @Output() filterChange = new EventEmitter<FilterSettings>();
  @Output() valueChange = new EventEmitter<any>();
  @Output() deleteClicked = new EventEmitter<{ originalEvent: Event }>();

  public get itemAvailableFiltersList() {
    if (this.filter.key != null) {
      return [...this.availableFiltersList, { label: this.filter.label, value: this.filter.key }];
    }
    return this.availableFiltersList;
  }

  public onFilterChange(filterKey: string): void {
    const filter = this.filters.find((f) => f.key === filterKey);
    this.filterChange.emit(filter);
  }

  public onValueChange(value: any): void {
    this.valueChange.emit(value);
  }

  public onDeleteClicked($event): void {
    $event.preventDefault();
    this.deleteClicked.emit({ originalEvent: $event });
  }

}
