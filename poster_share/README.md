## 需求概要
 电商项目中需要将自己小店的商品带上自己的小程序码生成海报，保存到本地，然后分享到万能的朋友圈，QQ空间，微博等等来广而告之...
如下图，三种海报格式轮播展示，左滑右滑切换到海报，点击下面保存图片按钮，将当前海报保存到手机相册
![图片描述][1]
## 思路
* 需要商品信息，用户信息以及小程序码。
* 使用[swiper][2]组件展示海报，
* 将海报通过[wx.createCanvasContext][3]绘制到画布[canvas][4]组件。
* 使用[canvasToTempFilePath][5] 将canvas海报保存到本地临时文件路径；
* 使用[saveImageToPhotosAlbum][6]将图片保存到本地相册
* 根据swiper组件的current属性判断当前保存的海报
## 解决方案
按照思路逐步实现：
### 商品信息，用户信息以及小程序码
1.商品信息通过导航事件传递到海报页，在此我使用的是模拟数据；
2.用户信息通过本地存储[wx.setStorageSync][7]  到缓存。 

```
    // index.js
   //事件处理函数
  navToShare: function () {
    // 模拟数据
    var data = {
      thumb_images: [
        'https://cbu01.alicdn.com/img/ibank/2018/544/692/8567296445_882293189.400x400.jpg',
        'https://cbu01.alicdn.com/img/ibank/2018/971/643/8581346179_882293189.400x400.jpg',
        'https://cbu01.alicdn.com/img/ibank/2018/184/392/8567293481_882293189.400x400.jpg'
      ],
      name: '2018夏季新款镂空圆领蝙蝠短袖t恤女装韩版宽松棉小衫上衣批发潮',
      price: 198,
    }
     wx.navigateTo({
        url: '../poster/poster?data=' + encodeURIComponent(JSON.stringify(data))
      })
  },
  
```


3.在海报页面onLoad函数的参数中获取商品信息
4.在海报页面获取本地缓存中的用户信息[wx.getStorageSync][8]
5.因为canvas绘制图片不支持跨域图片,所以先使用[getImageInfo][9]将网络图片返回图片的本地路径， 

```
// poster.js
  onLoad: function(options) {
    var data = JSON.parse(decodeURIComponent(options.data));
    var userinfo;
    //  获取本地存储的用户头像和昵称 
      userinfo = wx.getStorageSync('userInfo');
    console.log('用户信息', userinfo)
    // 渲染页面
    this.setData({
      avatar_url: userinfo.avatarUrl,
      nickname: userinfo.nickName,
      thumb_images: data.thumb_images,
      pro_price: data.price,
      pro_name: data.name,
    })

    //  保存网络图片到本地   用于canvas绘制图片
    wx.getImageInfo({
      src: userinfo.avatarUrl,
      success: (res) => {
        tmpAvatarUrl = res.path;
      }
    });
    // 保存产品图到本地  用于canvas绘制图片
    var thumbs = data.thumb_images;
    tmpThumbs = []; // 先清空，再添加新的产品图
    thumbs.forEach((item, i) => {
      wx.getImageInfo({
        src: item,
        success: (res) => {
          tmpThumbs.push(res.path)
        }
      })
    });
  },
```
7.小程序码由后端生成，前端通过POST请求将data传入，返回小程序码url，使用 wx.getImageInfo保存到本地
 
```
// 封装后的POST方法
     wxRequest.postRequest(url, data).then(res => {
                  if (res.data.error_code == 0) {
                  // 保存小程序码到本地  用于canvas绘制图片
                    wx.getImageInfo({
                      src: res.data.qrcode,
                      success: (result) => {
                        this.setData({
                          poster_qrcode: result.path
                        })
                      }
                    });
                  }
                })
```
### 使用[swiper][10]组件展示海报
在这个项目中我是将页面渲染和canvas绘制分开的，因为小程序单位rpx自动适配各种设备屏幕。而canvas绘制单位是px。我没有做px和rpx之间的计算，保存px单位固定大小的图片也不错。

```
<view class='poster_swiper'>
      <swiper bindchange="shareChange" current="{{current}}" circular="{{circular}}" previous-margin="100rpx" next-margin="100rpx" class="swiper_share">
        <swiper-item class="swiper_item1">
          // 根据设计渲染页面
        </swiper-item>
        <swiper-item class="swiper_item2" wx:if="{{thumb_images.length>1}}">
          // 根据设计渲染页面
        </swiper-item>
        <swiper-item class="swiper_item3" wx:if="{{thumb_images.length>2}}">
           // 根据设计渲染页面
        </swiper-item>
      </swiper>
    </view>
```
这里要用到swiper的几个属性列出来
<table> 
<tr>
<td>current</td>
<td>Number</td>
<td>0</td>
<td>当前所在滑块的 index</td>
<td></td>
</tr>
<tr>
<td>circular</td>
<td>Boolean</td>
<td>false</td>
<td>是否采用衔接滑动</td>
<td></td>
</tr>
<tr>
<td>previous-margin</td>
<td>String</td>
<td>"0px"</td>
<td>前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值</td>
<td><a href="" title="基础库 1.9.0 开始支持，低版本需做兼容处理。">1.9.0</a></td>
</tr>
<tr>
<td>next-margin</td>
<td>String</td>
<td>"0px"</td>
<td>后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值</td>
<td><a href="" title="基础库 1.9.0 开始支持，低版本需做兼容处理。">1.9.0</a></td>
</tr>
<tr>
<td>bindchange</td>
<td>EventHandle</td>
<td></td>
<td>current 改变时会触发 change 事件，event.detail = {current: current, source: source}</td>
<td></td>
</tr>
</table> 

### 将海报通过[wx.createCanvasContext][11]绘制到画布[canvas][12]组件。。
1.在wxml中添加canvas组件，设置canvas-id以便于wx.createCanvasContext绘制画布

```
<canvas class='canvas-poster' canvas-id='canvasposter'></canvas>
```
定义样式固定定位到可视区以外，不影响可视区展示。
```
.canvas-poster {
  position: fixed;
  width: 280px;
  height: 450px;
  top: 100%;
  left: 100%;
  overflow: hidden; 
}
```
三种海报分别绘制，具体看注释

```
  /*一张产品图*/
  drawPosterOne: function() {
    var ctx = wx.createCanvasContext('canvasposter');
    // ctx.clearRect(0, 0, 280, 450);
    /* 绘制背景*/
    ctx.rect(0, 0, 280, 450);
    ctx.setFillStyle('white');
    ctx.fillRect(0, 0, 280, 450);
    /*绘制店名*/
    ctx.setFontSize(16);
    ctx.setFillStyle('#333');
    ctx.textAlign = "center";
    ctx.fillText(this.data.nickname + '的小店', 140, 70);
    ctx.restore();
    /*绘制产品图*/
    ctx.drawImage(tmpThumbs[0], 35, 90, 210, 210);
    /* 绘制产品名称背景*/
    ctx.setFillStyle('#FF8409');
    ctx.fillRect(35, 300, 210, 60);
    /*绘制产品名称*/
    ctx.setFontSize(12);
    ctx.setFillStyle('#ffffff');
    ctx.textAlign = "left";
    ctx.fillText(this.data.pro_name.substr(0, 18), 45, 322);
    ctx.restore();
    ctx.setFontSize(12);
    ctx.setFillStyle('#ffffff');
    ctx.textAlign = "left";
    ctx.fillText(this.data.pro_name.substr(18, 20), 45, 344);
    ctx.restore();
    /* 绘制线框*/
    ctx.setLineDash([1, 3], 1);
    ctx.beginPath();
    ctx.moveTo(35, 375);
    ctx.lineTo(160, 375);
    ctx.moveTo(35, 435);
    ctx.lineTo(160, 435);
    ctx.setStrokeStyle('#979797');
    ctx.stroke();
    ctx.restore();
    /*绘制文字*/
    ctx.setFontSize(14);
    ctx.setFillStyle('#333333');
    ctx.textAlign = "left";
    ctx.fillText('￥', 35, 400);
    ctx.setFontSize(18);
    ctx.fillText(this.data.pro_price, 50, 400);
    ctx.setFontSize(11);
    ctx.setFillStyle('#666666');
    ctx.fillText(this.data.poster_qrtext, 35, 420);
    ctx.restore();
    /*绘制二维码*/
    ctx.drawImage(this.data.poster_qrcode, 185, 370, 60, 60);
    ctx.restore();
    /*圆形头像*/
    ctx.save()
    ctx.beginPath();
    ctx.arc(140, 30, 20, 0, 2 * Math.PI)
    ctx.setFillStyle('#fff')
    ctx.fill()
    ctx.clip()
    ctx.drawImage(tmpAvatarUrl, 120, 10, 40, 40)
    ctx.restore()
    ctx.draw(false, this.getTempFilePath);
  },
  /*两张产品图*/
  drawPosterTwo: function() {
    var ctx = wx.createCanvasContext('canvasposter');
    /* 绘制背景*/
    ctx.rect(0, 0, 280, 450);
    ctx.setFillStyle('white');
    ctx.fillRect(0, 0, 280, 450);
    /*绘制店名*/
    ctx.setFontSize(14);
    ctx.setFillStyle('#333');
    ctx.textAlign = "left";
    ctx.fillText(this.data.nickname + '的小店', 65, 36);
    ctx.restore();
    /* 绘制虚线框*/
    ctx.setLineDash([4, 1], 1);
    ctx.beginPath();
    ctx.moveTo(25, 60);
    ctx.lineTo(255, 60);
    ctx.moveTo(25, 325);
    ctx.lineTo(255, 325);
    ctx.setStrokeStyle('#979797');
    ctx.stroke();
    ctx.restore();
    /*绘制产品名称*/
    ctx.setFontSize(12);
    ctx.setFillStyle('#333');
    ctx.textAlign = "left";
    ctx.fillText(this.data.pro_name.substr(0, 13), 25, 82);
    ctx.setFontSize(12);
    ctx.setFillStyle('#333');
    ctx.fillText(this.data.pro_name.substr(13, 12) + '...', 25, 100);
    ctx.restore();
    /*绘制文字*/
    ctx.setFontSize(14);
    ctx.setFillStyle('#333333');
    ctx.textAlign = "left";
    ctx.fillText('￥', 190, 90);
    ctx.setFontSize(16);
    ctx.fillText(this.data.pro_price, 205, 90);
    ctx.restore();
    ctx.setFontSize(10);
    ctx.setFillStyle('#666666');
    ctx.textAlign = "center";
    ctx.fillText(this.data.poster_qrtext, 140, 420);
    ctx.restore();
    /*绘制产品图*/
    ctx.drawImage(tmpThumbs[0], 25, 115, 110, 150);
    ctx.drawImage(tmpThumbs[1], 145, 115, 110, 150);
    ctx.restore();
    /*绘制文字*/
    ctx.setFontSize(12);
    ctx.setFillStyle('#333333');
    ctx.textAlign = "left";
    ctx.fillText(this.data.slogan1, 25, 290);
    ctx.fillText(this.data.slogan2, 25, 308);
    ctx.restore();
    /*绘制二维码*/
    ctx.drawImage(this.data.poster_qrcode, 110, 330, 70, 70);
    ctx.restore();
    /*圆形头像*/
    ctx.save()
    ctx.beginPath();
    ctx.arc(35, 30, 20, 0, 2 * Math.PI)
    ctx.setFillStyle('#fff')
    ctx.fill()
    ctx.clip()
    ctx.drawImage(tmpAvatarUrl, 15, 10, 40, 40)
    ctx.restore()
    ctx.draw(false, this.getTempFilePath);
  },
  /*三张产品图*/
  drawPosterThree: function() {
    var ctx = wx.createCanvasContext('canvasposter');
    /* 绘制背景*/
    ctx.rect(0, 0, 280, 450);
    ctx.setFillStyle('white');
    ctx.fillRect(0, 0, 280, 450);
    /*绘制店名*/
    ctx.setFontSize(16);
    ctx.setFillStyle('#333');
    ctx.textAlign = "center";
    ctx.fillText(this.data.nickname + '的小店', 140, 70);
    ctx.restore();
    /* 绘制虚线框*/
    ctx.beginPath()
    ctx.setLineDash([4, 1], 1);
    ctx.beginPath();
    ctx.moveTo(20, 230);
    ctx.lineTo(145, 230);
    ctx.lineTo(145, 305);
    ctx.lineTo(40, 305);
    /*左下角圆角 ctx.arcTo( , 左下角左边坐标,左上角左边坐标,半径)*/
    ctx.arcTo(20, 305, 20, 230, 20);
    ctx.moveTo(20, 230);
    ctx.lineTo(20, 285);
    ctx.setStrokeStyle('#333333')
    ctx.stroke()
    ctx.setStrokeStyle('#979797');
    ctx.stroke();
    ctx.restore();
    /*绘制产品名称*/
    ctx.setFontSize(12);
    ctx.setFillStyle('#333');
    ctx.textAlign = "left";
    ctx.fillText(this.data.pro_name.substr(0, 9), 30, 250);
    ctx.setFontSize(12);
    ctx.setFillStyle('#333');
    ctx.fillText(this.data.pro_name.substr(9, 8) + '...', 30, 268);
    ctx.restore();
    /*绘制文字*/
    ctx.setFontSize(14);
    ctx.setFillStyle('#333333');
    ctx.textAlign = "left";
    ctx.fillText('￥', 30, 290);
    ctx.setFontSize(16);
    ctx.fillText(this.data.pro_price, 45, 290);
    ctx.restore();
    ctx.setFontSize(10);
    ctx.setFillStyle('#666666');
    ctx.textAlign = "center";
    ctx.fillText(this.data.poster_qrtext, 140, 420);
    ctx.restore();
    /*绘制产品图*/
    ctx.drawImage(tmpThumbs[0], 20, 90, 125, 125);
    ctx.drawImage(tmpThumbs[1], 160, 90, 100, 100);
    ctx.drawImage(tmpThumbs[2], 160, 205, 100, 100);
    ctx.restore();
    ctx.restore();
    /*绘制二维码*/
    ctx.drawImage(this.data.poster_qrcode, 110, 330, 70, 70);
    ctx.restore();
    /*圆形头像*/
    ctx.save()
    ctx.beginPath();
    ctx.arc(140, 30, 20, 0, 2 * Math.PI)
    ctx.setFillStyle('#fff')
    ctx.fill()
    ctx.clip()
    ctx.drawImage(tmpAvatarUrl, 120, 10, 40, 40)
    ctx.restore()
    ctx.draw(false, this.getTempFilePath);
  },
```
绘制中用到的数据如下

```
var tmpAvatarUrl = ""; /*用于绘制头像*/
var tmpThumbs = []; /*用于绘制产品图*/
var drawing = false; /*避免多次点击保存按钮*/
Page({
  /**
   * 页面的初始数据
   */
  data: {
    circular: true, // swiper 是否采用衔接滑动
    current: 0, // swiper 当前所在滑块的 index
    avatar_url: '', // 渲染头像
    nickname: '', // 渲染昵称
    poster_qrcode: '/images/poster_qrcode.png', // 小程序码
    poster_qrtext: '长按识别，即可查看商品',
    pro_name: '',  //产品名
    pro_price: '',  // 产品价格
    slogan1: '我的小店上新了，',  // 标语 1
    slogan2: '快来一起快来一起看看吧!', // 标语 2
    thumb_images: [] // 渲染图片
  },
```
###使用[canvasToTempFilePath][13] 将canvas海报保存到本地临时文件路径；

```
  //获取临时路径
  getTempFilePath: function() {
    wx.canvasToTempFilePath({
      canvasId: 'canvasposter',
      success: (res) => {
        this.saveImageToPhotosAlbum(res.tempFilePath)
      }
    })
  },
```
###使用[saveImageToPhotosAlbum][14]将图片保存到本地相册
```
  //保存至相册
  saveImageToPhotosAlbum: function(imgUrl) {
    if (imgUrl) {
      wx.saveImageToPhotosAlbum({
        filePath: imgUrl,
        success: (res) => {
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000
          })
          drawing = false
        },
        fail: (err) => {
          wx.showToast({
            title: '保存失败',
            icon: 'none',
            duration: 2000
          })
          drawing = false
        }
      })
    }else{
      wx.showToast({
        title: '绘制中……',
        icon: 'loading',
        duration: 3000
      })
    }
  },
```
`注意canvas绘制需要时间，所以设置 drawing 防止绘制被打断 `
### 根据swiper组件的current属性判断当前保存的海报
1.首先根据 change 事件设置current

```
 shareChange: function(e) {
    if (e.detail.source == 'touch') {
      this.setData({
        current: e.detail.current
      })
    }
  },
```
2.通过点击按钮执行savePoster保存海报到手机相册

```
  <view class="common_btn" catchtap="savePoster">
    <text>保存图片</text>
  </view>
```

`判断是否获取相册授权，已获得权限直接绘制，若未获得权限需提示用户前去设置授权`
```
  /*保存海报到手机相册*/
  savePoster: function(e) {
    var that = this;
    var current = this.data.current;
    //获取相册授权
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() { //这里是用户同意授权后的回调
              that.drawPoster(current);
            },
            fail() { //这里是用户拒绝授权后的回调
              wx.showModal({
                title: '提示',
                content: '若不打开授权，则无法将图片保存在相册中！',
                showCancel: true,
                cancelText: '去授权',
                cancelColor: '#000000',
                confirmText: '暂不授权',
                confirmColor: '#3CC51F',
                success: function(res) {
                  if (res) {
                    wx.openSetting({
                      //调起客户端小程序设置界面，返回用户设置的操作结果。
                    })
                  } else {
                    // console.log('用户点击取消')
                  }
                }
              })
            }
          })
        } else { //用户已经授权过了 
          that.drawPoster(current);
        }
      }
    })
  },
```
3.根据current判断当前海报绘制对应海报
```
  /* 绘制海报*/
  drawPoster: function(current) {
    if(drawing){
      wx.showToast({
        title: '绘制中……',
        icon: 'loading',
        duration: 3000
      }) 
    }else{
      drawing = true;
      // loading 
      // 根据swiper当前所在滑块的 index判断绘制对应海报
      switch (current) {
        case 0:
          this.drawPosterOne()
          break;
        case 1:
          this.drawPosterTwo()
          break;
        case 2:
          this.drawPosterThree()
          break;
      }
    }
   
  },
```
保存到手机相册的海报如下：
<table> 
<tr>
<td>![图片描述][15]</td>
<td>![图片描述][16]</td>
<td>![图片描述][17]</td>
</tr>
</table> 

##备注
图片来源于[网络][18]若有侵权请通知我立即删除
以上就是全部内容。不足之处请多指教！
[完整案例][19]


  [1]: /img/bVbgxY1
  [2]: https://developers.weixin.qq.com/miniprogram/dev/component/swiper.html
  [3]: https://developers.weixin.qq.com/miniprogram/dev/api/canvas/create-canvas-context.html
  [4]: https://developers.weixin.qq.com/miniprogram/dev/component/canvas.html
  [5]: https://developers.weixin.qq.com/miniprogram/dev/api/canvas/temp-file.html
  [6]: https://developers.weixin.qq.com/miniprogram/dev/api/media-picture.html#wxsaveimagetophotosalbumobject
  [7]: https://developers.weixin.qq.com/miniprogram/dev/api/data.html#wxsetstoragesynckeydata
  [8]: https://developers.weixin.qq.com/miniprogram/dev/api/data.html#wxgetstoragesynckey
  [9]: https://developers.weixin.qq.com/miniprogram/dev/api/media-picture.html#wxgetimageinfoobject
  [10]: https://developers.weixin.qq.com/miniprogram/dev/component/swiper.html
  [11]: https://developers.weixin.qq.com/miniprogram/dev/api/canvas/create-canvas-context.html
  [12]: https://developers.weixin.qq.com/miniprogram/dev/component/canvas.html
  [13]: https://developers.weixin.qq.com/miniprogram/dev/api/canvas/temp-file.html
  [14]: https://developers.weixin.qq.com/miniprogram/dev/api/media-picture.html#wxsaveimagetophotosalbumobject
  [15]: /img/bVbgxZI
  [16]: /img/bVbgxZZ
  [17]: /img/bVbgx0e
  [18]: https://detail.1688.com/offer/565252317766.html?spm=a261b.2187593.1998088710.53.75471383nnEGsD
  [19]: https://github.com/wangqin273/king/tree/master/poster_share