import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequestService } from 'services/httpRequest.service';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class LoginAuthService {

  constructor(
		private router: Router,
		private httpRequestService: HttpRequestService,
		private message: NzMessageService
  ) { }

  isLoggedIn: Boolean = false;

  // 存储URL，以便我们可以在登录后重定向
  redirectUrl: string;

  login(): void {
    if (sessionStorage['token']) {
      this.isLoggedIn = true;
    }
  }

  // 退出登录时删除token
  logout(username: string): void {
		this.httpRequestService.logoutRequest({ username }).subscribe(res => {
			const { msg } = res;
			sessionStorage.removeItem('token');
			this.isLoggedIn = false;
			this.message.success(msg);
			this.router.navigate(['/login']);
		});
  }
}
