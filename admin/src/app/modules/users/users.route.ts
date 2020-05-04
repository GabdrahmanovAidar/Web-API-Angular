import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserPagesIndex } from './ui/pages/index/component';



const routes: Routes = [
  {
    path: '',
    component: UserPagesIndex
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRouteModule {
}