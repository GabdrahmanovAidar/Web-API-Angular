import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UDDateTimeDiffPipe } from "./pipe";

@NgModule({
  imports: [CommonModule],
  declarations: [UDDateTimeDiffPipe],
  exports: [UDDateTimeDiffPipe]
})
export class UDDateTimeDiffModule {
}
