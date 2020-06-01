import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ud-per-page',
  templateUrl: './template.html',
  styleUrls: ['./styles.scss'],
})
export class UDPerPage {
  @Input() total: number;
  @Input() values: Array<number | string> = [30, 50, 100];
  @Input() perPage: number | string = 20;

  @Output() perPageChange = new EventEmitter<number>();

  public get perPageValues() {
    if (this.total != null) {
      return (this.values || []).filter((v) => v <= this.total);
    }

    return this.values;
  }

  public onPerPageClicked($event, value) {
    $event.preventDefault();
    if (value !== this.perPage) {
      this.perPageChange.emit(value);
    }
  }

  public isPerPageActive(perPageValue: number | string): boolean {
    return Number(this.perPage) === Number(perPageValue);
  }
}
