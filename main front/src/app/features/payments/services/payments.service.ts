import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PaymentsService {

    constructor(private client: HttpClient) { }

    public createOrder(data: any) {
        return this.client.post(environment.apiUrl + "/payments", data);
    }

    public getUser() {
        return this.client.get<any>(environment.apiUrl + "/users/token");
    }
    
    public getPromoCode(code: string) {
        return this.client.get<any>(environment.apiUrl + "/PromoCode"+  '/?code=' + code)
    }
}