import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpRequestService } from 'services/httpRequest.service';
import { ArticleParams } from 'class/article/ArticleParams';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.less']
})
export class ArticleListComponent implements OnInit {
  articleList: Array<any> = []; // 文章列表
  classificationList: Array<any>; // 分类列表
  tagList: Array<any>; // 标签列表
  total: number; // 数据总条数
  params: ArticleParams = { // 筛选列表请求参数
    keyWord: '',
    classification: null,
    tag: null,
    status: 0, // 状态，2-未发布，1-已发布，0-全部
    date: '',
    page: 1,
    size: 10
  };

  constructor(
    private httpRequestService: HttpRequestService,
    private message: NzMessageService,
    private router: Router
  ) { }

  // 查询文章列表
  getArticleList(): void {
    this.httpRequestService.articleListRequest(this.params)
    .subscribe(res => {
      if (res['code'] === 0) {
        this.articleList = res['data'].list;
        this.total = res['data'].total;
      } else {
        this.message.error(res['msg']);
      }
    });
  }
  // 查询分类列表
  getClassificationList(): void {
    this.httpRequestService.classificationListReuqest({ keyWord: '' }).subscribe(res => {
      if (res['code'] === 0) {
        this.classificationList = res['data'].list;
      } else {
        this.message.error(res['msg']);
      }
    });
  }
  // 查询标签列表
  getTagList(): void {
    this.httpRequestService.tagListReuqest({ keyWord: '' }).subscribe(res => {
      if (res['code'] === 0) {
        this.tagList = res['data'].list;
      } else {
        this.message.error(res['msg']);
      }
    });
  }
  // 选择tab标签页回调函数
  changTabs = ($event) => {
    this.params.status = $event.index;
    this.getArticleList();
  }
  // 重置
  reset(): void {
    this.params.keyWord = '';
    this.params.classification = null;
    this.params.tag = null;
    this.params.date = '';
    this.getArticleList();
  }
  // 分页
  pageIndexChange(num): void {
    this.params.page = num;
    this.getArticleList();
  }
  // 更新文章状态
  updateStatus(id: string, status: number): void {
    let updateParams = {
      id: id,
      status: status === 2 ? 1 : 2
    };
    this.httpRequestService.updateArticleRequest(updateParams).subscribe(res => {
      if (res['code'] === 0) {
        this.message.success(res['msg']);
        this.getArticleList();
      } else {
        this.message.error(res['msg']);
      }
    });
  }
  // 删除文章
  deleteArticle(id: string): void {
    this.httpRequestService.deleteArticleRequest(id).subscribe(res => {
      if (res['code'] === 0) {
        this.message.success(res['msg']);
        this.getArticleList();
      } else {
        this.message.error(res['msg']);
      }
    });
  }
  // 编辑文章
  detailArticle(id: string): void {
    this.router.navigate(['/dashboard/articleDetail', { id: id }]);
  }

  ngOnInit() {
    this.getClassificationList();
    this.getTagList();
    this.getArticleList();
  }

}
