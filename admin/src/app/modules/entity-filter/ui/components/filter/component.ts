import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FilterSettings } from "app/modules/entity-filter/domain/interfaces/FilterSettings";
import { removeFromArray } from "app/helpers/immutable";

@Component({
  selector: 'entity-filter',
  templateUrl: './template.html'
})
export class EntityFilter implements OnChanges {
  @Input() filters: FilterSettings[];
  @Input() value: { [filterKey: string]: string };
  @Output() apply = new EventEmitter<any>();
  @Output() clear = new EventEmitter<any>();
  @Output() filterRemove = new EventEmitter<any>();
  @Output() filterAdd = new EventEmitter<any>();

  public isOpened = false;
  public availableFiltersList = [];
  public selectedFilters: Array<{
    filter: FilterSettings
    value: any
  }> = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filters'] || changes['value']) {
      this.setupSelectedFilters();
      this.setupAvailableFilters();
    }
  }

  public addFilterClicked($event): void {
    $event.preventDefault();
    this.selectedFilters = [...this.selectedFilters, { filter: {}, value: null }];
    if (!this.isOpened) {
      this.isOpened = true;
    }
  }

  public onClearClicked($event): void {
    $event.preventDefault();
    this.clear.emit();
    this.apply.emit();
    this.isOpened = false;
  }

  public onApplyClicked($event): void {
    $event.preventDefault();
    this.emitSelectedFilters();
  }

  public trackByFunc(index, filter) {
    return filter.filter.key;
  }

  public onFilterDeleteClicked(filter, index: number): void {
    this.selectedFilters = removeFromArray(this.selectedFilters, index);
    this.setupAvailableFilters();
    if (this.selectedFilters.length === 0) {
      this.emitSelectedFilters();
    }
  }

  private emitSelectedFilters(): void {
    const value = {};
    this.selectedFilters.forEach((sf) => {
      if (sf.value != null) {
        value[sf.filter.key] = sf.value;
      }
    });
    this.apply.emit(value)
  }

  private setupAvailableFilters(): void {
    this.availableFiltersList = this.filters
      .filter((f: FilterSettings) => {
        return !this.selectedFilters.some((sf) => {
          return sf.filter.key === f.key;
        });
      })
      .map((f: FilterSettings) => Object({ label: f.label, value: f.key }));
  }

  private setupSelectedFilters(): void {
    this.selectedFilters = Object.keys(this.value)
      .filter((filterKey: string) => this.filters.some((f) => f.key === filterKey))
      .map((filterKey: string) => {
        const filter = this.filters.find((f: FilterSettings) => f.key === filterKey);
        return { filter: Object.assign({}, filter), value: this.value[filterKey] };
      });
  }
}
