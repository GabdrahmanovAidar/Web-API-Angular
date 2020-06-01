import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Review } from './models/review.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  public Reviews: Array<Review>;
  private object: any;
  constructor(private client: HttpClient) { }

  public createReview(review: any): Observable<any> {
    return this.client.post<any>(environment.apiUrl + "/reviews/", review);
  }
  public getReviews(productId: number, productType: string): Observable<any> {

    this.object = {
      productId: productId,
      productType: productType
    }
    return this.client.get(environment.apiUrl + "/reviews?productId=" + productId + "&productType=" + productType);
  }
}