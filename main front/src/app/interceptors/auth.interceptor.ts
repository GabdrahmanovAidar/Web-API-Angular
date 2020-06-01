import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenName } from '../common/constants/auth.constant';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private cookie: CookieService, private router: Router, private toastr: ToastrService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const url = request.url;
        const isAccountRequest = url.indexOf('login') !== -1
            || url.indexOf('registration') !== -1;

        if (!isAccountRequest) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.cookie.get(TokenName)}`
                }
            });
        }
        return next.handle(request).pipe(
            catchError(err => {
                if (err.status === 401) {
                    this.toastr.info('Пожалуйста авторизуйтесь');
                    this.cookie.delete(TokenName);
                    // tslint:disable-next-line:quotemark
                    this.router.navigateByUrl("/account/login");
                }
                if(err.status === 400) {
                    this.toastr.warning(err.error.message);
                }
                return of(err);
            })
        );
    }
}
