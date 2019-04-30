import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { IndexComponent } from '@/index/index.component';
import { DashboardComponent } from '@/dashboard/dashboard.component';
import { ArticleListComponent } from '@/article-list/article-list.component';
import { ArticleDetailComponent } from '@/article-detail/article-detail.component';
import { ClassificationListComponent } from '@/classification-list/classification-list.component';
import { TagListComponent } from '@/tag-list/tag-list.component';
import { BannerListComponent } from '@/banner-list/banner-list.component';
import { DashboardRoutingModule } from '@/dashboard/dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    MarkdownModule.forRoot() // 导入ngx-markdown插件
  ],
  declarations: [
    IndexComponent,
    DashboardComponent,
    ArticleListComponent,
    ArticleDetailComponent,
    ClassificationListComponent,
    TagListComponent,
    BannerListComponent
  ]
})
export class DashboardModule { }
