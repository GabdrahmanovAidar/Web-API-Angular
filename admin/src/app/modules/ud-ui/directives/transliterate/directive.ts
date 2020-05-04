import { Directive, ElementRef, forwardRef, HostListener, Input, Optional, Renderer2 } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel } from "@angular/forms";
import { transliterate } from "app/helpers/transliteration";

@Directive({
  selector: '[udInputTransliterate]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UDInputTransliterateDirective),
    multi: true
  }]
})
export class UDInputTransliterateDirective implements ControlValueAccessor {
  @Input() lowercase: boolean = false;
  @Input() replace: any;

  constructor(private renderer: Renderer2,
              private elementRef: ElementRef) {
  }

  @HostListener('blur', ['$event'])
  onBlur(e) {
    this.onTouchedCallback();
  }

  @HostListener('input', ['$event'])
  onInput(e) {
    const value = e.target.value;
    this.transliterate(value, true);
  }

  writeValue(value: any) {
    this.transliterate(value, false);
  }

  private transliterate(value, emit) {
    let transliteratedValue = transliterate(value);

    if (typeof transliteratedValue === 'string') {
      if (this.lowercase) {
        transliteratedValue = transliteratedValue.toLowerCase();
      }

      if (this.replace != null) {
        const repFromKeys = Object.keys(this.replace);
        repFromKeys.forEach((from) => {
          const to = this.replace[from];
          transliteratedValue = transliteratedValue.replace(new RegExp(from, 'g'), to);
        });
      }
    }

    this.renderer.setProperty(this.elementRef.nativeElement, 'value', transliteratedValue);
    this.onChangeCallback(transliteratedValue);
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
