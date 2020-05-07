import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UDPerPagePaginationModule } from "app/modules/ud-ui/components/per-page-pagination/module";
import { UDDateTimeModule } from "app/modules/ud-ui/pipes/date-time/module";
import { UDKeyPressModule } from "app/modules/ud-ui/directives/key-press/module";
import { UDEmptyTableModule } from "app/modules/ud-ui/components/empty-table/module";
import { UDSpinnerModule } from "app/modules/ud-ui/components/spinner/module";
import { RequestsRouteModule } from './requests.route';
import { RequestPagesIndex } from './ui/pages/index/component'
import { RequestResource } from './domain/resources/RequestResource';
import { RequestRepository } from './domain/repositories/RequestRepository';
import { UDCardModule } from "app/modules/ud-ui/components/card/card.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UDFormsModule } from "app/modules/ud-forms/ud-forms.module";
import { UDBreadcrumbsModule } from "app/modules/ud-ui/components/breadcrumbs/module";
import { UDDateTimeInputModule } from "app/modules/ud-ui/components/datetime/module";
import { Ng2FlatpickrModule } from "ng2-flatpickr";
import { UDMapModule } from "app/modules/ud-map/module";
import { RequestComponentsRequestActions } from './ui/components/request-actions/component';
import { UDActionsDDModule } from "app/modules/ud-ui/components/actions-dd/module";
import { UDUploadModule } from "app/modules/ud-upload/upload.module";
import { DropdownModule } from "primeng/dropdown";
import { UDTruncateModule } from "app/modules/ud-ui/pipes/truncate/module";
import { RequestPagesNew } from './ui/pages/new/component';
import { RequestPagesEdit } from './ui/pages/edit/component';
import { RequestComponentsRequestForm } from './ui/components/request-form/component';
import { RequestComponentsRequestFormCover } from './ui/components/request-form/cover/component';
import { RequestFactory } from './domain/factories/RequestFactory';
import { UploadFactory } from '../ud-upload/domain/factories/UploadFactory';




@NgModule({
    imports: [
      CommonModule,
      UDPerPagePaginationModule,
      UDDateTimeModule,
      UDKeyPressModule,
      UDEmptyTableModule,
      UDSpinnerModule,
      RequestsRouteModule,
      UDCardModule,
      FormsModule,
      ReactiveFormsModule,
      UDFormsModule,
      UDBreadcrumbsModule,
      UDDateTimeInputModule,
      Ng2FlatpickrModule,
      UDMapModule,
      UDActionsDDModule,
      UDUploadModule,
      DropdownModule,
      UDTruncateModule
    ],
   
 declarations: [
    RequestComponentsRequestForm,
    RequestPagesNew,
    RequestPagesEdit,
    RequestPagesIndex,
    RequestComponentsRequestActions,
    RequestComponentsRequestFormCover
  ],
  providers: [
    RequestResource,
    RequestRepository,
    RequestFactory,
    UploadFactory
  ]
})
export class CourseModule {
}