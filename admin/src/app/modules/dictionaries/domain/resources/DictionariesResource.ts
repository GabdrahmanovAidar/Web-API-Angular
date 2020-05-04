import { Injectable } from "@angular/core";

import { BaseRestResource } from "app/infrastructure/BaseRestResource";
import { HttpResource } from "app/modules/core/infrastructure/HttpResource";

@Injectable()
export class DictionariesResource extends BaseRestResource {
  constructor(httpResource: HttpResource) {
    super(httpResource, 'dictionaries');
  }
}
