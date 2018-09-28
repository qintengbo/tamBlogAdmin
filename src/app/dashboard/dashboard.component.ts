import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from 'services/httpRequest.service';
import { NzMessageService } from 'ng-zorro-antd';
import { LoginAuthService } from 'services/login-auth.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string; // 用户名
  avatarText: string; // 头像字母
  isCollapsed = false; // 菜单是否折叠
  activeIndex: string; // 当前路由路径

  // 菜单展开折叠
  toggleCollapsed (): void {
    this.isCollapsed = !this.isCollapsed;
  }
  // 获取用户信息
  getUserInfo (): void {
    this.httpRequestService.userInfoRequest()
    .subscribe(res => {
      if (res['code'] === 0) {
        this.username = res['username'];
        this.avatarText = res['username'][0];
      } else {
        this.message.create('error', res['msg']);
      }
    });
  }
  // 菜单高亮
  menuLight (): void {
    this.activeIndex = this.route.snapshot.firstChild.url[0].path;
  }
  // 退出登录
  logout (): void {
    this.loginAuthService.logout();
  }

  constructor(
    private httpRequestService: HttpRequestService,
    private message: NzMessageService,
    private loginAuthService: LoginAuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.menuLight();
  }

}
