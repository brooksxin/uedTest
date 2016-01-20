![logo][1] Bootstrap 3.0.3
===

标签（空格分隔）： css html jquery 响应式 布局

---
## 目录
[TOC]

---

## 介绍
Bootstrap 是基于Less框架构建的CSS库，是一套前端样式开发框架。
特点是`扁平化`、`极简化`、`轻量`、`迅捷`、`移动优先`！
本篇所介绍Bootstrap版本为**3.0.3**。

---
##入门
### 安装

#### 预编译版本下载

   + [**下载Bootstrap**](https://github.com/twbs/bootstrap/releases/download/v3.0.3/bootstrap-3.0.3-dist.zip)
#### 源码版本下载

   + [**下载源码**](https://github.com/twbs/bootstrap/archive/v3.0.3.zip)
   
#### 中文网CDN引用

```html
<!-- 最新 Bootstrap 核心 CSS 文件 -->
<link rel="stylesheet" href="http://cdn.bootcss.com/twitter-bootstrap/3.0.3/css/bootstrap.min.css">
    
<!-- 可选的Bootstrap主题文件（一般不用引入） -->
<link rel="stylesheet" href="http://cdn.bootcss.com/twitter-bootstrap/3.0.3/css/bootstrap-theme.min.css">
    
<!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
<script src="http://cdn.bootcss.com/jquery/1.10.2/jquery.min.js"></script>
    
<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
<script src="http://cdn.bootcss.com/twitter-bootstrap/3.0.3/js/bootstrap.min.js"></script>

```

### 包含文件
#### 预编译Bootstrap版本
```
bootstrap/
├── css/
│   ├── bootstrap.css
│   ├── bootstrap.min.css
│   ├── bootstrap-theme.css
│   └── bootstrap-theme.min.css
├── js/
│   ├── bootstrap.js
│   └── bootstrap.min.js
└── fonts/
    ├── glyphicons-halflings-regular.eot
    ├── glyphicons-halflings-regular.svg
    ├── glyphicons-halflings-regular.ttf
    └── glyphicons-halflings-regular.woff
```

#### Bootstrap 源码
```
bootstrap/
├── less/
├── js/
├── fonts/
├── dist/
│   ├── css/
│   ├── js/
│   └── fonts/
├── docs-assets/
├── examples/
└── *.html

less/、js/ 和 fonts/ 分别包含了CSS、JS和字体图标的源码。dist/ 目录包含了上面所说的预编译Bootstrap包内的所有文件。docs-assets/、examples/ 和所有 *.html 文件是文档的源码文件。除了前面提到的这些文件，还包含package定义文件、许可证文件等。
```

### DEMO
```html
<!DOCTYPE html>
<html lang="zh-cn">
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>bootstrapDemo</title>
<link rel="stylesheet" href="http://cdn.bootcss.com/twitter-bootstrap/3.0.3/css/bootstrap.min.css">
<script src="http://cdn.bootcss.com/jquery/1.10.2/jquery.min.js"></script>
<script src="http://cdn.bootcss.com/twitter-bootstrap/3.0.3/js/bootstrap.min.js"></script>
</head>
<body>
	<h1>Hello, world!</h1>
</body>
</html>

```

---

## 进阶
### 样式库
#### Normalize--重置样式表
#### Containers--居中对齐、不能嵌套
#### 栅格系统

 - `.container` --> `.row` --> `.col-xs-4`
 - 12列
 - 媒体查询
 - <table>
        <thead>
          <tr>
            <th></th>
            <th>
              超小屏幕设备
              <small>手机 (&lt;768px)</small>
            </th>
            <th>
              小屏幕设备
              <small>平板 (&ge;768px)</small>
            </th>
            <th>
              中等屏幕设备
              <small>桌面 (&ge;992px)</small>
            </th>
            <th>
              大屏幕设备
              <small>桌面 (&ge;1200px)</small>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>栅格系统行为</th>
            <td>总是水平排列</td>
            <td colspan="3">开始是堆叠在一起的，超过这些阈值将变为水平排列</td>
          </tr>
          <tr>
            <th>最大<code>.container</code>宽度</th>
            <td>None (自动)</td>
            <td>750px</td>
            <td>970px</td>
            <td>1170px</td>
          </tr>
          <tr>
            <th>class前缀</th>
            <td><code>.col-xs-</code></td>
            <td><code>.col-sm-</code></td>
            <td><code>.col-md-</code></td>
            <td><code>.col-lg-</code></td>
          </tr>
          <tr>
            <th>列数</th>
            <td colspan="4">12</td>
          </tr>
          <tr>
            <th>最大列宽</th>
            <td class="text-muted">自动</td>
            <td>60px</td>
            <td>78px</td>
            <td>95px</td>
          </tr>
          <tr>
            <th>槽宽</th>
            <td colspan="4">30px (每列左右均有15px)</td>
          </tr>
          <tr>
            <th>可嵌套</th>
            <td colspan="4">Yes</td>
          </tr>
          <tr>
            <th>偏移（Offsets）</th>
            <td colspan="4">Yes</td>
          </tr>
          <tr>
            <th>列排序</th>
            <td colspan="4">Yes</td>
          </tr>
        </tbody>
      </table>

  [1]: http://v3.bootcss.com/docs-assets/ico/favicon.png