import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../profile/profile.service';
import { PaymentsService } from '../services/payments.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Payments } from '../model/payments.model';
import { ThrowStmt } from '@angular/compiler';
import { CookieService } from 'ngx-cookie-service';


@Component({
    selector: 'app-payments',
    templateUrl: './payments.component.html',
    styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
    @Input() cost: number;
    @Input() description: string;
    @Input() timeToFinish: string;
    @Input() comment: string;
    @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
    fIO: string = "";
    email: string = "";
    phoneNumber: string = "";
    isChangeCost = false;
    isUseCurrentuserData = false;
    code: string = "";
    codeModel: any;
    color = 'red';
    checked = false;
    disabled = false;
    isGetUser = false;
    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);
    user: any;
    constructor(private router: Router, private route: ActivatedRoute, private paymentsService: PaymentsService) { }

    public useCurrenrUserData() {
        if (this.isUseCurrentuserData == false) {
            this.isUseCurrentuserData = true;
            this.fIO = this.user.lastName + " " + this.user.firstName + " " + (this.user.patronymicName === null ? " " : this.user.patronymicName);
            this.email = this.user.email;
            this.phoneNumber = this.user.phone;
        } else {
            this.isUseCurrentuserData = false;
            this.fIO = "";
            this.email = "";
            this.phoneNumber = "";
        }

    }
    public getCurrentUser() {
        this.paymentsService.getUser().subscribe(user => {
            this.user = user;
            this.isGetUser = true;
        })
    }

    ngOnInit() {
        this.getCurrentUser();
    }
   
    public onChangeCode(event: any) {
        this.code = event.target.value;
        this.paymentsService.getPromoCode(this.code).subscribe(code => {
            this.codeModel = code.list[0];
            this.changeCostOfProductWithPromoCode();
            this.isChangeCost = true;
        });
    }
    public onBack(event){
        this.onChange.emit(false);
    }

    public changeCostOfProductWithPromoCode() {
        var discount;
        if (this.codeModel != null) {
            discount = ((this.cost / 100) * this.codeModel.percent);
            this.cost = this.cost - discount;
        }
    }
}
