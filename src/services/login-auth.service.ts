import { Injectable } from '@angular/core';

@Injectable()
export class LoginAuthService {

  isLoggedIn = false;
  // token是否过期标志
  expired = false;

  // 存储URL，以便我们可以在登录后重定向
  redirectUrl: string;

  login(): void {
    console.log('expired', this.expired, this.isLoggedIn);
    if (sessionStorage['token'] && !this.expired) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
