import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('@/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  // 路由重定向
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  // 通用路由，跳转至404页面等
  // { path: '**', component: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
    enableTracing: false,
    relativeLinkResolution: 'legacy'
}
    )
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
