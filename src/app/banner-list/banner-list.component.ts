import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpRequestService } from 'services/httpRequest.service';

@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.less']
})
export class BannerListComponent implements OnInit {
  bannerList: Array<any> = []; // 轮播图列表数据
  params: {} = { // 筛选列表请求参数
    status: null,
  };

  constructor(
    private httpRequestService: HttpRequestService,
    private message: NzMessageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

}
