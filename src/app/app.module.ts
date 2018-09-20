import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { DashboardComponent } from './dashboard/dashboard.component';

registerLocaleData(zh);

@NgModule({
  declarations: [ // 导入该应用的组件、管道、指令
    AppComponent,
    IndexComponent,
    DashboardComponent,
    LoginComponent
  ],
  imports: [ // 导入该应用的其他模块
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [{ // 声明服务
    provide: NZ_I18N,
    useValue: zh_CN
  }],
  bootstrap: [AppComponent] // 启动应用根组件
})
export class AppModule { }
