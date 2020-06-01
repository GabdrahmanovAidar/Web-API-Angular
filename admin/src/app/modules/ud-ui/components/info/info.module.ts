import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { UDInfoLabel } from "app/modules/ud-ui/components/info/label.component";
import { UDInfo } from "app/modules/ud-ui/components/info/info.component";
import { UDInfoPayload } from "app/modules/ud-ui/components/info/payload.component";

@NgModule({
  imports: [CommonModule],
  declarations: [UDInfoLabel, UDInfo, UDInfoPayload],
  exports: [UDInfoLabel, UDInfo, UDInfoPayload]
})
export class UDInfoModule {
}
