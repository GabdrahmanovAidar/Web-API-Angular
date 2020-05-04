import { Component, Input } from "@angular/core";

@Component({
  selector: 'ud-empty-table',
  templateUrl: './template.html',
})
export class UDEmptyTable {
  @Input() show: boolean = false;
}
