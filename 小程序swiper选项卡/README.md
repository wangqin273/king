选项卡随处可见，微信小程序中也不例外，下面来写一个简单的小程序选项卡
##思路
* 之前写过基于swiper的选项卡，在小程序中有swiper组件，毫无疑问这里要用到[swiper组件][1]
* 小程序中的swiper组件有个问题就是不能根据内容自适应高度，所以要通过[wx.getSystemInfoSync][3]获取设备高度设置swiper高度
* 小程序中的swiper组件中swiper-item内容超出可视区后无法滚动显示，所以这里要用到另一个组件[scroll-view][2]。
*小程序中的swiper组件功能还是比较有限的，有待优化。*
 

##方案

###1.首先在js中设置数据

```
 data: {
    tabs: ['菜单一', '菜单二'],// 导航菜单栏
    curIdx:0,// 当前导航索引
    scrollHeight:0, //滚动高度 = 设备可视区高度 -  导航栏高度
    list:[],// 内容区列表
  },
```
在onLoad函数中填充数据
```
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let list=[];
    for (let i=1;i<=30;i++){
      list.push(i)
    }
    this.setData({
      list: list
    });
  },
```

###2.在WXML中循环渲染出导航

```
<!-- 导航栏开始 -->
<view class="swiper-tab">
  <view wx:for="{{tabs}}" wx:key class="swiper-tab-item {{curIdx==index?'swiper-active':''}}" data-current="{{index}}" catchtap="clickTab">
    <text>{{item}}</text>
  </view>
</view>
```
###3.设置当前活动导航样式
```
/*初始化样式*/
view, text, picker, input, button, image{
  display: flex;
  box-sizing: border-box;
}
/* 导航样式*/
.swiper-tab {
  position: relative;
  width: 100%;
  height: 100rpx;
  justify-content: center;
  align-items: center;
}

.swiper-tab-item {
  background-color: #f3f3f3;
  width: 50%;
  height: 80rpx;
  justify-content: center;
  align-items: center;
}
.swiper-active{
  background-color: rgb(129, 190, 247);
  color: #fff;
}
```
###4.内容显示区
内容显示区使用swiper组件，swiper-item个数要与tabs数组长度 一致

```
<!-- 内容开始 -->
<swiper class="swiper_content" current="{{curIdx}}"   bindchange="swiperTab" style='height:{{scrollHeight}}px'>
  <swiper-item>
    <scroll-view class="scroll-y" scroll-y style='height:{{scrollHeight}}px' bindscrolltolower="onReachBottom">
    <view wx:for="{{list}}" wx:key>
      <text> 内容一{{item}}</text>
    </view>
        </scroll-view>
  </swiper-item>
  <swiper-item>
    内容二
  </swiper-item>
</swiper>
```
`小程序中的swiper组件有个问题就是不能根据内容自适应高度，所以要通过[wx.getSystemInfoSync][3]获取设备高度设置swiper高度`
`小程序中的swiper组件中swiper-item内容超出可视区后无法滚动显示，所以这里要用到另一个组件[scroll-view][2]。`
我们在onShow函数中通过getSystemInfoSync获取设备的宽高来设置swiper组件高度以及scroll-view高度
 
```
  onShow: function () {
    // 100为导航栏swiper-tab 的高度
   this.setData({
     scrollHeight: wx.getSystemInfoSync().windowHeight - (wx.getSystemInfoSync().windowWidth / 750 * 100),
   })
  },

```
###5.点击导航栏切换内容

```
  //点击切换
  clickTab: function (e) {
    this.setData({
      curIdx: e.currentTarget.dataset.current
    })
  }, 

```

###6.滑动内容切换导航栏

```
  //滑动切换
  swiperTab: function (e) {
    this.setData({
      curIdx: e.detail.current
    });
  },
```
###7.可滚动区域滚动最底刷新数据
```

  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
    // 更新列表
    let list = this.data.list;
    console.log(list)
    let lens = list.length
    for (let i = lens; i < lens+30; i++) {
      list.push(i)
    }
    this.setData({
      list: list
    });
  
  },

```
一个漂亮的选项卡就完成了

完整案例

  [1]: https://developers.weixin.qq.com/miniprogram/dev/component/swiper.html
  [2]: https://developers.weixin.qq.com/miniprogram/dev/component/scroll-view.html
  [3]: https://developers.weixin.qq.com/miniprogram/dev/api/systeminfo.html#wxgetsysteminfosync