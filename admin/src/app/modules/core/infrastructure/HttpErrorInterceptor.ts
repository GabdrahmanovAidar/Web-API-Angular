import {
  HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { MessageService } from "primeng/components/common/messageservice";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService) {
  }

  intercept(request: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .catch((error: HttpErrorResponse) => {
        const message = error.error && error.error.message || error.message;
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: `${message}`
        });
        return Observable.throw(error);
      });
  }

}

export const httpErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpErrorInterceptor,
  multi: true
};
