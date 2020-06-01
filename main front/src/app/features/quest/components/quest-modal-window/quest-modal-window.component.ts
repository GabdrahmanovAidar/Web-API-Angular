import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Quest } from '../../models/quest.model';
import { QuestService } from '../../quest.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { Stock } from 'src/app/features/box/models/stock.model';
import { zip } from 'rxjs';

@Component({
  selector: 'quest-modal-window',
  templateUrl: './quest-modal-window.component.html',
  styleUrls: ['./quest-modal-window.component.scss']
})
export class QuestModalWindowComponent implements OnInit {


  public quests: Array<Quest>;
  public stocks: Array<Stock>;
  subscriptions: any;
  isShow = false;
  constructor(private ngxLoader: NgxUiLoaderService, private questService: QuestService, private router: Router) { }
  ngOnInit() {
    this.getData();
  }

  onBuyQuest(id: number) {
    this.router.navigateByUrl("/quest/" + id);
  }
  public selectStockForBox() {
    var stocksArray = this.stocks;
    var result;
    this.quests.forEach(function (quest) {
      debugger;
      result = stocksArray.filter(x => x.questModels.find(z => z.id == quest.id));
      if (result.length != 0) {
        quest.newCost = quest.cost - ((quest.cost / 100) * result[0].amountPercent);
        result = null;
      }
      else {
        quest.newCost = quest.cost;
      }
    })

    this.isShowCSS();
  }

  public isShowCSS() {
    
    this.quests.forEach(function (quest) {
      if (quest.newCost !== quest.cost) {
        quest.isShowCSS = true;
      }
    });
  }

  public getData() {
    var result = zip(this.questService.getQuests(), this.questService.getStock())
      .subscribe(([quests, stocks]) => {
        this.ngxLoader.start();
        this.quests = quests.list;
        this.stocks = stocks.list;
        this.selectStockForBox();
        this.ngxLoader.stop();

      });
  }
}  