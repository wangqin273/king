<template>
  <div class="recommend_list">
    <img class="recommend_llogo" src="" alt="">
    <div class="recommend_rdiv">
      <p class="r_title">玖富叮当贷－让借款轻松起来</p>
      <span class="r_titletwo">一步授权淘宝，3分钟获取信用额度</span>
      <div class="r_cenbox">
        <div class="r_cenbox_left">
          <p>0.8％</p>
          <span>月利率</span>
        </div>
        <div class="r_cenbox_right">
          <span class="wire"></span>
          <p>200-5000元</p>
          <span>额度</span>
        </div>
      </div>
    </div>
    <!--荐img-->
    <span class="recommend_topbg"></span>
  </div>
</template>

<style>
  /*首页list*/
  .recommend_list{
    position: relative;
    display: flex;
    margin-top:0.03rem;
    background-color: #ffffff;
  }
  .recommend_llogo{
    width: 1.3rem;
    height:1.3rem;
    border-radius: 0.65rem;
    margin:0.24rem;
    background-color: #f40;
  }
  .recommend_rdiv{
    margin-top: 0.24rem;
  }
  .recommend_rdiv .r_title{
    font-size: 0.32rem;
    color: #393939;
    margin-bottom: 0.04rem;
  }
  .recommend_rdiv .r_titletwo{
    font-size: 0.26rem;
    color: #909090;
  }
  .r_cenbox{
    display: flex;
    margin-top: 0.2rem;
    padding-bottom: 0.34rem;
  }
  .r_cenbox_left{
    width: 1.75rem;
  }
  .r_cenbox_left p,.r_cenbox_right p{
    font-size: 0.36rem;
    color: #FF7676;
    margin-bottom: 0.02rem;
  }
  .r_cenbox_left span,.r_cenbox_right span{
    font-size: 0.26rem;
    color: #7A7A7A;
  }
  .r_cenbox_right{
    width: 3.8rem;
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .r_cenbox_right span.wire{
    position: absolute;
    left: 0;
    top:0.04rem;
    width:0.02rem;
    height:0.65rem;
    background-color:#E7E7E7;
  }
  .recommend_topbg{
    position: absolute;
    right:0;
    top:0;
    width: 0.8rem;
    height:0.8rem;
    background: url("../assets/recommend_tip.png") center center no-repeat;
    background-size: 0.8rem;
  }
</style>

<script>

    export default {
        data (){
            return {}
        },
        created(){

        },
        computed: {},
        methods: {}
    }
</script>
