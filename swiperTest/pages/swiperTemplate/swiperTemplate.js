
Page({
  data: {
    swiperCon: {
      imgUrls: [
        '../../images/banner.png',
        '../../images/banner-1.jpg',
        '../../images/banner-2.jpg'
      ],
      indicatorDots: true,//是否显示面板指示点
      indicatorColor: "rgba(0, 0, 0, .3)",//指示点颜色
      indicatorActiveColor: "#007aff",//当前选中的指示点颜色
      autoplay: true,//是否自动切换
      interval: 5000,//自动切换时间间隔
      duration: 1000,//滑动动画时长
      circular: true,//是否采用衔接滑动
    }
  }
})