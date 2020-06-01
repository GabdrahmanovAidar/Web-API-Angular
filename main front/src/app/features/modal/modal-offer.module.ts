import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { ModalOfferComponent } from './components/modal-offer.component';


@NgModule({
  declarations: [
      ModalOfferComponent
    ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class ModalOfferModule { }
