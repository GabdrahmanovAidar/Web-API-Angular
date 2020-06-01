import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { UDBreadcrumbs } from "./component";

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [UDBreadcrumbs],
  exports: [UDBreadcrumbs]
})
export class UDBreadcrumbsModule {}
