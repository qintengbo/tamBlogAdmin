import { Injectable } from '@angular/core';

@Injectable()
export class LoginAuthService {

  isLoggedIn = false;

  // 存储URL，以便我们可以在登录后重定向
  redirectUrl: string;

  login(): void {
    if (sessionStorage['token']) {
      this.isLoggedIn = true;
    }
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
