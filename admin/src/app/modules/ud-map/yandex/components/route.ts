import {
  Directive, EventEmitter, OnChanges, OnDestroy, SimpleChange, Input, Output, OnInit,
  SimpleChanges
} from '@angular/core';

import { UDMapYandexRouteManager } from "app/modules/ud-map/yandex/services/router-manager";

@Directive({
  selector: 'ud-map-ya-route',
})
export class UDMapYandexRoute implements OnChanges {
  @Input() points: number[][];
  @Input() mapStateAutoApply: boolean = true;
  @Output() calc = new EventEmitter<any>();

  constructor(private routerManager: UDMapYandexRouteManager) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['points']) {
      this.initializeRoute();
    }
  }

  private initializeRoute() {
    this.routerManager.addRoute(this, this.points, { mapStateAutoApply: this.mapStateAutoApply, zoomMargin: 2 })
      .then(
        (route) => route != null && this.calc.emit(route),
        (error) => console.log(error)
      );
  }
}
