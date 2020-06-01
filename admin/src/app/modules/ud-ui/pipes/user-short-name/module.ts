import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UDShortNamePipe } from "./pipe";
import { UserShortNameFormatter } from "./UserShortNameFormatter";

@NgModule({
  imports: [CommonModule],
  declarations: [UDShortNamePipe],
  exports: [UDShortNamePipe]
})
export class UDUserShortNameModule {
  static forRoot() {
    return {
      ngModule: UDUserShortNameModule,
      providers: [
        UserShortNameFormatter
      ]
    }
  }
}
