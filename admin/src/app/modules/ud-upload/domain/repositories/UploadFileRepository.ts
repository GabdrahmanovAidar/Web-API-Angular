import { Injectable } from "@angular/core";
import { BaseRepository } from "app/infrastructure/BaseRepository";
import { UploadFileResource } from "app/modules/ud-upload/domain/resources/UploadFileResource";

@Injectable()
export class UploadFileRepository extends BaseRepository {
  constructor(resource: UploadFileResource) {
    super(resource);
  }
}
