import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgDompurifyDomSanitizer } from '@tinkoff/ng-dompurify';
import { HttpClientModule } from '@angular/common/http';
import { NzDatePickerModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './/app-routing.module';
import { LoginModule } from '@/login/login.module';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'services/auth-interceptor';
import { AppComponent } from './app.component';

registerLocaleData(zh);

@NgModule({
  declarations: [ // 导入该应用的组件、管道、指令
    AppComponent
  ],
  imports: [ // 导入该应用的其他模块
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NzDatePickerModule,
    LoginModule,
    AppRoutingModule,
  ],
  providers: [ // 声明服务
    {
      provide: NZ_I18N,
      useValue: zh_CN,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
		},
		{ 
			provide: DomSanitizer, 
			useClass: NgDompurifyDomSanitizer 
		}
  ],
  bootstrap: [AppComponent] // 启动应用根组件
})
export class AppModule { }
