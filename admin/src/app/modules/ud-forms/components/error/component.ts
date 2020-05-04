import { Component, Input } from '@angular/core';

@Component({
  selector: 'ud-forms-error',
  templateUrl: './template.html',
  styleUrls: ['./styles.scss']
})
export class UDFormsError {
  @Input() styles: any;
  @Input() classNames: string;
}
