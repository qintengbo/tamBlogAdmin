import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from '@/index/index.component';
import { DashboardComponent } from '@/dashboard/dashboard.component';
import { ArticleListComponent } from '@/article-list/article-list.component';
import { ArticleDetailComponent } from '@/article-detail/article-detail.component';
import { ClassificationListComponent } from '@/classification-list/classification-list.component';
import { TagListComponent } from '@/tag-list/tag-list.component';
import { BannerListComponent } from '@/banner-list/banner-list.component';

import { AuthGuard } from 'services/auth-guard.service';
import { LoginAuthService } from 'services/login-auth.service';
import { CanDeactivateGuard } from 'services/can-deactivate.guard';

const dashboardRoutes: Routes = [
  {
    path: 'dashboard', // 页头和菜单
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'index', // 首页
        component: IndexComponent
      },
      {
        path: 'articleList', // 文章列表
        component: ArticleListComponent
      },
      {
        path: 'articleDetail', // 编辑文章
        component: ArticleDetailComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'classificationList', // 分类列表
        component: ClassificationListComponent
      },
      {
        path: 'tagList', // 标签列表
        component: TagListComponent
      },
      {
        path: 'bannerList', // 轮播图列表
        component: BannerListComponent
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
