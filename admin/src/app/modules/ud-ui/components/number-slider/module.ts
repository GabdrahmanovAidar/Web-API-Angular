import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UDNumberSlider } from "./component";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [CommonModule, DropdownModule, FormsModule],
  declarations: [UDNumberSlider],
  exports: [UDNumberSlider]
})
export class UDNumberSliderModule {
}
