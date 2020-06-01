import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import { UDCardModule } from "app/modules/ud-ui/components/card/card.module";
import { EntityFilter } from "./ui/components/filter/component";
import { EntityFilterItem } from "./ui/components/filter/item/component";
import { EntityFilterKind } from "./ui/components/filter-kind/component";
import { EntityFilterKindInput } from "./ui/components/filter-kind/input/component";

@NgModule({
  imports: [
    CommonModule,
    UDCardModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    EntityFilter,
    EntityFilterItem,
    EntityFilterKind,
    EntityFilterKindInput
  ],
  exports: [EntityFilter]
})
export class EntityFilterModule {
}
