import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UDPaginatorDirective } from "app/modules/ud-ui/directives/paginator/directive";

@NgModule({
  imports: [CommonModule],
  declarations: [UDPaginatorDirective],
  exports: [UDPaginatorDirective]
})
export class UDPaginatorModule {}
