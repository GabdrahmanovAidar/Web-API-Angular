import {
  AfterContentInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output,
  SimpleChanges
} from "@angular/core";
import { UDMapYandexMapApiWrapper } from "../services/map-api-wrapper";
import { UDMapYandexMarkerManager } from "../services/marker-manager";
import { UDMapYandexGeoObjectsManager } from "../services/geo-objects-manager";
import { UDMapYandexRouteManager } from "app/modules/ud-map/yandex/services/router-manager";
import { UDMapYandexApiLoader } from "app/modules/ud-map/yandex/services/api-loader";
import { UDMapYandexPolygonManager } from "app/modules/ud-map/yandex/services/polygon-manager";

@Component({
  selector: 'ud-map-ya',
  providers: [
    UDMapYandexMapApiWrapper,
    UDMapYandexMarkerManager,
    UDMapYandexGeoObjectsManager,
    UDMapYandexRouteManager,
    UDMapYandexPolygonManager
  ],
  template: `
    <div class="ya-map" [ngStyle]="styles">
      <ud-spinner [show]="showSpinner" [delayMS]="0" type="absolute"></ud-spinner>
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./map.styles.scss']
})
export class UDMapYandex implements OnInit, OnChanges, AfterContentInit {
  @Input() public longitude: number = 0;
  @Input() public latitude: number = 0;
  @Input() public zoom: number = 12;
  @Input() public minZoom: number;
  @Input() public maxZoom: number;
  @Input() public mapType: 'yandex#map' | 'yandex#satellite' | 'yandex#hybrid' = 'yandex#map';
  @Input() controls: string[] = ['geolocationControl', 'trafficControl', 'typeSelector', 'fullscreenControl', 'zoomControl'];
  @Input() boundToMarkers: boolean;
  @Input() styles: any;

  @Output() public mapClick = new EventEmitter<{ lat: number, lon: number }>();

  private isMapInit: boolean = false;
  public showSpinner: boolean = true;

  constructor(private elementRef: ElementRef,
              private apiLoader: UDMapYandexApiLoader,
              private apiWrapper: UDMapYandexMapApiWrapper,
              private markerManager: UDMapYandexMarkerManager,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    const container = this.elementRef.nativeElement.querySelector('.ya-map');
    this.createMapInstance(container);
    this.isMapInit = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['longitude'] || changes['latitude']) {
      this.setCenter([this.latitude, this.longitude]);
    }
  }

  ngAfterContentInit() {
    if (this.boundToMarkers) {
      this.apiLoader.load().then((ymaps) => {
        this.markerManager.getMarkers().then((markers) => {

          if (markers.length === 1) {
            const mapCenter = markers[0].geometry.getCoordinates();
            this.apiWrapper.setCenter(mapCenter);
          } else {
            // костыль
            // не будет работать при изменениях, перемещениях и тд
            const collection = new ymaps.GeoObjectCollection();
            markers.forEach((marker) => collection.add(marker));
            this.apiWrapper.addGeo(collection).then(() => {
              const bounds = collection.getBounds();
              this.apiWrapper.setBounds(bounds);
            });
          }
        });
      });
    }
  }

  public setCenter(coordinates) {
    this.apiWrapper.setCenter(coordinates);
  }

  private createMapInstance(element: HTMLElement): void {
    this.apiWrapper.createMap(element, {
      center: [this.latitude || 0, this.longitude || 0],
      zoom: this.zoom,
      type: this.mapType,
      controls: this.controls
    }).then(() => {
      this.showSpinner = false;
      this.cd.detectChanges();
    });

    this.handleMapMouseEvents();
  }

  private handleMapMouseEvents() {
    interface Emitter {
      emit(value: any): void;
    }
    interface Event { name: string; emitter: Emitter; }

    const clickEvents: Event[] = [
      { name: 'click', emitter: this.mapClick }
    ];
    // const events: Event[] = [
    //   { name: 'actiontick', emitter: this.actionTick }
    // ];

    clickEvents.forEach((e: Event) => {
      const s = this.apiWrapper.subscribeToMapEvent<{ latLng: any }>(e.name).subscribe(
        (event: any) => {
          const coords = event.get('coords');
          const value = { lat: coords[0], lng: coords[1] };
          e.emitter.emit(value);
        });
      // this._observableSubscriptions.push(s);
    });

    // events.forEach((e: Event) => {
    //   const s = this._mapsWrapper.subscribeToMapEvent<{ latLng: any }>(e.name).subscribe(
    //     (event: any) => {
    //
    //       this._mapsWrapper.getCenter().then((coords: any) => {
    //         this.latitude = coords[0];
    //         this.longitude = coords[1];
    //         const value = { lat: coords[0], lng: coords[1] } as mapTypes.MapClickMouseEvent;
    //         e.emitter.emit(value);
    //       });
    //
    //     });
    //   this._observableSubscriptions.push(s);
    // });

  }
}
