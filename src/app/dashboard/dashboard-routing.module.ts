import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from '@/index/index.component';
import { DashboardComponent } from '@/dashboard/dashboard.component';
import { ArticleListComponent } from '@/article-list/article-list.component';
import { ArticleDetailComponent } from '@/article-detail/article-detail.component';
import { ClassificationListComponent } from '@/classification-list/classification-list.component';

import { AuthGuard } from 'services/auth-guard.service';
import { LoginAuthService } from 'services/login-auth.service';

const dashboardRoutes: Routes = [
  // 页头和菜单
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'index',
        component: IndexComponent
      },
      {
        path: 'articleList',
        component: ArticleListComponent
      },
      {
        path: 'articleDetail',
        component: ArticleDetailComponent
      },
      {
        path: 'classificationList',
        component: ClassificationListComponent
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard,
    LoginAuthService
  ]
})

export class DashboardRoutingModule { }
