import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminLayoutsMain } from "./ui/layouts/main/component";
import { IsAdminGuard } from "app/modules/admin/domain/IsAdminGuard";

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutsMain,
    children: [
      { path: '', loadChildren: './modules/statistic/admin-statistic.module#AdminStatisticModule' },
    ],
    canActivateChild: [IsAdminGuard],
    canActivate: [IsAdminGuard],
    canLoad: [IsAdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutesModule {
}
