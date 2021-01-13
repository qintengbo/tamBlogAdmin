import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from 'services/httpRequest.service';
import { StatisticalData } from 'class/dashboard';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {
  statisticalData: StatisticalData = {
    accessTotal: 0,
    accessTotalDay: 0,
    articleTotal: 0,
    commentTotal: 0
  };

  constructor(
    private httpRequestService: HttpRequestService
  ) { }

  /**
   * 获取页头监控字段数据
   */
  getStatisticalData = () => {
    this.httpRequestService.queryDashboardFieldRequest().subscribe(res => {
      this.statisticalData = { ...res.data };
    });
  }

  ngOnInit() {
    this.getStatisticalData();
  }

}
