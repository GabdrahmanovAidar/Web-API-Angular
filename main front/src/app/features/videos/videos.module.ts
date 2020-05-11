import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { VideosService } from './videos.service';
import { VideosComponent } from './components/videos/videos.component';
import { VideosRoutingModule } from './videos-routing.module';


@NgModule({
  declarations: [
      VideosComponent,
    ],
  imports: [
    CommonModule,
    VideosRoutingModule,
    MaterialModule
  ],
  providers: [VideosService]
})
export class VideosModule { }
