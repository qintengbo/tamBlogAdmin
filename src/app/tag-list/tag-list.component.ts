import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpRequestService } from 'services/httpRequest.service';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.less']
})
export class TagListComponent implements OnInit {
  validateForm: FormGroup;
  tagList: Array<any> = []; // 标签列表数据
  isVisible = false; // 新增标签模态框状态
  status = false; // 是否编辑状态
  id: string; // 编辑标签的id
  params = { // 筛选列表请求参数
    keyWord: '',
  };

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private httpRequestService: HttpRequestService
  ) { }

  // 提交表单
  submitForm = (validateForm: any) => {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (validateForm.valid) {
      // 判断编辑还是新增
      if (!this.status) {
        this.httpRequestService.addTagRequest(validateForm.value).subscribe(res => {
          if (res['code'] === 0) {
            this.message.success(res['msg']);
            this.isVisible = false;
            this.validateForm.reset();
            this.getTagList();
          } else {
            this.message.error(res['msg']);
          }
        });
      } else {
        let params = {
          id: this.id,
          ...validateForm.value
        };
        this.httpRequestService.detailTagRequest(params).subscribe(res => {
          if (res['code'] === 0) {
            this.message.success(res['msg']);
            this.isVisible = false;
            this.validateForm.reset();
            this.getTagList();
          } else {
            this.message.error(res['msg']);
          }
        });
      }
    }
  }

  // 查询标签列表
  getTagList(): void {
    this.httpRequestService.tagListReuqest(this.params).subscribe(res => {
      if (res['code'] === 0) {
        this.tagList = res['data'].list;
      } else {
        this.message.error(res['msg']);
      }
    });
  }

  // 新增标签
  addTag(): void {
    this.isVisible = true;
    this.status = false;
  }

  // 编辑标签
  detailTag(data: any): void {
    this.isVisible = true;
    this.status = true;
    this.id = data._id;
    this.validateForm.patchValue({
      name: data.name,
      abbreviationName: data.abbreviationName
    });
  }

  // 删除标签
  deleteTag(id: string): void {
    this.httpRequestService.deleteTagRequest(id).subscribe(res => {
      if (res['code'] === 0) {
        this.message.success(res['msg']);
        this.getTagList();
      } else {
        this.message.error(res['msg']);
      }
    });
  }

  // 关闭模态框
  modalCancel(): void {
    this.isVisible = false;
    this.validateForm.reset();
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [ null, [ Validators.required ] ],
      abbreviationName: [ null, [ Validators.required ] ]
    });
    this.getTagList();
  }

}
