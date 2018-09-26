import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from 'services/httpRequest.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // 获取用户信息
  getUserInfo (): void {
    this.httpRequestService.userInfoRequest()
    .subscribe(res => {
      console.log(res);
    });
  }

  constructor(
    private httpRequestService: HttpRequestService
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

}
