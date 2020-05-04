import { Injectable, NgZone } from '@angular/core';

import { UDMapYandexMapApiWrapper } from "./map-api-wrapper";

@Injectable()
export class UDMapYandexGeoObjectsManager {
  constructor(private mapApiWrapper: UDMapYandexMapApiWrapper,
              private ngZone: NgZone) {
  }

  // todo fix не удаляется с карты маркер
  public deleteObject(objectPromise: Promise<any>): Promise<any> {
    if (objectPromise == null) {
      return Promise.resolve();
    }

    return this.ngZone.run(() => {
      return objectPromise.then((nativeObject) => {
        return this.mapApiWrapper.removeGeo(nativeObject);
      });
    });
  }

  public addObject(nativeObject: any): Promise<any> {
    return this.mapApiWrapper.addGeo(nativeObject);
  }
}
