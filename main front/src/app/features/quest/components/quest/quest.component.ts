import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quest } from '../../models/quest.model';
import { QuestService } from '../../quest.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { zip } from 'rxjs';
import { Stock } from 'src/app/features/stock/models/stock.model';


@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.scss']
})
export class QuestComponent implements OnInit {

  public id: number;
  public quest: Quest;
  private isModal = false;
  isActive = false;
  stocks: Array<Stock>;
  constructor(private router: Router, private route: ActivatedRoute, private questService: QuestService, private ngxLoader: NgxUiLoaderService) { }

  ngOnInit() {
    this.getData();
  }

  public getData() {
    this.id = this.route.snapshot.params["id"];
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
      this.isActive = true;
    }
  }

  onBuyQuest(questId: number) {
    this.isModal = true;
  }
  onPresentQuest(questId: number) {
    this.router.navigateByUrl("quest/present/" + questId)
  }

}
