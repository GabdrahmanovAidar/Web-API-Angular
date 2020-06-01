import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProfileService } from '../../profile.service';


@Component({
    selector: 'app-profile-order',
    templateUrl: './profile-order.component.html',
    styleUrls: ['./profile-order.component.scss']
})
export class ProfileOrderComponent implements OnInit {
    @Output() closeWindow: EventEmitter<any> = new EventEmitter<any>();
    @Input() order: any;
    @Input() type: string;
    isClickOverview = true;
    isWayWalking = false;
    isClickCheckpionts = false;
    constructor(private profileService: ProfileService) { }

    ngOnInit() {
        this.checkWay();
        console.log(this.order);
        console.log(this.order.checkpoints[0].videoUpload.source);

    }

    public checkWay() {
        if (this.order.avaliability == "Пешком") {
            this.isWayWalking = true;
        }
    }

    public onClickOverview() {
        this.isClickCheckpionts = false;
        this.isClickOverview = true;

    }

    public close() {
       this.closeWindow.emit(false);
    }
    public onClickCheckpoionts() {
        this.isClickOverview = false;
        this.isClickCheckpionts = true;
    }
}
