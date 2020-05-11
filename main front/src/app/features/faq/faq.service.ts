import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private client: HttpClient) { }

  public getFAQ(): Observable<any> {
    return this.client.get<any>(environment.apiUrl + "/FAQ");
  }

  public getSelectedRow(id:number): Observable<any> {
    return this.client.get<any>(environment.apiUrl + "/FAQ/" + id);
  }
}
