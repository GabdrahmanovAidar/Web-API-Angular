import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DBStatisticPagesStatistic } from "app/modules/dashboard/modules/statistic/ui/pages/statistic/component";

const routes: Routes = [
  {
    path: '',
    component: DBStatisticPagesStatistic
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DBStatisticRoutesModule {
}
