import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UDHighlightPipe } from "./pipe";

@NgModule({
  imports: [CommonModule],
  declarations: [UDHighlightPipe],
  exports: [UDHighlightPipe]
})
export class UDHighlightPipeModule {
}
