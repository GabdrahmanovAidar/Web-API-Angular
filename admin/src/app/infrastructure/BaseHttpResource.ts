import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

export class BaseHttpResource {
  constructor(private baseUrl: string,
              private httpClient: HttpClient,
              private defaultOptions: any = {}) {}

  public post(url: string, body: any, options?): Observable<object> {
    const { requestUrl, requestOptions } = this.resolveRequestData(url, options);
    return this.httpClient.post(requestUrl, body, requestOptions);
  }

  public put(url: string, body: any, options?): Observable<object> {
    const { requestUrl, requestOptions } = this.resolveRequestData(url, options);
    return this.httpClient.put(requestUrl, body, requestOptions);
  }

  public patch(url: string, body: any, options?): Observable<object> {
    const { requestUrl, requestOptions } = this.resolveRequestData(url, options);
    return this.httpClient.patch(requestUrl, body, requestOptions);
  }

  public get(url: string, body: any, options?): Observable<object> {
    const { requestUrl, requestOptions } = this.resolveRequestData(url, options);
    const getRequestOptions = Object.assign({}, { params: body }, requestOptions);
    return this.httpClient.get(requestUrl, getRequestOptions);
  }

  public delete(url: string, options?): Observable<object> {
    const { requestUrl, requestOptions } = this.resolveRequestData(url, options);
    return this.httpClient.delete(requestUrl, requestOptions);
  }

  public setHeaders(headers: object) {
    this.defaultOptions.headers = Object.assign({}, this.defaultOptions.headers, headers);
  }

  public clearHeaders() {
    delete this.defaultOptions.headers;
  }

  private resolveRequestData(url: string, options?) {
    const requestUrl = this.resolveRequestUrl(url);
    const requestOptions = this.resolveRequestOptions(options);
    return { requestUrl, requestOptions };
  }

  private resolveRequestUrl(url: string): string {
    const urlPart = `/${url}`;
    let result = this.baseUrl + urlPart.replace('//', '/');
    if (this.defaultOptions.timeOffset) {
      const timeOffset = (new Date()).getTimezoneOffset() * -1;
      result += `?time_offset=${timeOffset}`;
    }
    return result;
  }

  private resolveRequestOptions(options) {
    return Object.assign({}, this.defaultOptions, options);
  }

}
