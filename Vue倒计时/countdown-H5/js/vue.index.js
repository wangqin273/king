var vm = new Vue({
  el: ".vueBox",
  data: {
    tabs: ['9:00', '10:00', '11:00', '12:00'],
    times: [{
      timestamp: [1543816296, 1543823493, 1543999899, 1543734094]
    }, {
      timestamp: [1543999897, 1543734094, 1543816297, 1543823497]
    }, {
      timestamp: [1543823497, 1543734094, 1543823497, 1543816297]
    }, {
      timestamp: [1543816297, 1543823497, 1543999897, 1543734094]
    }],
    // tabs2: ['10:00', '11:00', '12:00'],
    // times2: [{
    //   timestamp: [1543999897, 1543734094, 1543816297, 1543823497]
    // }, {
    //   timestamp: [1543823497, 1543734094, 1543823497, 1543816297]
    // }, {
    //   timestamp: [1543816297, 1543823497, 1543999897, 1543734094]
    // }],
    lists: [],
    index: 0,
    interval: null
  },
  created: function () {
    this.countdown(this.times[0].timestamp)
  },
  methods: {
    countdown: function (timestamps) {
      var that = this
      var now = (new Date()).getTime() / 1000;
      if (timestamps) {
        var list = []
        clearInterval(this.interval)
        that.interval = setInterval(() => {
          console.log(that.interval)
          timestamps.forEach((val, index) => {
            var lastTime = val - now
            var day, hour, minute, second
            if (lastTime > 0) {
              day = parseInt(lastTime / 3600 / 24)
              hour = parseInt((lastTime - day * 24 * 3600) / 3600)
              minute = parseInt((lastTime - day * 24 * 3600 - hour * 3600) / 60)
              second = parseInt(lastTime - day * 24 * 3600 - hour * 3600 - minute * 60)
            } else {
              day = 0
              hour = 0
              minute = 0
              second = 0
            }
            that.lists[index] = day + '天 ' + that.toTwo(hour) + ': ' + that.toTwo(minute) + ': ' + that.toTwo(second);
            that.$set(that.lists, index, that.lists[index]);
          });
          now++
          // if (now > 1542620791){
          //   that.tabs = that.tabs2
          //   that.times = that.times2
          //   that.toTab(0)
          // }
        }, 1000);
      }
    },
    toTwo: function (n) {
      n = n < 10 ? "0" + n : n
      return n
    },
    toTab: function (inx) {
      clearInterval(this.interval)
      this.index = inx
      this.countdown(this.times[inx].timestamp)
    }
  }
});