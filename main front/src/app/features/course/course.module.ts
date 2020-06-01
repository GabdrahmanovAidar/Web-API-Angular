import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Routes, RouterModule } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel'; 
import { CourseListComponent } from './course-list/course-list.component';
import { CourseService } from './course.service';
import { CourseDetailsComponent } from './course-details/course-details.component';



const routes: Routes = [
  {
    path: '',
    component: CourseListComponent
  },
  {
    path: ':id',
    component: CourseDetailsComponent
  }
];

@NgModule({
  declarations: [CourseListComponent, CourseDetailsComponent],
  imports: [  
    SlickCarouselModule,
    CommonModule,
    ScrollingModule,
    RouterModule.forChild(routes)
  ],
  providers:[CourseService],
  bootstrap: [CourseListComponent] 
})
export class CourseModule { }
