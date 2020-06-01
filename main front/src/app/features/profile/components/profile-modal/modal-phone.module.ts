import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { ModalPhoneComponent } from './components/modal-phone.component';


@NgModule({
  declarations: [
      ModalPhoneComponent
    ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class ModalPhoneModule { }
