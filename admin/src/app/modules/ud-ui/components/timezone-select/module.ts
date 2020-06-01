import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UDTimezoneSelect } from "./component";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [CommonModule, DropdownModule, FormsModule],
  declarations: [UDTimezoneSelect],
  exports: [UDTimezoneSelect]
})
export class UDTimezoneSelectModule {
}
