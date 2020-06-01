import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AccessIfSystemAdminDirective } from "app/modules/access/ui/directives/if-system-admin.directive";
import { AccessIfCompanyOwnerDirective } from "app/modules/access/ui/directives/if-company-owner.directive";
import { AccessIfCarWashAdminDirective } from "app/modules/access/ui/directives/if-car-wash-admin.directive";

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    AccessIfSystemAdminDirective,
    AccessIfCompanyOwnerDirective,
    AccessIfCarWashAdminDirective
  ],
  declarations: [
    AccessIfSystemAdminDirective,
    AccessIfCompanyOwnerDirective,
    AccessIfCarWashAdminDirective
  ]
})
export class AccessModule {
}
