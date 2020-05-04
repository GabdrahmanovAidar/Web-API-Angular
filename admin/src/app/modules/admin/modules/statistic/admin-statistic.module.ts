import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminStatisticRoutesModule } from "./admin-statistic.routes";
import { AdminStatisticPagesAdminStatistic } from "./ui/pages/statistic/component";
import { UDCardModule } from "app/modules/ud-ui/components/card/card.module";
import { UDNumberSpacingModule } from "app/modules/ud-ui/pipes/number-spacing/module";
import { UDSpinnerModule } from "app/modules/ud-ui/components/spinner/module";
import { ChartModule } from "primeng/chart";
import { UDFormsModule } from "app/modules/ud-forms/ud-forms.module";
import { Ng2FlatpickrModule } from "ng2-flatpickr";
import { AdminStatisticRepository } from "app/modules/admin/modules/statistic/domain/repositories/AdminStatisticRepository";
import { AdminStatisticResource } from "app/modules/admin/modules/statistic/domain/resources/AdminStatisticResource";

@NgModule({
  providers: [
    AdminStatisticRepository,
    AdminStatisticResource
  ],
  imports: [
    CommonModule,
    AdminStatisticRoutesModule,
    UDCardModule,
    UDNumberSpacingModule,
    UDFormsModule,
    UDSpinnerModule,
    ChartModule,
    Ng2FlatpickrModule
  ],
  declarations: [AdminStatisticPagesAdminStatistic]
})
export class AdminStatisticModule {
}
