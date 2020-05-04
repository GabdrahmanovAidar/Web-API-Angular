import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginRoutesModule } from "./login.routes";
import { AuthPagesLogin } from "./ui/pages/login/component";
import { UDCardModule } from "app/modules/ud-ui/components/card/card.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthRoutesModule } from "app/modules/auth/auth.routes";
import { AuthPagesRecovery } from "app/modules/auth/ui/pages/password-recovery/component";
import { AuthLayoutsBase } from "app/modules/auth/ui/layouts/component";
import { InputMaskModule } from "primeng/inputmask";
import { UDFormsModule } from "app/modules/ud-forms/ud-forms.module";
import { LoginService } from "app/modules/auth/domain/services/LoginService";
import { LoginResource } from "app/modules/auth/domain/resources/LoginResource";
import { UDSpinnerModule } from "app/modules/ud-ui/components/spinner/module";
import { UDEnvModule } from "app/modules/ud-ui/directives/env/module";
import { UDFocusModule } from "app/modules/ud-ui/directives/focus/module";
import { UDInputTransliterateModule } from "app/modules/ud-ui/directives/transliterate/module";

@NgModule({
  imports: [
    CommonModule,
    AuthRoutesModule,
    UDCardModule,
    FormsModule,
    ReactiveFormsModule,
    InputMaskModule,
    UDFormsModule,
    UDSpinnerModule,
    UDEnvModule,
    UDFocusModule,
    UDInputTransliterateModule
  ],
  declarations: [
    AuthPagesLogin,
    AuthPagesRecovery,
    AuthLayoutsBase
  ]
})
export class AuthModule {
  static forRoot() {
    return {
      ngModule: AuthModule,
      providers: [
        LoginService,
        LoginResource
      ]
    }
  }
}
