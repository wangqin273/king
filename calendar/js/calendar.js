var vm = new Vue({
			el: '#app',
			data: function() {
				return {
					// 日历
					currentDay: 1, // 当前天
					currentMonth: 1, // 当前月
					currentYear: 1970,
					currentWeek: 0, // 一号所在的星期
					days: [], // 当月所有天数
					content: {},
					sign_days: [], // 签到日期
					is_sign: false,
					currentPlan: {}
				}
			},
			created: function() {
				this.getSign();
			},
			methods: {
				/**
				 * 获取签到日期
				 */
				getSign: function() {
					// 模拟数据
					var sign_days = [{
						day: '2020/6/8',
						is_sign: 0
					}, {
						day: '2020/6/9',
						is_sign: 0
					}, {
						day: '2020/6/10',
						is_sign: 0
					}, {
						day: '2020/6/11',
						is_sign: 0
					}, {
						day: '2020/6/12',
						is_sign: 1
					}, {
						day: '2020/6/13',
						is_sign: 1
					}];
					this.sign_days = sign_days;
					this.initData(null);
				},
				initData: function(cur) {
					var date;
					if (cur) { // 切换上一月、下一月
						date = new Date(cur);
					} else {
						var now = new Date(); // 此处取本机时间，应改为服务器时间
						var d = new Date(this.formatDate(now.getFullYear(), now.getMonth() + 1, 1));
						d.setDate(35); // 设置天数为35天（32~59都可以，既设置到下一个月的某一天）
						date = new Date(this.formatDate(d.getFullYear(), d.getMonth(), 1));
					}
					this.currentDay = new Date().getDate(); // 今日日期 几号
					this.currentYear = date.getFullYear(); // 当前年份
					this.currentMonth = date.getMonth() + 1; // 当前月份
					this.currentWeek = date.getDay(); // 当前月1号是星期几？ 0表示星期天
					// 当前月最后一天是星期几？ 0表示星期天
					this.nextWeek = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
					var str = this.formatDate(this.currentYear, this.currentMonth, 1); // 2020/01/01
					var nextStr = new Date(date.getFullYear(), date.getMonth() + 2, 0).toLocaleDateString(); // 2020/01/01
					// console.log(nextStr)
					this.days = []; // 初始化日期
					// 设置上一个月 需显示 的最后几天  铺满一周
					for (var i = this.currentWeek; i > 0; i--) {
						var d = new Date(str);
						d.setDate(d.getDate() - i);
						var dayobject = {
							day: d,
							isSign: this.isVerDate(d),
							isSigned: this.isSigned(d)
						}; // 用一个对象包装Date对象  以便为以后预定功能添加属性
						this.days.push(dayobject); // 将日期放入data 中的days数组 供页面渲染使用
					}
					// 显示当前月的天数  第二个循环为 j<= 36- this.currentWeek，
					// 因为1号是星期六的时候当前月需显示6行，如2020年8月
					this.num = 0; //第几个月 每遇到1号加1
					for (var j = 0; j <= 36 - this.currentWeek; j++) {
						var d = new Date(str);
						d.setDate(d.getDate() + j);
						var dddd = d.getDate();
						var dayobject = {
							day: d,
							isSign: this.isVerDate(d),
							isSigned: this.isSigned(d)
						};
						if (dddd == 1) {
							this.num++
						}
						if (this.num == 2) {
							break
						}
						this.days.push(dayobject);
					}
					// console.log('当前月1号是星期' + this.currentWeek)
					// console.log('当前月最后一天是星期' + this.nextWeek)
					// 设置下一个月 需显示 的最前几天铺满一周
					for (var k = 1; k <= 6 - this.nextWeek; k++) {
						var d = new Date(nextStr);
						d.setDate(d.getDate() + k);
						var dayobject = {
							day: d,
							isSign: this.isVerDate(d),
							isSigned: this.isSigned(d)
						}; // 用一个对象包装Date对象  以便为以后预定功能添加属性
						this.days.push(dayobject); // 将日期放入data 中的days数组 供页面渲染使用
					}
				},
				/**
				 * 判断该日期是否有任务
				 * @param d
				 * @returns {boolean}
				 */
				isVerDate: function(d) {
					var signdays = [];
					for (var i in this.sign_days) {
						signdays.push(this.sign_days[i].day);
					}
					return signdays.includes(d.toLocaleDateString());
				},
				/**
				 * 判断该日期是否有任务并且已完成
				 * @param d
				 * @returns {boolean}
				 */
				isSigned: function(d) {
					var signdays = [];
					for (var i in this.sign_days) {
						if (this.sign_days[i].is_sign) {
							signdays.push(this.sign_days[i].day);
						}
					}
					return signdays.includes(d.toLocaleDateString());
				},
				/**
				 * 上一月
				 * @param year
				 * @param month
				 */
				pickPre: function(year, month) {
					var d = new Date(this.formatDate(year, month, 1));
					d.setDate(0);
					this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
				},
				/**
				 * 下一月
				 * @param year
				 * @param month
				 */
				pickNext: function(year, month) {
					var d = new Date(this.formatDate(year, month, 1));
					d.setDate(35);
					this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
				},
				// 返回 类似 2020/01/01 格式的字符串
				formatDate: function(year, month, day) {
					month < 10 && (month = '0' + month);
					day < 10 && (day = '0' + day);
					var data = year + '/' + month + '/' + day;

					return data;
				},
				/**
				 * 点击日期查询
				 * @param index
				 */
				dayCheck: function(day) {
					console.log(day)
					var currentPlan = {
						title: '',
						date: '',
						list: []
					};
					currentPlan.date = day.day.toLocaleDateString().split('/')[1] + '月' + day.day.toLocaleDateString().split('/')[2] +
						'日';
					for (var i in this.days) {
						this.$set(this.days[i], 'isChecked', 0)
					}
					this.$set(day, 'isChecked', 1);
					if (day.isSign) {
						if (day.isSigned) {
							currentPlan.list = [{
								name: '重做计划1',
							}, {
								name: '重做计划2',
							}, {
								name: '重做计划3',
							}, {
								name: '重做计划4',
							}, {
								name: '重做计划5',
							}, {
								name: '重做计划6',
							}, {
								name: '重做计划7',
							}, {
								name: '重做计划8',
							}];
							currentPlan.title = '已完成计划×' + currentPlan.list.length;
							currentPlan.name = '学习考点：财务成本管理《第一章 财务管理基本管理》财务成本管理';
							currentPlan.nums = 100;
						} else {
							currentPlan.title = '未完成计划'
						}

					} else {
						currentPlan.title = '暂无任务'
					}
					this.currentPlan = currentPlan
				}
			}
		});
