import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { HttpRequestService } from 'services/httpRequest.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.less']
})
export class ArticleDetailComponent implements OnInit {
  validateForm: FormGroup;
  previewState: Boolean = false; // 预览状态
  classificationList: Array<any> = []; // 分类列表
  tagList: Array<any> = []; // 标签列表
  articleId: string; // 文章id
  isSubmit: Boolean = false; // 是否提交状态

  constructor(
    private fb: FormBuilder,
    private httpRequestService: HttpRequestService,
    private message: NzMessageService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NzModalService
  ) { }

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
			let textValue = this.validateForm.value['content'];
			this.validateForm.patchValue({
				content: textValue + `![alt text](${res['data'].imgUrl})`
			});
			this.message.success('插入图片成功');
    });
  }

  // 封面图片上传
  coverImgUpload = (item: NzUploadXHRArgs) => {
    // 构建一个 FormData 对象，用于存储文件或其他参数
    const formData = new FormData();
    formData.append(item.name, item.file as any);
    // 返回自定义上传方法
    return this.httpRequestService.uploadFileRequest(formData)
    .subscribe(res => {
			this.validateForm.patchValue({
				coverImg: res['data'].imgUrl
			});
			this.message.success('上传图片成功');
    });
	}
	
	// 导入文件前的回调函数
	beforeImportFile = (file: File) => {
		// 判断选择的文件类型是否为文档类型
    let type = file.type.slice(file.type.lastIndexOf('/') + 1);
    const isDoc = 'doc,docx,txt,md'.indexOf(type) !== -1;
    if (!isDoc) {
      this.message.error('只能选择文档类型的文件');
    }
    // 判断文件大小
    const isLt4M = file.size / 1024 / 1024 < 4;
    if (!isLt4M) {
      this.message.error('文件大小超过4M');
    }
    return isDoc && isLt4M;
	}

	// 导入文件
	importFile = (item: NzUploadXHRArgs) => {
		// 构建一个 FormData 对象，用于存储文件或其他参数
    const formData = new FormData();
    formData.append(item.name, item.file as any);
    // 返回自定义上传方法
    return this.httpRequestService.uploadFileRequest(formData)
    .subscribe(res => {
			const { data } = res;
			let textValue = this.validateForm.value['content'];
			this.validateForm.patchValue({
				content: textValue + data
			});
			this.message.success('导入文件成功');
    });
	}

  // 提交表单
  submitForm = (validateForm: any) => {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (validateForm.valid) {
      if (this.articleId) {
        let params = {
          id: this.articleId,
          ...validateForm.value
        };
        this.httpRequestService.detailArticleRequest(params).subscribe(res => {
					this.isSubmit = true;
					this.message.success(res['msg']);
					this.router.navigate(['/dashboard/articleList']);
        });
      } else {
        this.httpRequestService.addArticleRequest(validateForm.value).subscribe(res => {
					this.isSubmit = true;
					this.message.success(res['msg']);
					this.router.navigate(['/dashboard/articleList']);
        });
      }
    }
  }

  // 预览md文件
  preview(): void {
    this.previewState = !this.previewState;
  }

  // 保存文章
  save = () => {
    this.validateForm.patchValue({ status: 2 });
  }

  // 查询分类列表
  getClassificationList(): void {
    this.httpRequestService.classificationListReuqest({ keyWord: '' }).subscribe(res => {
			this.classificationList = res['data'].list;
    });
  }

  // 查询标签列表
  getTagList(): void {
    this.httpRequestService.tagListReuqest({ keyWord: '' }).subscribe(res => {
			this.tagList = res['data'].list;
    });
  }

  // 未保存离开时提示是否保存
  canDeactivate(): Promise<boolean> | boolean {
    if (!this.isSubmit && !this.validateForm.pristine) {
      // 改变控件的焦点状态，防止浏览器回退按钮点击时报错
      this.validateForm.get('content').markAsTouched();
      return new Promise(resolve => {
        this.modalService.confirm({
          nzTitle: '您还有未保存的文章，确定离开？',
          nzOnOk: () => { resolve(true); },
          nzOnCancel: () => { resolve(false); }
        });
      });
    } else {
      return true;
    }
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      title: [ null, [ Validators.required ] ],
      classification: [ null, [ Validators.required ] ],
      tag: [ [], [ Validators.required ] ],
      content: [ '', [ Validators.required ] ],
      status: [ 1 ], // 状态， 2-未发布，1-已发布
      coverImg: [ '', [ Validators.required ] ],
      lead: [ '', [ Validators.required ] ] // 导语
    });
    this.getClassificationList();
    this.getTagList();
    // 获取参数Id, 如果存在则请求文章详细信息
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.articleId = params.get('id');
      if (this.articleId) {
        this.httpRequestService.articleInfoRequest(this.articleId).subscribe(res => {
          const { data } = res;
					// 展示文章详细信息
					this.validateForm.patchValue({...data});
        });
      }
    });
  }
}
