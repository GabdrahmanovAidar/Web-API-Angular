import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DBSettingsPagesIndex } from "./ui/pages/index/component";

const routes: Routes = [
  {
    path: '',
    component:  DBSettingsPagesIndex
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DBSettingsRoutesModule {
}
