# description

## 7.20

- 增加测试环境、生产环境和开发环境
- 修改git配置支持同时提交到两个仓库

oschina https://gitee.com/young1993/zhognshan.git

## 7.13

- 自行车报障(bikeMalfunction)
  - formdata上传图片
  - 压缩图片compress
  - 监听安卓物理返回键

- 公交换乘(bueTransfer)
  - 模糊搜索
  - 异步获取手机号和位置信息

- 物业租售：出租详情(propertyRenting/rent_detail)
  - script文件执行顺序

## 7.12

- 添加gulp 运行

```
gulp build
```

执行压缩操作

## 7.10

- 文件结构
  - js 每个模块新建一个目录 例如 /js/bicycle
  - html 每个模块新建一个目录 例如 /views/bicycle
  - css 每个模块新建一个目录 例如 /css/bicycle
  - img 每个模块新建一个目录 例如 /img/bicycle
  - libs 外部js文件引用

- common.js 地图功能使用

<<<<<<< HEAD
- map 具体地图使用分类
  - 1.zsbike 自行车类
 {
    id: 1,
    address: "中山市东区起湾道富丽路交叉口东南角",
    availBike: 12,
    capacity: 18,
    lat: 22.529894, // type Number
    lng: 113.399972, // type Number
    name: "起湾居委会", // type String
 }
  - 2.zswd 中山网点
 {
    address:"中山市南区城南三路38号",
    icoTypeKey:"2",
    id:"97",
    lat:22.474466,
    lng:113.354135,
    name:"中山公共交通运输客运站-城南客运站",
    phone:"0760-87330663",
    picturelevelKey:11,
    site_type:"售卡充值",
    town:"南区"
 }
- 3.zswy 物业租售
 {
   "id": 1,
   "name": "起湾居委会",
   "lat": 22.529894,
   "lng": 113.399972,
   "address": "中山市东区起湾道富丽路交叉口东南角",
   "area":"保税仓库",
   "room":"0厅0室0卫"
 }

=======
>>>>>>> dev_hmy
```
toMap({
	address: "中山市东区起湾道富丽路交叉口东南角",
	availBike: 12,
	capacity: 18,
<<<<<<< HEAD
	scale: 18, // 缩放比例
	lat: 22.529894, // type Number
	lng: 113.399972, // type Number
	name: "起湾居委会", // type String
  marks: [] // 地点数组 type Array
=======
	id: 1,
	lat: 22.529894,
	lng: 113.399972,
	name: "起湾居委会",
  marks: [] // 地点数组
>>>>>>> dev_hmy
})
```

- common.js
  - common 通用调用对象
  - zct 与app sdk 交互对象
  - window.ENV = dev || production 系统环境


## mui h5 ui框架

```
https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css
https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.js
```

## lodash.js js处理函数

```
https://cdn.bootcss.com/lodash.js/4.17.10/lodash.min.js
```

## 布局 rem flexible

~
```
http://g.tbcdn.cn/mtb/lib-flexible/0.3.2/??flexible_css.js,flexible.js
```

## animate 动画

```
https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css
```

## 通卡h5jssdk

```
https://static.allcitygo.com/sdk/JSsdk1.0.1.js
```

## jquery

```
https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
```

## es6

```
https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js
```