# 个人博客后台管理系统

该项目是我个人的博客后台管理系统，采用 `Angular 9.0` + `ng-zorro-antd` 架构，本项目支持 `Markdown` 文档写作。

## 使用方法

```bash
npm intall // 安装依赖
npm start  // 启动项目
```

## 项目结构

```bash
├── tamBlog-admin                  编译结果目录
├── e2e                            测试目录
├── src                            源码目录
|   ├── assets                     公共资源目录（图标、字体等）
|   ├── services                   应用服务目录
|   ├── app                        页面文件目录
|   |   ├── login                  login页面目录
|   |   |   ├── routing.modules.ts 路由文件
|   |   |   ├── component.html     HTML文件
|   |   |   ├── component.ts       组件文件
|   |   |   ├── modules.ts         模块文件
|   |   |   └── component.less     样式文件
|   |   ├── app.routing.modules.ts 根路由
|   |   ├── app.component.html     app HTML入口
|   |   ├── app.component.ts       根组件
|   |   └── app.modules.ts         根模块
|   ├── styles.less                项目通用样式
|   ├── theme.less                 主题样式文件
|   └── index.html                 应用入口
└── angular.json                   应用配置
```

## 文档资源

Angular官方文档：[https://angular.cn/](https://angular.cn/)

Ng-zorro官方文档：[https://ng.ant.design/docs/introduce/zh](https://ng.ant.design/docs/introduce/zh)

Rxjs官方文档：[https://cn.rx.js.org/](https://cn.rx.js.org/)

TypeScript官方文档：[https://www.tslang.cn/docs/home.html](https://www.tslang.cn/docs/home.html)
