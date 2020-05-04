import { Injectable } from "@angular/core";
import { BaseRepository } from "app/infrastructure/BaseRepository";
import { AdminSettingsResource } from "app/modules/admin/modules/settings/domain/resources/AdminSettingsResource";

@Injectable()
export class AdminSettingsRepository extends BaseRepository {
  constructor(resource: AdminSettingsResource) {
    super(resource);
  }
}
