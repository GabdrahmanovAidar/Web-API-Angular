import { Injectable } from "@angular/core";
import { BaseRepository } from "app/infrastructure/BaseRepository";
import {DBStatisticPaymentHistoryResource} from "../resources/DBStatisticPaymentHistoryResource";

@Injectable()
export class DBStatisticPaymentRepository extends BaseRepository {
constructor(resource:DBStatisticPaymentHistoryResource){
super(resource);
}

}