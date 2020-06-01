import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AccountService } from '../../account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { fogotChangePassword } from './forgot-change-password.schema';

@Component({
  selector: 'app-forgot-change-password',
  templateUrl: './forgot-change-password.component.html',
  styleUrls: ['./forgot-change-password.component.scss']
})
export class ForgotChangePasswordComponent implements OnInit {

  forgotForm = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  canActivate: boolean;
  userId: number;
  code: string;

  constructor(private ngxLoader: NgxUiLoaderService,
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.fields = fogotChangePassword;
    this.checkIfCanActivateReset();
  }

  private checkIfCanActivateReset() {
    this.ngxLoader.start();
    this.activatedRoute.queryParams
      .pipe(finalize(() => this.ngxLoader.stop()))
      .subscribe(res => {
        this.userId = res['userId'];
        this.code = res['code'];
        this.accountService.checkIfCanChange(+this.userId, this.code)
          .pipe(finalize(() => this.ngxLoader.stop()))
          .subscribe((result: any) => {
            if (result.isSuccess) {
              this.canActivate = true;
            } else {
              this.canActivate = false;
              this.router.navigate(['home']);
              this.toastr.warning(result.message, 'Ошибка');
            }
          });
      });
  }

  submit() {
    if (this.forgotForm.valid) {
      this.ngxLoader.start();
      const forgotModel: any = Object.assign({}, this.forgotForm.value);
      debugger;
      forgotModel.userId = this.userId;
      forgotModel.token = this.code;
      delete forgotModel.confirmPassword;
      this.accountService.resetPassword(forgotModel)
        .pipe(finalize(() => this.ngxLoader.stop()))
        .subscribe((result: any) => {
          if (result.isSuccess) {
            this.toastr.success('Пароль изменен', 'Успешно');
            this.forgotForm.reset();
            this.router.navigate(['account', 'login']);
          } else {
            this.toastr.warning(result.message, 'Ошибка');
          }
        });
    }
  }
}
