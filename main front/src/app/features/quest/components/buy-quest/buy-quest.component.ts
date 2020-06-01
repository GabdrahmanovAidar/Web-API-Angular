import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { QuestService } from '../../quest.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize } from 'rxjs/operators';
import { buyQuestSchema } from './buy-quest.schema';
import { Quest } from '../../models/quest.model';
import { Stock } from 'src/app/features/box/models/stock.model';
import { PaymentsService } from 'src/app/features/payments/services/payments.service';
import { zip } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-buy-quest',
  templateUrl: './buy-quest.component.html',
  styleUrls: ['./buy-quest.component.scss']
})
export class BuyQuestComponent implements OnInit {


  buyForm = new FormGroup({});
  model: any = {};
  private quest: Quest;
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
    city:''
  };

  constructor(private ngxLoader: NgxUiLoaderService, private questService: QuestService,
    private router: Router,private cookieService: CookieService, private paymentsService: PaymentsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.fields = buyQuestSchema;
    this.getData();
  }
  public buildData() {
    this.paymentsData.comment = this.model.comment;
    this.paymentsData.cost = this.quest.cost;
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
  public onChange(event) {
    this.isPay = false;
  }
  public onBack(){
    this.router.navigateByUrl("quest/" + this.quest.id);
  }
  submit() {
    this.isPay = true;
    this.buildData();
    this.paymentsService.createOrder(this.paymentsData)
      .subscribe(res => {
      });

  }
  public getData() {
    this.id = this.route.snapshot.params["id"]
    var result = zip(this.questService.getQuest(this.id), this.questService.getStock())
      .subscribe(([quest, stocks]) => {
        this.ngxLoader.start();
        this.quest = quest;
        this.stocks = stocks.list;
        this.selectStockForBox();
        this.ngxLoader.stop();
      });

  }
  public selectStockForBox() {
    var stocksArray = this.stocks;
    var result;
    result = stocksArray.filter(x => x.questModels.find(z => z.id == this.quest.id));
    if (result.length != 0) {
      this.quest.newCost = this.quest.cost - ((this.quest.cost / 100) * result[0].amountPercent);
      this.stockActive();
      result = null;
    }
    else {
      this.quest.newCost = this.quest.cost;
    }

  }

  public stockActive() {
    if (this.quest.newCost !== this.quest.cost) {
      this.quest.cost = this.quest.newCost;
    }
  }
}
