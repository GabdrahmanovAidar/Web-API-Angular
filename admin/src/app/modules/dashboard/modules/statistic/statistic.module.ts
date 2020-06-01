import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UDCardModule } from "app/modules/ud-ui/components/card/card.module";
import { UDNumberSpacingModule } from "app/modules/ud-ui/pipes/number-spacing/module";
import { UDSpinnerModule } from "app/modules/ud-ui/components/spinner/module";
import { ChartModule } from "primeng/chart";
import { UDFormsModule } from "app/modules/ud-forms/ud-forms.module";
import { Ng2FlatpickrModule } from "ng2-flatpickr";
import { DBStatisticRepository } from "app/modules/dashboard/modules/statistic/domain/repositories/DBStatisticRepository";
import { DBStatisticResource } from "app/modules/dashboard/modules/statistic/domain/resources/DBStatisticResource";
import { DBStatisticRoutesModule } from "app/modules/dashboard/modules/statistic/statistic.routes";
import { DBStatisticPagesStatistic } from "app/modules/dashboard/modules/statistic/ui/pages/statistic/component";
import { CompanyPaymentsListModule } from "app/modules/companies/ui/components/company-payments-list/module";
import { DBStatisticPaymentHistoryResource } from './domain/resources/DBStatisticPaymentHistoryResource';
import { DBStatisticPaymentRepository } from './domain/repositories/DBStatisticPaymentRepository';
import { DBStatisticWriteOffHistoryResource } from './domain/resources/DBStatisticWriteOffHistoryesource';
import { DBStatisticWriteOffRepository } from './domain/repositories/DBStatisticWriteOffRepository';



@NgModule({
  providers: [
    DBStatisticRepository,
    DBStatisticResource,
    DBStatisticPaymentHistoryResource,
    DBStatisticPaymentRepository,
    DBStatisticWriteOffHistoryResource,
    DBStatisticWriteOffRepository
  ],
  imports: [
    CommonModule,
    DBStatisticRoutesModule,
    UDCardModule,
    UDNumberSpacingModule,
    UDFormsModule,
    UDSpinnerModule,
    ChartModule,
    Ng2FlatpickrModule,
    CompanyPaymentsListModule
  ],
  declarations: [DBStatisticPagesStatistic]
})
export class DBStatisticModule {
}
