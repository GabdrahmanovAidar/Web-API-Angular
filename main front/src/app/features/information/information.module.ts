import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformationComponent } from './information/information.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';


@NgModule({
  declarations: [InformationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: InformationComponent }]),
    MaterialModule,
    AngularYandexMapsModule.forRoot("b8ed8909-907e-451b-b784-e66bd6e00ca2")
  ]
})
export class InformationModule { }