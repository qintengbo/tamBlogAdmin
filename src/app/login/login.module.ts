import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzMessageModule, NzInputModule, NzButtonModule, NzFormModule, NzIconModule } from 'ng-zorro-antd';
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
