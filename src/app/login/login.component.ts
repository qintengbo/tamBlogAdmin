import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginAuthService } from 'services/login-auth.service';
import { HttpRequestService } from 'services/httpRequest.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;

  // 提交登录表单
  submitForm (validateForm): void {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (validateForm.valid) {
      this.httpRequestService.loginRequest(validateForm.value)
      .subscribe(res => {
        if (res['code'] === 0) {
          // 存储token
          sessionStorage['token'] = res['token'];
          // 从我们的身份验证服务获取重定向URL，如果没有则跳转到默认页面
          let redirect = this.loginAuthService.redirectUrl ? this.loginAuthService.redirectUrl : '/admin/index';
          this.router.navigate([redirect]);
        } else {
          this.message.create('error', res['msg']);
        }
      });
    }
  }

  constructor(
    private fb: FormBuilder,
    private loginAuthService: LoginAuthService,
    private httpRequestService: HttpRequestService,
    private router: Router,
    private message: NzMessageService
    ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ]
    });
  }

}
