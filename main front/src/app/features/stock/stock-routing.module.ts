import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StockComponent } from './components/stock/stock.component';
import { StockQuestComponent } from './components/stock-quest/stock-quest.component';


const routes: Routes = [
  {
    path: '',
    component: StockComponent
  },
  {
    path: 'products/:id',
    component: StockQuestComponent
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
export class StockRoutingModule { }
