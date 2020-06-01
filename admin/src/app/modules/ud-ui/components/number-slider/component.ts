import {
  Component, ElementRef, forwardRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges,
  ViewChild
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

// import noUiSlider from "nouislider";
const noUiSlider = require('nouislider');

@Component({
  selector: 'ud-number-slider',
  templateUrl: './template.html',
  styleUrls: ['./styles.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UDNumberSlider),
      multi: true
    }
  ],
})
export class UDNumberSlider implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {
  @Input() value: any;
  @Input() disableInput: any;
  @Input() options: any;
  @Input() placeholder: string = 'Укажите число';

  @ViewChild('slider') slider: ElementRef;

  ngOnInit() {
    noUiSlider.create(
      this.slider.nativeElement,
      Object.assign({}, this.options, { start: this.options.range.min })
    );

    this.slider.nativeElement.noUiSlider.on('update', (values, handle) => {
      this.value = values[handle];
      this.onTouchedCallback();
      this.onChangeCallback(this.value);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['disableInput']) {
      if (this.disableInput) {
        this.slider.nativeElement.setAttribute('disabled', true);
      } else {
        this.slider.nativeElement.removeAttribute('disabled');
      }
    }
  }

  ngOnDestroy() {
    // todo destroy noUiSlider
  }

  public onInputChange(value) {
    this.slider.nativeElement.noUiSlider.set([null, value]);
    this.onChangeCallback(value);
  }

  public onBlur($event) {
    this.onTouchedCallback();
  }

  writeValue(value: any) {
    if (this.value !== value) {
      this.value = value;
      this.slider.nativeElement.noUiSlider.set([null, value]);
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
