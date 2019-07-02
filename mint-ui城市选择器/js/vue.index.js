var bank_name = "",
	city_name = "";
var vm = new Vue({
	el: ".vueBox",
	data: {
		// 银行名称
		bankVisible: false,
		banks_list: [{
			flex: 1,
			values: [{
				"id": 47,
				"name": "工商银行"
			}, {
				"id": 48,
				"name": "农业银行"
			}, {
				"id": 49,
				"name": "招商银行"
			}, {
				"id": 50,
				"name": "建设银行"
			}, {
				"id": 51,
				"name": "中国银行"
			}, {
				"id": 52,
				"name": "平安银行"
			}, {
				"id": 53,
				"name": "上海银行"
			}, {
				"id": 54,
				"name": "光大银行"
			}, {
				"id": 55,
				"name": "邮政储蓄银行"
			}, {
				"id": 56,
				"name": "浦发银行"
			}, {
				"id": 57,
				"name": "民生银行"
			}, {
				"id": 58,
				"name": "广发银行"
			}, {
				"id": 59,
				"name": "交通银行"
			}, {
				"id": 60,
				"name": "兴业银行"
			}, {
				"id": 61,
				"name": "北京农业商业银行"
			}, {
				"id": 62,
				"name": "上海银行"
			}, {
				"id": 63,
				"name": "渤海银行"
			}, {
				"id": 64,
				"name": "中信银行"
			}, {
				"id": 65,
				"name": "浙商银行"
			}, {
				"id": 66,
				"name": "东亚银行"
			}, {
				"id": 67,
				"name": "华夏银行"
			}, {
				"id": 68,
				"name": "杭州银行"
			}, {
				"id": 69,
				"name": "上海农业商业银行"
			}],
			textAlign: 'center'
		}],
		bank_name: '',
		// 地址
		citys_list: [{
			flex: 1,
			values: [],
			className: 'citys_list_provinces',
			textAlign: 'center',
			className: 'provinces'
		}, {
			divider: true,
			content: '-',
			className: 'provinces'
		}, {
			flex: 1,
			values: [],
			className: 'citys_list_cities'
		}, ],
		cityVisible: false,
		city_name: '',
	},
	created: function() {
		// 已经引入城市数据 citys.js
		// 设置城市初始值
		this.citys_list[0].values = citys.provinces
		this.citys_list[2].values = citys.provinces[0].cities
	},
	methods: {
		// 银行弹窗
		showBankName: function() {
			this.bankVisible = true
		},
		bankChange: function(picker, values) {
			if (picker.getSlotValue(0)) {
				bank_name = picker.getSlotValue(0).name
			}
		},
		selectBank: function(bool) {
			// bool 判断 触发的是取消还是确认按钮
			this.bank_name = bool ? bank_name : this.bank_name
			this.bankVisible = false
		},
		// 城市弹窗
		showCitys: function() {
			this.cityVisible = true
		},
		cityChange: function(picker, values) {
			// console.log('省变化了', picker.getSlotValue(0), '城市变化了', picker.getSlotValue(1))
			// 省发生变化时,改变对应城市数组
			picker.setSlotValues(1, values[0].cities)
			if (picker.getSlotValue(0)) {
				if (picker.getSlotValue(1)) {
					// 省级和城市都发生变化时获取值
					city_name = picker.getSlotValue(0).name + '-' + picker.getSlotValue(1).name
				} else {
					// 只选择省级时 城市默认为第一个
					city_name = picker.getSlotValue(0).name + '-' + values[0].cities[0].name
				}
			} else {
				// 没有手动选择时默认显示北京
				city_name = "北京 - 北京"
			}
		},
		selectCity: function(bool) {
			console.log('bool', bool)
			this.city_name = bool ? city_name : this.city_name
			this.cityVisible = false
		},

	}
});
