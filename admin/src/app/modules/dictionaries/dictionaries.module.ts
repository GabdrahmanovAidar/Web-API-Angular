import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DictionariesResource } from "app/modules/dictionaries/domain/resources/DictionariesResource";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [DictionariesResource]
})
export class DictionariesModule {
}
