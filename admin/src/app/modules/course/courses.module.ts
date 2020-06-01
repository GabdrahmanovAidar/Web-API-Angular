import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UDPerPagePaginationModule } from "app/modules/ud-ui/components/per-page-pagination/module";
import { UDDateTimeModule } from "app/modules/ud-ui/pipes/date-time/module";
import { UDKeyPressModule } from "app/modules/ud-ui/directives/key-press/module";
import { UDEmptyTableModule } from "app/modules/ud-ui/components/empty-table/module";
import { UDSpinnerModule } from "app/modules/ud-ui/components/spinner/module";
import { CoursesRouteModule } from './courses.route';
import { CoursePagesIndex } from './ui/pages/index/component'
import { CourseResource } from './domain/resources/CourseResource';
import { CourseRepository } from './domain/repositories/CourseRepository';
import { UDCardModule } from "app/modules/ud-ui/components/card/card.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UDFormsModule } from "app/modules/ud-forms/ud-forms.module";
import { UDBreadcrumbsModule } from "app/modules/ud-ui/components/breadcrumbs/module";
import { UDDateTimeInputModule } from "app/modules/ud-ui/components/datetime/module";
import { Ng2FlatpickrModule } from "ng2-flatpickr";
import { UDMapModule } from "app/modules/ud-map/module";
import { CourseComponentsCourseActions } from './ui/components/course-actions/component';
import { UDActionsDDModule } from "app/modules/ud-ui/components/actions-dd/module";
import { UDUploadModule } from "app/modules/ud-upload/upload.module";
import { DropdownModule } from "primeng/dropdown";
import { UDTruncateModule } from "app/modules/ud-ui/pipes/truncate/module";
import { CoursePagesNew } from './ui/pages/new/component';
import { CoursePagesEdit } from './ui/pages/edit/component';
import { CourseComponentsCourseForm } from './ui/components/course-form/component';
import { CourseComponentsCourseFormCover } from './ui/components/course-form/cover/component';
import { CourseFactory } from './domain/factories/CourseFactory';
import { UploadFactory } from '../ud-upload/domain/factories/UploadFactory';




@NgModule({
    imports: [
      CommonModule,
      UDPerPagePaginationModule,
      UDDateTimeModule,
      UDKeyPressModule,
      UDEmptyTableModule,
      UDSpinnerModule,
      CoursesRouteModule,
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
    CourseComponentsCourseForm,
    CoursePagesNew,
    CoursePagesEdit,
    CoursePagesIndex,
    CourseComponentsCourseActions,
    CourseComponentsCourseFormCover
  ],
  providers: [
    CourseResource,
    CourseRepository,
    CourseFactory,
    UploadFactory
  ]
})
export class CourseModule {
}