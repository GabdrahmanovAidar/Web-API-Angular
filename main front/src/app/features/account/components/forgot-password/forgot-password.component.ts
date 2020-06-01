import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { forgotPasswordSchema } from './forgot-password.schema';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AccountService } from '../../account.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];

  constructor(private ngxLoader: NgxUiLoaderService,
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.fields = forgotPasswordSchema;
  }

  submit() {
    if (this.forgotForm.valid) {
      this.ngxLoader.start();
      const forgotModel: any = Object.assign({}, this.forgotForm.value);
      this.accountService.forgotPassword(forgotModel)
        .pipe(finalize(() => this.ngxLoader.stop()))
        .subscribe((result: any) => {
          if (result.isSuccess) {
            this.toastr.success('На указанную почту отправлены данные для восстановления пароля', 'Успешно');
            this.forgotForm.reset();
            this.router.navigate(['home']);
          } else {
            this.toastr.warning(result.message, 'Ошибка');
          }
        });
    }
  }
}
