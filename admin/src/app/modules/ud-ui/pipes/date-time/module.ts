import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UDDateTimePipe } from "./pipe";

@NgModule({
  imports: [CommonModule],
  declarations: [UDDateTimePipe],
  exports: [UDDateTimePipe]
})
export class UDDateTimeModule {
}
