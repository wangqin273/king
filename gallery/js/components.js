var componentGotop = {
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
};
var componentHeader =  {
	template: `
	 <div>
         <div class="header">
            <div class="header-home" @click="_navHome()"><i class="iconfont icon-home"></i></div>
            <div class="header-name" v-text="category_name"></div>
            <div class="header-menu" @click="_showMenu()"><i :class="['iconfont',menus_show?'icon-close':'icon-menu'] "></i></div>
         </div>
        <div :class="['menus-wrapper',menus_show?'menus-show':'']" >
            <div class="menus-box" v-for="menu,i in menus">
                <div class="menus-cover">
                    <img :src="menu.cover" alt="">
                </div>
                <div class="menus-info">
                    <div class="menus-title">
                        <span v-text="menu.title"></span>
                    </div>
                     <ul class="menus-list">
                        <li v-for="item,j in menu.list">
													<span v-text="item.name"></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
	</div>
	`,
	data: function() {
		return {
			menus_show: 0,
			menus: [],
		}
	},
	props: {
		category_name: {
			default: '美图驿馆'
		},
	},
	created: function() {
		this._getAlbums()
	},
	methods: {
		_getAlbums: function() {
			var that = this;
			// 模拟数据
			axios.get('./data/menu.json')
				.then(function(resp) { 
					that.menus = resp.data.menus; 
				});
		},
		_navHome: function() {
			location.href = "index.html"
		},
		_showMenu: function() {
			this.menus_show = !this.menus_show
		},

	}
};
var componentList = {
	template: `
	<ul class="albums-list">
		<li v-for="item,i in albums">
			<div class="photo-box" @click="navToDes(item)">
				<div class="photo-title" v-text="item.title"></div>
				<div class="lazy-img">
					<img v-lazy="item.cover" src="item.cover" :alt="item.title" />
				</div>
				<div class="photo-time" v-text="item.time"></div>
			</div>
		</li>
	</ul>
	`,
	data: function() {
		return {

		}
	},
	props: {
		albums: Object,
		column: {
			type: Number,
			default: 2
		}
	},
	methods: {
		navToDes: function(item) {
			location.href = 'details.html?id=' + item.id
		},
	}
};
var list = {
			template: `
	<ul class="albums-list">
		<li v-for="item,i in albums">
			<div class="photo-box" @click="navToDes(item)">
				<div class="photo-title" v-text="item.title"></div>
				<div class="lazy-img">
					<img v-lazy="item.cover" src="item.cover" :alt="item.title" />
				</div>
				<div class="photo-time" v-text="item.time"></div>
			</div>
		</li>
	</ul>
	`,
			data: function() {
				return {

				}
			},
			props: {
				albums: Object,
				column: {
					type: Number,
					default: 2
				}
			},
			methods: {
				navToDes: function(item) {
					location.href = 'details.html?id=' + item.id
				},
			}
		}
