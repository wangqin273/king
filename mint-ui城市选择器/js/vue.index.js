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
		bank_temp: '', //暂作缓存，取消按钮不赋值给bank_name
		bank_name: '',
		// 地址
		citys_list: [{
				flex: 1,
				values: [],
				className: 'city_provinces',
			}, {
				divider: true,
				content: '-',
				className: 'city_divider'
			}, {
				flex: 1,
				values: [],
				className: 'city_cities'
			},
			{
				divider: true,
				content: '-',
				className: 'city_divider'
			}, {
				flex: 1,
				values: [],
				className: 'city_areas'
			},
		],
		cityVisible: false, //城市选择器弹出框是否可见
		city_temp: '', // 暂作缓存，取消按钮不赋值给city_name
		city_name: '', //城市三级地址 省-市-县
		city_init: false, ////禁止地区选择器自动初始化，picker组件会默认进行初始化，导致一进入页面就会默认选中一个初始3级地址
	},
	
	created: function() {
		// 已经引入城市数据 citys.js
		// let provinces = this.getProvinceArr()
		// let cities = this.getCityArr(provinces[0].name)
		// let areas = this.getCountyArr(provinces[0].name, cities[0].name)
		// 设置城市初始值
		this.citys_list[0].values = citysData.provinces;
		this.citys_list[2].values = citysData.provinces[0].cities;
		this.citys_list[4].values = citysData.provinces[0].cities[0].areas;

	},
	mounted(){},
	methods: {
		// 银行弹窗
		showBankName: function() {
			this.bankVisible = true
		},
		bankChange: function(picker, values) {
			if (picker.getSlotValue(0)) {
				this.bank_temp = picker.getSlotValue(0).name
			}
		},
		selectBank: function(bool) {
			// bool 判断 触发的是取消还是确认按钮
			this.bank_name = bool ? this.bank_temp : this.bank_name;
			this.bankVisible = false
		},
		// 城市弹窗
		showCitys: function() {
			this.cityVisible = true
		},
		cityChange: function(picker, values) {
			if (this.city_init) {
				if (picker.getSlotValue(0)) {
					this.citys_list[2].values = picker.getSlotValue(0).cities;
					this.citys_list[4].values = picker.getSlotValue(1).areas;
					this.city_temp = picker.getSlotValue(0).name + '-' + picker.getSlotValue(1).name + '-' + picker.getSlotValue(2).name
					 
				}

				// if (picker.getSlotValue(0)) {
				//给市、县赋值  有个小bug，市、县选中的部分没有加‘picker-selected’高亮
				// picker.setSlotValues(1, this.getCityArr(values[0]["name"]));
				// picker.setSlotValues(2, this.getCountyArr(values[0]["name"], values[1]["name"]));
				// }
			} else {
				this.city_init = true
			}
		},
		selectCity: function(bool) {
			console.log('bool', bool) //确认按钮、取消按钮
			this.city_name = bool ? this.city_temp : this.city_name
			this.cityVisible = false
		},
		//遍历json，返回省级对象数组
		getProvinceArr: function() {
			let provinceArr = [];
			citysData.provinces.forEach(function(item) {
				let obj = {};
				obj.name = item.name;
				obj.id = item.id;
				provinceArr.push(obj);
			});
			return provinceArr;
		},
		//遍历json，返回市级对象数组
		getCityArr(province) {
			let cityArr = [];
			citysData.provinces.forEach(function(item) {
				if (item.name === province) {
					item.cities.forEach(function(args) {
						let obj = {};
						obj.name = args.name;
						obj.id = args.id;
						cityArr.push(obj);
					});
				}
			});
			return cityArr;
		},
		//遍历json，返回县级对象数组
		getCountyArr(province, city) {
			let countyArr = [];
			citysData.provinces.forEach(function(item) {
				if (item.name === province) {
					item.cities.forEach(function(args) {
						if (args.name === city) {
							args.areas.forEach(function(param) {
								let obj = {};
								obj.name = param.name;
								obj.id = param.id;
								countyArr.push(obj);
							})
						}
					});
				}
			});
			return countyArr;
		},

	}
});


