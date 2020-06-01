import { Injectable } from "@angular/core";
import { BaseRepository } from "app/infrastructure/BaseRepository";
import { AdminStatisticResource } from "app/modules/admin/modules/statistic/domain/resources/AdminStatisticResource";

@Injectable()
export class AdminStatisticRepository extends BaseRepository {
  constructor(statisticResource: AdminStatisticResource) {
    super(statisticResource);
  }
}
