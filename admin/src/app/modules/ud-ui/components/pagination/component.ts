import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';

function toInteger(value) {
  return parseInt("" + value, 10);
}

function isNumber(value) {
  return !isNaN(toInteger(value));
}

function getValueInRange(value, max, min) {
  if (min === void 0) {
    min = 0;
  }
  return Math.max(Math.min(value, max), min);
}

@Component({
  selector: 'ud-pagination',
  templateUrl: './template.html',
  styleUrls: ['./styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UDPagination implements OnChanges {
  @Input() disabled: boolean = false;
  @Input() boundaryLinks: boolean = false;
  @Input() directionLinks: boolean = true;
  @Input() ellipses: boolean = true;
  @Input() rotate: boolean = true;
  @Input() collectionSize: number;
  @Input() maxSize: number = 3;
  @Input() page: number = 0;
  @Input() pageSize: number;

  @Output() pageChange = new EventEmitter<number>();

  public pages = [];
  public pageCount = 0;

  ngOnChanges(changes) {
    this.updatePages(this.page);
  }

  public hasPrevious(): boolean {
    return this.page > 1;
  }

  public hasNext(): boolean {
    return this.page < this.pageCount;
  }

  public selectPage(pageNumber): void {
    this.updatePages(pageNumber);
  }

  public isEllipsis(pageNumber): boolean {
    return pageNumber === -1;
  }

  private updatePages(newPage): void {
    let _a;
    let _b;
    this.pageCount = Math.ceil(this.collectionSize / this.pageSize);
    if (!isNumber(this.pageCount)) {
      this.pageCount = 0;
    }
    // fill-in model needed to render pages
    this.pages.length = 0;
    for (let i = 1; i <= this.pageCount; i++) {
      this.pages.push(i);
    }
    // set page within 1..max range
    this.setPageInRange(newPage);
    // apply maxSize if necessary
    if (this.maxSize > 0 && this.pageCount > this.maxSize) {
      let start = 0;
      let end = this.pageCount;
      // either paginating or rotating page numbers
      if (this.rotate) {
        _a = this.applyRotation(), start = _a[0], end = _a[1];
      } else {
        _b = this.applyPagination(), start = _b[0], end = _b[1];
      }
      this.pages = this.pages.slice(start, end);
      // adding ellipses
      this.applyEllipses(start, end);
    }
  }

  private applyEllipses(start, end): void {
    if (this.ellipses) {
      if (start > 0) {
        if (start > 1) {
          this.pages.unshift(-1);
        }
        this.pages.unshift(1);
      }
      if (end < this.pageCount) {
        if (end < (this.pageCount - 1)) {
          this.pages.push(-1);
        }
        this.pages.push(this.pageCount);
      }
    }
  }

  private applyRotation() {
    let start = 0;
    let end = this.pageCount;
    const leftOffset = Math.floor(this.maxSize / 2);
    const rightOffset = this.maxSize % 2 === 0 ? leftOffset - 1 : leftOffset;
    if (this.page <= leftOffset) {
      // very beginning, no rotation -> [0..maxSize]
      end = this.maxSize;
    } else if (this.pageCount - this.page < leftOffset) {
      // very end, no rotation -> [len-maxSize..len]
      start = this.pageCount - this.maxSize;
    } else {
      // rotate
      start = this.page - leftOffset - 1;
      end = this.page + rightOffset;
    }
    return [start, end];
  }

  private applyPagination() {
    const page = Math.ceil(this.page / this.maxSize) - 1;
    const start = page * this.maxSize;
    const end = start + this.maxSize;
    return [start, end];
  }

  private setPageInRange(newPageNo) {
    const prevPageNo = this.page;
    this.page = getValueInRange(newPageNo, this.pageCount, 1);
    if (Number(this.page) !== Number(prevPageNo)) {
      this.pageChange.emit(this.page);
    }
  }
}
