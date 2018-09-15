/**
 * Request文件
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  // path
  loginUrl = 'http://localhost:3000/admin/login';

  // request
  loginRequest(loginData) {
    return this.http.post(this.loginUrl, loginData, this.httpOptions);
  }
}
