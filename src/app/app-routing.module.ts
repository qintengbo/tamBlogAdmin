import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { SelectivePreloadingStrategy } from 'service/selective-preloading-strategy';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent }, // 登录
  {
    path: 'admin',
    component: DashboardComponent, // 页头和菜单
    children: [
      {
        path: 'index',
        component: IndexComponent
      }
    ]
  },

  // 路由重定向
  { path: '',
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
        enableTracing: false, // <-- debugging purposes only
        // preloadingStrategy: SelectivePreloadingStrategy
      }
    )
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
