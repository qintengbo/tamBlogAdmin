import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '@/login/login.component';
import { LoginRoutingModule } from '@/login/login-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NzInputModule,
    NzMessageModule,
    NzButtonModule,
    NzFormModule,
    NzIconModule,
    ReactiveFormsModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
