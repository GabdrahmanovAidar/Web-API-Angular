import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { changePasswordSchema } from './profile-change-password.schema';
import { finalize } from 'rxjs/operators';
import { ProfileService } from '../../profile.service';

@Component({
  selector: 'app-profile-change-password',
  templateUrl: './profile-change-password.component.html',
  styleUrls: ['./profile-change-password.component.scss']
})
export class ProfileChangePasswordComponent implements OnInit {

  changePassword = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];

  constructor(private ngxLoader: NgxUiLoaderService,
              private profileService: ProfileService,
              private router: Router) { }

  ngOnInit() {
    this.fields = changePasswordSchema;
  }

  submit() {
    if (this.changePassword.valid) {
      this.ngxLoader.start();
      const changePasswordModel: ChangePassword = Object.assign({}, this.changePassword.value);
      this.profileService.changePassword(changePasswordModel)
        .pipe(finalize(() => this.ngxLoader.stop()))
        .subscribe(() => {
          this.changePassword.reset();
          this.router.navigate(['profile']);
        });
    }
  }
}

interface ChangePassword {
  currentPassword: string;
  newPassword: string;
}
