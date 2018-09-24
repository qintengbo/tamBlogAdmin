import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { LoginAuthService } from './login-auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private loginAuthService: LoginAuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // 将要访问的路由地址
    let url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    // 判断是否登录
    this.loginAuthService.login();
    if (this.loginAuthService.isLoggedIn) { return true; }

    // 存储尝试的URL以进行重定向
    this.loginAuthService.redirectUrl = url;

    // 导航到登录页面
    this.router.navigate(['/login']);
    return false;
  }
}
