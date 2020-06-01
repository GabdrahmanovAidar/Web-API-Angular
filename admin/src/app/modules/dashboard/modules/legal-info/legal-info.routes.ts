import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DBLegalInfoPagesIndex } from "app/modules/dashboard/modules/legal-info/ui/pages/index/component";

const routes: Routes = [
  {
    path: '',
    component:  DBLegalInfoPagesIndex
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DBDBLegalInfoRoutesModule {
}
