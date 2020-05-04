import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UDInputTransliterateDirective } from "./directive";

@NgModule({
  imports: [CommonModule],
  declarations: [UDInputTransliterateDirective],
  exports: [UDInputTransliterateDirective]
})
export class UDInputTransliterateModule {}
