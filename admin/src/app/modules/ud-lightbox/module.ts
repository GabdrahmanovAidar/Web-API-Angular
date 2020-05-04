import { NgModule } from '@angular/core';

import { UDLightboxService } from "./services/UDLightboxService";

@NgModule({})
export class UDLightboxModule {
    static forRoot() {
        return {
            ngModule: UDLightboxModule,
            providers: [UDLightboxService]
        }
    }
}
