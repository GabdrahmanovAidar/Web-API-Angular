import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from "@angular/core";

@Directive({
  selector: '[udFocus]'
})
export class UDFocus implements OnChanges {
  @Input() udFocus: boolean;

  constructor(private elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['udFocus'] && this.udFocus === true) {
      this.focusOnElement();
    }
  }

  private focusOnElement() {
    setTimeout(() => this.elementRef.nativeElement.focus(), 0);
  }
}
