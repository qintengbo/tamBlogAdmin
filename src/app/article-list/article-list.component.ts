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
    date: [],
    sort: null,
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
			this.articleList = res['data'].list;
			this.total = res['data'].total;
    });
  }

  // 查询分类列表
  getClassificationList(): void {
    this.httpRequestService.classificationListReuqest({ keyWord: '' }).subscribe(res => {
			this.classificationList = res['data'].list;
    });
  }

  // 查询标签列表
  getTagList(): void {
    this.httpRequestService.tagListReuqest({ keyWord: '' }).subscribe(res => {
			this.tagList = res['data'].list;
    });
  }

  // 选择tab标签页回调函数
  changTabs = ($event: any) => {
		this.params.status = $event.index;
		this.params.page = 1;
    this.getArticleList();
	}
	
	// 筛选
	search(): void {
		this.params.page = 1;
		this.getArticleList();
	}

  // 重置
  reset(): void {
		this.params.keyWord = '';
		this.params.page = 1;
    this.params.classification = null;
    this.params.tag = null;
    this.params.date = [];
    this.params.sort = null;
    this.getArticleList();
  }

  // 分页
  pageIndexChange(num: number): void {
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
			this.message.success(res['msg']);
			this.getArticleList();
    });
  }

  // 删除文章
  deleteArticle(id: string): void {
    this.httpRequestService.deleteArticleRequest(id).subscribe(res => {
			this.message.success(res['msg']);
			this.getArticleList();
    });
  }

  // 编辑文章
  detailArticle(id: string): void {
    this.router.navigate(['/dashboard/articleDetail', { id: id }]);
  }

  // 阅读数排序
  sort(sort: string): void {
    this.params.sort = sort;
    this.getArticleList();
  }

  ngOnInit() {
    this.getClassificationList();
    this.getTagList();
    this.getArticleList();
  }

}
