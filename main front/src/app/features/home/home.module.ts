import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {QuestModalWindowComponent} from '../quest/components/quest-modal-window/quest-modal-window.component';
import { BoxModalWindowComponent } from '../box/components/box-modal-window/box-modal-window.component';
import { ReviewsComponent } from '../review/components/reviews/reviews.component';

@NgModule({
  declarations: [HomeComponent,QuestModalWindowComponent,BoxModalWindowComponent],
  imports: [
    CommonModule,
  ]
})
export class HomeModule { }
