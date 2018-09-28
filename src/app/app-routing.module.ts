import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArticleListComponent } from './article-list/article-list.component';

import { AuthGuard } from 'services/auth-guard.service';
import { LoginAuthService } from 'services/login-auth.service';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: DashboardComponent, // 页头和菜单
    canActivate: [AuthGuard],
    children: [
      {
        path: 'index',
        component: IndexComponent
      },
      {
        path: 'articleList',
        component: ArticleListComponent
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
      }
    )
  ],
  exports: [ RouterModule ],
  providers: [
    AuthGuard,
    LoginAuthService
  ]
})
export class AppRoutingModule { }
