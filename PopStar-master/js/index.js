(function() {
	//全局配置 
	var config = {
		tileWidth: .75, //小星星的宽高
		tileHeight: .75,
		tileSet: [], //存储小星星的二维数组
		tableRows: 10, //行数
		baseScore: 5, //每一个小星星的基础分数
		stepScore: 10, //每一个小星星的递增分数
		targetScore: 2000, //目标分数，初始为2000
		el: document.querySelector('#starList'),
		scoreTarget: document.querySelector('#scoreTarget'),
		scoreCurrent: document.querySelector('#scoreCurrent'),
		scoreSelect: document.querySelector('#scoreSelect'),
		scoreLevel: document.querySelector('#scoreLevel'),
		clippedMask: document.querySelector('.clipped-mask'),
		clippedBox: document.querySelector('.clipped-box')
	};
	// 改变行数  
	config.tileWidth = config.tileHeight = (7.5 / config.tableRows); //小星星的宽高
	//全局计算属性
	var computed = {
		flag: false, //锁 星星爆炸时不可点击
		lock: false, //锁 
		choose: [], //已选中的小星星集合
		timer: null,
		totalScore: 0, //总分数
		tempTile: null,
		level: 1, //当前所在的关数（每闯过一关+1，游戏失败回复为1）
		stepTargetScore: 1000, //闯关成功的递增分数（1000/关）
		score: 0 //当前的计算分数
	};

	//Block对象
	function Block(number, row, col) {
		var tile = document.createElement("li");
		tile.width = config.tileWidth;
		tile.height = config.tileHeight;
		tile.number = number;
		tile.row = row;
		tile.col = col;
		return tile;
	}
	// 广告图标
	function Advert() {
		var img = document.createElement("img");
		img.src = "./images/coin.png";
		img.onclick = function(e) {
			alert('广告弹窗')
			e.stopPropagation() //阻止冒泡
		};
		return img;
	}

	//入口函数
	function PopStar() {
		return new PopStar.prototype.init();
	}

	//PopStar原型
	PopStar.prototype = {
		/**
		 * PopStar的入口函数
		 */
		init: function() {
			this.initTable();
		},
		/**
		 * 初始化操作
		 */
		initTable: function() {
			this.initScore();
			this.initTileSet();
			this.initBlocks();
		},

		/**
		 * 初始化当前分数和目标
		 */
		initScore: function() {
			new CountUp(config.scoreTarget, config.targetScore, config.targetScore).start();
			config.scoreCurrent.innerHTML = computed.totalScore;
			config.scoreLevel.innerHTML = computed.level;
		},
		/**
		 * 点击事件操作
		 */
		mouseClick: function() {
			var tileSet = config.tileSet,
				choose = computed.choose,
				baseScore = config.baseScore,
				stepScore = config.stepScore,
				el = config.el,
				self = this,
				len = choose.length;
			if (computed.lock || len <= 1) {
				return;
			}
			computed.lock = true;
			computed.tempTile = null;
			var score = 0;
			for (var i = 0; i < len; i++) {
				score += baseScore + i * stepScore;
				// console.log('score',score)
			}
			new CountUp(config.scoreCurrent, computed.totalScore, computed.totalScore += score).start();
			self.blowUp(len, choose[0])
			for (var i = 0; i < len; i++) {
				setTimeout(function(i) {
					if (choose[i].ad) {
						alert('消除了带有广告的星')
					}
					tileSet[choose[i].row][choose[i].col] = null;
					el.removeChild(choose[i]);
				}, i * 50, i);
			}
			setTimeout(function() {
				self.move();
				//判断结束
				setTimeout(function() { 
					if (self.isFinish()) {
						self.clean();
						if (computed.totalScore >= config.targetScore) {

							new CountUp(config.scoreTarget, config.targetScore, config.targetScore += (computed.level - 1) * computed
									.stepTargetScore)
								.start();

							new CountUp(config.scoreLevel, computed.level, computed.level += 1).start();
							// alert("恭喜获胜");
							console.log("恭喜获胜")
						} else {
							config.targetScore = config.scoreTarget = 2000;
							computed.level = computed.totalScore = 0;
							// alert("游戏失败");
							console.log("游戏失败")
						}
						computed.lock = false;
					} else {
						choose = [];
						computed.lock = false; //在所有动作都执行完成之后释放锁
						self.mouseOver(computed.tempTile);
					}
				}, 200 + choose.length * 150);
			}, choose.length * 50);
		},
		/**
		 * 闯关成功或失败清除（清除二维数组和el的子节点）操作
		 */
		clean: function() {
			var tileSet = config.tileSet,
				rows = tileSet.length,
				el = config.el,
				self = this;
			var temp = [];
			for (var i = rows - 1; i >= 0; i--) {
				for (var j = tileSet[i].length - 1; j >= 0; j--) {
					if (tileSet[i][j] === null) {
						continue;
					}
					temp.push(tileSet[i][j])
					tileSet[i][j] = null;
				}
			}
			//刚好消除完没有剩余的情况
			if (temp.length <= 0) {
				setTimeout(function(k) {
					new PopStar();
				}, 1000)
				return false
			}
			for (var k = 0; k < temp.length; k++) {
				setTimeout(function(k) {
					if (temp[k].ad) {
						console.log('消除了带有广告的星')
					}
					el.removeChild(temp[k]);
					if (k >= temp.length - 1) {
						self.blowUp(3, temp[k], 1)
						setTimeout(function(k) {
							new PopStar();
						}, 1000)
					}
				}, k * 100, k);
			}
		},
		/**
		 * 是否游戏结束
		 * @returns {boolean}
		 */
		isFinish: function() {

			var tileSet = config.tileSet,
				rows = tileSet.length;
			for (var i = 0; i < rows; i++) {
				var row = tileSet[i].length;
				for (var j = 0; j < row; j++) {
					var temp = [];
					this.checkLink(tileSet[i][j], temp);
					if (temp.length > 1) {
						return false;
					}
				}
			}
			return true;
		},
		/**
		 * 消除星星后的移动操作
		 */
		move: function() {
			var rows = config.tableRows,
				tileSet = config.tileSet;
			//向下移动
			for (var i = 0; i < rows; i++) {
				var pointer = 0; //pointer指向小方块，当遇到null的时候停止，等待上面的小方块落到这里来
				for (var j = 0; j < rows; j++) {
					if (tileSet[j][i] != null) {
						if (j !== pointer) {
							tileSet[pointer][i] = tileSet[j][i];
							tileSet[j][i].row = pointer;
							tileSet[j][i] = null;
						}
						pointer++;
					}
				}
			}
			//横向移动（最下面一行其中有无空列）
			for (var i = 0; i < tileSet[0].length;) {
				if (tileSet[0][i] == null) {
					for (var j = 0; j < rows; j++) {
						tileSet[j].splice(i, 1);
					}
					continue;
				}
				i++;
			}
			this.refresh()
		},
		/**
		 * 鼠标移入时的闪烁操作
		 * @param obj
		 */
		mouseOver: function(obj) {
			if (computed.lock) { //处于锁定状态不允许有操作
				computed.tempTile = obj;
				return;
			}
			this.clearFlicker();
			var choose = [];
			this.checkLink(obj, choose);
			computed.choose = choose;
			if (choose.length <= 1) {
				choose = [];
				return;
			}
			this.flicker(choose);
			this.computeScore(choose);
		},
		/**
		 * 计算已选中的星星分数
		 * @param arr
		 */
		computeScore: function(arr) {
			var score = 0,
				len = arr.length,
				baseScore = config.baseScore,
				stepScore = config.stepScore;
			for (var i = 0; i < len; i++) {
				score += baseScore + i * stepScore
			}
			if (score <= 0) {
				return;
			}
			computed.score = score;
			config.scoreSelect.style.opacity = '1';
			config.scoreSelect.innerHTML = arr.length + "连消 " + score + "分";
			setTimeout(function() {
				config.scoreSelect.style.opacity = '0';
			}, 1200)
		},
		/**
		 * 鼠标移出时的消除星星闪烁的操作
		 */
		clearFlicker: function() {
			var tileSet = config.tileSet;
			for (var i = 0; i < tileSet.length; i++) {
				for (var j = 0; j < tileSet[i].length; j++) {
					var div = tileSet[i][j];
					if (div === null) {
						continue;
					}
					div.classList.remove("scale");
				}
			}
		},
		/**
		 * 星星闪烁
		 * @param arr
		 */
		flicker: function(arr) {
			for (var i = 0; i < arr.length; i++) {
				var div = arr[i];
				div.classList.add("scale");
			}
		},
		/**
		 * 检查鼠标移入的这个星星是否有相连着的相同的星星，
		 * @param obj star
		 * @param arr choose
		 */
		checkLink: function(obj, arr) {
			if (obj === null) {
				return;
			}
			arr.push(obj);
			/**
			 * 检查左边方块是否可以加入到选入的可消除星星行列：
			 * 选中的星星不能是最左边的，
			 * 选中的星星左边要有星星，
			 * 选中的星星左边的星星的跟选中的星星一样，
			 * 选中的星星左边的星星没有被选中过
			 */
			var tileSet = config.tileSet,
				rows = config.tableRows;
			if (obj.col > 0 && tileSet[obj.row][obj.col - 1] && tileSet[obj.row][obj.col - 1].number === obj.number && arr.indexOf(
					tileSet[obj.row][obj.col - 1]) === -1) {
				this.checkLink(tileSet[obj.row][obj.col - 1], arr);
			}
			if (obj.col < rows - 1 && tileSet[obj.row][obj.col + 1] && tileSet[obj.row][obj.col + 1].number === obj.number &&
				arr.indexOf(tileSet[obj.row][obj.col + 1]) === -1) {
				this.checkLink(tileSet[obj.row][obj.col + 1], arr);
			}
			if (obj.row < rows - 1 && tileSet[obj.row + 1][obj.col] && tileSet[obj.row + 1][obj.col].number === obj.number &&
				arr.indexOf(tileSet[obj.row + 1][obj.col]) === -1) {
				this.checkLink(tileSet[obj.row + 1][obj.col], arr);
			}
			if (obj.row > 0 && tileSet[obj.row - 1][obj.col] && tileSet[obj.row - 1][obj.col].number === obj.number && arr.indexOf(
					tileSet[obj.row - 1][obj.col]) === -1) {
				this.checkLink(tileSet[obj.row - 1][obj.col], arr);
			}
		},
		/**
		 * 初始化二维数组
		 */
		initTileSet: function() {
			var rows = config.tableRows,
				arr = config.tileSet;
			for (var i = 0; i < rows; i++) {
				arr[i] = [];
				for (var j = 0; j < rows; j++) {
					arr[i][j] = [];
				}
			}
		},
		/**
		 * 初始化el的子节点
		 */
		initBlocks: function() {
			var tileSet = config.tileSet,
				self = this,
				el = config.el,
				cols = tileSet.length,
				x = Math.floor(Math.random() * cols),
				y = Math.floor(Math.random() * cols); //2个随机数设置广告坐标
			for (var i = 0; i < cols; i++) {
				var rows = tileSet[i].length;
				for (var j = 0; j < rows; j++) {
					var tile = this.createBlock(Math.floor(Math.random() * 5), i, j);
					tile.onmouseover = function() {
						self.mouseOver(this)
					};
					tile.onclick = function() {
						self.mouseClick();
					};
					// 插入广告
					if (i == x && j == y) {
						tile.appendChild(new Advert());
						tile.ad = true;
					}
					tileSet[i][j] = tile;
					el.appendChild(tile);
				}
			}
			this.refresh()
		},
		/**
		 * 渲染el的子节点
		 */
		refresh: function() {
			var tileSet = config.tileSet;
			for (var i = 0; i < tileSet.length; i++) {
				var row = tileSet[i].length;
				for (var j = 0; j < row; j++) {
					var tile = tileSet[i][j];
					if (tile == null) {
						continue;
					}
					tile.row = i;
					tile.col = j;
					tile.style.width = config.tileWidth + "rem"
					tile.style.height = config.tileHeight + "rem"
					tile.style.left = tileSet[i][j].col * config.tileWidth + "rem";
					tile.style.bottom = tileSet[i][j].row * config.tileHeight + "rem";
					tile.style.backgroundImage = "url('./images/" + tileSet[i][j].number + ".png')";

				}
			}
		},
		/**
		 * 创建星星子节点的函数
		 * @param number
		 * @param row
		 * @param col
		 * @returns {HTMLElement}
		 */
		createBlock: function(number, row, col) {
			return new Block(number, row, col);
		},
		/** 消除星星碎裂特效
		 *  lens 碎裂星星个数
		 *  index 碎裂星星类型 
		 */
		blowUp: function(lens, obj, isEnd) {
			this.genClips(lens > 5 ? 30 : lens * 5, obj.number, isEnd ? isEnd : '');
			var self = this;
			if (!computed.flag) {
				computed.flag = true;
				config.clippedMask.style.display = 'block'; 
				config.clippedBox.style.left = (isEnd ? config.tableRows / 2 : obj.col) * config.tileWidth + "rem";
				config.clippedBox.style.bottom = obj.row * config.tileHeight + "rem";
				config.clippedBox.childNodes.forEach(function(item, i) {
					var v = self.rand(100, 80),
						angle = self.rand(80, 100),
						theta = (angle * Math.PI) / 180,
						g = -9.8;
					var t = 0,
						z, r, nx, ny, totalt = 10;
					var negate = [-1, 1],
						direction = negate[Math.floor(Math.random() * negate.length)];
					var randDeg = self.rand(-5, 10),
						randScale = self.rand(1, 2),
						randDeg2 = self.rand(30, 5);
					// 缩放实现星星不同大小
					var randScale2 = parseInt(12 * Math.random()) / 10 + 1;
					item.style = 'transform:' + 'scale(' + randScale2 + ') skew(' + randDeg + 'deg) rotateZ(' + randDeg2 + 'deg)';
					z = setInterval(function() {
						var ux = (Math.cos(theta) * v) * direction;
						var uy = (Math.sin(theta) * v) - ((-g) * t);
						nx = (ux * t);
						ny = (uy * t) + (0.25 * (g) * Math.pow(t, 2));
						item.style.bottom = (ny) + 'px';
						item.style.left = (nx) + 'px';
						// 时间累加0.1
						t = t + 0.1;
						//跳出循环
						if (t > totalt) {
							computed.flag = false; //在所有动作都执行完成之后释放锁
							clearInterval(z);
							self.resetClips();
							config.clippedMask.style.display = 'none';
							config.clippedBox.style.left = 0;
							config.clippedBox.style.bottom = 0;
						}
					}, 10);
				})
			}
		},
		rand: function(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},
		genClips: function(lens, index, isEnd) {
			this.resetClips()
			for (var z = 0; z < lens; z++) {
				var p = document.createElement("p");
				p.classList.add("clip");
				if (isEnd) {
					p.classList.add("star_"+ this.rand(0, 4) );
				} else {
					p.classList.add("star_"+index); 
				}
				config.clippedBox.appendChild(p);
			}
		},
		genClipsw: function(lens, index, isEnd) {
			this.resetClips()
			for (var z = 0; z < lens; z++) {
				var img = document.createElement("img");
				img.classList.add("clips");
				if (isEnd) {
					img.src = "./images/star_" + this.rand(0, 4) + ".png";
				} else {
					img.src = "./images/star_" + index + ".png";
				}
				config.clippedBox.appendChild(img);
			}
		},
		resetClips: function() {
			for (var i = 0; i < config.clippedBox.childNodes.length; i++) {
				config.clippedBox.removeChild(config.clippedBox.childNodes[i])
			}
		}
	};
	PopStar.prototype.init.prototype = PopStar.prototype;
	// window.PopStar = PopStar;
	new PopStar()
})();
