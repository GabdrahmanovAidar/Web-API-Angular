import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UDPerPagePagination } from "./component";
import { UDPaginationModule } from "app/modules/ud-ui/components/pagination/module";
import { UDPerPageModule } from "app/modules/ud-ui/components/per-page/module";

@NgModule({
  imports: [CommonModule, UDPaginationModule, UDPerPageModule],
  declarations: [UDPerPagePagination],
  exports: [UDPerPagePagination]
})
export class UDPerPagePaginationModule {
}
