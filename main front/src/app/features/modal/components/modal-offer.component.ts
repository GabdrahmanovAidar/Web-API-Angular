import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'app-modal-offer',
    templateUrl: './modal-offer.component.html',
    styleUrls: ['./modal-offer.component.scss']
})
export class ModalOfferComponent implements OnInit {

    @Input() id: number;
    @Input() type: string;
    constructor(private router: Router) { }

    ngOnInit() {

    }

    onClickAccept() {
        if (this.type == "box") {
            this.router.navigateByUrl("box/buy/" + this.id)
        } else if(this.type == "quest"){
            this.router.navigateByUrl("quest/buy/" + this.id)
        }

    }
}
