import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AccountService } from './account.service';
import { AccountRoutingModule } from './account-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { ValidationMessageOption } from '@ngx-formly/core/lib/services/formly.config';
import MessagesService from 'src/app/services/messages.service';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ForgotChangePasswordComponent } from './components/forgot-change-password/forgot-change-password.component';
declare var require: any;
const validationMessages = require('./validation-messages.json');

@NgModule({
  declarations: [LoginComponent, RegistrationComponent, ForgotPasswordComponent, ForgotChangePasswordComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FormlyModule.forChild({
      validationMessages: new MessagesService().getMessage(validationMessages)
    }),
    FormlyMaterialModule
  ],
  providers: [AccountService]
})
export class AccountModule { }
