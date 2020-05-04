import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UDInfoTip } from "./component";
import { TooltipModule } from "primeng/tooltip";

@NgModule({
  imports: [CommonModule, TooltipModule],
  declarations: [UDInfoTip],
  exports: [UDInfoTip]
})
export class UDInfoTipModule {
}
