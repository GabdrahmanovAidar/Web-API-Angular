import { Component, OnInit } from '@angular/core';
import { Login } from '../../models/login.model';
import { Validators, FormGroup } from '@angular/forms';
import { AccountService } from '../../account.service';
import { Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize } from 'rxjs/operators';
import { loginSchema } from './login.schema';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];

  constructor(private ngxLoader: NgxUiLoaderService, private accountService: AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.fields = loginSchema;
  }

  submit() {
    if (this.loginForm.valid) {
      this.ngxLoader.start();
      const loginModel: Login = Object.assign({}, this.loginForm.value);
      this.accountService.login(loginModel)
        .pipe(finalize(() => this.ngxLoader.stop()))
        .subscribe(() => {
          this.loginForm.reset();
          this.router.navigate(['home']);
        });
    }
  }

  forgotPassword() {
    this.router.navigate(['account', 'forgot-password']);
  }
}
