import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Review } from "../../models/review.model";
import { Router, ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../review.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';


@Component({
    selector: 'app-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
    @Input() product_id: number;
    @Input() type_product: string;
    @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
    selectedRadioButtonValue: string = "star";
    comment: string = "";
    form: any = {
        rating: 0,
        comment: '',
        productId: 0,
        typeProduct: '',
        userName: ''
    };
    rating: number;
    constructor(private fb: FormBuilder, private service: ReviewService) {
    }

    ngOnInit() {

    }
    

    onClick() {
        this.onChange.emit(false);
        if (this.selectedRadioButtonValue == "star0") {
            this.rating = 1;
        } else if (this.selectedRadioButtonValue == "star1") {
            this.rating = 2;
        } else if (this.selectedRadioButtonValue == "star2") {
            this.rating = 3;
        } else if (this.selectedRadioButtonValue == "star3") {
            this.rating = 4;
        } else if (this.selectedRadioButtonValue == "star4") {
            this.rating = 5;
        }
        this.form.rating = this.rating;
        this.form.comment = this.comment;
        this.form.productId = this.product_id;
        if (this.type_product == "ПОСЫЛКА") {
            this.form.typeProduct = "BOX"
        } else {
            this.form.typeProduct = "QUEST"
        }

        this.service.createReview(this.form).subscribe(res => {
        });

    }

}
