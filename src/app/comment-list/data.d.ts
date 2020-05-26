/*
 * @Author       : qintengbo
 * @Date         : 2020-05-13 14:34:27
 * @LastEditors  : qintengbo
 * @LastEditTime : 2020-05-14 14:41:43
 * @Description  : 评论列表接口声明文件
 */
export interface CommentListParams {
	page: number;
	size: number;
	status: 0 | 1 | 2;
	titleKey: string;
	commenterKey: string;
	date: string[];
}
