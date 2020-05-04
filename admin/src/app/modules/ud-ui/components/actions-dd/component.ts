import { Component, EventEmitter, Input, Output } from "@angular/core";

export interface UDActionsItem {
  label: string,
  type: 'default'|'danger',
}

@Component({
    selector: 'ud-actions-dd',
    templateUrl: './template.html',
    styleUrls: ['./styles.scss']
})
export class UDActionsDD {
  @Input() items: UDActionsItem[];
  @Input() placement: string = 'bottom-right';
  @Input() stopPropagation: boolean = true;
  @Input() preventDefault: boolean = true;
  @Output() itemSelect = new EventEmitter<{ originalEvent: Event, item: UDActionsItem }>();

  public onItemClicked($event, item, dropdown): void {
    if (this.stopPropagation) {
      $event.stopPropagation();
    }
    if (item.link != null && this.preventDefault) {
      $event.preventDefault();
    }
    if (dropdown.isOpen()) {
      dropdown.close();
    }
    this.itemSelect.emit({ originalEvent: $event, item });
  }

  public onToggleClicked($event, dropdown) {
    if (this.stopPropagation) {
      $event.stopPropagation();
    }
    if (this.preventDefault) {
      $event.preventDefault();
    }
    dropdown.isOpen() ? dropdown.close() : dropdown.open();
  }
}
