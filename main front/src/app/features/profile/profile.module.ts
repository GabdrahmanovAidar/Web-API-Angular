import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileOrdersComponent } from './components/profile-orders/profile-orders.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileService } from './profile.service';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileChangePasswordComponent } from './components/profile-change-password/profile-change-password.component';
import { FormlyModule } from '@ngx-formly/core';
import MessagesService from 'src/app/services/messages.service';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileOrderComponent } from './components/profile-order/profile-order.component';
import { ProfileUpdateComponent } from './components/profile-update/profile-update.component';
import { ReviewComponent } from '../review/components/review/review.component';
import { ModalPhoneComponent } from './components/profile-modal/components/modal-phone.component';

declare var require: any;
const validationMessages = require('./validation-messages.json');

@NgModule({
  declarations: [ProfileComponent, ProfileOrdersComponent, ProfileInfoComponent, ProfileChangePasswordComponent, ProfileOrderComponent, ProfileUpdateComponent, ReviewComponent,ModalPhoneComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MaterialModule,
    SharedModule,
    FormlyModule.forChild({
      validationMessages: new MessagesService().getMessage(validationMessages)
    }),
    FormlyMaterialModule
  ],
  providers: [ProfileService]
})
export class ProfileModule { }
