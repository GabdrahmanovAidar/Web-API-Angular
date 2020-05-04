import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseHttpResource } from "app/infrastructure/BaseHttpResource";
import { IUdConfig, UD_CONFIG } from "app/modules/core/domain/UD_CONFIG";

@Injectable()
export class HttpResource extends BaseHttpResource {
  constructor(httpClient: HttpClient, @Inject(UD_CONFIG) config: IUdConfig) {
    const baseUrl = process.env.BASE_API_URI;
    const defaultOptions = {
      timeOffset: true
    };

    super(baseUrl, httpClient, defaultOptions);
  }
}
