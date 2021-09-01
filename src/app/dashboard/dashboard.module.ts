import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzCardModule } from 'ng-zorro-antd/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { IndexComponent } from '@/index/index.component';
import { DashboardComponent } from '@/dashboard/dashboard.component';
import { ArticleListComponent } from '@/article-list/article-list.component';
import { ArticleDetailComponent } from '@/article-detail/article-detail.component';
import { ClassificationListComponent } from '@/classification-list/classification-list.component';
import { TagListComponent } from '@/tag-list/tag-list.component';
import { BannerListComponent } from '@/banner-list/banner-list.component';
import { CommentListComponent } from '@/comment-list/comment-list.component';
import { DashboardRoutingModule } from '@/dashboard/dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
		FormsModule,
		NzLayoutModule,
    NzMessageModule,
    NzInputModule,
    NzButtonModule,
    NzFormModule,
    NzIconModule,
    NzAvatarModule,
		NzDropDownModule,
		NzBreadCrumbModule,
		NzTabsModule,
		NzTableModule,
		NzDatePickerModule,
		NzSelectModule,
		NzModalModule,
		NzUploadModule,
		NzSwitchModule,
		NzTagModule,
		NzPopconfirmModule,
    NzDescriptionsModule,
    NzCardModule,
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
		BannerListComponent,
		CommentListComponent
  ]
})
export class DashboardModule { }
