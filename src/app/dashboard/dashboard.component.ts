import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from 'services/httpRequest.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // 获取用户信息
  getUserInfo (): void {
    this.httpRequestService.userInfoRequest()
    .subscribe(res => {
      console.log(res);
      if (res['code'] === 0) {
      } else {
        this.message.create('error', res['msg']);
      }
    });
  }

  constructor(
    private httpRequestService: HttpRequestService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

}
