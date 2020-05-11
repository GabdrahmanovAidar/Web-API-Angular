import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {BoxComponent} from "./components/box/box.component";
import { BuyBoxComponent } from './components/buy-box/buy-box.component';
import { PresentBoxComponent } from './components/present-box/present-box.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: ':id',
    component: BoxComponent
  },
  {
    path: 'buy/:id',
    component: BuyBoxComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'present/:id',
    component: PresentBoxComponent
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
export class BoxRoutingModule { }