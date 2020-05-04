import { ChangeDetectorRef, Directive, TemplateRef, ViewContainerRef } from "@angular/core";
import { IfRoleCommonClass } from "./IfRoleCommonClass";
import { AccessRoleEnum } from "app/modules/access/domain/enums/AccessRoleEnum";
import { LoginService } from "app/modules/auth/domain/services/LoginService";

/**
 * @example
 * <div *ifCarWashAdmin>...some code...</div>
 */
@Directive({ selector: '[ifCarWashAdmin]' })
export class AccessIfCarWashAdminDirective extends IfRoleCommonClass {
  protected targetRole = AccessRoleEnum.CarWashAdministrator;

  constructor(templateRef: TemplateRef<any>,
              viewContainerRef: ViewContainerRef,
              loginService: LoginService,
              cd: ChangeDetectorRef) {
    super(templateRef, viewContainerRef, loginService, cd);
  }
}