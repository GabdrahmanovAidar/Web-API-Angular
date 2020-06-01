import { Injectable } from "@angular/core";
import { UploadImage } from '../interfaces/UploadImage';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { UploadVideo } from '../interfaces/UploadVideo';

@Injectable()
export class UploadFactory {
  public createEmptyImage(): UploadImage {
    return {
      extension: '',
      source: '',
      size_in_bytes: 0,
      width: 0,
      height: 0,
      id: ''
    };
  }

  public CreateEmptyVideo(): UploadVideo {
    return {
      extension: '',
      source: '',
      size_in_bytes: 0,
      width: 0,
      height: 0,
      id: '',
      duration: 0,
      contentType: ''
    }
  }
}
