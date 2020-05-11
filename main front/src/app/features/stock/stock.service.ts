import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { Stock } from './models/stock.model';

@Injectable({
    providedIn: 'root'
  })
export class StockService{
    public Quests:Array<Stock>;
    
    constructor(private client: HttpClient){ }


    public getStock(): Observable<any>{
         return this.client.get<any>(environment.apiUrl+"/stock");
    }


    public getQuest(stockId: number):Observable<any>{
      return this.client.get<any>(environment.apiUrl+"/quests/GetList/" + stockId);
    }

    public getBox(stockId: number):Observable<any>{
      return this.client.get<any>(environment.apiUrl+"/boxes/GetList/" + stockId);

    }
}