import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpRequestService } from 'services/httpRequest.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  articleList: Array<any>; // 文章列表

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
