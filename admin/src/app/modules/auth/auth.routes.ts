import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthLayoutsBase } from "app/modules/auth/ui/layouts/component";
import { AuthPagesLogin } from "app/modules/auth/ui/pages/login/component";
import { AuthPagesRecovery } from "app/modules/auth/ui/pages/password-recovery/component";
import { IsNotLoggedGuard } from "app/modules/core/domain/IsNotLoggedGuard";

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutsBase,
    children: [
      {
        path: '',
        component: AuthPagesLogin
      },
      {
        path: 'login',
        component: AuthPagesLogin
      },
      {
        path: 'recovery',
        component: AuthPagesRecovery
      }
    ],
    canActivateChild: [IsNotLoggedGuard],
    canActivate: [IsNotLoggedGuard],
    canLoad: [IsNotLoggedGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutesModule {
}
