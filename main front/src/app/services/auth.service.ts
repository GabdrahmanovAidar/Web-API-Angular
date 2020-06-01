import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TokenName } from 'src/app/common/constants/auth.constant';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieService, private router: Router) { }

  public user = new BehaviorSubject<any>(null);

  public get isAuth() {
    return this.cookieService.get(TokenName).length ? true : false;
  }

  public get getUserId() {
    return JSON.parse(window.atob(this.cookieService.get(TokenName).split('.')[1])).UserId;
  }

  public logout() {
    this.cookieService.delete(TokenName);
    this.router.navigateByUrl('/');
  }
}
