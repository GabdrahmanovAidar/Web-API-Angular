import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { UDCardContent } from "./content.component";
import { UDCardHeader } from "./header.component";
import { UDCard } from "./card.component";
import { UDAnimateRollModule } from "app/modules/ud-ui/components/animate-roll/module";

@NgModule({
  imports: [
    CommonModule,
    UDAnimateRollModule
  ],
  declarations: [UDCard, UDCardContent, UDCardHeader],
  exports: [UDCard, UDCardContent, UDCardHeader]
})
export class UDCardModule {
}
