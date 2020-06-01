import { NgModule } from '@angular/core';
import { QuestService } from './quest.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { QuestComponent } from './components/quest/quest.component';
import {QuestRoutingModule} from './quest-routing.module';
import { BuyQuestComponent } from './components/buy-quest/buy-quest.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { ValidationMessageOption } from '@ngx-formly/core/lib/services/formly.config';
import { PresentQuestComponent } from './components/present-quest/present-quest.component';
import { ReviewModule } from '../review/review.module';
import { SharedModule } from '../../shared/shared.module';


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
    declarations: [QuestComponent, BuyQuestComponent, PresentQuestComponent],
    imports: [
      CommonModule,
      MaterialModule,
      NgxUiLoaderModule,
      QuestRoutingModule,
      SharedModule,
      FormsModule,
    ReactiveFormsModule,
    FormlyModule.forChild({
      validationMessages: getMessages()
    }),
    FormlyMaterialModule
    ],
    providers: [QuestService]
  })
  export class QuestModule { }
  