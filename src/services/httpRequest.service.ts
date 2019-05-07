import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginForm } from 'class/login/LoginForm';
import { Response } from 'class/common/Response';
import { ArticleForm } from 'class/article/ArticleForm';
import { NzMessageService } from 'ng-zorro-antd';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  path: string; // 拦截器
  httpOptions = { // http请求配置
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private message: NzMessageService
  ) {
    console.log(environment);
    this.path = environment['path'];
  }

  // 登录请求
  loginRequest(data: LoginForm): Observable<Response> {
    return this.http.post<Response>(`${this.path}/login`, data, this.httpOptions).pipe(
      catchError(this.handleError<any>('loginRequest'))
    );
  }
  // 获取用户信息请求
  userInfoRequest(): Observable<Response> {
    return this.http.get<Response>(`${this.path}/userInfo`).pipe(
      catchError(this.handleError<any>('userInfoRequest'))
    );
  }
  // 上传文件
  uploadFileRequest(data: {}): Observable<Response> {
    return this.http.post<Response>(`${this.path}/uploadFile`, data).pipe(
      catchError(this.handleError<any>('uploadFileRequest'))
    );
  }
  // 新增文章
  addArticleRequest(data: ArticleForm): Observable<Response> {
    return this.http.post<Response>(`${this.path}/addArticle`, data, this.httpOptions).pipe(
      catchError(this.handleError<any>('addArticleRequest'))
    );
  }
  // 文章列表
  articleListRequest(data: {}): Observable<Response> {
    return this.http.get<Response>(`${this.path}/articleList`, { params: data }).pipe(
      catchError(this.handleError<any>('articleListRequest'))
    );
  }
  // 更新文章状态
  updateArticleRequest(data: {}): Observable<Response> {
    return this.http.put<Response>(`${this.path}/updateArticle`, data, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateArticleRequest'))
    );
  }
  // 删除文章
  deleteArticleRequest(id: string): Observable<Response> {
    return this.http.delete<Response>(`${this.path}/deleteArticle`, { params: { id: id } }).pipe(
      catchError(this.handleError<any>('deleteArticleRequest'))
    );
  }
  // 查询文章详细信息
  articleInfoRequest(id: string): Observable<Response> {
    return this.http.get<Response>(`${this.path}/articleInfo`, { params: { id: id } }).pipe(
      catchError(this.handleError<any>('articleInfoRequest'))
    );
  }
  // 编辑文章
  detailArticleRequest(data: {}): Observable<Response> {
    return this.http.put<Response>(`${this.path}/detailArticle`, data, this.httpOptions).pipe(
      catchError(this.handleError<any>('detailArticleRequest'))
    );
  }
  // 新增分类
  addClassificationRequest(data: {}): Observable<Response> {
    return this.http.post<Response>(`${this.path}/addClassification`, data, this.httpOptions).pipe(
      catchError(this.handleError<any>('addClassificationRequest'))
    );
  }
  // 分类列表
  classificationListReuqest(data: {}): Observable<Response> {
    return this.http.get<Response>(`${this.path}/classificationList`, { params: data }).pipe(
      catchError(this.handleError<any>('classificationListRequest'))
    );
  }
  // 编辑分类
  detailClassificationRequest(data: {}): Observable<Response> {
    return this.http.put<Response>(`${this.path}/detailClassification`, data, this.httpOptions).pipe(
      catchError(this.handleError<any>('detailClassificationRequest'))
    );
  }
  // 删除分类
  deleteClassificationRequest(id: string): Observable<Response> {
    return this.http.delete<Response>(`${this.path}/deleteClassification`, { params: { id: id } }).pipe(
      catchError(this.handleError<any>('deleteClassificationRequest'))
    );
  }
  // 新增标签
  addTagRequest(data: {}): Observable<Response> {
    return this.http.post<Response>(`${this.path}/addTag`, data, this.httpOptions).pipe(
      catchError(this.handleError<any>('addTagRequest'))
    );
  }
  // 标签列表
  tagListReuqest(data: {}): Observable<Response> {
    return this.http.get<Response>(`${this.path}/tagList`, { params: data }).pipe(
      catchError(this.handleError<any>('tagListRequest'))
    );
  }
  // 编辑标签
  detailTagRequest(data: {}): Observable<Response> {
    return this.http.put<Response>(`${this.path}/detailTag`, data, this.httpOptions).pipe(
      catchError(this.handleError<any>('detailTagRequest'))
    );
  }
  // 删除标签
  deleteTagRequest(id: string): Observable<Response> {
    return this.http.delete<Response>(`${this.path}/deleteTag`, { params: { id: id } }).pipe(
      catchError(this.handleError<any>('deleteTagRequest'))
    );
  }
  // 新增轮播图
  addBannerRequest(data: {}): Observable<Response> {
    return this.http.post<Response>(`${this.path}/addBanner`, data, this.httpOptions).pipe(
      catchError(this.handleError<any>('addBannerRequest'))
    );
  }
  // 轮播图列表
  bannerListRequest(data: {}): Observable<Response> {
    return this.http.get<Response>(`${this.path}/bannerList`, { params: data }).pipe(
      catchError(this.handleError<any>('bannerListRequest'))
    );
  }
  // 更新轮播图状态
  updateBannerStatusRequest(data: {}): Observable<Response> {
    return this.http.put<Response>(`${this.path}/updateBanner`, data, this.httpOptions).pipe(
      catchError(this.handleError<any>('updataBannerStatusRequest'))
    );
  }
  // 删除轮播图
  deleteBannerRequest(id: string): Observable<Response> {
    return this.http.delete<Response>(`${this.path}/deleteBanner`, { params: { id: id } }).pipe(
      catchError(this.handleError<any>('deleteBannerRequest'))
    );
  }
  // 编辑轮播图
  detailBannerRequest(data: {}): Observable<Response> {
    return this.http.put<Response>(`${this.path}/detailBanner`, data, this.httpOptions).pipe(
      catchError(this.handleError<any>('detailBannerRequest'))
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
