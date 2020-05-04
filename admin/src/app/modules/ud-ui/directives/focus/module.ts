import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UDFocus } from "app/modules/ud-ui/directives/focus/directive";

@NgModule({
  imports: [CommonModule],
  declarations: [UDFocus],
  exports: [UDFocus]
})
export class UDFocusModule {}
