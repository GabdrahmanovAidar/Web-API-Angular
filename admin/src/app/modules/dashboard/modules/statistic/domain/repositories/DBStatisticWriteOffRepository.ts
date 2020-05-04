import { Injectable } from "@angular/core";
import { BaseRepository } from "app/infrastructure/BaseRepository";
import { DBStatisticWriteOffHistoryResource } from '../resources/DBStatisticWriteOffHistoryesource';

@Injectable()
export class DBStatisticWriteOffRepository extends BaseRepository {
constructor(resource:DBStatisticWriteOffHistoryResource){
super(resource);
}

}