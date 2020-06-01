import { NgModule } from "@angular/core";
import { AccessModule } from "app/modules/access/auth.module";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    AccessModule,
    RouterModule,
  ],
  exports: [
    AccessModule,
    RouterModule,
  ]
})
export class SharedModule {

}