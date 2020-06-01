import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UDMapYandexApiLoader } from "app/modules/ud-map/yandex/services/api-loader";
import { UDMapYandex } from "app/modules/ud-map/yandex/components/map";
import { UDMapYandexMarker } from "app/modules/ud-map/yandex/components/marker";
import { UDMapYandexRoute } from "app/modules/ud-map/yandex/components/route";
import { UDMapYandexPolygon } from "app/modules/ud-map/yandex/components/polygon";
import { UDSpinnerModule } from "app/modules/ud-ui/components/spinner/module";

@NgModule({
  imports: [CommonModule, UDSpinnerModule],
  declarations: [
    UDMapYandex,
    UDMapYandexMarker,
    UDMapYandexRoute,
    UDMapYandexPolygon
  ],
  exports: [
    UDMapYandex,
    UDMapYandexMarker,
    UDMapYandexRoute,
    UDMapYandexPolygon
  ]
})
export class UDMapModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: UDMapModule,
      providers: [
        UDMapYandexApiLoader
      ],
    };
  }
}
