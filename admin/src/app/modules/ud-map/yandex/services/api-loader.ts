import { Injectable } from '@angular/core';

@Injectable()
export class UDMapYandexApiLoader {
  private scriptLoadingPromise: Promise<void>;
  private apiLoaded: boolean = false;

  public load(): Promise<any> {
    if (this.scriptLoadingPromise) {
      return this.scriptLoadingPromise;
    }
    return this.loadYandexApi();
  }

  private loadYandexApi(): Promise<any> {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = false;
    script.defer = true;
    script.id = 'YaScript';
    const callbackName: string = `YAMapsLoader${new Date().getTime()}`;
    script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU&onload=${callbackName}`;

    // tslint:disable-next-line:ban-types
    this.scriptLoadingPromise = new Promise<any>((resolve: Function, reject: Function) => {
      window[callbackName] = (a) => {
        resolve(ymaps);
        this.apiLoaded = true;
      };
      script.onload = () => {
        // resolve(ymaps);
        // this.apiLoaded = true;
      };
      script.onerror = (error: Event) => { reject(); };
    });
    document.body.appendChild(script);
    return this.scriptLoadingPromise;
  }

}
