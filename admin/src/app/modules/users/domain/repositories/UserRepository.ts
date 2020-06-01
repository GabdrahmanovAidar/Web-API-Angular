import { Injectable } from "@angular/core";
import { BaseRepository } from "app/infrastructure/BaseRepository";
import { UserResource } from "../resources/UserResource";

@Injectable()
export class UserRepository extends BaseRepository {
  constructor(resource: UserResource) {
    super(resource);
  }
}