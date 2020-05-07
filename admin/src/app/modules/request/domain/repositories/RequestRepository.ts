import { Injectable } from "@angular/core";
import { BaseRepository } from "app/infrastructure/BaseRepository";
import { RequestResource } from "../resources/RequestResource";

@Injectable()
export class RequestRepository extends BaseRepository {
  constructor(resource: RequestResource) {
    super(resource);
  }
}