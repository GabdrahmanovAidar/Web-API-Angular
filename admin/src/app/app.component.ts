import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { LoginService } from "app/modules/auth/domain/services/LoginService";
import { getUrlParameter } from "app/helpers/url";

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.template.html'
})
export class AppComponent implements OnInit {

  constructor(private router: Router,
    private loginService: LoginService) {
  }

  ngOnInit() {
    this.router.events
      .skipWhile((event) => !(event instanceof NavigationEnd))
      .first()
      .subscribe(() => {
        const spinner = document.getElementById('first_screen_spinner');
        if (spinner) {
          // todo add fade animation
          spinner.remove();
        }
      });

    // Проверка на logout
    const isLogout = getUrlParameter('logout') === 'true';
    if (isLogout) {
      this.loginService.logout();
    }

    this.loginService.checkSession();
  }

}
