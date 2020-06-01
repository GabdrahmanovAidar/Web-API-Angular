import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UDNumberSpacingPipe } from "./pipe";

@NgModule({
  imports: [CommonModule],
  declarations: [UDNumberSpacingPipe],
  exports: [UDNumberSpacingPipe]
})
export class UDNumberSpacingModule {
}
