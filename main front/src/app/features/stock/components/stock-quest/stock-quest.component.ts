import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StockService } from '../../stock.service';
import { Quest } from 'src/app/features/quest/models/quest.model';
import { Box } from 'src/app/features/box/models/box.model';
import { ReviewService } from 'src/app/features/review/review.service';


@Component({
    selector: 'app-stock-quest',
    templateUrl: './stock-quest.component.html',
    styleUrls: ['./stock-quest.component.scss']
})
export class StockQuestComponent implements OnInit {
    public quests: Array<Quest>;
    public boxes: Array<Box>;
    public reviews: any;

    constructor(private router: Router, private route: ActivatedRoute, private stockService: StockService, private review: ReviewService) { }

    ngOnInit() {
        this.loadBox();
        this.loadQuest();
    }

    public loadQuest(): void {
        const stockId = this.route.snapshot.params['id'];
        this.stockService.getQuest(stockId).subscribe(quests => {
            this.quests = quests.list;
            console.log(this.quests);
        });
    }


    public loadBox(): void {
        const stockId = this.route.snapshot.params['id'];
        this.stockService.getBox(stockId).subscribe(boxes => {
            this.boxes = boxes.list;
        });
    }

    public onClickBox(id: number) {
        this.router.navigateByUrl("box/" + id);
    }

    public onClickQuest(id: number) {
        this.router.navigateByUrl("quest/" + id);
    }




}