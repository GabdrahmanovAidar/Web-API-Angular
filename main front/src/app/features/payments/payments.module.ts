import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { PaymentsComponent } from './components/payments.component';
import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsService } from './services/payments.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
      PaymentsComponent
    ],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [PaymentsService]
})
export class PaymentsModule { }
