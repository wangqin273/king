Vue.component("component-list", {
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
});
