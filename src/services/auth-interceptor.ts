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
import { tap, map } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
		private router: Router,
		private message: NzMessageService
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
				tap((event: HttpEvent<any>) => {
					const code = [-99, -100, -110];
					// 账号过期则跳转登陆页
					if (event instanceof HttpResponse && code.includes(event.body.code)) {
						// 这里不用setTimeout跳转页面会报错
						setTimeout(() => {
							this.router.navigate(['/login']);
							sessionStorage.removeItem('token');
						}, 1000);
					}
				}),
				map((event: HttpEvent<any>) => {
					if (event instanceof HttpResponse) {
						// code大于等于0时才返回response
						if (event.body.code >= 0) {
							return event;
						}
						// code小于0时统一拦截并弹出提示
						this.message.error(event.body.msg);
					}
				})
      );
    }
  	return next.handle(req);
  }
}
