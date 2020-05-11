import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Observable, timer } from 'rxjs';
import { take, map } from 'rxjs/operators';


@Component({
    selector: 'app-modal-phone',
    templateUrl: './modal-phone.component.html',
    styleUrls: ['./modal-phone.component.scss']
})
export class ModalPhoneComponent implements OnInit {

    //@Output() isModal = false;
    @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
    @Input() code: any;
    private isVisibleError: boolean;
    private codeInput: number;
    counter$: Observable<number>;
    count = 5;
    counter = 0;
    isError = false;


    constructor(private router: Router) {
      debugger;
        this.counter$ = timer(0, 1000).pipe(
            take(this.count),
            map(() => --this.count)
        );
        
       

    }

    ngOnInit() {
        
        this.isVisibleError = false;
        
       
    }

    onSubmit(state: any) {
    
        if (this.count == 5|| this.count == 0) {
            debugger;
            if(this.count == 0){
                this.counter = 0;
                this.count = 5;
            }
            if (this.code == this.codeInput) {
                
                this.isVisibleError = false;
                this.onChange.emit(state);

            }
            else {
                this.counter += 1;
                this.isVisibleError = true;
            }
        }
        else {

        }
    }
}

