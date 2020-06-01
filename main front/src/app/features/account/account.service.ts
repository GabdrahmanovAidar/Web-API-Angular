import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Registration } from './models/registration.model';
import { Login } from './models/login.model';
import { tap } from 'rxjs/operators';
import { TokenName } from 'src/app/common/constants/auth.constant';
import * as AccountRoutes from './constants/account.constants';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private cookieService: CookieService, private client: HttpClient) { }

  public registration(registrationModel: Registration) {
    return this.client.post(`${environment.apiUrl}/users`, registrationModel);
  }

  public login(loginModel: Login) {
    return this.client.post(`${environment.apiUrl}/tokens`, loginModel)
      .pipe(tap(userModel => this.setCookie(userModel)));
  }

  public logout() {
    this.cookieService.delete(TokenName);
  }

  public forgotPassword(forgotModel: any) {
    return this.client.post(`${environment.apiUrl}/account/forgotpassword`, forgotModel);
  }

  public resetPassword(forgotModel: any) {
    return this.client.post(`${environment.apiUrl}/account/resetpassword`, forgotModel);
  }

  public checkIfCanChange(userId: number, code: string) {
    return this.client.post(`${environment.apiUrl}/account/checkifcanreset`, { userId, code });
  }

  private setCookie(userModel) {
    const token = userModel.accessToken;
    this.cookieService.set(TokenName, token, 30, '/');
  }
}
