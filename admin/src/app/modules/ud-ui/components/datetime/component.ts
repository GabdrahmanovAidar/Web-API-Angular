import { Component, EventEmitter, forwardRef, Input, Output } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
const moment = require('moment');

@Component({
  selector: 'ud-datetime-input',
  templateUrl: './template.html',
  styleUrls: ['./styles.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UDDateTimeInput),
      multi: true
    }
  ],
})
export class UDDateTimeInput {
  @Input() value: any;
  @Input() disableInput: any;
  @Input() options: any;
  @Input() placeholder: string = 'Выберите дату и время';
  @Input() classNames: string;

  @Output() valueChange = new EventEmitter<string>();

  public onModelChange($event): void {
    const value = this.decodeDate($event);
    this.valueChange.emit(value);
    this.onChangeCallback(value);
  }

  writeValue(value: any) {
    if (this.value !== value) {
      this.value = this.encodeDate(value);
    }
  }

  private encodeDate(date: string | null): string | null {
    if (date != null) {
      return moment.utc(date, 'YYYY-MM-DDTHH:mm:ss').local().format('DD.MM.YYYY HH:mm');
    }
    return date;
  }

  private decodeDate(date: Date[] | string | null): any {
    if (date != null) {
      if (typeof date === 'string') {
        return moment(date, 'DD.MM.YYYY HH:mm').toISOString();
      }
      return moment(date[0]).toISOString();
    }
    return date;
  }

  registerOnChange(fn) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  private onTouchedCallback: () => void = () => {
  };

  private onChangeCallback: (_: any) => void = (_: any) => {
  };
}
