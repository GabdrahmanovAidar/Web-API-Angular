import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { QuestComponent } from "./components/quest/quest.component";
import { BuyQuestComponent } from './components/buy-quest/buy-quest.component';
import { PresentQuestComponent } from './components/present-quest/present-quest.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: ':id',
    component: QuestComponent
  },
  {
    path: 'buy/:id',
    component: BuyQuestComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'present/:id',
    component: PresentQuestComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class QuestRoutingModule { }
