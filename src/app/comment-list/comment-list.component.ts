import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpRequestService } from 'services/httpRequest.service';
import { NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { CommentListParams, CommentInfo } from './data';

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
	commentInfo: CommentInfo = {
    _id: '',
    isMain: false,
    relationId: {},
    commenter: {}
  };
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
  
  // 上传图片前的回调函数
  beforeUpload = (file: File) => {
    // 判断选择的文件类型是否为图片
    let type = file.type.slice(file.type.lastIndexOf('/') + 1);
    const isImg = 'jpg,png,jpeg,gif'.indexOf(type) !== -1;
    if (!isImg) {
      this.message.error('只能选择图片');
    }
    // 判断图片大小
    const isLt4M = file.size / 1024 / 1024 < 4;
    if (!isLt4M) {
      this.message.error('图片大小超过4M');
    }
    return isImg && isLt4M;
  }

  // 插入图片
  handleUpload = (item: NzUploadXHRArgs) => {
    // 构建一个 FormData 对象，用于存储文件或其他参数
    const formData = new FormData();
    formData.append(item.name, item.file as any);
    // 返回自定义上传方法
    return this.httpRequestService.uploadFileRequest(formData)
    .subscribe(res => {
      const { data: { imgUrl } } = res;
      this.replyContent += `![alt text](${imgUrl})`;
			this.message.success('插入图片成功');
    });
  }

	// 获取评论列表
	getCommentList(): void {
		this.httpRequestService.commentListRequest(this.params).subscribe(res => {
			const { data: { list, total } } = res;
			this.commentList = list;
			this.total = total;
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
			const { msg } = res;
			this.message.success(msg);
			this.getCommentList();
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
    this.replyContent = '';
	}

	// 关闭模态框
  modalCancel(): void {
    this.isVisible = false;
	}
	
	// 预览md文件
  preview(): void {
    this.previewState = !this.previewState;
  }

  // 回复评论
  submitForm(): void {
    if (!this.replyContent || this.replyContent.match(/^\s*$/)) {
      this.message.error('回复内容不能为空');
      return;
    }
    const { _id, isMain, commenter, relationId } = this.commentInfo;
    const userInfo = JSON.parse(sessionStorage['userInfo']);
    const data = {
      id: _id,
      isMain,
      relationId: relationId._id,
      type: false,
      beCommenterId: commenter._id,
      content: this.replyContent,
      commenterId: userInfo._id
    };
    this.httpRequestService.addCommentRequest(data).subscribe(res => {
      const { msg } = res;
      this.message.success(msg);
      this.reset();
      this.modalCancel();
    });
  }

  ngOnInit(): void {
		this.getCommentList();
  }
}
