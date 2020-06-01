import { CollectionViewer, DataSource, ListRange } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IGrouped } from './course-list/course-list.component';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';



export interface ISourceSettings {
  groupCount?: number;
}
@Injectable({
  providedIn: 'root'
})
export class CourseService{
  public course:Course[]
  
  constructor(private client: HttpClient){ }


  public getCourse(): Observable<any>{
       return this.client.get<any>(environment.apiUrl+"/course/?status=ACTIVE");
  }
  public getCourseId(id:number): Observable<any>{
    return this.client.get<any>(environment.apiUrl + "/course/" + id);
}

}
export class GenericDataSource<TItem> extends DataSource<TItem | IGrouped<TItem> | undefined> {
  constructor(private client: HttpClient,
              private apiUrl: string,
              private settings?: ISourceSettings) {
    super();
    this.init();
  }
  private pageSize = 20;
  private fetchedPages = new Set<number>();
  private itemsCount: number;
  private hasNextPage: boolean;


  private cachedItems: (TItem | undefined)[] = [];
  public items = new BehaviorSubject<(TItem | IGrouped<TItem> | undefined)[]>([]);
  private subscription = new Subscription();

  public isLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  connect(collectionViewer: CollectionViewer): Observable<(TItem | IGrouped<TItem> | undefined)[]> {
    this.subscription.add(collectionViewer.viewChange
      .pipe(startWith({ start: 0, end: 1 } as ListRange))
      .subscribe(range => {
        const normalizedRange = { ...range };

        if (this.settings.groupCount) {
          normalizedRange.start *= this.settings.groupCount;
          normalizedRange.end *= this.settings.groupCount;
        }

        const startPage = this.getPageForIndex(normalizedRange.start);
        const endPage = this.getPageForIndex(normalizedRange.end);

        for (let i = startPage; i <= endPage; i++) {
          this.fetchPage(i);
        }
      }));
    return this.items;
  }

  disconnect(): void {
    this.subscription.unsubscribe();
  }

  public get count() {
    return this.itemsCount || null;
  }

  private getPageForIndex(index: number): number {
    return Math.floor(index / this.pageSize);
  }

  private fetchPage(page: number) {
    if (this.fetchedPages.has(page) || !this.hasNextPage) {
      return;
    }
    this.fetchedPages.add(page);

    const query = this.getQueryParams(page + 1, this.pageSize);
    this.fetch(query);
  }

  private init() {
    const queryPage = 1;
    const query = this.getQueryParams(queryPage, this.pageSize);
    this.fetch(query);

    this.fetchedPages.add(queryPage - 1);
  }

  private fetch(query: HttpParams) {
    this.client.get<any>(this.apiUrl,
      {params: query}
      ).subscribe((response) => {
      this.cachedItems = this.cachedItems.concat(response.results);
      this.hasNextPage = !!response.next;

      if (this.settings.groupCount) {
        const groupedCachedItems: IGrouped<TItem>[] = [];

        this.cachedItems.forEach((item, idx) => {
          if ((idx % this.settings.groupCount) === 1 || idx === 0) {
            groupedCachedItems.push({
              groupLength: this.settings.groupCount,
              items: [item]
            } as IGrouped<TItem>);
          } else { groupedCachedItems[groupedCachedItems.length - 1].items.push(item); }
        });

        this.items.next(groupedCachedItems);
      } else { this.items.next(this.cachedItems); }

      if (!this.isLoaded.value) {
        this.isLoaded.next(true);
      }
      this.itemsCount = response.count;
    });
  }

  private getQueryParams(page: number, pageSize: number) {
    let params: HttpParams = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', pageSize.toString());
    // return `/${page}/${pageSize}`;
    return params;
  }
}
