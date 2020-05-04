import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/components/common/messageservice";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

// import { OperatorRepository } from "app/modules/operators/domain/repositories/OperatorRepository";

const validationMessages = require('./validation-messages.json');

@Component({
    selector: 'auth-pages-recovery',
    templateUrl: './template.html',
    styleUrls: ['./styles.scss']
})
export class AuthPagesRecovery implements OnInit {
  public form: FormGroup;
  public showFormErrors: boolean = false;
  public loading: boolean = false;

  public validationMessages = validationMessages;

  constructor(private router: Router,
              // private operatorRepository: OperatorRepository,
              private messageService: MessageService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.buildForm();
  }

  public onSubmit($event): void {
    $event.preventDefault();
    if (this.form.valid) {
      this.loading = true;
      // this.operatorRepository.sendRecoveryEmail(this.form.value)
      //   .subscribe(() => {
      //     // this.showPasswordChangeSuccessNotification(this.form.value);
      //     this.router.navigate(['login']);
      //   });
    } else {
      this.showFormErrors = true;
    }
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      email: [null, [Validators.required, Validators.email]]
    });
  }

}

