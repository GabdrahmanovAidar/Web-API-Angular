import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReviewComponent } from './components/review/review.component';


const routes: Routes = [
 {
  
    path: '',
    component: ReviewComponent
  
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
export class ReviewRoutingModule { }
