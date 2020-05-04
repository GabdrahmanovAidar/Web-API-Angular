import { NgModule } from "@angular/core";
import { ConnectionFactory } from "app/modules/connection/domain/factories/ConnectionFactory";

@NgModule({
  // imports: [],
  // providers: []
})
export class ConnectionModule {
  static forRoot() {
    return {
      ngModule: ConnectionModule,
      providers: [
        ConnectionFactory
      ]
    }
  }
}
