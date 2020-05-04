import { Routes } from "@angular/router";
import { Page404 } from "app/no-content/page-404/component";

export const ROUTES: Routes = [
  // { path: 'admin', loadChildren: './modules/admin/admin.module#AdminModule' },
  { path: 'dashboard', loadChildren: './modules/dashboard/dashboard.module#DashboardModule' },
  { path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule' },
  { path: '**', component: Page404 }
];
