import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'ud-card',
  templateUrl: './template.html',
  styleUrls: ['./styles.scss'],
  animations: [
    trigger('cardContent', [
      state('hidden', style({
        height: '0',
        overflow: 'hidden'
      })),
      state('visible', style({
        height: '*',
        overflow: 'visible'
      })),
      transition('visible <=> hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class UDCard implements OnChanges {
  @Input() allowToggle: boolean = false;
  @Input() noPadding: boolean = false;
  @Input() type: 'default' | 'border' = 'default';
  @Input() opened: boolean = true;
  @Input() theme: string;
  @Output() toggleDone = new EventEmitter<{ originalEvent: Event, opened: boolean }>();
  @Output() openedChange = new EventEmitter<boolean>();

  public animating: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['opened']) {
      this.animating = true;
    }
  }

  public onToggleDone(event: Event): void {
    this.animating = false;
    this.toggleDone.emit({ originalEvent: event, opened: this.opened })
  }

  public onToggleClicked($event): void {
    $event.preventDefault();
    this.animating = true;
    this.opened = !this.opened;
    this.openedChange.emit(this.opened);
  }
}
