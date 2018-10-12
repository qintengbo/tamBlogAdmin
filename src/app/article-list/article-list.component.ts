import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpRequestService } from 'services/httpRequest.service';
import { ArticleParams } from 'class/article/ArticleParams';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  articleList: Array<any>; // 文章列表
  params: ArticleParams = { // 筛选列表请求参数
    keyWord: '',
    classification: null,
    tag: null,
    status: null, // 状态，0-未发布，1-已发布
    date: '',
    pag: 1,
    size: 10,
    total: 0
  };

  constructor(
    private httpRequestService: HttpRequestService,
    private message: NzMessageService
  ) { }

  // 查询文章列表
  getArticleList(): void {
    this.httpRequestService.articleListRequest()
    .subscribe(res => {
      if (res['code'] === 0) {
        this.articleList = res['data'].list;
      } else {
        this.message.error(res['msg']);
      }
    });
  }

  ngOnInit() {
    this.getArticleList();
  }

}
