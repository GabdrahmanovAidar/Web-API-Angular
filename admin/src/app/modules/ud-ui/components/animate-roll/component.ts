import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'ud-animate-roll',
  templateUrl: './template.html',
  styleUrls: ['./styles.scss'],
  animations: [
    trigger('content', [
      state('hidden', style({
        height: '0',
        overflow: 'hidden'
      })),
      state('visible', style({
        height: '*',
        overflow: 'visible'
      })),
      transition('visible <=> hidden', animate('550ms cubic-bezier(0.63, 0, 0.32, 1)'))
    ])
  ]
})
export class UDAnimateRoll implements OnChanges {
  @Input() opened: boolean = false;
  @Output() hide = new EventEmitter<void>();
  @Output() show = new EventEmitter<void>();

  public isOpened: boolean;
  private animating: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['opened']) {
      this.isOpened = changes['opened'].currentValue;
      this.animating = true;
    }
  }

  public onToggleDone(event: any): void {
    if (event.fromState === 'visible' && event.toState === 'hidden') {
      this.hide.emit();
    }
    if (event.fromState === 'hidden' && event.toState === 'visible') {
      this.show.emit();
    }
    this.animating = false;
  }
}
