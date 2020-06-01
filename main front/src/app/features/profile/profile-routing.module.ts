import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { ProfileChangePasswordComponent } from './components/profile-change-password/profile-change-password.component';
import { ProfileOrderComponent } from './components/profile-order/profile-order.component';
import { ProfileUpdateComponent } from './components/profile-update/profile-update.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  },
  {
    path: 'info',
    component: ProfileInfoComponent
  },
  {
    path: 'change-password',
    component: ProfileChangePasswordComponent
  },
  {
    path: 'order',
    component: ProfileOrderComponent
  },
  {
    path: 'update',
    component: ProfileUpdateComponent
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
export class ProfileRoutingModule { }
