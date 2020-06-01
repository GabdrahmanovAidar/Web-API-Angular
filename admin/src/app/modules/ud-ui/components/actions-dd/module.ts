import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap/dropdown/dropdown.module";
import { UDActionsDD } from "./component";
import { RouterModule } from "@angular/router";
import { UDNgbDropdownRepositionModule } from "app/modules/ud-ui/components/ngb-dropdown-reposition/module";

@NgModule({
  imports: [
    CommonModule,
    NgbDropdownModule,
    UDNgbDropdownRepositionModule,
    RouterModule
  ],
  declarations: [UDActionsDD],
  exports: [UDActionsDD]
})
export class UDActionsDDModule {
}
