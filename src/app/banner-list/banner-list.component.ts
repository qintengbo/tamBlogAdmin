import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, UploadXHRArgs } from 'ng-zorro-antd';
import { NzUploadXHRArgs } from 'ng-zorro-antd/upload';
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
  params = { // 筛选列表请求参数
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
					this.message.success(res['msg']);
					this.isVisible = false;
					this.validateForm.reset();
					this.getBannerList();
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
					this.message.success(res['msg']);
					this.isVisible = false;
					this.validateForm.reset();
					this.getBannerList();
        });
      }
    }
  }

  // 查询轮播图列表
  getBannerList(): void {
    this.httpRequestService.bannerListRequest(this.params).subscribe(res => {
			this.bannerList = res['data'].list;
    });
  }

  // 更改轮播图状态
  updateStatus(id: string, status: number): void {
    let updateParams = {
      id: id,
      status: status === 2 ? 1 : 2
    };
    this.httpRequestService.updateBannerStatusRequest(updateParams).subscribe(res => {
			this.message.success(res['msg']);
			this.getBannerList();
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
			this.message.success(res['msg']);
			this.getBannerList();
    });
  }

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

  // 上传图片
  handleUpload = (item: NzUploadXHRArgs) => {
    // 构建一个 FormData 对象，用于存储文件或其他参数
    const formData = new FormData();
    formData.append(item.name, item.file as any);
    // 返回自定义上传方法
    return this.httpRequestService.uploadFileRequest(formData)
    .subscribe(res => {
			this.validateForm.patchValue({
				imgUrl: res['data'].imgUrl
			});
			this.message.success('上传图片成功');
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
