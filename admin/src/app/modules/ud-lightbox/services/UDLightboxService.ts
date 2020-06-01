import { Injectable } from "@angular/core";
import { UDLightboxApi } from "../classes/UDLightboxApi";

declare function lightGallery(el: Element, options: any): void;

require('lightgallery.js');
require('lg-fullscreen.js');
require('lg-thumbnail.js');
require('lightgallery.js/dist/css/lightgallery.css');
// require('../styles/override.css');

@Injectable()
export class UDLightboxService {

  public fullScreen(images, el?): UDLightboxApi {
    const element = el || this.createEmptyElement();
    lightGallery(element, {
      dynamic: true,
      dynamicEl: images,
      thumbnail: true
    });
    return new UDLightboxApi(element);
  }

  private createEmptyElement() {
    return document.createElement('div');
  }
}
