import { Injectable } from "@angular/core";
import { BaseRepository } from "app/infrastructure/BaseRepository";
import { DBStatisticResource } from "app/modules/dashboard/modules/statistic/domain/resources/DBStatisticResource";

@Injectable()
export class DBStatisticRepository extends BaseRepository {
  constructor(statisticResource: DBStatisticResource) {
    super(statisticResource);
  }
}
