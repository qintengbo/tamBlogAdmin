import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpRequestService } from 'services/httpRequest.service';

@Component({
  selector: 'app-classification-list',
  templateUrl: './classification-list.component.html',
  styleUrls: ['./classification-list.component.css']
})
export class ClassificationListComponent implements OnInit {
  validateForm: FormGroup;
  classificationList: Array<any>; // 分类列表数据
  isVisible = false; // 新增分类模态框状态
  params: { // 筛选列表请求参数
    keyWord: '',
  };

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private httpRequestService: HttpRequestService
  ) { }

  // 新增分类
  submitForm = (validateForm) => {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (validateForm.valid) {
      this.httpRequestService.addClassificationRequest(validateForm.value)
      .subscribe(res => {
        if (res['code'] === 0) {
          this.message.success(res['msg']);
          this.isVisible = false;
          this.validateForm.reset();
          this.getClassificationList();
        } else {
          this.message.error(res['msg']);
        }
      });
    }
  }
  // 查询分类列表
  getClassificationList(): void {
    this.httpRequestService.classificationListReuqest().subscribe(res => {
      if (res['code'] === 0) {
        this.classificationList = res['data'].list;
      } else {
        this.message.error(res['msg']);
      }
    });
  }
  // 新增或编辑分类
  detailClassification(data): void {
    this.isVisible = true;
    this.validateForm.patchValue({
      name: data.name,
      abbreviationName: data.abbreviationName
    });
  }
  // 关闭模态框
  modelCancel(): void {
    this.isVisible = false;
    this.validateForm.reset();
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [ null, [ Validators.required ] ],
      abbreviationName: [ null, [ Validators.required ] ]
    });
    this.getClassificationList();
  }

}
