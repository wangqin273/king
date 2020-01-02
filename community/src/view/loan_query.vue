<template>
    <div>
      <my-navbar leftType="back" title="贷款进度查询"></my-navbar>
      <div class="loan_query">
        <router-link to="/progress_query" class="loan_query_div">
          <div class="loan_query_right">
            <img class="loan_query_logo" src="" alt="">
            <div class="loan_query_box">
              <p>玖富叮当贷</p>
              <span>咨询电话：800－240-1990</span>
              <i>2017年03月31日22:14:28</i>
            </div>
          </div>
        </router-link>
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
