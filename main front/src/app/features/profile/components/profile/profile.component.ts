import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from '../../profile.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  showInfo = true;
  showOrders = false;
  showUpdates = false;
  info: any;
  isPayCheck = false;
  public count: number;
  constructor(private ngxLoader: NgxUiLoaderService,
    private router: Router, private authService: AuthService, private profileService: ProfileService) { }

  ngOnInit() {
  
    this.ngxLoader.start();
    this.getOrders();
    this.profileService.getUser()
      .pipe(finalize(() => this.ngxLoader.stop()))
      .subscribe((info: any) => {
        this.info = info;
        console.log(info);
        if (info.photoUpload === null || !info.photoUpload.source) {
          this.info.photoUpload = { source: 'assets/default_profile_image.png' };
        }
      });
  }
  public close() {
   this.router.navigateByUrl("/")
  }
  uploadPhoto(event) {
    const file = event.target.files[0] as File;
    const fd = new FormData();
    this.ngxLoader.startBackground();
    fd.append('image', file, file.name);
    this.profileService.updatePhoto(fd).pipe(finalize(() => this.ngxLoader.stopBackground()))
      .subscribe((result: any) => {
        console.log(result);
        if (result.source) {
          this.info.photoUpload.source = result.source;
        } else {
          alert('pnx');
        }
      });
  }

  showInformation() {
    this.showOrders = false;
    this.showUpdates = false;
    this.showInfo = true;
  }

  showOrder() {
    this.showUpdates = false;
    this.showInfo = false;
    this.showOrders = true;
  }

  showUpdate() {
    this.showUpdates = true;
    this.showInfo = false;
    this.showOrders = false;
  }

  public getOrders() {
    this.profileService.getOrders().subscribe(orders => {
      this.count = orders.list.filter(x => x.isPay == false).length;
    })
  }
  logout() {
    this.authService.logout();
  }
  onPayChecked(isPay: boolean) {
    this.isPayCheck = isPay;
  }
}
