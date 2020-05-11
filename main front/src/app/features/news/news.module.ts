import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Routes, RouterModule } from '@angular/router';
import { NewsService } from './news.service';
import { SlickCarouselModule } from 'ngx-slick-carousel'; 



const routes: Routes = [
  {
    path: '',
    component: NewsListComponent
  },
  {
    path: ':id',
    component: NewsDetailsComponent
  }
];

@NgModule({
  declarations: [NewsListComponent, NewsDetailsComponent],
  imports: [  
    SlickCarouselModule,
    CommonModule,
    ScrollingModule,
    RouterModule.forChild(routes)
  ],
  providers:[NewsService],
  bootstrap: [NewsListComponent] 
})
export class NewsModule { }
