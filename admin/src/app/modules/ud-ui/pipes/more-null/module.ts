import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UDMoreNullPipe } from "./pipe";

@NgModule({
  imports: [CommonModule],
  declarations: [UDMoreNullPipe],
  exports: [UDMoreNullPipe]
})
export class UDMoreNullPipeModule {
}
