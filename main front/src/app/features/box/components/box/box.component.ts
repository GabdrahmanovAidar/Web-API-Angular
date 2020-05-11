import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Box } from '../../models/box.model';
import { BoxService } from '../../box.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Stock } from '../../models/stock.model';
import { zip } from 'rxjs';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit {

  private isModal = false;
  private id: number;
  public stocks: Array<Stock>;
  isActive = false;
  private box: Box;
  constructor(private router: Router, private route: ActivatedRoute, private boxService: BoxService, private ngxLoader: NgxUiLoaderService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    this.getData();
  }

  public getData() {
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
      this.isActive = true;
    }
  }
  onBuyBox() {
    this.isModal = true;
  }
  onPresentBox(boxId: number) {
    this.router.navigateByUrl("box/present/" + boxId)
  }

}
