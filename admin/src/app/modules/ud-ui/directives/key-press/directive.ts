import {
  Directive, EventEmitter, OnDestroy, OnInit, Output, Renderer2
} from "@angular/core";

@Directive({
  selector: 'ud-keypress'
})
export class UDKeyPressDirective implements OnDestroy, OnInit {
  @Output() leftArrowPress = new EventEmitter<Event>();
  @Output() rightArrowPress = new EventEmitter<Event>();
  @Output() upArrowPress = new EventEmitter<Event>();
  @Output() downArrowPress = new EventEmitter<Event>();

  private KEY_CODES = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
  };

  private eventListener;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {
    this.setupKeyDownListener();
  }

  ngOnDestroy() {
    this.eventListener();
  }

  private setupKeyDownListener(): void {
    this.eventListener = this.renderer.listen('window', 'keydown', (event) => {
      switch (event.keyCode) {
        case this.KEY_CODES.LEFT:
          this.leftArrowPress.emit(event);
          break;
        case this.KEY_CODES.UP:
          this.upArrowPress.emit(event);
          break;
        case this.KEY_CODES.RIGHT:
          this.rightArrowPress.emit(event);
          break;
        case this.KEY_CODES.DOWN:
          this.downArrowPress.emit(event);
          break;
      }
    });
  }

}
