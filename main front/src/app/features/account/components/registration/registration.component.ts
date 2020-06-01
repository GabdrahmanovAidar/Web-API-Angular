import { Component, OnInit } from '@angular/core';
import { Registration } from '../../models/registration.model';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AccountService } from '../../account.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { registrationSchema } from './registration.schema';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];

  constructor(private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrService,
    private accountService: AccountService,
    private router: Router) { }

  ngOnInit() {
    this.fields = registrationSchema;
  }

  submit() {
    if (this.registerForm.valid) {
      this.ngxLoader.start();
      const loginModel: Registration = Object.assign({}, this.registerForm.value);
      this.accountService.registration(loginModel)
        .pipe(finalize(() => this.ngxLoader.stop()))
        .subscribe(() => {
          this.registerForm.reset();
          this.router.navigate(['account', 'login']);
        },
          err => {
            if (err) {
              this.toastr.warning('Невалидные данные', 'Ошибка при регистрации');
            }
          });
    }
  }
}
