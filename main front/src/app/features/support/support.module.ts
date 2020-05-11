import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportComponent } from './support.component';
import { Routes, RouterModule } from '@angular/router';
import { SupportService } from './support.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import MessagesService from 'src/app/services/messages.service';
declare var require: any;
const validationMessages = require('./validation-messages.json');

const routes: Routes = [
  {
    path: '',
    component: SupportComponent
  }
];

@NgModule({
  declarations: [SupportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FormlyModule.forChild({
      validationMessages: new MessagesService().getMessage(validationMessages)
    }),
    FormlyMaterialModule
  ],
  providers: [SupportService]
})
export class SupportModule { }
