import { Injectable } from "@angular/core";
import { BaseRepository } from "app/infrastructure/BaseRepository";
import { CourseResource } from "../resources/CourseResource";

@Injectable()
export class CourseRepository extends BaseRepository {
  constructor(resource: CourseResource) {
    super(resource);
  }
}