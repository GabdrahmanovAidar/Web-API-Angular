import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UDDateTimeInput } from "./component";
import { Ng2FlatpickrModule } from "ng2-flatpickr";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [CommonModule, Ng2FlatpickrModule, FormsModule],
  declarations: [UDDateTimeInput],
  exports: [UDDateTimeInput]
})
export class UDDateTimeInputModule {
}
