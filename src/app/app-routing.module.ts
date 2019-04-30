import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'services/auth-guard.service';

const appRoutes: Routes = [
  // 路由重定向
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: '@/dashboard/dashboard.module#DashboardModule',
    canLoad: [AuthGuard]
  },
  // 通用路由，跳转至404页面等
  // { path: '**', component: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false, // <-- debugging purposes only
      }
    )
  ],
  exports: [ RouterModule ],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule { }
