import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { UDFormsControl } from "./components/control/component";
import { UDFormsControlsWrap } from "./components/controls-wrap/component";
import { UDFormsErrorsList } from "./components/errors-list/component";
import { UDFormsLabel } from "./components/label/component";
import { UDFormsErrorMessagesPipe } from "./pipes/error-messages.pipe";
import { DisableControlDirective } from "app/modules/ud-forms/directives/disable-control.directive";
import { UDFormsError } from "app/modules/ud-forms/components/error/component";
import { UDAnimateRollModule } from "app/modules/ud-ui/components/animate-roll/module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UDAnimateRollModule
  ],
  declarations: [
    UDFormsControl,
    UDFormsControlsWrap,
    UDFormsErrorsList,
    UDFormsErrorMessagesPipe,
    UDFormsLabel,
    DisableControlDirective,
    UDFormsError
  ],
  exports: [
    UDFormsControl,
    UDFormsControlsWrap,
    UDFormsErrorsList,
    UDFormsLabel,
    UDFormsError,
    DisableControlDirective,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UDFormsModule {
}
