Vue.component("component-header", {
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
					console.log('menu', that.menus)
				});
		},
		_navHome: function() {
			location.href = "index.html"
		},
		_showMenu: function() {
			this.menus_show = !this.menus_show
		},

	}
});
