var vm = new Vue({
	el: ".vueBox",
	data: {
		tab_list: ['全部', '肯德基', '星巴克', '车主邦', '善诊', '优酷视频', '搜狐视频', '虾米音乐'],
		cur: {
			tab: '',
			index: 0,
		},
		tab_inx: 0,
		tab_idx: 0,
		tab_index: 0,
		coupon_list: [{
			img: 'http://pic1.win4000.com/wallpaper/c/53cdd1f7c1f21.jpg',
			title: '优惠券名称优惠券名称',
			price: '3.88',
			label: '公爵专享价',
			old_price: '5.00',
			is_sale_out: true
		},  {
			img: 'http://pic1.win4000.com/wallpaper/c/53cdd1f7c1f21.jpg',
			title: '优惠券名称优惠券名称',
			price: '3.88',
			label: '公爵专享价',
			old_price: '5.00',
			is_sale_out: false
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
			is_sale_out: true
		}]
	},
	created: function() {},
	mounted: function() {},
	methods: {
		// 横向滚动
		changeTab: function(cur, index) {
			var i = index ? index - 1 : index;
			var mw = 0.32 * (document.body.clientWidth / 750) * 100;
				var obj,domLeft =0
			switch (cur) {
				case 'tab_inx':
					this.tab_inx = index;
					obj = document.querySelector('#tab_inx');
					domLeft = document.getElementById('tab_inx_' + i).offsetLeft - mw;
					break;
				case 'tab_idx':
					obj = document.querySelector('#tab_idx');
					domLeft = document.getElementById('tab_idx_' + i).offsetLeft - mw;
					this.tab_idx = index;
					break;
				case 'tab_index':
					obj = document.querySelector('#tab_index');
					domLeft = document.getElementById('tab_index_' + i).offsetLeft - mw;
					this.tab_index = index;
					break;
				default:
					break;
			}
			obj.scrollTo({
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
function arrCeiling(arr) {
	var ot = [];
	arr.forEach(function(item, i) {
		ot.push(item.offsetTop);
	})
	document.onscroll = function() {
		var st = document.body.scrollTop || document.documentElement.scrollTop;
		arr.forEach(function(item, i) {
			console.log(st, ot)
			item.setAttribute("data-fixed", st >= ot[i] ? "fixed" : "");
		})
	}
}
window.onload = function() {
	/*获取导航数组*/
	var arr = document.querySelectorAll('.tab-list')
	arrCeiling(arr)
};
