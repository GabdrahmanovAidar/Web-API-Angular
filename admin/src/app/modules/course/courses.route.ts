import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoursePagesIndex } from './ui/pages/index/component';
import { CoursePagesEdit} from './ui/pages/edit/component'
import { CoursePagesNew} from './ui/pages/new/component'


const routes: Routes = [
  {
    path: '',
    component: CoursePagesIndex
  },
  {
    path: 'new',
    component: CoursePagesNew
  },
  {
    path:':id',
    component:CoursePagesEdit
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRouteModule {
}