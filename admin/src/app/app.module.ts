import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'chart.js';
const moment = require('moment');
require('moment/locale/ru');
moment.locale('ru');
/*
 * Platform and Environment providers/directives/pipes
 */
import { environment } from 'environments/environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import '../styles/styles.scss';

import { CoreModule } from "app/modules/core/core.module";
import { MessageService } from "primeng/components/common/messageservice";
import { registerLocaleData } from "@angular/common";
import localeRu from '@angular/common/locales/ru';

import { GrowlModule } from "primeng/growl";
import { RavenErrorHandler } from "app/sentry-error-handler";
import { Page404 } from "app/no-content/page-404/component";
import { TokenInterceptor } from './modules/core/infrastructure/token.Interceptor';

// Application wide providers
const APP_PROVIDERS: any[] = [
  MessageService,
  { provide: LOCALE_ID, useValue: 'ru' }
];

if (ENV === 'production') {
  APP_PROVIDERS.push({ provide: ErrorHandler, useClass: RavenErrorHandler });
}

registerLocaleData(localeRu);

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    Page404
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),
    ...environment.showDevModule ? [/*DevModule*/] : [],
    BrowserAnimationsModule,
    CoreModule,
    GrowlModule
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },
  environment.ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {
}
