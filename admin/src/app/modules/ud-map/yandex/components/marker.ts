// tslint:disable-next-line:max-line-length
import { Directive, EventEmitter, OnChanges, OnDestroy, SimpleChange, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { UDMapYandexMarkerManager } from "../services/marker-manager";

let markerId = 0;

@Directive({
  selector: 'ud-map-ya-marker',
})

// tslint:disable-next-line:directive-class-suffix
export class UDMapYandexMarker implements OnChanges, OnDestroy {
  @Input() address: string;
  @Input() public latitude: number;
  @Input() public longitude: number;
  @Input() public hintContent: string;
  @Input() public balloonLayout: any;
  @Input() public balloonContentHeader: string;
  @Input() public balloonContentBody: string;
  @Input() public balloonContentFooter: string;
  @Input() public draggable: boolean = false;
  @Input() public preset: string = 'islands#blueIcon';
  @Input() public iconContent: string;
  @Input() public showInfo: boolean;
  @Input() public withBalloon: boolean = false;
  // default#image
  @Input() public iconLayout: any;
  @Input() public iconImageHref: any;
  // [30, 42]
  @Input() public iconImageSize: any;
  // [-5, -38]
  @Input() public iconImageOffset: any;

  @Output() public markerClick: EventEmitter<void> = new EventEmitter<void>();
  // tslint:disable-next-line:max-line-length
  @Output() public dragEnd: EventEmitter<any> = new EventEmitter<any>();

  private markerAddedToManger: boolean = false;
  private id: string;
  private observableSubscriptions: Subscription[] = [];

  constructor(private markerManager: UDMapYandexMarkerManager) {
    this.id = (markerId++).toString();
  }

  public ngOnChanges(changes: { [key: string]: SimpleChange }) {
    if (!this.markerAddedToManger) {
      this.markerManager.addMarker(this).then(() => this.addEventListeners());
      this.markerAddedToManger = true;
      return;
    } else {
      if (changes['latitude'] || changes['longitude']) {
        this.markerManager.updateCoords(this);
      }
    }
    if (changes['showInfo']) {
      this.markerManager.showBalloon(this);
    }
    if (changes['iconContent'] && this.markerAddedToManger) {
      this.markerManager.deleteMarker(this)
        .then(() => this.markerManager.addMarker(this).then(() => this.addEventListeners()));
    }
  }

  public ngOnDestroy() {
    this.markerManager.deleteMarker(this);
    this.observableSubscriptions.forEach((s) => s.unsubscribe());
  }

  private addEventListeners() {
    const cs = this.markerManager.createEventObservable('click',this).subscribe(() => {
      if (this.withBalloon) {
        this.markerManager.showBalloon(this);
      }
      this.markerClick.emit(null);
    });
    this.observableSubscriptions.push(cs);
    const ds = this.markerManager.createEventObservable<any>('dragend', this).subscribe((e: any) => {

      const thisPlacemark = e.get('target');
      const coords = thisPlacemark.geometry.getCoordinates();
      this.markerManager.getNativeMarker(this).then((m: any) => {
        this.dragEnd.emit({ lat: coords[0], lng: coords[1], nativeMarker: m } as any);
      });
    });
    this.observableSubscriptions.push(ds);
  }
}
