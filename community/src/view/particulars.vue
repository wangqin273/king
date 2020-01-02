<template>
    <div>
      <my-navbar leftType="back" title="详情页"></my-navbar>
      <!--详情页-->
      <div class="detailpages">
        <div class="detailpages_top">
          <div class="detailpages_topbox">
            <img class="detailpages_logo" src="" alt="">
            <div class="detailpages_title">
              <p>火速用钱宝</p>
              <span>成功率：98%</span>
            </div>
          </div>
          <div class="pentagram">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="detailpages_div">
          <div class="detailpages_divli">
            <span>申请人数：324458人</span>
            <span>贷款期限：3天－365天</span>
          </div>
          <div class="detailpages_divli">
            <span>贷款范围：100-5000</span>
            <span>月利率：0.3%－0.98%</span>
          </div>
        </div>
        <div class="detailpages_cen">
          <div class="detailpages_cli">
            <div class="detailpages_cli_top">
              <span class="icon"></span>
              <span>贷款金额</span>
            </div>
            <div class="detailpages_cli_bom">
              <input value="1000" type="text">
              <span>元</span>
            </div>
          </div>
          <div class="detailpages_cli">
            <span class="wire"></span>
            <div class="detailpages_cli_top">
              <span class="icon1"></span>
              <span>期限</span>
            </div>
            <div class="detailpages_cli_bom">
              <input value="3" type="text">
              <span>天</span>
            </div>
          </div>
          <div class="detailpages_tli">
            <p>13.5元</p>
            <span>日还款（元）</span>
          </div>
          <div class="detailpages_tli">
            <p>345元</p>
            <span>总利息（元）</span>
          </div>
          <div class="detailpages_tli">
            <p>0.03%</p>
            <span>日利率</span>
          </div>
        </div>
        <div class="detailpages_li">
          <div class="recommend_title">
            <span class="recommend_title_wire"></span>
            <span class="black">关键提醒</span>
          </div>
          <div class="detailpages_libox">
            <div class="detailpages_bor_box"><span>手机实名制</span></div>
            <div class="detailpages_bor_box"><span>征信报告</span></div>
            <div class="detailpages_bor_box"><span>有信用卡</span></div>
          </div>
        </div>
        <div class="detailpages_li">
          <div class="recommend_title">
            <span class="recommend_title_wire"></span>
            <span class="black">审核说明</span>
          </div>
          <div class="detailpages_libox">
            <span class="detailpages_litetx">审核周期：</span>
          </div>
          <div class="detailpages_libox">
            <span class="detailpages_litetx">放款时间：</span>
          </div>
          <div class="detailpages_libox">
            <span class="detailpages_litetx">还款方式：</span>
          </div>
        </div>
        <div class="detailpages_li">
          <div class="recommend_title">
            <span class="recommend_title_wire"></span>
            <span class="black">所需资料</span>
          </div>
          <div class="detailpages_libox">
            <span class="detailpages_litetx">1. 身份认证</span>
            <span style="margin-left:2.6rem;" class="detailpages_litetx">2. 工作信息</span>
          </div>
          <div class="detailpages_libox">
            <span class="detailpages_litetx">3. 运营商授权</span>
          </div>
        </div>
        <div class="detailpages_li">
          <div class="recommend_title">
            <span class="recommend_title_wire"></span>
            <span class="black">申请流程</span>
          </div>
          <div class="detailpages_libox">
            <span class="detailpages_litetx">手机号验证 > 身份信息验证 > 信用验证 > 放贷</span>
          </div>
        </div>
        <div class="detailpages_li">
          <div class="recommend_title">
            <span class="recommend_title_wire"></span>
            <span class="black">申请条件</span>
          </div>
          <div class="detailpages_libox">
            <span class="detailpages_litetx">18－40岁有稳定工作上班族</span>
          </div>
        </div>
        <div class="detailpages_li">
          <div class="recommend_title">
            <span class="recommend_title_wire"></span>
            <span class="black">详细介绍</span>
          </div>
          <div class="detailpages_liboxs">
            <span class="detailpages_litetx">手机卡和商店分开来，对商家开放；速度快及防护，水电费开凭据，水电费均由第三方支付</span>
          </div>
        </div>
      </div>
      <router-link to="/mobile_certification" class="loan_button">
        <span>立即申请</span>
      </router-link>
    </div>
</template>

<style>
  .loan_button{
    position: fixed;
    bottom: 0;
    left: 0;
    width:100%;
    height:1.12rem;
    background-color:#FF5A5A;
    font-size: 0.34rem;
    line-height: 1.12rem;
    text-align: center;
    color: #FFFFFF;
  }
  /*详情页*/
  .detailpages{
    padding-bottom:2rem;
  }
  .detailpages_top{
    height: 1.78rem;
    width: 100%;
    background-color:#FF5A5A;
    justify-content: space-between;
    display: flex;
    align-items: center;
  }
  .detailpages_topbox{
    margin-left:0.24rem;
    display: flex;
    align-items: center;
  }
  .detailpages_logo{
    width:1.3rem;
    height:1.3rem;
    border-radius: 0.65rem;
    background-color: #f40;
  }
  .detailpages_title{
    margin-left:0.3rem;
  }
  .detailpages_title p{
    font-size: 0.36rem;
    color: #FFFFFF;
  }
  .detailpages_title span{
    margin-top: 0.14rem;
    font-size: 0.30rem;
    color: #FFFFFF;
  }
  .pentagram{
    padding-right: 0.24rem;
    display: flex;
    padding-top:0.4rem;
  }
  .pentagram span{
    width: 0.28rem;
    height: 0.26rem;
    margin-left:0.06rem;
    background: url("../assets/detailpages_on_star.png") center no-repeat;
    background-size:0.28rem 0.26rem;
  }
  .detailpages_div{
    display: flex;
    height:1.56rem;
    background-color:#fff;
    margin:0.2rem 0;
  }
  .detailpages_divli{
    width:3.75rem;
    display: flex;
    flex-direction:column;
  }
  .detailpages_divli span{
    margin-left:0.26rem;
    margin-top: 0.28rem;
    font-size: 0.28rem;
    color: #9A9A9A;
  }
  .detailpages_cen{
    background-color:#ffffff;
    display: flex;
    flex-wrap: wrap;
  }
  .detailpages_cli{
    position: relative;
    width:3.75rem;
    height:1.66rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .detailpages_cli span.wire{
    position: absolute;
    left: 0;
    top: 0.5rem;
    width:0.02rem;
    height:0.8rem;
    background-color:#9A9A9A;
  }
  .detailpages_cli_top{
    display: flex;
    font-size: 0.28rem;
    color: #7A7A7A;
  }
  .detailpages_cli_top span.icon{
    width:0.32rem;
    height:0.32rem;
    margin-right:0.12rem;
    background:url("../assets/detailpages_deadline.png") center no-repeat;
    background-size: 0.32rem;
  }
  .detailpages_cli_top span.icon1{
    width:0.32rem;
    height:0.32rem;
    margin-right:0.12rem;
    background:url("../assets/detailpages_money.png") center no-repeat;
    background-size: 0.32rem;
  }
  .detailpages_cli_bom{
    display: flex;
    margin-top:0.1rem;
    color: #393939;
    font-size:0.32rem;
    align-items: center;
    margin-left:0.2rem;
  }
  .detailpages_cli_bom input{
    width: 1.88rem;
    height:0.56rem;
    font-size: 0.42rem;
    color: #393939;
    text-align: center;
    margin-right:0.1rem;
    border:0.02rem solid #393939;
  }
  .detailpages_tli{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width:2.5rem;
    height:1.34rem;
  }
  .detailpages_tli p{
    font-size: 0.28rem;
    color: #393939;
  }
  .detailpages_tli span{
    margin-top: 0.02rem;
    font-size: 0.26rem;
    color: #7A7A7A;
  }
  .detailpages_li{
    margin-top:0.2rem;
  }
  .detailpages_libox{
    margin-top:0.02rem;
    height: 1.16rem;
    width:7.26rem;
    padding-left:0.24rem;
    display: flex;
    align-items: center;

    background-color:#ffffff;
  }
  .detailpages_bor_box{
    width:1.96rem;
    height:0.56rem;
    margin-right:0.4rem;
    display: flex;
    font-size: 0.28rem;
    color: #656565;
    align-items: center;
    justify-content:center;
    border:0.02rem solid #FF5A5A;
    border-radius: 0.28rem;
  }
  .detailpages_liboxs{
    margin-top:0.02rem;
    width:7.02rem;
    padding:0.24rem;
    display: flex;
    align-items: center;
    background-color:#ffffff;
  }
  .detailpages_litetx{
    font-size: 0.30rem;
    color: #656565;
  }
</style>

<script>
    export default {
        data (){
            return {
              lefticon:'',
              cityid:''
            }
        },
        mounted(){
          this.cityid = this.$route.params.id;
//        alert(this.cityid)
          console.log('cityid = ' + this.$route.params.id)
        },
        computed: {},
        methods: {}
    }
</script>
