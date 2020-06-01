import { Injectable, NgZone } from '@angular/core';

import { UDMapYandexGeoObjectsManager } from "app/modules/ud-map/yandex/services/geo-objects-manager";
import { UDMapYandexApiLoader } from "app/modules/ud-map/yandex/services/api-loader";

@Injectable()
export class UDMapYandexRouteManager {

  private routesMap: Map<any, Promise<any>> = new Map<any, Promise<any>>();

  constructor(private geoObjectsManager: UDMapYandexGeoObjectsManager,
              private mapApiLoader: UDMapYandexApiLoader) {
  }

  public addRoute(routeComponent: any, points, options) {
    if (points == null || points.length <= 1) {
      if (this.hasRoute(routeComponent)) {
        return this.deleteRoute(routeComponent);
      }
      return Promise.resolve(null);
    }

    return this.mapApiLoader.load().then(() => {
      return this.createRoute(points, options)
        .then((route) => {
          let routePromise;
          if (this.hasRoute(routeComponent)) {
            return this.deleteRoute(routeComponent)
              .then(() => {
                routePromise = this.geoObjectsManager.addObject(route);
                this.routesMap.set(routeComponent, routePromise);
                return routePromise;
              });
          }

          routePromise = this.geoObjectsManager.addObject(route);
          this.routesMap.set(routeComponent, routePromise);
          return routePromise;
        });
    });
  }

  public deleteRoute(routeComponent: any): Promise<void> {
    const routePromise = this.routesMap.get(routeComponent);
    return this.geoObjectsManager.deleteObject(routePromise)
      .then((result) => {
        this.routesMap.delete(routeComponent);
        return result;
      });
  }

  private createRoute(points, options): Promise<void> {
    return ymaps.route(points, options);
  }

  private hasRoute(routeComponent: any) {
    return this.routesMap.has(routeComponent);
  }
}
