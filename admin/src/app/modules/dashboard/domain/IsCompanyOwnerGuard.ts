import { CanActivate, Router, CanActivateChild, CanLoad } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";

import { LoginService, LoginState } from "app/modules/auth/domain/services/LoginService";
import { AccessRoleEnum } from "app/modules/access/domain/enums/AccessRoleEnum";

@Injectable()
export class IsCompanyOwnerGuard implements CanActivateChild, CanActivate, CanLoad {
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
      .map((state: LoginState) => state.isLogged && state.type === AccessRoleEnum.CompanyOwner)
      .do((isCompanyOwner) => {
        if (!isCompanyOwner) {
          this.router.navigate(['login']);
        }
      });
  }
}
