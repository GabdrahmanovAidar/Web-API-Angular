import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DBDBLegalInfoRoutesModule } from "app/modules/dashboard/modules/legal-info/legal-info.routes";
import { DBLegalInfoPagesIndex } from "app/modules/dashboard/modules/legal-info/ui/pages/index/component";
import { UDCardModule } from "app/modules/ud-ui/components/card/card.module";

@NgModule({
  imports: [
    CommonModule,
    DBDBLegalInfoRoutesModule,
    UDCardModule
  ],
  declarations: [DBLegalInfoPagesIndex]
})
export class DBLegalInfoModule {
}
