// 文章列表筛选请求参数类
export class ArticleParams {
  keyWord: string;
  classification: string;
  tag: string;
  status: number;
  date: string;
  page: number;
  size: number;
}
