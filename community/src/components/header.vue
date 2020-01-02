<template>

      <div class="header">
        <ul>
          <li :class="{cur:thisindex==index}" v-for="(item,index) in nav">
            <router-link :class="{cur:thisindex==index}" class="pushlink" :to="item.path">{{item.title}}</router-link>
          </li>
        </ul>
      </div>

</template>

<style>
  .header{
    position: fixed;
    bottom:0;
    left:0;
    z-index:102;
    width:100%;
    height:1rem;
    justify-content: center;
  }
  .header ul{
    height:1rem;
    display: flex;
  }
  .header ul li{
    display: flex;
    justify-content: center;
    align-items: center;
    width:25%;
    height:1rem;
    background-color:#f40;
  }
  .header ul li:nth-child(1){
    background:url("../assets/home_recommend_default.png") #ffffff center 0.08rem no-repeat;
    background-size:0.46rem;
  }
  .header ul li:nth-child(2){
    background:url("../assets/home_loan_default.png") #ffffff center 0.08rem no-repeat;
    background-size:0.46rem;
  }
  .header ul li:nth-child(3){
    background:url("../assets/home_strategy_default.png") #ffffff center 0.08rem no-repeat;
    background-size:0.46rem;

  }
  .header ul li:nth-child(4){
    background:url("../assets/home_personal_default.png") #ffffff center 0.08rem no-repeat;
    background-size:0.46rem;
  }
  .header ul li:nth-child(1).cur{
    background:url("../assets/home_recommend_selected.png") #ffffff center 0.08rem no-repeat;
    background-size:0.46rem;
  }
  .header ul li:nth-child(2).cur{
    background:url("../assets/home_loan_selected.png") #ffffff center 0.08rem no-repeat;
    background-size:0.46rem;
  }
  .header ul li:nth-child(3).cur{
    background:url("../assets/home_strategy_selected.png") #ffffff center 0.08rem no-repeat;
    background-size:0.46rem;
  }
  .header ul li:nth-child(4).cur{
    background:url("../assets/home_personal_selected.png") #ffffff center 0.08rem no-repeat;
    background-size:0.46rem;

  }
  .pushlink{
    width:100%;
    height:0.4rem;
    line-height:0.4rem;
    padding-top:0.6rem;
    text-align: center;
    color:#BFBFBF;
  }
  .pushlink.cur{
    color:#FF5A5A;
  }
</style>

<script>

    export default {
        props:['thisindex'],
        data (){
            return {
                nav:[
                  {title:'首页', path:'/'},
                  {title:'贷款', path:'/loan'},
                  {title:'攻略', path:'/strategy'},
                  {title:'我的', path:'/personal'},
                ]
            }
        },
        created(){

        },
        computed: {},
        methods: {}
    }
</script>
