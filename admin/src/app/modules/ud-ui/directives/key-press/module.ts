import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UDKeyPressDirective } from "./directive";

@NgModule({
  imports: [CommonModule],
  declarations: [UDKeyPressDirective],
  exports: [UDKeyPressDirective]
})
export class UDKeyPressModule {}
