import { Component, OnInit } from '@angular/core';
import { LoginService, LoginState } from "app/modules/auth/domain/services/LoginService";
import { Router } from "@angular/router";
import { AccountBalanceRepository } from 'app/modules/license/domain/repositories/AccountBalanceRepository';
import { AccountBalance } from 'app/modules/license/domain/interfaces/AccountBalance';
import { User } from 'app/modules/auth/domain/interfaces/User';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'dashboard-layouts-main',
  templateUrl: './template.html'
})
export class DashboardLayoutsMain implements OnInit {

  public isNavOpened: boolean = false;
  public currentUser$: Observable<User>;

  constructor(private loginService: LoginService,
              private router: Router) {
  }

  ngOnInit() {
    this.currentUser$ = this.loginService.state$.map((loginState: LoginState) => {
      return loginState && loginState.isLogged && loginState.user;
    });
  }

  public onLogoutClicked($event): void {
    $event.preventDefault();
    this.loginService.logout();
    this.router.navigate(['/login'])
  }

  public onNavToggleClicked($event): void {
    $event.stopPropagation();
    this.isNavOpened = !this.isNavOpened;
  }

  public onNavClicked($event) {
    if (this.isNavOpened) {
      this.isNavOpened = false;
    }
  }

}
