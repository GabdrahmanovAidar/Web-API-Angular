import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq/faq.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FaqService } from './faq.service';

@NgModule({
  declarations: [FaqComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: FaqComponent }]),
    MaterialModule
  ],
  providers:[FaqService]
})
export class FAQModule { }
