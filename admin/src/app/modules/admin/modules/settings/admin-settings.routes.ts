import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminSettingsPagesIndex } from "./ui/pages/index/component";

const routes: Routes = [
  {
    path: '',
    component:  AdminSettingsPagesIndex
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminSettingsRoutesModule {
}
