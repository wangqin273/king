<template>
    <div>
      <my-navbar leftType="back" title="进度查询"></my-navbar>
      <div class="loan_query">
        <div class="loan_query_div">
          <div class="loan_query_right">
            <img class="loan_query_logo" src="" alt="">
            <div class="loan_query_box">
              <p>玖富叮当贷</p>
              <span>咨询电话：800－240-1990</span>
            </div>
          </div>
          <span class="loan_query_icon"></span>
        </div>
        <div class="loanq_cen">
          <img class="loanq_cenlogo" src="../assets/progress_query_audit.png" alt="">
          <p>审核中</p>
          <span class="loanq_span">请耐心等待，也可登录网银查询结果</span>
          <div class="loanq_cen_li"><span>快速进入现金超人查询结果</span></div>
          <div class="loanq_cen_li"><span>打电话询问</span></div>
        </div>
      </div>
      <div class="loan_button">
        <span>已收到货款</span>
      </div>
    </div>
</template>

<style>
  .loan_query{
    margin-top:0.2rem;
  }
  .loan_query_div{
    display: flex;
    height:1.88rem;
    width:100%;
    align-items: center;
    justify-content: space-between;
    background-color:#ffffff;
    margin-bottom: 0.02rem;
  }
  .loan_query_logo{
    margin-left:0.24rem;
    margin-right:0.3rem;
    height:1.3rem;
    width:1.3rem;
    background-color:#f40;
    border-radius:0.65rem;
  }
  .loan_query_right{
    display: flex;
    align-items: center;
  }
  .loan_query_box{
    display: flex;
    flex-direction: column;
  }
  .loan_query_box p{
    font-size: 0.34rem;
    color: #393939;
  }
  .loan_query_box span{
    font-size: 0.28rem;
    color: #4F4F4F;
    margin-top:0.1rem;
    margin-bottom: 0.1rem;
  }
  .loan_query_box i{
    font-size: 0.24rem;
    color: #909090;
  }
  /*贷款查询详情*/
  .loan_query_icon{
    margin-right:0.24rem;
    width:0.68rem;
    height: 0.68rem;
    background:url("../assets/progress_query_call.png") center no-repeat;
    background-size:0.68rem;
  }
  .loanq_cen{
    margin-top:0.2rem;
    background-color:#ffffff;
    padding-top:0.84rem;
    padding-bottom:2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .loanq_cenlogo{
    width:1rem;
    height:1.12rem;
  }
  .loanq_cen p{
    margin-top:0.52rem;
    margin-bottom:0.08rem;
    font-size: 0.34rem;
    color: #616161;
  }
  .loanq_cen span.loanq_span{
    font-size: 0.28rem;
    color: #707070;
    margin-bottom:0.89rem;
  }
  .loanq_cen_li{
    display: flex;
    align-items: center;
    margin-bottom:0.32rem;
    justify-content: center;
    width: 6rem;
    font-size: 0.34rem;
    color: #272727;
    height: 0.98rem;
    border:0.02rem solid #C0C0C0;
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
