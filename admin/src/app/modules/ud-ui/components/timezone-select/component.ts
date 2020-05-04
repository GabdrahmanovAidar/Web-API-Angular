import { Component, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'ud-timezone-select',
  templateUrl: './template.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UDTimezoneSelect),
      multi: true
    }
  ],
})
export class UDTimezoneSelect implements ControlValueAccessor {
  @Input() value: any;
  @Input() disabled: any;
  @Input() placeholder: string = 'Выберите часовой пояс';

  public timezones = [
    // { label: 'UTC-12', value: '-12:00' },
    // { label: 'UTC-11', value: '-11:00' },
    // { label: 'UTC-10', value: '-10:00' },
    // { label: 'UTC-9', value: '-09:00' },
    // { label: 'UTC-8', value: '-08:00' },
    // { label: 'UTC-7', value: '-07:00' },
    // { label: 'UTC-6', value: '-06:00' },
    // { label: 'UTC-5', value: '-05:00' },
    // { label: 'UTC-4', value: '-04:00' },
    // { label: 'UTC-3:30', value: '-03:30' },
    // { label: 'UTC-3', value: '-03:00' },
    // { label: 'UTC-2', value: '-02:00' },
    // { label: 'UTC-1', value: '-01:00' },
    // { label: 'UTC+0', value: '+00:00' },
    // { label: 'UTC+1', value: '+01:00' },
    { label: 'UTC+2', value: '+02:00' },
    { label: 'UTC+3', value: '+03:00' },
    { label: 'UTC+3:30', value: '+03:30' },
    { label: 'UTC+4', value: '+04:00' },
    { label: 'UTC+4:30', value: '+04:30' },
    { label: 'UTC+5', value: '+05:00' },
    { label: 'UTC+5:30', value: '+05:30' },
    { label: 'UTC+5:45', value: '+05:45' },
    { label: 'UTC+6', value: '+06:30' },
    { label: 'UTC+7', value: '+07:00' },
    { label: 'UTC+8', value: '+08:00' },
    { label: 'UTC+8:30', value: '+08:30' },
    { label: 'UTC+8:45', value: '+08:45' },
    { label: 'UTC+9', value: '+09:00' },
    { label: 'UTC+9:30', value: '+09:30' },
    { label: 'UTC+10:00', value: '+10:00' },
    { label: 'UTC+10:30', value: '+10:30' },
    { label: 'UTC+11', value: '+11:00' },
    { label: 'UTC+12', value: '+12:00' },
    { label: 'UTC+12:45', value: '+12:45' },
    { label: 'UTC+13', value: '+13:00' },
    { label: 'UTC+14', value: '+14:00' },
  ];

  public onChange($event) {
    this.value = $event;
    this.onChangeCallback($event);
  }

  public onBlur($event) {
    this.onTouchedCallback();
  }

  writeValue(value: any) {
    if (this.value !== value) {
      this.value = value;
    }
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
