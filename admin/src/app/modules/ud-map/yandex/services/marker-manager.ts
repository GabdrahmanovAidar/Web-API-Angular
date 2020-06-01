import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { UDMapYandexGeoObjectsManager } from "app/modules/ud-map/yandex/services/geo-objects-manager";
import { UDMapYandexApiLoader } from "app/modules/ud-map/yandex/services/api-loader";

declare const ymaps: any;

@Injectable()
export class UDMapYandexMarkerManager {

  private markersMap: Map<any, Promise<any>> = new Map<any, Promise<any>>();

  constructor(private ngZone: NgZone,
              private geoObjectsManager: UDMapYandexGeoObjectsManager,
              private mapLoader: UDMapYandexApiLoader) {
  }

  public deleteMarker(markerComponent: any): Promise<void> {
    const markerPromise = this.markersMap.get(markerComponent);
    return this.geoObjectsManager.deleteObject(markerPromise)
      .then((result) => {
        this.markersMap.delete(markerComponent);
        return result;
      });
  }

  public addMarker(markerComponent: any) {
    return this.mapLoader.load().then(() => {
      const marker = this.createMarker(markerComponent);
      const markerPromise = this.geoObjectsManager.addObject(marker);
      this.markersMap.set(markerComponent, markerPromise);

      return markerPromise;
    });
  }

  public showBalloon(markerComponent: any) {
    this.getNativeMarker(markerComponent)
      .then((marker: any) => {
        marker.balloon.open();
      });
  }

  public createEventObservable<T>(eventName: string, markerComponent: any): Observable<T> {
    return Observable.create((observer: Observer<T>) => {
      this.getNativeMarker(markerComponent)
        .then((marker) => {
          marker.events.add(eventName, (e: T) => this.ngZone.run(() => observer.next(e)));
        });
    });
  }

  public updateCoords(markerComponent: any): void {
    this.getNativeMarker(markerComponent)
      .then((marker: any) => {
        marker.geometry.setCoordinates([markerComponent.latitude, markerComponent.longitude]);
      });
  }

  public getNativeMarker(markerComponent): Promise<any> {
    return this.markersMap.get(markerComponent);
  }

  public getMarkers() {
    const markersPromises = [];
    this.markersMap.forEach((promise) => {
      markersPromises.push(promise);
    });

    return Promise.all(markersPromises);
  }

  private createMarker(marker): any {
    return new ymaps.Placemark([marker.latitude, marker.longitude], {
        balloonContentHeader: marker.balloonContentHeader,
        balloonContentBody: marker.balloonContentBody,
        balloonContentFooter: marker.balloonContentFooter,
        iconContent: marker.iconContent,
        hintContent: marker.hintContent
      },
      {
        draggable: marker.draggable,
        preset: marker.preset,
        iconLayout: marker.iconLayout,
        iconImageHref: marker.iconImageHref,
        iconImageSize: marker.iconImageSize,
        iconImageOffset: marker.iconImageOffset
      });
  }
}
