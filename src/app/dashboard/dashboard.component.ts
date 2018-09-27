import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from 'services/httpRequest.service';
import { NzMessageService } from 'ng-zorro-antd';
import { LoginAuthService } from 'services/login-auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string; // 用户名
  isCollapsed = false; // 菜单是否折叠

  // 菜单展开折叠
  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  // 获取用户信息
  getUserInfo (): void {
    this.httpRequestService.userInfoRequest()
    .subscribe(res => {
      if (res['code'] === 0) {
        this.username = res['username'];
      } else {
        this.message.create('error', res['msg']);
      }
    });
  }

  // 退出登录
  logout(): void {
    this.loginAuthService.logout();
  }

  constructor(
    private httpRequestService: HttpRequestService,
    private message: NzMessageService,
    private loginAuthService: LoginAuthService
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

}
