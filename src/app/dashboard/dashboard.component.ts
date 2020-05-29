import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from 'services/httpRequest.service';
import { LoginAuthService } from 'services/login-auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  user = {
		username: '',
		userInfo: {}
	}; // 用户名
  isCollapsed = false; // 菜单是否折叠
  activeIndex: string; // 当前路由路径

  constructor(
    private httpRequestService: HttpRequestService,
    private loginAuthService: LoginAuthService,
    private route: ActivatedRoute
  ) { }

  // 菜单展开折叠
  toggleCollapsed (): void {
    this.isCollapsed = !this.isCollapsed;
  }

  // 获取用户信息
  getUserInfo (): void {
    this.httpRequestService.userInfoRequest()
    .subscribe(res => {
			const { data } = res;
			this.user = data;
			sessionStorage['userInfo'] = data.userInfo;
    });
  }

  // 菜单高亮
  menuLight (): void {
    // 这里暂时不知道为什么要使用setTimeout才能拿到正确的path，否则path在菜单跳转后不会改变
    setTimeout(() => {
      this.activeIndex = this.route.firstChild.url['value'][0].path;
    }, 0);
  }

  // 退出登录
  logout (): void {
		const { username } = this.user;
    this.loginAuthService.logout(username);
  }

  ngOnInit(): void {
    this.getUserInfo();
    this.menuLight();
  }

}
