import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpRequestService } from 'services/httpRequest.service';

@Component({
  selector: 'app-classification-list',
  templateUrl: './classification-list.component.html',
  styleUrls: ['./classification-list.component.less']
})
export class ClassificationListComponent implements OnInit {
  validateForm: FormGroup;
  classificationList: Array<any> = []; // 分类列表数据
  isVisible = false; // 新增分类模态框状态
  status = false; // 是否编辑状态
  id: string; // 编辑分类的id
  params = { // 筛选列表请求参数
    keyWord: '',
    page: 1
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
        this.httpRequestService.addClassificationRequest(validateForm.value).subscribe(res => {
					this.message.success(res['msg']);
					this.isVisible = false;
					this.validateForm.reset();
					this.getClassificationList();
        });
      } else {
        let params = {
          id: this.id,
          ...validateForm.value
        };
        this.httpRequestService.detailClassificationRequest(params).subscribe(res => {
					this.message.success(res['msg']);
					this.isVisible = false;
					this.validateForm.reset();
					this.getClassificationList();
        });
      }
    }
  }

  // 查询分类列表
  getClassificationList(): void {
    this.httpRequestService.classificationListReuqest(this.params).subscribe(res => {
			this.classificationList = res['data'].list;
    });
  }

  // 新增分类
  addClassification(): void {
    this.isVisible = true;
    this.status = false;
  }

  // 编辑分类
  detailClassification(data: any): void {
    this.isVisible = true;
    this.status = true;
    this.id = data._id;
    this.validateForm.patchValue({
      name: data.name,
      abbreviationName: data.abbreviationName
    });
  }

  // 删除分类
  deleteClassification(id: string): void {
    this.httpRequestService.deleteClassificationRequest(id).subscribe(res => {
			this.message.success(res['msg']);
			this.getClassificationList();
    });
  }

  // 分页
  pageIndexChange(num: number): void {
    this.params.page = num;
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
    this.getClassificationList();
  }

}
