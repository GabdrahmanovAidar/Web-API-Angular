import { NgModule } from '@angular/core';
import { ReviewService } from './review.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ReviewRoutingModule } from './review-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { ValidationMessageOption } from '@ngx-formly/core/lib/services/formly.config';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ReviewComponent } from './components/review/review.component';

declare var require: any;



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    NgxUiLoaderModule,
    ReviewRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyMaterialModule
  ],
  providers: [ReviewService],
})
export class ReviewModule { }
