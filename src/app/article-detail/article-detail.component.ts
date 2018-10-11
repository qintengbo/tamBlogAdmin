import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, UploadXHRArgs } from 'ng-zorro-antd';
import { HttpRequestService } from 'services/httpRequest.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  validateForm: FormGroup;
  previewState = false; // 预览状态

  constructor(
    private fb: FormBuilder,
    private httpRequestService: HttpRequestService,
    private message: NzMessageService
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
  handleUpload = (item: UploadXHRArgs) => {
    // 构建一个 FormData 对象，用于存储文件或其他参数
    const formData = new FormData();
    formData.append(item.name, item.file as any);
    this.httpRequestService.uploadFileRequest(formData)
    .subscribe(res => {
      if (res['code'] === 0) {
        let textValue = this.validateForm.value['content'];
        this.validateForm.patchValue({
          content: textValue + `![alt text](${res['data'].imgUrl})`
        });
        this.message.success('插入图片成功');
      } else {
        this.message.error(res['msg']);
      }
    });
  }
  // 提交表单
  submitForm = ($event, validateForm) => {
    $event.preventDefault();
    console.log($event);
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (validateForm.valid) {
      this.httpRequestService.addArticleRequest(validateForm.value)
      .subscribe(res => {
        console.log(res);
      });
    }
  }
  // 预览md文件
  preview(): void {
    this.previewState = !this.previewState;
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      title: [ null, [ Validators.required ] ],
      classification: [ null, [ Validators.required ] ],
      tag: [ null, [ Validators.required ] ],
      content: [ '', [ Validators.required ] ]
    });
  }

}
