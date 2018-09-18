/**
 * Created by tam on 2018/09/15.
 * httpRequest Service
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginData } from './loginData';

/**
 * 配置环境地址
 */
const PATH = '/api'; // 开发环境

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  constructor(
    private http: HttpClient
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

  /**
   * request
   */
  // 登录请求
  loginRequest (data): Observable<LoginData> {
    return this.http.post<LoginData>(this.loginUrl, data, this.httpOptions).pipe(
      catchError(this.handleError<any>('loginRequest'))
    );
  }

  /**
   * 处理失败的http操作
   * @param operation - 失败的http操作的名称
   * @param result - 观察结果，可选值
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // 打印错误信息
      console.error(error);
      // 通过返回空结果让应用继续运行
      return of(result as T);
    };
  }
}
