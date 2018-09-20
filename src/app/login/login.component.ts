import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { HttpRequestService } from '../httpRequest.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;

  // 提交登录表单
  submitForm(validateForm): void {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (validateForm.valid) {
      this.httpRequestService.loginRequest(validateForm.value)
      .subscribe(res => {
        if (res['code'] === 0) {
          // 登录成功跳转首页
          this.router.navigate(['/admin/index']);
        } else {
          this.message.create('error', res['msg']);
        }
      });
    }
  }

  constructor(
    private fb: FormBuilder,
    private httpRequestService: HttpRequestService,
    private message: NzMessageService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ]
    });
  }

}
