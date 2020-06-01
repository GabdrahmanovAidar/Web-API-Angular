import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { StorageService } from './StorageService';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const url = request.url;
        const isAccountRequest = url.indexOf('token') !== -1
            || url.indexOf('signup') !== -1
            || url.indexOf('signout') !== -1;

        if (!isAccountRequest)
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.storage.getItem('session').accessToken}`
                }
            });

        return next.handle(request);
    }
}
