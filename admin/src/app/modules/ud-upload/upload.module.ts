import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UploadFileResource } from "app/modules/ud-upload/domain/resources/UploadFileResource";
import { UploadFileRepository } from "app/modules/ud-upload/domain/repositories/UploadFileRepository";
import { UDUploadPhoto } from "app/modules/ud-upload/ui/components/photo/component";
import { UDFileSelectModule } from "app/modules/ud-ui/components/file-select/module";
import { UDSpinnerModule } from "app/modules/ud-ui/components/spinner/module";
import { SidebarModule } from "primeng/sidebar";
import { UDUploadPhotoCrop } from "app/modules/ud-upload/ui/components/photo-crop/component";
import { UDUploadTrack } from "app/modules/ud-upload/ui/components/track/component";
import { UDUploadVideo } from './ui/components/video/component';

@NgModule({
  providers: [
    UploadFileResource,
    UploadFileRepository
  ],
  imports: [
    CommonModule,
    UDFileSelectModule,
    UDSpinnerModule,
    SidebarModule
  ],
  declarations: [
    UDUploadPhoto,
    UDUploadPhotoCrop,
    UDUploadTrack,
    UDUploadVideo
  ],
  exports: [
    UDUploadPhoto,
    UDUploadTrack,
    UDUploadVideo
  ]
})
export class UDUploadModule {
}
