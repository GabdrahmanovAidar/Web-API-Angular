import { CanActivate, Router, CanActivateChild, CanLoad } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";

import { LoginService, LoginState } from "app/modules/auth/domain/services/LoginService";
import { AccessRoleEnum } from "app/modules/access/domain/enums/AccessRoleEnum";

@Injectable()
export class IsNotLoggedGuard implements CanActivateChild, CanActivate, CanLoad {
  constructor(private router: Router,
              private loginService: LoginService) {
  }

  /**
   * @inheritDoc
   * @returns {Observable<boolean>}
   */
  public canActivate(): Observable<boolean> {
    return this.can();
  }

  /**
   * @inheritDoc
   * @returns {Observable<boolean>}
   */
  public canActivateChild(): Observable<boolean> {
    return this.can();
  }

  public canLoad(): Observable<boolean> {
    return this.can();
  }

  private can(): Observable<boolean> {
    return this.loginService.state$
      .skipWhile((state: LoginState) => state.isLogged == null)
      .do((state: LoginState) => {
        if (state.isLogged) {
          switch (state.type) {
            case AccessRoleEnum.SystemAdministrator:
              this.router.navigate(['/dashboard/statistics']);
              break;
          }
        }
      })
      .map((state: LoginState) => !state.isLogged);
  }
}
