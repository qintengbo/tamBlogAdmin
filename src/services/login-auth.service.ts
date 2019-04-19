import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class LoginAuthService {

  constructor(
    private router: Router
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
  logout(): void {
    sessionStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
