Page({
  data: {
  curIdx:0,
  listInfo:[
      {
          title:'效果一',
          imgUrl: '../../image/icon-1.png',
          curUrl: '../../image/icon-1-cur.png',
      },
      {
        title: '效果二',
        imgUrl: '../../image/icon-2.png',
        curUrl: '../../image/icon-2-cur.png',
      },
      {
        title: '效果三',
        imgUrl: '../../image/icon-3.png',
        curUrl: '../../image/icon-3-cur.png',
      },
  ]
  },
   chooseImg: function (e) {
     this.setData({
       curIdx: e.currentTarget.dataset.current
     })
    //  console.log(e)
    //  console.log(this.data.curIdx) 
  }
})