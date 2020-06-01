import { ChangeDetectorRef, Directive, TemplateRef, ViewContainerRef } from "@angular/core";
import { IfRoleCommonClass } from "./IfRoleCommonClass";
import { AccessRoleEnum } from "app/modules/access/domain/enums/AccessRoleEnum";
import { LoginService } from "app/modules/auth/domain/services/LoginService";

/**
 * @example
 * <div *ifCompanyOwner>...some code...</div>
 */
@Directive({ selector: '[ifCompanyOwner]' })
export class AccessIfCompanyOwnerDirective extends IfRoleCommonClass {
  protected targetRole = AccessRoleEnum.CompanyOwner;

  constructor(templateRef: TemplateRef<any>,
              viewContainerRef: ViewContainerRef,
              loginService: LoginService,
              cd: ChangeDetectorRef) {
    super(templateRef, viewContainerRef, loginService, cd);
  }
}