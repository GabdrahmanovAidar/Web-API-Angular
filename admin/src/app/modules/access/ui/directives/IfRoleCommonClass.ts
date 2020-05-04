import {
  Directive, EventEmitter, TemplateRef, ViewContainerRef, OnDestroy, OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { AccessRoleEnum } from "app/modules/access/domain/enums/AccessRoleEnum";
import { LoginService, LoginState } from "app/modules/auth/domain/services/LoginService";

export class IfRoleCommonClass implements OnDestroy, OnInit {

  protected targetRole: AccessRoleEnum;

  private destroyed$ = new EventEmitter<any>();
  private hasView: boolean = false;

  constructor(private templateRef: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef,
              private loginService: LoginService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.loginService.state$
      .takeUntil(this.destroyed$)
      .subscribe((loginState: LoginState) => {
        const canAccess = loginState.isLogged && loginState.type === this.targetRole;
        if (canAccess && !this.hasView) {
          this.hasView = true;
          this.viewContainerRef.createEmbeddedView(this.templateRef);
          this.cd.markForCheck();
        } else if (!canAccess && this.hasView) {
          this.hasView = false;
          this.viewContainerRef.clear();
          this.cd.markForCheck();
        }
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
