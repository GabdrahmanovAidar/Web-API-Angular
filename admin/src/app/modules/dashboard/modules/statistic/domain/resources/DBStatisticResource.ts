import { Injectable } from "@angular/core";

import { BaseRestResource } from "app/infrastructure/BaseRestResource";
import { HttpResource } from "app/modules/core/infrastructure/HttpResource";

@Injectable()
export class DBStatisticResource extends BaseRestResource {
  constructor(httpResource: HttpResource) {
    super(httpResource, 'statistics');
  }
}
