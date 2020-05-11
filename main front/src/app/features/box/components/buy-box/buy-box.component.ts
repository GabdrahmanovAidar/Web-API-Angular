import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { BoxService } from '../../box.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize } from 'rxjs/operators';
import { zip } from 'rxjs';
import { buyBoxSchema } from './buy-box.schema';
import { Box } from '../../models/box.model';
import { PaymentsService } from 'src/app/features/payments/services/payments.service';
import { Stock } from '../../models/stock.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-buy-box',
  templateUrl: './buy-box.component.html',
  styleUrls: ['./buy-box.component.scss']
})
export class BuyBoxComponent implements OnInit {

  buyForm = new FormGroup({});
  model: any = {};
  private box: Box;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  private isPay = false;
  private id: number;
  public stocks: Array<Stock>;
  paymentsData = {
    comment: '',
    cost: 0,
    type: '',
    productId: 0,
    delivelerTime: '',
    city: ''
  };
  isActive = false;
  constructor(private ngxLoader: NgxUiLoaderService, private paymentsService: PaymentsService,
    private cookieService: CookieService, private route: ActivatedRoute, private boxService: BoxService, private router: Router) { }

  ngOnInit() {
    this.fields = buyBoxSchema;
    this.getData();
  }
  public buildData() {
    this.paymentsData.comment = this.model.comment;
    this.paymentsData.cost = this.box.cost;
    this.paymentsData.type = this.router.url.split('/')[1].toUpperCase();
    this.paymentsData.productId = this.route.snapshot.params["id"];
    this.paymentsData.delivelerTime = this.model.time;
    if (this.cookieService.get('city') !== '') {
      this.paymentsData.city = this.cookieService.get('city');
    }
    else{
      this.paymentsData.city = "Город не определен" 
    }
  }
  submit() {
    this.isPay = true;
    this.buildData();
    this.paymentsService.createOrder(this.paymentsData)
      .subscribe(res => {
      });

  }
  public onBack() {
    this.router.navigateByUrl("box/" + this.box.id);
  }
  public onChange(event) {
    this.isPay = false;
  }
  public getData() {
    this.id = this.route.snapshot.params["id"]
    var result = zip(this.boxService.getBox(this.id), this.boxService.getStock())
      .subscribe(([box, stocks]) => {
        this.ngxLoader.start();
        this.box = box;
        this.stocks = stocks.list;
        this.selectStockForBox();
        this.ngxLoader.stop();
      });

  }
  public selectStockForBox() {
    var stocksArray = this.stocks;
    var result;
    result = stocksArray.filter(x => x.boxModels.find(z => z.id == this.box.id));
    if (result.length != 0) {
      this.box.newCost = this.box.cost - ((this.box.cost / 100) * result[0].amountPercent);
      this.stockActive();
      result = null;
    }
    else {
      this.box.newCost = this.box.cost;
    }

  }

  public stockActive() {
    if (this.box.newCost !== this.box.cost) {
      this.box.cost == this.box.newCost;
    }
  }
}
