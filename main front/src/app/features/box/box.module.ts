import { NgModule } from '@angular/core';
import { BoxService } from './box.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { BoxComponent } from './components/box/box.component';
import { BoxRoutingModule } from './box-routing.module';
import { BuyBoxComponent } from './components/buy-box/buy-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { ValidationMessageOption } from '@ngx-formly/core/lib/services/formly.config';
import { PresentBoxComponent } from './components/present-box/present-box.component';
import { SharedModule } from '../../shared/shared.module';
import { PaymentsComponent } from '../payments/components/payments.component';
import { PaymentsService } from '../payments/services/payments.service';


declare var require: any;
const validationMessages = require('./validation-messages.json');


function getMessages() {
  let errMessages: ValidationMessageOption[] = [];
  for (let element of validationMessages) {
    errMessages.push({ name: element.name, message: element.message });
  }
  return errMessages;
}

@NgModule({
  declarations: [BoxComponent, BuyBoxComponent, PresentBoxComponent],
  imports: [
    CommonModule,
    MaterialModule,
    BoxRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forChild({
      validationMessages: getMessages()
    })
  ],
  providers: [BoxService, PaymentsService],
  exports: []
})
export class BoxModule { }
