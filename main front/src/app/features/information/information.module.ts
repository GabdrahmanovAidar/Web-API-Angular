import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformationComponent } from './information/information.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [InformationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: InformationComponent }]),
    MaterialModule
  ]
})
export class InformationModule { }