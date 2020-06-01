import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs/Subject";
import { MessageService } from "primeng/components/common/messageservice";
// import { DBSettings } from "app/modules/dashboard/modules/settings/domain/interfaces/DBSettings";
// import { DBSettingsRepository } from "app/modules/dashboard/modules/settings/domain/repositories/DBSettingsRepository";
import { CompanyRepository } from "app/modules/companies/domain/repositories/CompanyRepository";
import { LoginService } from "app/modules/auth/domain/services/LoginService";
// import { Company } from "app/modules/companies/domain/interfaces/Company";

@Component({
  selector: 'settings-pages-index',
  templateUrl: './template.html'
})
export class DBSettingsPagesIndex implements OnInit, OnDestroy {
  public loading: boolean = false;
  // public company: Company;

  private destroyed$ = new Subject<void>();

  constructor(//private companyRepository: CompanyRepository,
              private loginService: LoginService,
              private router: Router,
              private route: ActivatedRoute,
              private messageService: MessageService ) {
  }

  ngOnInit() {
   
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

  

  public onDBSettingsCancel($event): void {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  

}
