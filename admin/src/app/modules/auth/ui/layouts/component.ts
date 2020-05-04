import { Component } from "@angular/core";

@Component({
    selector: 'auth-layouts-base',
    templateUrl: './template.html',
    styleUrls: ['./styles.scss']
})
export class AuthLayoutsBase {
    public currentYear: number;
    ngOnInit() {
        this.currentYear = (new Date()).getFullYear();
    }
}
