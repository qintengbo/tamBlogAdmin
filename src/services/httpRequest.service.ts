/**
 * Created by tam on 2018/09/15.
 * httpRequest Service
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginFrom } from 'class/login/LoginFrom';
import { Reponse } from 'class/common/reponse';
import { NzMessageService } from 'ng-zorro-antd';

// 拦截器配置
const PATH = '/api';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  constructor(
    private http: HttpClient,
    private message: NzMessageService
  ) { }

  // http请求配置
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  /**
   * path
   */
  // 登录接口
  loginUrl = `${PATH}/login`;
  // 获取用户信息接口
  userInfo = `${PATH}/userInfo`;
  // 上传文件
  uploadFile = `${PATH}/uploadFile`;

  /**
   * request
   */
  // 登录请求
  loginRequest(data: LoginFrom): Observable<Response> {
    return this.http.post<Reponse>(this.loginUrl, data, this.httpOptions).pipe(
      catchError(this.handleError<any>('loginRequest'))
    );
  }
  // 获取用户信息请求
  userInfoRequest(): Observable<Response> {
    return this.http.get<any>(this.userInfo).pipe(
      catchError(this.handleError<any>('userInfoRequest'))
    );
  }
  // 上传文件
  uploadFileRequest(data): Observable<HttpEvent<{}>> {
    return this.http.post<HttpEvent<{}>>(this.uploadFile, data, { reportProgress : true }).pipe(
      catchError(this.handleError<any>('uploadFileRequest'))
    );
  }

  /**
   * 处理失败的http操作
   * @param result - 观察结果，可选值
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // 打印错误信息
      console.error(error);
      // 打印error.message
      this.message.create('error', `${operation} failed: ${error.status + ' ' + error.statusText}`);
      // 通过返回空结果让应用继续运行
      return of(result as T);
    };
  }
}
