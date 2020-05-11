import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public isVisibleQuest:boolean=false;
  public isVisibleBox:boolean=false;

  constructor() { }

  ngOnInit() {
  }

  public onBuyQuestClick(){
    this.isVisibleQuest = true;
  }

  public onBuyBoxClick(){
    this.isVisibleBox = true;
  }

}
