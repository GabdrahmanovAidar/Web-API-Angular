import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RequestPagesIndex } from './ui/pages/index/component';



const routes: Routes = [
  {
    path: '',
    component: RequestPagesIndex
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestsRouteModule {
}