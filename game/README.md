# 前言
昨天在微信小程序实现了圆形进度条，今天想把这个圆形进度条做成一个组件，方便以后直接拿来用。
根据官方文档[自定义组件][1]一步一步来
# 创建自定义组件
## 第一步创建项目结构
打开微信开发者工具创建一个项目，
新建目录 components 与 pages 目录同级
在components中新建一个目录circle
在circle中新建 Component 命名为 circle 自动生成 json wxml wxss js 4个文件。
结构如下：
![clipboard.png](/img/bV3IlM)
## 第二步编写组件
### 编写json
首先需要在 json 文件中进行自定义组件声明（将 component 字段设为 true 可这一组文件设为自定义组件）
```
{
"component": true
}
```
### 编写wxml和wxss
同时，还要在 wxml 文件中编写组件模版，在 wxss 文件中加入组件样式， 这里我就编写圆环进度条的 模板和样式，参见[微信小程序之圆形进度条][2]。
`要注意canvas绘制的是px为单位的，所以这里我统一用px单位；其中size是根据canvas绘制的圆环的直径，后面在js中会提到。`
在组件的wxml中可以包含 slot 节点，用于承载组件使用者提供的wxml结构。

```
<!-- components/circle/circle.wxml -->
<view class="circle_box" style="width:{{size}}px;height:{{size}}px">
<canvas class="circle_bg" canvas-id="{{bg}}" style="width:{{size}}px;height:{{size}}px"></canvas>
<canvas class="circle_draw" canvas-id="{{draw}}" style="width:{{size}}px;height:{{size}}px"></canvas>
<slot></slot>
</view>
```
`注意：在组件wxss中不应使用ID选择器、属性选择器和标签名选择器。`
```
/* components/circle/circle.wxss */
.circle_box,.circle_draw{ position: relative; }
.circle_bg{position: absolute;}

```
### 编写js
在自定义组件的 js 文件中，需要使用 Component() 来注册组件，并提供组件的属性定义、内部数据和自定义方法。
组件的属性值和内部数据将被用于组件 wxml 的渲染，其中，属性值是可由组件外部传入的。更多细节参见 [Component构造器][3] 。

```
/* components/circle/circle.js */
Component({
options: {
multipleSlots: true // 在组件定义时的选项中启用多slot支持
},
properties: {
bg: {            // 属性名
type: String,   // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
value: 'bg'     // 属性初始值（可选），如果未指定则会根据类型选择一个
},
draw: {
type: String,
value: 'draw'
},
},

data: { /*  私有数据，可用于模版渲染 */
size: 0, /* 圆环盒子大小 size >= 2*x ( x 为canvas的绘制半径)*/
step: 1,
num: 100
},
methods: {
/*
* 有关参数
* id : canvas 组件的唯一标识符 canvas-id
* x : canvas 绘制圆形的半径
* w : canvas 绘制圆环的宽度
*/
drawCircleBg: function (id, x, w) {
// 设置圆环外面盒子大小 宽高都等于圆环直径
this.setData({
size: 2 * x   // 更新属性和数据的方法与更新页面数据的方法类似
});
// 使用 wx.createContext 获取绘图上下文 ctx  绘制背景圆环
var ctx = wx.createCanvasContext(id)
ctx.setLineWidth(w / 2);
ctx.setStrokeStyle('#20183b');
ctx.setLineCap('round')
ctx.beginPath();//开始一个新的路径
//设置一个原点(x,y)，半径为r的圆的路径到当前路径 此处x=y=r
ctx.arc(x, x, x - w, 0, 2 * Math.PI, false);
ctx.stroke();//对当前路径进行描边
ctx.draw();
},
drawCircle: function (id, x, w, step) {
// 使用 wx.createContext 获取绘图上下文 context  绘制彩色进度条圆环
var context = wx.createCanvasContext(id);
// 设置渐变
var gradient = context.createLinearGradient(2 * x, x, 0);
gradient.addColorStop("0", "#2661DD");
gradient.addColorStop("0.5", "#40ED94");
gradient.addColorStop("1.0", "#5956CC");
context.setLineWidth(w);
context.setStrokeStyle(gradient);
context.setLineCap('round')
context.beginPath();//开始一个新的路径
// step 从0到2为一周
context.arc(x, x, x - w, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
context.stroke();//对当前路径进行描边
context.draw()
},
/* 内部私有方法建议以下划线开头 ，
* 自定义组件触发事件时，需要使用 triggerEvent 方法，指定事件名、detail对象和事件选项 */
_runEvent() {
//触发自定义组件事件
this.triggerEvent("runEvent")
}
},

// 生命周期函数，可以为函数，或一个在methods段中定义的方法名
onReady: function () {
}
})
```
自定义组件圆形进度条到此已经完成，

# 使用自定义组件
下面我们在index中使用 自定义组件圆形进度条
## json 文件中进行引用声明
使用已注册的自定义组件前，首先要在页面的 json 文件中进行引用声明。此时需要提供每个自定义组件的标签名和对应的自定义组件文件路径：

```
{
"usingComponents": {
"circle": "/components/circle/circle"
}
}
```
## wxml 文件中使用自定义组件
这样，在页面的 wxml 中就可以像使用基础组件一样使用自定义组件。节点名即自定义组件的标签名，节点属性即传递给组件的属性值。
节点名即自定义组件的标签名：circle；
节点属性即传递给组件的属性值：bg，draw；
当自定义组件触发“runEvent”事件时，调用“_runEvent”方法。
```
<!--index.wxml-->
<view class="container">
<circle id='circle1'
bg='circle_bg1'
draw='circle_draw1'
bind:runEvent="_runEvent" >
<!-- 这部分内容将被放置在组件 <slot> 的位置上 -->
<view class="circle_info" bindtap="changeTime">
<view class="circle_dot"></view>
<text class='circle_txt'> {{txt}}  </text>
</view>
</circle>
</view>
```
自定义组件的 wxml 节点结构在与数据结合之后，将被插入到引用位置内。
在wxss给  <slot>  位置上的内容添加一些样式
```
/**index.wxss**/
/*圆环进度条文字*/
.circle_info{
position: absolute;
width: 100%;
left: 50%;
top: 50%;
transform: translate(-50%,-50%);
display: flex;
align-items: center;
justify-content: center
}
.circle_dot{
width:16rpx;
height: 16rpx;
border-radius: 50%;
background-color: #fb9126;
}
.circle_txt{
padding-left: 10rpx;
color: #fff;
font-size: 36rpx;
letter-spacing: 2rpx;
}


```


## js 文件中调用自定义组件中的方法
在wxml中我们用到一个暑假{{txt}},我们需要在js中设置一下data,然后在onReady中使用selectComponent选择组件实例节点
```
//index.js
data: {
txt: "正在匹配中..."
},
onReady: function () {
// 获得circle组件
this.circle = this.selectComponent("#circle1");
// 绘制背景圆环
this.circle.drawCircleBg('circle_bg1', 100, 8)
// 绘制彩色圆环
this.circle.drawCircle('circle_draw1', 100, 8, 2);
},
```
效果如下
<table>
<tr>
<td>this.circle.drawCircle('circle_draw1', 100, 8, 0.5);  ：</td>
<td> this.circle.drawCircle('circle_draw1', 100, 8, 1);</td>
<td>this.circle.drawCircle('circle_draw1', 100, 8, 2);</td>
</tr>
<tr>
<td>![clipboard.png](/img/bV3C8i)</td>
<td>![clipboard.png](/img/bV3C72)</td>
<td>![clipboard.png](/img/bV3C7S)</td>
</tr>
</table>


`接下来要写定时器方法了，在定时器中每隔一段时间调用一次 this.circle.drawCircle(id, x, w, step)
，通过改变step的值来动态绘制圆环`
1. 在data中设置几个初始值
2. 定义一个定时器方法countInterval，假设每隔100毫秒 count递增+1，当 count递增到100的时候刚好是一个圆环，然后改变txt值并且清除定时器
3. 在 onReady 中调用这个定时器方法
```
data: {
txt: "正在匹配中...",
count: 0,//计数器，初始值为0
maxCount: 100, // 绘制一个圆环所需的步骤
countTimer: null,//定时器，初始值为null
},
countInterval: function () {
// 设置倒计时 定时器 假设每隔100毫秒 count递增+1，当 count递增到两倍maxCount的时候刚好是一个圆环（ step 从0到2为一周），然后改变txt值并且清除定时器
this.countTimer = setInterval(() => {
if (this.data.count <= 2 * this.data.maxCount) {
// 绘制彩色圆环进度条
this.circle.drawCircle('circle_draw1', 100, 8, this.data.count / this.data.maxCount)
this.data.count++;
} else {
this.setData({
txt: "匹配成功"
});
clearInterval(this.countTimer);
}
}, 100)
},
onReady: function () {
// 获得circle组件
this.circle = this.selectComponent("#circle1");
// 绘制背景圆环
this.circle.drawCircleBg('circle_bg1', 100, 8)
// 绘制彩色圆环
// this.circle.drawCircle('circle_draw1', 100, 8, 2);
this.countInterval()
},
```
最终效果
![图片描述][6]


[1]: https://mp.weixin.qq.com/debug/wxadoc/dev/framework/custom-component/
[2]: https://segmentfault.com/a/1190000013219501
[3]: https://mp.weixin.qq.com/debug/wxadoc/dev/framework/custom-component/component.html
[4]: https://mp.weixin.qq.com/debug/wxadoc/dev/framework/custom-component/
[5]: https://mp.weixin.qq.com/debug/wxadoc/dev/framework/custom-component/
[6]: https://segmentfault.com/a/1190000013219501
