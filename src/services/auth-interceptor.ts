import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 登录不需要带token
    if (req.url !== '/api/login') {
      // 从sessionStorage获取身份证令牌
      const authToken = sessionStorage['token'];
      // 设置并更新请求头
      const authReq = req.clone({ setHeaders: { Authorization: authToken } });
      // 发送到下一个处理程序
      return next.handle(authReq).pipe(
        map((event: HttpEvent<any>) => {
          // 如果账号已过期，则跳转到登录页面
          if (event instanceof HttpResponse && event['body']['expired']) {
            // TODO: 这里不用setTimeout跳转页面会报错
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1000);
          }
          return event;
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
