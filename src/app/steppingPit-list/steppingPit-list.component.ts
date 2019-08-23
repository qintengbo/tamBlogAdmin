import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpRequestService } from 'services/httpRequest.service';

@Component({
  selector: 'app-steppingpit-list',
  templateUrl: './steppingPit-list.component.html',
  styleUrls: ['./steppingPit-list.component.less']
})
export class SteppingPitListComponent implements OnInit {
  steppingPitList = []; // 踩坑列表
  total = 0; // 数据总条数
  params = { // 筛选列表请求参数
    keyWord: '',
    status: 0, // 状态，2-未发布，1-已发布，0-全部
    date: '',
    sort: null,
    page: 1,
    size: 10
  };

  constructor(
    private httpRequestService: HttpRequestService,
    private message: NzMessageService,
    private router: Router
  ) { }

  // 查询踩坑列表
  getSteppingPitList(): void {
    this.httpRequestService.steppingPitListRequest(this.params)
    .subscribe(res => {
      if (res['code'] === 0) {
        this.steppingPitList = res['data'].list;
        this.total = res['data'].total;
      } else {
        this.message.error(res['msg']);
      }
    });
  }

  // 选择tab标签页回调函数
  changTabs = ($event: any) => {
    this.params.status = $event.index;
    this.getSteppingPitList();
  }

  // 重置
  reset(): void {
    this.params.keyWord = '';
    this.params.date = '';
    this.params.sort = null;
    this.getSteppingPitList();
  }

  // 分页
  pageIndexChange(num: number): void {
    this.params.page = num;
    this.getSteppingPitList();
  }

  // 更新踩坑状态
  updateStatus(id: string, status: number): void {
    let updateParams = {
      id,
      status: status === 2 ? 1 : 2
    };
    this.httpRequestService.updateSteppingPitRequest(updateParams).subscribe(res => {
      if (res['code'] === 0) {
        this.message.success(res['msg']);
        this.getSteppingPitList();
      } else {
        this.message.error(res['msg']);
      }
    });
  }

  // 删除踩坑
  deleteSteppingPit(id: string): void {
    this.httpRequestService.deleteSteppingPitRequest(id).subscribe(res => {
      if (res['code'] === 0) {
        this.message.success(res['msg']);
        this.getSteppingPitList();
      } else {
        this.message.error(res['msg']);
      }
    });
  }

  // 编辑踩坑
  detailSteppingPit(id: string): void {
    this.router.navigate(['/dashboard/steppingPitDetail', { id }]);
  }

  // 阅读数排序
  sort(sort: string): void {
    this.params.sort = sort;
    this.getSteppingPitList();
  }

  ngOnInit() {
    this.getSteppingPitList();
  }

}
