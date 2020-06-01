import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConfirmationService } from "primeng/api";
import { DashboardRoutesModule } from "./dashboard.routes";
import { DashboardLayoutsMain } from "./ui/layouts/main/component";
import { SharedModule } from "app/modules/shared/shared.module";
import { UDRoutesActiveModule } from "app/modules/ud-ui/directives/routes-active/module";
import { ConfirmDialogModule } from "primeng/confirmdialog";


@NgModule({
  providers: [ConfirmationService],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutesModule,
    UDRoutesActiveModule,
    ConfirmDialogModule
  ],
  exports: [SharedModule],
  declarations: [DashboardLayoutsMain]
})
export class DashboardModule {
}
