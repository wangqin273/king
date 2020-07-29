Vue.component("component-gotop", {
	template: `
			<div :class="['back-top',show_top?'back-top-show':'']" @click="_goTop">
				<i class="iconfont icon-arrow-up-bold"></i>
			</div>	
			`,
	data: function() {
		return {
			show_top: 0,
		}
	},
	created: function() {
		console.log('created');

	},
	mounted: function() {
		var that = this;
		that.$nextTick(function() {
			window.addEventListener('scroll', function() {
				var sTop = document.body.scrollTop || document.documentElement.scrollTop;
				if (sTop > 100) {
					if (!that.show_top) {
						that.show_top = 1;
					}
				} else {
					if (that.show_top) {
						that.show_top = 0;
					}
				}
			})
		})
	},
	props: [],
	methods: {
		_goTop: function() {
		 window.scrollTo({
		   top:0,
		   behavior:'smooth'
		 })
			// $('html,body').animate({
			// 	scrollTop: 0
			// })
		},
	}
});
