import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FeaturesRoutingModule } from './features-routing.module';
import { HomeModule } from './home/home.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    HomeModule
  ],
})
export class FeaturesModule { }
