import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'ud-info-tip',
    templateUrl: './template.html',
    styleUrls: ['./styles.scss']
})
export class UDInfoTip {
  @Input() label: string;
}
