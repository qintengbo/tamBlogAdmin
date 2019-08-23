import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, UploadXHRArgs, NzModalService } from 'ng-zorro-antd';
import { HttpRequestService } from 'services/httpRequest.service';

@Component({
  selector: 'app-steppingpit-detail',
  templateUrl: './steppingPit-detail.component.html',
  styleUrls: ['./steppingPit-detail.component.less']
})
export class SteppingPitDetailComponent implements OnInit {
  validateForm: FormGroup;
  descriptionStatus = false; // 问题描述预览状态
  solutionStatus = false; // 解决方案预览状态
  id: string; // 踩坑id
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
  handleUpload = (item: UploadXHRArgs) => {
    // 构建一个 FormData 对象，用于存储文件或其他参数
    const formData = new FormData();
    formData.append(item.name, item.file as any);
    // 返回自定义上传方法
    return this.httpRequestService.uploadFileRequest(formData)
    .subscribe(res => {
      if (res['code'] === 0) {
        let textValue = this.validateForm.value[item.data.type];
        this.validateForm.patchValue({
          [item.data.type]: textValue + `![alt text](${res['data'].imgUrl})`
        });
        this.message.success('插入图片成功');
      } else {
        this.message.error(res['msg']);
      }
    });
  }

  // 提交表单
  submitForm = (validateForm: any) => {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (validateForm.valid) {
      if (this.id) {
        let params = {
          id: this.id,
          ...validateForm.value
        };
        this.httpRequestService.detailSteppingPitRequest(params).subscribe(res => {
          if (res['code'] === 0) {
            this.isSubmit = true;
            this.message.success(res['msg']);
            this.router.navigate(['/dashboard/steppingPitList']);
          } else {
            this.message.error(res['msg']);
          }
        });
      } else {
        this.httpRequestService.addSteppingPitRequest(validateForm.value).subscribe(res => {
          if (res['code'] === 0) {
            this.isSubmit = true;
            this.message.success(res['msg']);
            this.router.navigate(['/dashboard/steppingPitList']);
          } else {
            this.message.error(res['msg']);
          }
        });
      }
    }
  }

  // 预览md文件
  preview(num: number): void {
    if (num === 1) {
      this.descriptionStatus = !this.descriptionStatus;
    } else {
      this.solutionStatus = !this.solutionStatus;
    }
  }

  // 保存文章
  save = () => {
    this.validateForm.patchValue({ status: 2 });
  }

  // 未保存离开时提示是否保存
  canDeactivate(): Promise<boolean> | boolean {
    if (!this.isSubmit && !this.validateForm.pristine) {
      // 改变控件的焦点状态，防止浏览器回退按钮点击时报错
      this.validateForm.get('description').markAsTouched();
      this.validateForm.get('solution').markAsTouched();
      return new Promise(resolve => {
        this.modalService.confirm({
          nzTitle: '您还有未保存的踩坑记录，确定离开？',
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
      version: [ null, [ Validators.required ] ],
      description: [ '', [ Validators.required ] ],
      solution: [ '', [ Validators.required ] ],
      status: [ 1 ], // 状态， 2-未发布，1-已发布
    });
    // 获取参数Id, 如果存在则请求踩坑详细信息
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      if (this.id) {
        this.httpRequestService.steppingPitInfoRequest(this.id).subscribe(res => {
          const { code, data, msg } = res;
          if (code === 0) {
            // 展示踩坑详细信息
            this.validateForm.patchValue({...data});
          } else {
            this.message.error(msg);
          }
        });
      }
    });
  }
}
