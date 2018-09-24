import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // 登录不需要带token
    if (req.url !== '/api/login') {
      // 从服务中获取身份证令牌
      const authToken = sessionStorage['token'];
      console.log('authToken', authToken);
      // 设置并更新请求头
      const authReq = req.clone({ setHeaders: { Authorization: authToken } });
      // 发送到下一个处理程序
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
