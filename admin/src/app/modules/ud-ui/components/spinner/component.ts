import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";

// import { trigger, state, style, animate, transition } from "@angular/animations";

@Component({
  selector: 'ud-spinner',
  templateUrl: './template.html',
  // animations: [
  //   trigger('inOut', [
  //     state('visible', style({ opacity: '1' })),
  //     transition("void => *", [style({ opacity: '0' }), animate('300ms ease-out')]),
  //     transition("* => void", [animate('300ms ease-out', style({ opacity: '0' }))])
  //   ])
  // ]
})
export class UDSpinner implements OnChanges {
  @Input() title: string;
  @Input() show: boolean = false;
  @Input() type: 'absolute' | 'relative' = null;
  @Input() withDelay: boolean = true;
  @Input() delayMS = 100;
  @Input() size: null|'sm'|'xs';

  private showingTimer;
  public showSpinner: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['show']) {
      if (this.withDelay) {
        if (this.show) {
          this.startShowingTimer();
        } else {
          this.destroyTimerAndHide();
        }
      } else {
        this.showSpinner = this.show;
      }
    }
  }

  private startShowingTimer() {
    if (this.showingTimer != null) {
      clearTimeout(this.showingTimer);
      this.showingTimer = null;
    }
    this.showingTimer = setTimeout(() => {
      this.showSpinner = this.show;
      this.showingTimer = null;
    }, this.delayMS);
  }

  private destroyTimerAndHide() {
    if (this.showingTimer != null) {
      clearTimeout(this.showingTimer);
      this.showingTimer = null;
    }
    this.showSpinner = false;
  }
}
