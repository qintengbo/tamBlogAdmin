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
    status: 0, // 状态，2-未发布，1-已发布，0-全部
    date: '',
    pag: 1,
    size: 10
  };

  constructor(
    private httpRequestService: HttpRequestService,
    private message: NzMessageService
  ) { }

  // 查询文章列表
  getArticleList(): void {
    this.httpRequestService.articleListRequest(this.params)
    .subscribe(res => {
      if (res['code'] === 0) {
        this.articleList = res['data'].list;
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

  ngOnInit() {
    this.getArticleList();
  }

}
