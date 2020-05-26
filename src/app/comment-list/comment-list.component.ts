import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpRequestService } from 'services/httpRequest.service';
import { CommentListParams } from './data';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.less']
})
export class CommentListComponent implements OnInit {

	constructor(
		private httpRequestService: HttpRequestService,
    private message: NzMessageService
	) { }
	
	commentList: any[] = [];
	total = 0;
	isVisible = false; // 模态框开关
	commentInfo = {};
	replyContent = ''; // 回复内容
	previewState = false; // 预览状态
	params: CommentListParams = {
		page: 1,
		size: 10,
		status: 0, // 评论展示状态 0-全部 1-已展示 2-未展示
		titleKey: '', // 文章标题关键词
		commenterKey: '', // 评论人信息关键词
		date: []
	};

	// 获取评论列表
	getCommentList(): void {
		this.httpRequestService.commentListRequest(this.params).subscribe(res => {
			const { code, msg, data: { list, total } } = res;
			if (code === 0) {
				this.commentList = list;
				this.total = total;
			} else {
				this.message.error(msg);
			}
		});
	}

	// 分页
  pageIndexChange(num: number): void {
    this.params.page = num;
    this.getCommentList();
	}
	
	// 选择tab标签页回调函数
  changTabs = ($event: any) => {
		this.params.status = $event.index;
		this.params.page = 1;
    this.getCommentList();
	}

	// 筛选
	search(): void {
		this.params.page = 1;
		this.getCommentList();
	}
	
	// 重置
  reset(): void {
    this.params = {
			...this.params,
			page: 1,
			titleKey: '',
			commenterKey: '',
			status: 0,
			date: []
		};
    this.getCommentList();
	}
	
	// 更新评论状态
  updateStatus(id: string, reply: string[], show: number): void {
		reply.push(id);
    const updateParams = {
      id: reply,
      show
    };
    this.httpRequestService.updateCommentRequest(updateParams).subscribe(res => {
			const { code, msg } = res;
      if (code === 0) {
        this.message.success(msg);
        this.getCommentList();
      } else {
        this.message.error(msg);
      }
    });
	}
	
	// 提示信息
	tips(show: boolean, isMain: boolean): string {
		return `你确定要${show ? '隐藏' : '显示'}此评论吗？${isMain ? `其子评论也会全部${show ? '隐藏' : '显示'}！` : ''}`;
	}

	// 查看评论
	view(data: any): void {
		this.isVisible = true;
		this.commentInfo = data;
	}

	// 关闭模态框
  modalCancel(): void {
    this.isVisible = false;
  }

  ngOnInit(): void {
		this.getCommentList();
  }

}
