import { NgModule } from "@angular/core";
import { HttpResource } from "./infrastructure/HttpResource";
import { httpErrorInterceptorProvider } from "./infrastructure/HttpErrorInterceptor";
import { UD_CONFIG, UdConfig } from "app/modules/core/domain/UD_CONFIG";
import { StorageService } from "app/modules/core/infrastructure/StorageService";
import { IsNotLoggedGuard } from "app/modules/core/domain/IsNotLoggedGuard";

import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap/dropdown/dropdown.module";
import { AuthModule } from "app/modules/auth/auth.module";
// import { CompaniesModule } from "app/modules/companies/companies.module";
import { UDMapModule } from "app/modules/ud-map/module";
import { UDLightboxModule } from "app/modules/ud-lightbox/module";
import { UDUserShortNameModule } from "app/modules/ud-ui/pipes/user-short-name/module";
import { ConnectionModule } from "app/modules/connection/connection.module";
// import { CarwashesModule } from "app/modules/carwashes/carwashes.module";

@NgModule({
  imports: [
    AuthModule.forRoot(),
    // CompaniesModule.forRoot(),
    UDMapModule.forRoot(),
    NgbDropdownModule.forRoot(),
    UDUserShortNameModule.forRoot(),
    UDLightboxModule.forRoot(),
    ConnectionModule.forRoot(),
    // CarwashesModule.forRoot()
  ],
  providers: [
    HttpResource,
    StorageService,
    IsNotLoggedGuard,
    { provide: UD_CONFIG, useValue: UdConfig },
    httpErrorInterceptorProvider,
  ]
})
export class CoreModule {
}
