import { NgModule, Component } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardLayoutsMain } from "./ui/layouts/main/component";


const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutsMain,
    children: [
    
      { path: 'users', loadChildren: '../users/users.module#UsersModule' },
      { path: 'courses', loadChildren: '../course/courses.module#CourseModule' },
      { path: 'requests', loadChildren: '../request/requests.module#RequestModule' }

    ]

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutesModule {
}
