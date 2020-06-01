import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { UDAccordionContent } from "./content.component";
import { UDAccordion } from "./accordion.component";
import { UDAccordionHeader } from "./header.component";

@NgModule({
  imports: [CommonModule],
  declarations: [UDAccordion, UDAccordionContent, UDAccordionHeader],
  exports: [UDAccordion, UDAccordionContent, UDAccordionHeader]
})
export class UDAccordionModule {
}
