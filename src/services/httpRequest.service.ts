import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginFrom } from 'class/login/LoginFrom';
import { Reponse } from 'class/common/reponse';
import { ArticleForm } from 'class/article/ArticleForm';
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
  // 新增文件
  addArticle = `${PATH}/addArticle`;
  // 文章列表
  articleList = `${PATH}/articleList`;
  // 更新文章状态
  updateArticle = `${PATH}/updateArticle`;
  // 删除文章
  deleteArticle = `${PATH}/deleteArticle`;
  // 查询文章详细信息
  articleInfo = `${PATH}/articleInfo`;
  // 编辑文章
  detailArticle = `${PATH}/detailArticle`;
  // 新增分类
  addClassification = `${PATH}/addClassification`;
  // 分类列表
  classificationList = `${PATH}/classificationList`;
  // 编辑分类
  detailClassification = `${PATH}/detailClassification`;
  // 删除分类
  deleteClassification = `${PATH}/deleteClassification`;
  // 新增标签
  addTag = `${PATH}/addTag`;
  // 标签列表
  tagList = `${PATH}/tagList`;
  // 编辑标签
  detailTag = `${PATH}/detailTag`;
  // 删除标签
  deleteTag = `${PATH}/deleteTag`;
  // 新增轮播图
  addBanner = `${PATH}/addBanner`;
  // 轮播图列表
  bannerList = `${PATH}/bannerList`;
  // 更新轮播图状态
  updateBannerStatus = `${PATH}/updateBanner`;
  // 删除轮播图
  deleteBanner = `${PATH}/deleteBanner`;
  // 编辑轮播图
  detailBanner = `${PATH}/detailBanner`;

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
  uploadFileRequest(data: {}): Observable<Response> {
    return this.http.post<Response>(this.uploadFile, data).pipe(
      catchError(this.handleError<any>('uploadFileRequest'))
    );
  }
  // 新增文章
  addArticleRequest(data: ArticleForm): Observable<Response> {
    return this.http.post<Response>(this.addArticle, data, this.httpOptions).pipe(
      catchError(this.handleError<any>('addArticleRequest'))
    );
  }
  // 文章列表
  articleListRequest(data: {}): Observable<Response> {
    return this.http.get<Response>(this.articleList, { params: data }).pipe(
      catchError(this.handleError<any>('articleListRequest'))
    );
  }
  // 更新文章状态
  updateArticleRequest(data: {}): Observable<Response> {
    return this.http.put<Response>(this.updateArticle, data, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateArticleRequest'))
    );
  }
  // 删除文章
  deleteArticleRequest(id: string): Observable<Response> {
    return this.http.delete<Response>(this.deleteArticle, { params: { id: id } }).pipe(
      catchError(this.handleError<any>('deleteArticleRequest'))
    );
  }
  // 查询文章详细信息
  articleInfoRequest(id: string): Observable<Response> {
    return this.http.get<Response>(this.articleInfo, { params: { id: id } }).pipe(
      catchError(this.handleError<any>('articleInfoRequest'))
    );
  }
  // 编辑文章
  detailArticleRequest(data: {}): Observable<Response> {
    return this.http.put<Response>(this.detailArticle, data, this.httpOptions).pipe(
      catchError(this.handleError<any>('detailArticleRequest'))
    );
  }
  // 新增分类
  addClassificationRequest(data: {}): Observable<Response> {
    return this.http.post<Response>(this.addClassification, data, this.httpOptions).pipe(
      catchError(this.handleError<any>('addClassificationRequest'))
    );
  }
  // 分类列表
  classificationListReuqest(data: {}): Observable<Response> {
    return this.http.get<Response>(this.classificationList, { params: data }).pipe(
      catchError(this.handleError<any>('classificationListRequest'))
    );
  }
  // 编辑分类
  detailClassificationRequest(data: {}): Observable<Response> {
    return this.http.put<Response>(this.detailClassification, data, this.httpOptions).pipe(
      catchError(this.handleError<any>('detailClassificationRequest'))
    );
  }
  // 删除分类
  deleteClassificationRequest(id: string): Observable<Response> {
    return this.http.delete<Response>(this.deleteClassification, { params: { id: id } }).pipe(
      catchError(this.handleError<any>('deleteClassificationRequest'))
    );
  }
  // 新增标签
  addTagRequest(data: {}): Observable<Response> {
    return this.http.post<Response>(this.addTag, data, this.httpOptions).pipe(
      catchError(this.handleError<any>('addTagRequest'))
    );
  }
  // 标签列表
  tagListReuqest(data: {}): Observable<Response> {
    return this.http.get<Response>(this.tagList, { params: data }).pipe(
      catchError(this.handleError<any>('tagListRequest'))
    );
  }
  // 编辑标签
  detailTagRequest(data: {}): Observable<Response> {
    return this.http.put<Response>(this.detailTag, data, this.httpOptions).pipe(
      catchError(this.handleError<any>('detailTagRequest'))
    );
  }
  // 删除标签
  deleteTagRequest(id: string): Observable<Response> {
    return this.http.delete<Response>(this.deleteTag, { params: { id: id } }).pipe(
      catchError(this.handleError<any>('deleteTagRequest'))
    );
  }
  // 新增轮播图
  addBannerRequest(data: {}): Observable<Response> {
    return this.http.post<Response>(this.addBanner, data, this.httpOptions).pipe(
      catchError(this.handleError<any>('addBannerRequest'))
    );
  }
  // 轮播图列表
  bannerListRequest(data: {}): Observable<Response> {
    return this.http.get<Response>(this.bannerList, { params: data }).pipe(
      catchError(this.handleError<any>('bannerListRequest'))
    );
  }
  // 更新轮播图状态
  updateBannerStatusRequest(data: {}): Observable<Response> {
    return this.http.put<Response>(this.updateBannerStatus, data, this.httpOptions).pipe(
      catchError(this.handleError<any>('updataBannerStatusRequest'))
    );
  }
  // 删除轮播图
  deleteBannerRequest(id: string): Observable<Response> {
    return this.http.delete<Response>(this.deleteBanner, { params: { id: id } }).pipe(
      catchError(this.handleError<any>('deleteBannerRequest'))
    );
  }
  // 编辑轮播图
  detailBannerRequest(data: {}): Observable<Response> {
    return this.http.put<Response>(this.detailBanner, data, this.httpOptions).pipe(
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
