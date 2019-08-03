import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from '@/index/index.component';
import { DashboardComponent } from '@/dashboard/dashboard.component';
import { ArticleListComponent } from '@/article-list/article-list.component';
import { ArticleDetailComponent } from '@/article-detail/article-detail.component';
import { ClassificationListComponent } from '@/classification-list/classification-list.component';
import { TagListComponent } from '@/tag-list/tag-list.component';
import { BannerListComponent } from '@/banner-list/banner-list.component';
import { SteppingPitListComponent } from '@/steppingPit-list/steppingPit-list.component';

import { AuthGuard } from 'services/auth-guard.service';
import { CanDeactivateGuard } from 'services/can-deactivate.guard';

const dashboardRoutes: Routes = [
  {
    path: '', // 页头和导航栏
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'index',
        component: IndexComponent,
        data: { title: '首页' }
      },
      {
        path: 'articleList',
        component: ArticleListComponent,
        data: { title: '文章列表' }
      },
      {
        path: 'articleDetail',
        component: ArticleDetailComponent,
        canDeactivate: [CanDeactivateGuard],
        data: { title: '编辑文章' }
      },
      {
        path: 'classificationList',
        component: ClassificationListComponent,
        data: { title: '分类列表' }
      },
      {
        path: 'tagList',
        component: TagListComponent,
        data: { title: '标签列表' }
      },
      {
        path: 'bannerList',
        component: BannerListComponent,
        data: { title: '轮播列表' }
      },
      {
        path: 'steppingPitList',
        component: SteppingPitListComponent,
        data: { title: '踩坑列表' }
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
    AuthGuard
  ]
})

export class DashboardRoutingModule { }
