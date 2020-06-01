import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UDRoutesActive } from "app/modules/ud-ui/directives/routes-active/directive";

@NgModule({
  imports: [CommonModule],
  declarations: [UDRoutesActive],
  exports: [UDRoutesActive]
})
export class UDRoutesActiveModule {}
