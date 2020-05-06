import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UDPerPagePaginationModule } from "app/modules/ud-ui/components/per-page-pagination/module";
import { UDDateTimeModule } from "app/modules/ud-ui/pipes/date-time/module";
import { UDKeyPressModule } from "app/modules/ud-ui/directives/key-press/module";
import { UDEmptyTableModule } from "app/modules/ud-ui/components/empty-table/module";
import { UDSpinnerModule } from "app/modules/ud-ui/components/spinner/module";
import { LessonsRouteModule } from './lessons.route';
import { LessonPagesIndex } from './ui/pages/index/component'
import { LessonResource } from './domain/resources/LessonResource';
import { LessonRepository } from './domain/repositories/LessonRepository';
import { UDCardModule } from "app/modules/ud-ui/components/card/card.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UDFormsModule } from "app/modules/ud-forms/ud-forms.module";
import { UDBreadcrumbsModule } from "app/modules/ud-ui/components/breadcrumbs/module";
import { UDDateTimeInputModule } from "app/modules/ud-ui/components/datetime/module";
import { Ng2FlatpickrModule } from "ng2-flatpickr";
import { UDMapModule } from "app/modules/ud-map/module";
import { LessonComponentsActions } from './ui/components/lesson-actions/component';
import { UDActionsDDModule } from "app/modules/ud-ui/components/actions-dd/module";
import { UDUploadModule } from "app/modules/ud-upload/upload.module";
import { DropdownModule } from "primeng/dropdown";
import { UDTruncateModule } from "app/modules/ud-ui/pipes/truncate/module";
import { LessonPagesNew } from './ui/pages/new/component';
import { LessonPagesEdit } from './ui/pages/edit/component';
import { LessonComponentsLessonForm } from './ui/components/lesson-form/component';
import { LessonComponentsLessonFormCover } from './ui/components/lesson-form/cover/component';
import { LessonFactory } from './domain/factories/LessonFactory';
import { UploadFactory } from '../ud-upload/domain/factories/UploadFactory';




@NgModule({
    imports: [
      CommonModule,
      UDPerPagePaginationModule,
      UDDateTimeModule,
      UDKeyPressModule,
      UDEmptyTableModule,
      UDSpinnerModule,
      LessonsRouteModule,
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
    LessonComponentsLessonForm,
    LessonPagesNew,
    LessonPagesEdit,
    LessonPagesIndex,
    LessonComponentsLessonActions,
    LessonComponentsLessonFormCover
  ],
  providers: [
    LessonResource,
    LessonRepository,
    LessonFactory,
    UploadFactory
  ]
})
export class LessonModule {
}