import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { UDPagination } from "app/modules/ud-ui/components/pagination/component";

@Component({
  selector: 'ud-per-page-pagination',
  templateUrl: './template.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UDPerPagePagination {
  @Input() page: number;
  @Input() perPage: number;
  @Input() pageSize: number = 3;
  @Input() collectionSize: number;
  @Input() perPageValues: Array<number | string> = [10, 30, 50, 100];
  @Input() align: 'left' | 'center' | 'right' = 'right';

  @Output() paramsChange = new EventEmitter<object>();
  @Output() pageChange = new EventEmitter<string | number>();
  @Output() perPageChange = new EventEmitter<string | number>();

  @ViewChild(UDPagination) paginationCmp: UDPagination;

  public onPerPageChange($event): void {
    this.perPageChange.emit($event);
    this.changeParamsAndEmit({ per_page: $event, page: 1 });
  }

  public onPageChange($event): void {
    this.pageChange.emit($event);
    this.changeParamsAndEmit({ page: $event });
  }

  public showAllClicked($event): void {
    $event.preventDefault();
    this.perPageChange.emit(this.collectionSize);
    this.changeParamsAndEmit({ per_page: this.collectionSize, page: 1 });
  }

  public get containerClassNames(): string {
    switch (this.align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'pull-right';
      case 'left':
      default:
        return '';
    }
  }

  public hasPrevPage() {
    return this.paginationCmp.hasPrevious();
  }

  public hasNextPage() {
    return this.paginationCmp.hasNext();
  }

  private changeParamsAndEmit(changes): void {
    const params = Object.assign({}, { page: this.page, per_page: this.perPage }, changes);
    this.paramsChange.emit(params);
  }
}
