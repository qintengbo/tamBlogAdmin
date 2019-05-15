import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@/login/login.component';
import { LoginAuthService } from 'services/login-auth.service';

const loginRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: '登录' }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(loginRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    LoginAuthService
  ]
})

export class LoginRoutingModule { }
