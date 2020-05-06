import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LessonPagesIndex } from './ui/pages/index/component';
import { LessonPagesEdit} from './ui/pages/edit/component'
import { LessonPagesNew} from './ui/pages/new/component'


const routes: Routes = [
  {
    path: '',
    component: LessonPagesIndex
  },
  {
    path: 'new',
    component: LessonPagesNew
  },
  {
    path:':id',
    component:LessonPagesEdit
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LessonsRouteModule {
}