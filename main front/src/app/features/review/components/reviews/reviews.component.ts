import { Component, OnInit, Input } from '@angular/core';
import { Review } from "../../models/review.model";
import { Router, ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../review.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  @Input() productId: number;
  @Input() productType: string;
  private reviews: Array<Review>;
  constructor(private router: Router, private route: ActivatedRoute, private reviewService: ReviewService, private ngxLoader: NgxUiLoaderService) { }

  ngOnInit() {
    this.ngxLoader.start();
    this.reviewService.getReviews(this.productId, this.productType).subscribe(response => {
      console.log(response);
      this.reviews = response;
      this.ngxLoader.stop();
    })
  }
  

}
