import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpRequestService } from 'services/httpRequest.service';

@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.less']
})
export class BannerListComponent implements OnInit {
  validateForm: FormGroup;
  isVisible = false; // 模态框状态
  isEdit = false; // 是否编辑状态
  bannerList: Array<any> = []; // 轮播图列表数据
  id: string; // 编辑轮播图的id
  params: {} = { // 筛选列表请求参数
    status: null,
  };

  constructor(
    private fb: FormBuilder,
    private httpRequestService: HttpRequestService,
    private message: NzMessageService
  ) { }

  // 新增轮播图
  addBanner(): void {
    this.isVisible = true;
    this.isEdit = false;
  }

  // 关闭模态框
  modalCancel(): void {
    this.isVisible = false;
    this.validateForm.reset();
  }

  // 提交表单
  submitForm = (validateForm: any) => {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (validateForm.valid) {
      // 判断是新增还是编辑
      if (!this.isEdit) {
        const val = validateForm.value;
        let params = {
          mainTitle: val.mainTitle,
          subtitle: val.subtitle,
          imgUrl: val.imgUrl,
          order: val.order,
          status: val.status ? 1 : 2
        };
        this.httpRequestService.addBannerRequest(params).subscribe(res => {
          if (res['code'] === 0) {
            this.message.success(res['msg']);
            this.isVisible = false;
            this.validateForm.reset();
            this.getBannerList();
          } else {
            this.message.error(res['msg']);
          }
        });
      } else {
        const val = validateForm.value;
        let params = {
          id: this.id,
          mainTitle: val.mainTitle,
          subtitle: val.subtitle,
          imgUrl: val.imgUrl,
          order: val.order,
          status: val.status ? 1 : 2
        };
        this.httpRequestService.detailBannerRequest(params).subscribe(res => {
          if (res['code'] === 0) {
            this.message.success(res['msg']);
            this.isVisible = false;
            this.validateForm.reset();
            this.getBannerList();
          } else {
            this.message.error(res['msg']);
          }
        });
      }
    }
  }

  // 查询轮播图列表
  getBannerList(): void {
    this.httpRequestService.bannerListRequest(this.params).subscribe(res => {
      if (res['code'] === 0) {
        this.bannerList = res['data'].list;
      } else {
        this.message.error(res['msg']);
      }
    });
  }

  // 更改轮播图状态
  updateStatus(id: string, status: number): void {
    let updateParams = {
      id: id,
      status: status === 2 ? 1 : 2
    };
    this.httpRequestService.updateBannerStatusRequest(updateParams).subscribe(res => {
      if (res['code'] === 0) {
        this.message.success(res['msg']);
        this.getBannerList();
      } else {
        this.message.error(res['msg']);
      }
    });
  }

  // 编辑轮播图
  detailBanner(data: any): void {
    this.isVisible = true;
    this.isEdit = true;
    this.id = data._id;
    this.validateForm.patchValue({
      mainTitle: data.mainTitle,
      subtitle: data.subtitle,
      imgUrl: data.imgUrl,
      order: data.order,
      status: data.status === 1 ? true : false
    });
  }

  // 删除轮播图
  deleteBanner(id: string): void {
    this.httpRequestService.deleteBannerRequest(id).subscribe(res => {
      if (res['code'] === 0) {
        this.message.success(res['msg']);
        this.getBannerList();
      } else {
        this.message.error(res['msg']);
      }
    });
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      mainTitle: [ '', [ Validators.required ] ],
      subtitle: [ '', [ Validators.required ] ],
      imgUrl: [ '', [ Validators.required ] ],
      order: [ '', [ Validators.required ]],
      status: [ false ] // 状态， false-未上播，true-已上播
    });
    this.getBannerList();
  }

}
