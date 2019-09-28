var vm = new Vue({
	el: ".vueBox",
	data: {
		tab_list: ['全部', '肯德基', '星巴克', '车主邦', '善诊', '优酷视频', '搜狐视频', '虾米音乐'],
		tab_inx: 0,
		coupon_list:[{
			img: 'http://pic1.win4000.com/wallpaper/c/53cdd1f7c1f21.jpg',
			title: '优惠券名称优惠券名称',
			price: '3.88',
			label: '公爵专享价',
			old_price: '5.00',
			is_sale_out: true
		}, {
			img: 'http://pic1.win4000.com/wallpaper/c/53cdd1f7c1f21.jpg',
			title: '优惠券名称优惠券名称',
			price: '3.88',
			label: '公爵专享价',
			old_price: '5.00',
			is_sale_out: true
		},{
			img: 'http://pic1.win4000.com/wallpaper/c/53cdd1f7c1f21.jpg',
			title: '优惠券名称优惠券名称',
			price: '3.88',
			label: '公爵专享价',
			old_price: '5.00',
			is_sale_out: true
		},{
			img: 'http://pic1.win4000.com/wallpaper/c/53cdd1f7c1f21.jpg',
			title: '优惠券名称优惠券名称',
			price: '3.88',
			label: '公爵专享价',
			old_price: '5.00',
			is_sale_out: true
		}, {
			img: 'http://pic1.win4000.com/wallpaper/c/53cdd1f7c1f21.jpg',
			title: '优惠券名称优惠券名称',
			price: '3.88',
			label: '公爵专享价',
			old_price: '5.00',
			is_sale_out: true
		}, {
			img: 'http://pic1.win4000.com/wallpaper/c/53cdd1f7c1f21.jpg',
			title: '优惠券名称优惠券名称',
			price: '3.88',
			label: '公爵专享价',
			old_price: '5.00',
			is_sale_out: true
		}, {
			img: 'http://pic1.win4000.com/wallpaper/c/53cdd1f7c1f21.jpg',
			title: '优惠券名称优惠券名称',
			price: '3.88',
			label: '公爵专享价',
			old_price: '5.00',
			is_sale_out: true
		}, {
			img: 'http://pic1.win4000.com/wallpaper/c/53cdd1f7c1f21.jpg',
			title: '优惠券名称优惠券名称',
			price: '3.88',
			label: '公爵专享价',
			old_price: '5.00',
			is_sale_out: false
		}]
	},
	created: function() { },
	mounted: function() {},
	methods: {
		changeTab: function(index) {
			this.tab_inx = index;
			var i = index ? index - 1 : index;
			var mw = 0.32 * (document.body.clientWidth / 750) * 100
			var domLeft = document.getElementById('tab_' + i).offsetLeft - mw;
			document.querySelector('.tab-list').scrollTo({
				left: domLeft,
				behavior: "smooth"
			})
		},
	 
	}
});

/* 
 * 封装吸顶函数，需结合css实现。
 * 也可以直接用js改变样式，可以自行修改。
 */
    function ceiling(obj) {
        var ot = obj.offsetTop;
        document.onscroll = function () {
            var st = document.body.scrollTop || document.documentElement.scrollTop;
            /*
             * 在这里我给obj添加一个自定义属性。className可能会影响原有的class
             * 三元运算使代码更简洁
             */
            obj.setAttribute("data-fixed",st >= ot?"fixed":"");
        }
    }
  window.onload = function () {
         /*获取导航对象*/
        var wrap = document.getElementById("wrap");
        ceiling(wrap) /*调用吸顶函数  */
    };