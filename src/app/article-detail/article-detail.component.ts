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
    private http: HttpRequestService,
    private message: NzMessageService
  ) { }

  // 插入图片
  handleUpload = (item: UploadXHRArgs) => {
    // 构建一个 FormData 对象，用于存储文件或其他参数
    const formData = new FormData();
    formData.append(item.name, item.file as any);
    this.http.uploadFileRequest(formData).subscribe((res) => {
      if (res['code'] === 0) {
        let textValue = this.validateForm.value['text'];
        this.validateForm.patchValue({
          text: textValue + res['data'].imgUrl
        });
        this.message.create('success', '插入图片成功');
      } else {
        this.message.create('error', res['msg']);
      }
    });
  }
  // 提交表单
  submitForm = ($event, validateForm) => {
    $event.preventDefault();
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(validateForm);
  }
  // 预览md文件
  preview(): void {
    this.previewState = !this.previewState;
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      title: [ null, [ Validators.required ] ],
      classification: [ null, [ Validators.required ] ],
      text: [ '', [ Validators.required ] ]
    });
  }

}
