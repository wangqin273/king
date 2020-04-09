var vm = new Vue({
    el: ".vueBox",
    data: {
        tab_list: ['宝贝', '详情', '推荐'],
        tab_inx: 0,
        is_show_tab: false,
        banner_list: [
            'http://pic1.win4000.com/wallpaper/c/53cdd1f7c1f21.jpg',
            'http://pic1.win4000.com/wallpaper/c/53cdd1f41226b.jpg',
            'http://pic1.win4000.com/wallpaper/c/53cdd20a3a327.jpg',
            'http://pic1.win4000.com/wallpaper/c/53cdd1efe22b8.jpg'
        ],
        detail: {
            title: '欧舒丹甜蜜樱花沐浴啫喱/身体乳套装欧舒丹甜蜜樱花沐浴啫喱/身体乳套装',
            coupon: 20,
            price: 378,
            label: '公爵专享价',
            old_price: 499,
            source: '淘宝',
            buy_num: 25,
            data_time: '2019.09.16 - 2019.09.18',
            description: '欧舒丹甜蜜樱花沐浴啫喱详情欧舒丹<br>甜蜜樱花沐浴啫喱详情欧舒丹<br>甜蜜樱花沐浴啫喱详情欧舒丹甜蜜樱花沐浴啫喱详情欧舒丹甜蜜樱花沐浴啫喱详情欧舒丹甜蜜樱花沐浴啫喱详情欧舒丹甜蜜樱花沐浴啫喱详情欧舒丹甜蜜樱花沐浴啫喱详情欧舒丹甜蜜樱花沐浴啫喱详情欧舒丹甜蜜樱花沐浴啫喱详情欧舒丹甜蜜樱花沐浴啫喱详情欧舒丹甜蜜樱花沐浴啫喱详情'
        },
        product_list: [{
            img: 'http://pic1.win4000.com/wallpaper/c/53cdd1f7c1f21.jpg',
            title: '欧舒丹甜蜜樱花沐浴啫喱/身体乳套装欧舒丹甜蜜樱花沐浴啫喱/身体乳套装',
            coupon: 20,
            price: 378,
            label: '公爵专享价',
            old_price: 499,
            source: '淘宝'
        }, {
            img: 'http://pic1.win4000.com/wallpaper/c/53cdd1f41226b.jpg',
            title: '欧舒丹甜蜜樱花沐浴啫喱/身体乳套装欧舒丹甜蜜樱花沐浴啫喱/身体乳套装',
            coupon: 20,
            price: 378,
            label: '公爵专享价',
            old_price: 499,
            source: '淘宝'
        }, {
            img: 'http://pic1.win4000.com/wallpaper/c/53cdd20a3a327.jpg',
            title: '欧舒丹甜蜜樱花沐浴啫喱/身体乳套装欧舒丹甜蜜樱花沐浴啫喱/身体乳套装',
            coupon: 20,
            price: 378,
            label: '公爵专享价',
            old_price: 499,
            source: '淘宝'
        }, {
            img: 'http://pic1.win4000.com/wallpaper/c/53cdd1efe22b8.jpg',
            title: '欧舒丹甜蜜樱花沐浴啫喱/身体乳套装欧舒丹甜蜜樱花沐浴啫喱/身体乳套装',
            coupon: 20,
            price: 378,
            label: '公爵专享价',
            old_price: 499,
            source: '淘宝'
        }],
        ico_logo1: 'images/ico_logo1.png',
    },
    created: function () {
        document.title = this.detail.title
    },
    mounted: function () {
        var mySwiper = new Swiper('.swiper-container', {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            },
        })
    },
    methods: {
        changeTab: function (index) {
            switch (index) {
                case 0:
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    })
                    break;
                case 1:
                    window.scrollTo({
                        top: document.getElementById('detail').offsetTop,
                        behavior: "smooth"
                    })
                    break;
                case 2:
                    window.scrollTo({
                        top: document.getElementById('recommend').offsetTop,
                        behavior: "smooth"
                    })
                    break;
            }
        },
        productDetail: function () {
            location.href = 'product_detail.html'
        },
        receiveCoupon: function () {

        }
    }
});

window.onload = function () {
    var imgArr = document.querySelectorAll('img');
    var len = imgArr.length;
    var seeHeight = document.documentElement.clientHeight;
    var detailTop = document.getElementById('detail').offsetTop
    var recommendTop = document.getElementById('recommend').offsetTop

    lazyLoad();
    window.onscroll = lazyLoad;

    function lazyLoad() {
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        console.log(scrollTop)
        if (scrollTop > 42) {
            vm.is_show_tab = true
            if (scrollTop < detailTop - 100) {
                vm.tab_inx = 0
            } else if (scrollTop < recommendTop - 100) {
                vm.tab_inx = 1
            } else {
                vm.tab_inx = 2
            }
        } else {
            vm.is_show_tab = false
        }
        for (var i = 0; i < len; i++) {
            if (getOffsetTop(imgArr[i]) < seeHeight + scrollTop) {
                if (imgArr[i].getAttribute('src') == vm.ico_logo1) {
                    imgArr[i].src = imgArr[i].getAttribute('data-image')
                }
            }
        }
    }

    function getOffsetTop(obj) {
        var top = obj.offsetTop;
        while (obj = obj.offsetParent) {
            top += obj.offsetTop
        }
        return top
    }
};