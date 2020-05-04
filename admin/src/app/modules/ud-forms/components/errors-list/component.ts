import { Component, Input } from '@angular/core';
import { AbstractControl } from "@angular/forms";

@Component({
  selector: 'ud-forms-errors-list',
  templateUrl: './template.html'
})
export class UDFormsErrorsList {
  @Input() control: AbstractControl;
  @Input() messages: object;
  @Input() styles: any;
  @Input() classNames: string;
}
