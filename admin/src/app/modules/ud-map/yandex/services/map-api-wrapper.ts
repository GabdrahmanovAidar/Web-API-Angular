import { Injectable, NgZone } from '@angular/core';
import { UDMapYandexApiLoader } from "./api-loader";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";

declare const ymaps: any;

@Injectable()
export class UDMapYandexMapApiWrapper {
  public map: Promise<any>;
  private mapResolver: (value?: any) => void;

  constructor(private apiLoader: UDMapYandexApiLoader,
              private zone: NgZone) {
    this.map = new Promise<any>((resolve: () => void) => {
      this.mapResolver = resolve;
    });
  }

  public createMap(el: HTMLElement, mapOptions: any): Promise<void> {
    return this.apiLoader.load().then(() => {
      const create = () => setTimeout(() => {
        if (ymaps.Map) {
          const map = new ymaps.Map(el, mapOptions);
          this.mapResolver(map);
        } else {
          create();
        }
      }, 100);
      create();
    }).catch((e) => console.log(e));
  }

  public setCenter(coordinates): Promise<void> {
    return this.map.then((map: any) => {
      map.setCenter(coordinates);
    });
  }

  public setBounds(bounds): Promise<void> {
    return this.map.then((map: any) => {
      map.setBounds(bounds);
    });
  }

  public addGeo(overlay: any): Promise<any> {
    return this.map.then((map: any) => {
      map.geoObjects.add(overlay);
      return overlay;
    });
  }

  public removeGeo(overlay: any): Promise<any> {
    return this.map.then((map: any) => {
      map.geoObjects.remove(overlay);
      return overlay;
    });
  }

  public subscribeToMapEvent<E>(eventName: string): Observable<E> {
    return Observable.create((observer: Observer<E>) => {
      this.map.then((m) => {
        m.events.add(eventName, (arg: E) => { this.zone.run(() => observer.next(arg)); });
      });
    });
  }
}
