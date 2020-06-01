import { Injectable, NgZone } from '@angular/core';

import { UDMapYandexGeoObjectsManager } from "app/modules/ud-map/yandex/services/geo-objects-manager";
import { UDMapYandexApiLoader } from "app/modules/ud-map/yandex/services/api-loader";
import { Observer } from "rxjs/Observer";
import { Observable } from "rxjs/Observable";
import { UDMapYandexPolygon } from "app/modules/ud-map/yandex/components/polygon";

@Injectable()
export class UDMapYandexPolygonManager {

  private polygonsMap: Map<any, Promise<any>> = new Map<any, Promise<any>>();

  constructor(private geoObjectsManager: UDMapYandexGeoObjectsManager,
              private mapApiLoader: UDMapYandexApiLoader,
              private ngZone: NgZone) {
  }

  public addPolygon(component: any, geometry, properties, options): Promise<any> {
    return this.mapApiLoader.load().then(() => {
      const polygon = this.createPolygon(geometry, properties, options);
      let polygonPromise;
      if (this.hasPolygon(component)) {
        return this.deletePolygon(component)
          .then(() => {
            polygonPromise = this.geoObjectsManager.addObject(polygon);
            this.polygonsMap.set(component, polygonPromise);
            return polygonPromise;
          });
      }

      polygonPromise = this.geoObjectsManager.addObject(polygon);
      this.polygonsMap.set(component, polygonPromise);
      return polygonPromise;
    });
  }

  public deletePolygon(component: any): Promise<void> {
    const polygonPromise = this.polygonsMap.get(component);
    return this.geoObjectsManager.deleteObject(polygonPromise)
      .then((result) => {
        this.polygonsMap.delete(component);
        return result;
      });
  }

  public createEventObservable<T>(eventName: string, component: any): Observable<T> {
    return Observable.create((observer: Observer<T>) => {
      this.getNativePolygon(component)
        .then((polygon) => {
          polygon.events.add(eventName, (e: T) => this.ngZone.run(() => observer.next(e)));
        });
    });
  }

  public updateGeometry(component: UDMapYandexPolygon): Promise<any> {
    const polygonPromise = this.polygonsMap.get(component);
    if (!polygonPromise) {
      return Promise.resolve();
    }

    return polygonPromise.then((polygon: any) => {
      const geometry = component.geometry || [];
      polygon.geometry.setCoordinates(geometry);
      return polygon;
    });
  }

  public startEditing(component: UDMapYandexPolygon): Promise<any> {
    const polygonPromise = this.polygonsMap.get(component);
    if (!polygonPromise) {
      return Promise.resolve();
    }

    return polygonPromise.then((polygon: any) => {
      if (polygon.editor) {
        polygon.editor.startDrawing();
      }
      return polygon;
    });
  }

  private createPolygon(geometry = [], properties = {}, options): Promise<void> {
    return new ymaps.Polygon(geometry, properties, options);
  }

  private hasPolygon(component: any) {
    return this.polygonsMap.has(component);
  }

  public getNativePolygon(component): Promise<any> {
    return this.polygonsMap.get(component);
  }
}
