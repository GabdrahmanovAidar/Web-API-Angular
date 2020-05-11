import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from '../../stock.service';
import { Stock } from '../../models/stock.model';

@Component({
    selector: 'app-stock',
    templateUrl: './stock.component.html',
    styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
    public stocks: Stock[];

    constructor(private router: Router, private stockService: StockService) { }

    ngOnInit() {

        this.stockService.getStock().subscribe(stock => {
            this.stocks = stock;
            console.log(this.stocks);
        });

    }

    public onParticipateClick(id: number) {
        this.router.navigateByUrl("stocks/products/" + id);
    }

}
