import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { StockService } from './stock.service';
import { StockComponent } from './components/stock/stock.component';
import { StockRoutingModule } from './stock-routing.module';
import { StockQuestComponent } from './components/stock-quest/stock-quest.component';

@NgModule({
  declarations: [
      StockComponent,
      StockQuestComponent
    ],
  imports: [
    CommonModule,
    StockRoutingModule,
    MaterialModule
  ],
  providers: [StockService]
})
export class StockModule { }
