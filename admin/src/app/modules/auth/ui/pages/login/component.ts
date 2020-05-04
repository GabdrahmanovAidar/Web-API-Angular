import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "app/modules/auth/domain/services/LoginService";
import { AccessRoleEnum } from "app/modules/access/domain/enums/AccessRoleEnum";
const validationMessages = require('./validation-messages.json');

@Component({
  selector: 'auth-pages-login',
  templateUrl: './template.html',
  styleUrls: ['./styles.scss']
})
export class AuthPagesLogin implements OnInit {
  public form: FormGroup;
  public loading: boolean = false;
  public showFormErrors: boolean = false;

  public validationMessages = validationMessages;

  constructor(private loginService: LoginService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
  }

  ngOnInit() {
      this.form = this.buildForm();
  }

  public onSubmit($event): void {
    $event.preventDefault();
    if (this.form.valid) {
      const { password, username } = this.form.value;
      const credentials = {
        username,
        password
      };
      this.loginByCredentials(credentials);
    } else {
      this.showFormErrors = true;
    }
  }

  private loginByCredentials(credentials) {
    this.loading = true;
    this.loginService.login(credentials)
      .finally(() => this.loading = false)
      .subscribe((sessionData) => {
        this.router.navigate(['/dashboard/statistics'])
      });
  }

  private buildForm(): FormGroup {
    return this.fb.group({
        username: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

}
