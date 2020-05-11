import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  public getUser() {
    return this.http.get(`${environment.apiUrl}/profile/profile`);
  }

  public getUserOrders(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/profile/getorders`);
  }

  public getOrders(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/payments/getlist`);
  }

  public changePassword(model: any) {
    return this.http.post(`${environment.apiUrl}/account/changepassword`, model);
  }

  // public update(model: any) {
  //   return this.http.post(`${environment.apiUrl}/profile/update`, model);
  // }
  public createCode(model: any) {
    return this.http.patch(environment.apiUrl + "/profile/patch", model);
  }
  public updatePhone(model: any) {
    return this.http.put(environment.apiUrl + "/profile/patchnumber", model);
  }

  public confirmEmail(userId: any, email: any) {
    return this.http.post(`${environment.apiUrl}/account/confirmAgain`, { userId, email });
  }

  public getOrder(id: number, type: string) {
    if (type == "ПОСЫЛКА") {
      return this.http.get<any>(`${environment.apiUrl}/boxes/` + id)
    } else if (type == "КВЕСТ") {
      return this.http.get<any>(`${environment.apiUrl}/quests/` + id)
    }
  }

  public updatePhoto(fd: FormData) {
    return this.http.post(`${environment.apiUrl}/profile/updatephoto`, fd);
  }
}
