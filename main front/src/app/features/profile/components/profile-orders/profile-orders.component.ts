import { Component, OnInit, Input } from '@angular/core';
import { ProfileService } from '../../profile.service';

@Component({
  selector: 'app-profile-orders',
  templateUrl: './profile-orders.component.html',
  styleUrls: ['./profile-orders.component.scss']
})
export class ProfileOrdersComponent implements OnInit {

  orders: any;
  payments: any;
  checkIfNull = false;
  checkIsPay = false;
  isSelectRow = false;
  openReview = false;
  order: any
  type: string;
  productId: number;
  cost: string;
  description: string;
  loader = false;
  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.getOrders();
  }

  public getOrders() {
    this.profileService.getOrders().subscribe(orders => {
      this.orders = orders;
      this.checkIfNull = true;
      console.log(this.orders.list);
    })
  }
  public onChang(event) {
    this.checkIsPay = false;
    this.checkIfNull = true;
    this.isSelectRow=false;
  }
  public onPay(productId, cost, description) {
    this.loader = true;
    this.checkIsPay = true;
    this.checkIfNull = false;
    this.loader = true;
    this.cost = cost;
    this.description = description;
  }

  public onSelectRow(id: number, type: string) {
    this.profileService.getOrder(id, type).subscribe(response => {
      this.type = type;
      this.order = response;
      this.isSelectRow = true;
    })
  }
  public onClickAccept(id: number, type: string) {
    this.loader = true;
    this.type = type;
    this.productId = id;
    this.openReview = true;
    this.checkIfNull = false;
  }
  public onChange(flag: any): void {
    this.openReview = flag;
    this.checkIfNull = true;
    this.checkIsPay = false;
  }
  public closeWindow(flag: any): void {
    this.isSelectRow = flag;
    this.checkIfNull = true;
  }
}
