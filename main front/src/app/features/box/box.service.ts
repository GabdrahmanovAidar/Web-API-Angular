import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoxService {

  postPresent(model: any) {
    return this.client.post(`${environment.apiUrl}/presents`, model);
  }

  constructor(private client: HttpClient) { }


  public getBoxes(): Observable<any> {
    return this.client.get<any>(environment.apiUrl + '/boxes?status=ACTIVE');
  }

  public getBox(id: number): Observable<any> {
    return this.client.get<any>(environment.apiUrl + '/boxes/' + id);
  }

  public getStock(): Observable<any> {
    return this.client.get<any>(environment.apiUrl + "/stock");
  }

}