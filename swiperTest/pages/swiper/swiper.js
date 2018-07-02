
Page({
    data: {
        swiperCon: {
            imgUrls: [
                '../../images/banner-1.jpg',
                '../../images/banner-2.jpg'
            ],
            indicatorDots: true,
            indicatorColor: "rgba(0, 0, 0, .3)",
            indicatorActiveColor: "#007aff",
            autoplay: true,
            interval: 5000,
            duration: 1000,
            circular: true,
        },

   
    
    },

    bindChange_select: function (ev) {
      const curindex = ev.target.dataset.current
      this.data.objArray[curindex].index = ev.detail.value
      this.setData({
        objArray: this.data.objArray
      })
    },

    bindChange_select: function(ev) {
        const curindex = ev.target.dataset.current
        this.data.objArray[curindex].index = ev.detail.value
        this.setData({
            objArray: this.data.objArray
        })
    }
})