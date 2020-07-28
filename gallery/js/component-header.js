Vue.component("component-header", {
	template: `
	<div class="header">
		<div class="header-home" @click="navHome()"><i class="iconfont icon-home"></i></div>
		<div class="header-name" v-text="category_name"></div>
		<div class="header-menu" @click="showMenu()"><i :class="['iconfont',menu_show?'icon-close':'icon-menu'] "></i></div>
	</div>
	`,
	data: function() {
		return {
			menu_show: 0,
		}
	},
	props: {
		category_name: { 
			default: '美图驿馆'
		},
	},
	methods: {
		navHome: function() {
			location.href = "index.html"
		},
		showMenu: function() {
			this.menu_show = !this.menu_show
		},
	}
});
