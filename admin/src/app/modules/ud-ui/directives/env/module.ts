import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UDEnvDirective } from "./directive";

@NgModule({
  imports: [CommonModule],
  declarations: [UDEnvDirective],
  exports: [UDEnvDirective]
})
export class UDEnvModule {}
