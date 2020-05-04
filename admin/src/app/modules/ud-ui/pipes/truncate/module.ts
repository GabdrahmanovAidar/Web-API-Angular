import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UDTruncatePipe } from "./pipe";

@NgModule({
  imports: [CommonModule],
  declarations: [UDTruncatePipe],
  exports: [UDTruncatePipe]
})
export class UDTruncateModule {
}
