var max_page = 3,
	page = 1,
	list = [{
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
	}];
var mw = 0.32 * (document.body.clientWidth / 750) * 100;
var vm = new Vue({
	el: ".vueBox",
	data: {
		tab_list: ['推荐', '推荐11', '推荐22', '推荐33', '推荐44', '推荐555', '推荐666', '推荐777'],
		tab_inx: 0,
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
	created: function() {

	},
	methods: {
		changeTab: function(index) {
			this.tab_inx = index;
			var i = index ? index - 1 : index; 
  			var domLeft = this.$refs.tablist[i].offsetLeft - mw; 
                    
			// var sLeft = $('#tab' + i).position().left - mw;
			// console.log(domLeft, sLeft)
			$('.tab-list').animate({
				scrollLeft: domLeft
			})
			// 不兼容ios
			// document.querySelector('.tab-list').scrollTo({
			// 	left: domLeft,
			// 	behavior: "smooth"
			// })
		},
		productDetail: function() {
			location.href = 'product_detail.html'
		}
	}
});

window.onload = function() {
	window.onscroll = function() {
		//文档内容实际高度（包括超出视窗的溢出部分）
		var scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
		//滚动条滚动距离
		var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
		//窗口可视范围高度
		var clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight, document.body.clientHeight);
		// 加载更多内容 start
		if (clientHeight + scrollTop >= scrollHeight) {
			console.log("===加载更多内容……===", clientHeight, scrollTop);
			if (page < max_page) {
				vm.product_list = vm.product_list.concat(list)
				page++
			} else {
				console.log("===没有更多……===", vm.product_list);
			}
		}
		// 加载更多内容 end
	}
};

function _touch() {
	var startx; //让startx在touch事件函数里是全局性变量。
	var endx;
	var el = document.getElementById('productList');
	// var el=document.getElementsByTagName("body")[0] ;
	function cons() { //独立封装这个事件可以保证执行顺序，从而能够访问得到应该访问的数据。
		console.log(starty, endy);
		var l = Math.abs(startx - endx);
		var h = Math.abs(starty - endy);
		if (l > h) {
			// x事件
			if (startx > endx) {
				if (vm.tab_inx < vm.tab_list.length - 1) {
					vm.tab_inx++
					var i = vm.tab_inx ? vm.tab_inx - 1 : vm.tab_inx;
					var domLeft = document.getElementById('tab' + i).offsetLeft - mw;
					$('.tab-list').animate({
						scrollLeft: domLeft
					})
				} else {
					vm.tab_inx = vm.tab_list.length - 1
				}
				console.log(vm.tab_inx, vm.tab_list.length)
			} else if (startx < endx) {
				if (vm.tab_inx > 0) {
					vm.tab_inx--
					var i = vm.tab_inx ? vm.tab_inx - 1 : vm.tab_inx;
					var domLeft = document.getElementById('tab' + i).offsetLeft - mw;
					$('.tab-list').animate({
						scrollLeft: domLeft
					})
				} else {
					vm.tab_inx = 0
				}
			}

		} else {
			// y事件
			if (starty > endy) {
				// alert('top');

			} else if (starty < endy) {
				// alert('bottom');
			}
		}
	}
	el.addEventListener('touchstart', function(e) {
		var touch = e.changedTouches;
		startx = touch[0].clientX;
		starty = touch[0].clientY;
	});
	el.addEventListener('touchend', function(e) {
		var touch = e.changedTouches;
		endx = touch[0].clientX;
		endy = touch[0].clientY;
		cons(); //startx endx 的数据收集应该放在touchend事件后执行，而不是放在touchstart事件里执行，这样才能访问到touchstart和touchend这2个事件产生的startx和endx数据。另外startx和endx在_touch事件函数里是全局性的，所以在此函数中都可以访问得到，所以只需要注意事件执行的先后顺序即可。
	});
}
_touch();
