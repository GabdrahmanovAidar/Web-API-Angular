import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { ReviewsComponent } from '../features/review/components/reviews/reviews.component';
import { ModalOfferComponent } from '../features/modal/components/modal-offer.component';
import { PaymentsComponent } from '../features/payments/components/payments.component';


@NgModule({
  declarations: [NotFoundComponent, NavBarComponent, FooterComponent, ReviewsComponent, ModalOfferComponent, PaymentsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    MaterialModule
  ],
  providers: [],
  exports: [NotFoundComponent, NavBarComponent, FooterComponent, ReviewsComponent, ModalOfferComponent, PaymentsComponent]
})
export class SharedModule { }
