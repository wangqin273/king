    var mv = new Vue({
        el: '.vuebox',
        data: {
            proName:"蚂蚁期货",
            showNews:false,
            newsList:[], 
            newsInfo:{},
        },
        created:function () {
        	this.getNews()
        },
        methods: {
            getNews:function(ev){
	         	 this.$http.get('js/newsList.json').then(res => {
	                    // console.log(res.data.newslist);
 	                    this.newsList=res.data.newslist
	                }, response => {
	                    console.log(res.status);
	                    // error callbackxw
	                });
            },
            showNewsInfo:function(index){
                this.newsInfo=this.newsList[index];
                this.showNews=true;

            },
            showList:function(){
                this.showNews=false;
            },

        },


    })
 