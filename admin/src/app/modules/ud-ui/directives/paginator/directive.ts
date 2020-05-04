import { Directive, Input } from "@angular/core";

@Directive({
  selector: '[ud-paginator]',
  exportAs: 'udPaginator'
})
export class UDPaginatorDirective {
  @Input('ud-paginator-params') params: { per_page: number, page: number };
  @Input('ud-paginator') rawItems: any[];

  public get items(): any[] {
    let pagedItems = [];

    if (this.rawItems && this.rawItems.length) {
      pagedItems = this.rawItems;

      if (this.isPaginationParamsDefined()) {
        const { per_page, page } = this.params;
        const itemsOffsetEnd = per_page * page;
        const itemsOffsetStart = itemsOffsetEnd - per_page;
        pagedItems = this.rawItems.slice(itemsOffsetStart, itemsOffsetEnd);
      }
    }

    return pagedItems;
  }

  public getIndex(relativeIndex: number): number | undefined {
    if (this.isPaginationParamsDefined()) {
      const { per_page, page } = this.params;
      return per_page * page - per_page + relativeIndex;
    }
    return relativeIndex;
  }

  private isPaginationParamsDefined(): boolean {
    return this.params != null &&
      typeof this.params === 'object' &&
      !isNaN(Number(this.params.per_page)) &&
      !isNaN(Number(this.params.page))
  }

}
