import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Box } from '../../models/box.model';
import { BoxService } from '../../box.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { Stock } from '../../models/stock.model';
import { observable, Observable, zip, timer } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'box-modal-window',
  templateUrl: './box-modal-window.component.html',
  styleUrls: ['./box-modal-window.component.scss']
})
export class BoxModalWindowComponent implements OnInit {

  public stocks: Array<Stock>;
  public boxes: Array<Box>;
  subscriptions: any;
  isShow = false;
  counter$: Observable<number>;
  count = 120;

  constructor(private ngxLoader: NgxUiLoaderService, private boxService: BoxService, private router: Router) {
    // while (this.count > 0) {
    //   this.counter$ = timer(0, 1000).pipe(
    //     take(this.count),
    //     map(() => --this.count)
    //   );
    // }
  }
  ngOnInit() {
    this.getData();

  }

  public getData() {
    var result = zip(this.boxService.getBoxes(), this.boxService.getStock())
      .subscribe(([boxes, stocks]) => {
        this.ngxLoader.start();
        this.boxes = boxes.list;
        this.stocks = stocks.list;
        this.selectStockForBox();
        this.ngxLoader.stop();

      });

  }
  public isShowCSS() {
    this.boxes.forEach(function (box) {
      if (box.newCost !== box.cost) {
        box.isShowCSS = true;
      }
    });
  }

  onBuyBox(id: number, newCost) {
    this.router.navigateByUrl("/box/" + id);
  }
  public selectStockForBox() {
    var stocksArray = this.stocks;
    var result;
    this.boxes.forEach(function (box) {
      result = stocksArray.filter(x => x.boxModels.find(z => z.id == box.id));
      if (result.length != 0) {
        box.newCost = box.cost - ((box.cost / 100) * result[0].amountPercent);
        result = null;
      }
      else {
        box.newCost = box.cost;
      }
    })

    this.isShowCSS();
  }
  public timer() {

  }

}