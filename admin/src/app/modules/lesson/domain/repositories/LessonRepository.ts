import { Injectable } from "@angular/core";
import { BaseRepository } from "app/infrastructure/BaseRepository";
import { LessonResource } from "../resources/LessonResource";

@Injectable()
export class LessonRepository extends BaseRepository {
  constructor(resource: LessonResource) {
    super(resource);
  }
}