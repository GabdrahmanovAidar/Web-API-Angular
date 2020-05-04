import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DialogModule } from "primeng/dialog";

import { UDCardModule } from "app/modules/ud-ui/components/card/card.module";
import { UDActionsDDModule } from "app/modules/ud-ui/components/actions-dd/module";
import { UDBreadcrumbsModule } from "app/modules/ud-ui/components/breadcrumbs/module";
import { UDFormsModule } from "app/modules/ud-forms/ud-forms.module";

import { UDTimezoneSelectModule } from "app/modules/ud-ui/components/timezone-select/module";
import { UDPaginationModule } from "app/modules/ud-ui/components/pagination/module";
import { UDPerPagePaginationModule } from "app/modules/ud-ui/components/per-page-pagination/module";
import { EntityFilterModule } from "app/modules/entity-filter/entity-filter.module";
import { UDSpinnerModule } from "app/modules/ud-ui/components/spinner/module";
import { UDPaginatorModule } from "app/modules/ud-ui/directives/paginator/module";
import { UDKeyPressModule } from "app/modules/ud-ui/directives/key-press/module";
import { UDEmptyTableModule } from "app/modules/ud-ui/components/empty-table/module";
import { UDInfoTipModule } from "app/modules/ud-ui/components/info-tip/module";
import { DBSettingsRoutesModule } from "app/modules/dashboard/modules/settings/settings.routes";
import { DBSettingsPagesIndex } from "app/modules/dashboard/modules/settings/ui/pages/index/component";
import { DBSettingsComponentsDBSettingsForm } from "app/modules/dashboard/modules/settings/ui/components/settings-form/component";
import { InputMaskModule } from "primeng/inputmask";

@NgModule({
  imports: [
    CommonModule,
    DBSettingsRoutesModule,
    UDActionsDDModule,
    UDBreadcrumbsModule,
    UDCardModule,
    UDFormsModule,
    UDTimezoneSelectModule,
    UDPaginationModule,
    UDPerPagePaginationModule,
    EntityFilterModule,
    UDSpinnerModule,
    UDPaginatorModule,
    UDKeyPressModule,
    UDEmptyTableModule,
    UDInfoTipModule,
    DialogModule,
    InputMaskModule
  ],
  declarations: [
    DBSettingsPagesIndex,
    DBSettingsComponentsDBSettingsForm
  ]
})
export class DBSettingsModule {
}
