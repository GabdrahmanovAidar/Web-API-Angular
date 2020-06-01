import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Quest } from './models/quest.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestService {
  public Quests: Array<Quest>;
  constructor(private client: HttpClient) { }


  public getQuests(): Observable<any> {
    return this.client.get<any>(environment.apiUrl + '/quests?status=ACTIVE');
  }
  public getQuest(id: number): Observable<any> {
    return this.client.get<any>(environment.apiUrl + '/quests/' + id);
  }

  public getStock(): Observable<any> {
    return this.client.get<any>(environment.apiUrl + '/stock');
  }

  public postPresent(model: any) {
    return this.client.post(`${environment.apiUrl}/presents`, model);
  }
}