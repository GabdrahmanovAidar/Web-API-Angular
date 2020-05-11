import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'account',
    loadChildren: './account/account.module#AccountModule'
  },
  {
    path: 'faq',
    loadChildren: './faq/faq.module#FAQModule'
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'home',
    redirectTo: ''
  },
  {
    path: 'quest',
    loadChildren: './quest/quest.module#QuestModule'
  },
  {
    path: 'box',
    loadChildren: './box/box.module#BoxModule'
  },
  {
    path: 'support',
    loadChildren: './support/support.module#SupportModule'
  },
  {
    path: 'news',
    loadChildren: './news/news.module#NewsModule'
  },
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfileModule'
  },
  {
    path: 'stocks',
    loadChildren: './stock/stock.module#StockModule'
  },
  {
    path: 'payments',
    loadChildren: './payments/payments.module#PaymentsModule'
  },
  {
    path: 'information',
    loadChildren: './information/information.module#InformationModule'
  },
  {
    path:'review',
    loadChildren:'./review/review.module#ReviewModule'
  },
  {
    path:'videos',
    loadChildren:'./videos/videos.module#VideosModule'
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
