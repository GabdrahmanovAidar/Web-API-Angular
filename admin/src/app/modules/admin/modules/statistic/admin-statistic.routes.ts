import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminStatisticPagesAdminStatistic } from "./ui/pages/statistic/component";

const routes: Routes = [
  {
    path: '',
    component: AdminStatisticPagesAdminStatistic
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminStatisticRoutesModule {
}
