import { Observable } from "rxjs/Observable";
import { BaseHttpResource } from "./BaseHttpResource";

export class BaseRestResource {

  protected Constructor = BaseRestResource;

  constructor(private httpResource: BaseHttpResource,
              private resourceUrl: string,
              private options?) {
  }

  public create(body: any, options?): Observable<any> {
    return this.httpResource.post(this.resourceUrl, body, this.createOptions(options));
  }

  public update(body: any, options?): Observable<any> {
    return this.httpResource.put(this.resourceUrl, body, this.createOptions(options));
  }

  public patch(body: any, options?): Observable<any> {
    return this.httpResource.patch(this.resourceUrl, body, this.createOptions(options));
  }

  public get(body?: any, options?): Observable<any> {
    return this.httpResource.get(this.resourceUrl, body, this.createOptions(options));
  }

  public delete(options?): Observable<any> {
    return this.httpResource.delete(this.resourceUrl, this.createOptions(options));
  }

  public child(...routeParts: Array<number | string>): BaseRestResource {
    const baseUrl = this.resolveChildUrl(routeParts);
    return new this.Constructor(this.httpResource, baseUrl, this.options);
  }

  public setBaseUrl(baseUrl: string): void {
    this.resourceUrl = baseUrl;
  }

  private resolveChildUrl(routeParts: Array<number | string>): string {
    return routeParts.reduce((resultUrl, routePart) =>
      `${resultUrl}/${routePart}`, this.resourceUrl) as string;
  }

  private createOptions(options): any {
    return Object.assign({}, this.options, options);
  }
}
