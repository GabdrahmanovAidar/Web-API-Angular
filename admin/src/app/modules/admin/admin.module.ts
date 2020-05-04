import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService } from "primeng/api";
import { AdminRoutesModule } from "./admin.routes";
import { AdminLayoutsMain } from "./ui/layouts/main/component";
import { SharedModule } from "app/modules/shared/shared.module";
import { IsAdminGuard } from "app/modules/admin/domain/IsAdminGuard";
import { UDRoutesActiveModule } from "app/modules/ud-ui/directives/routes-active/module";

@NgModule({
  providers: [ConfirmationService, IsAdminGuard],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutesModule,
    UDRoutesActiveModule,
    ConfirmDialogModule
  ],
  exports: [SharedModule],
  declarations: [AdminLayoutsMain]
})
export class AdminModule {
}
