<template>
    <div>
      <my-navbar leftType="back" title="我的资料"></my-navbar>

      <div class="my_profile">
        <div class="select_list">
          <span class="select_title">姓名</span>
          <div class="select_right">
            <input placeholder="请输入" type="text">
          </div>
        </div>
        <div class="select_list">
          <span class="select_title">身份证号</span>
          <div class="select_right">
            <input placeholder="请输入" type="tel">
          </div>
        </div>
        <div class="select_list">
          <span class="select_title">手机号</span>
          <div class="select_right">
            <input placeholder="请输入" type="tel">
          </div>
        </div>
        <div class="select_list">
          <span class="select_title">职业身份</span>
          <div class="select_right">
            <select class="select_box" name="cars">
              <option value="上班族" selected="selected">上班族</option>
              <option value="企业主">企业主</option>
              <option value="其他">其他</option>
            </select>
          </div>
        </div>
        <div class="select_list">
          <span class="select_title">有无信用卡</span>
          <div class="select_right">
            <select class="select_box" name="cars">
              <option value="有" selected="selected">有</option>
              <option value="没有">没有</option>
            </select>
          </div>
        </div>
        <div class="select_list">
          <span class="select_title">手机使用时间</span>
          <div class="select_right">
            <select class="select_box" name="cars">
              <option value="1-5个月" selected="selected">1-5个月</option>
              <option value="6个月以上">6个月以上</option>
            </select>
          </div>
        </div>
      </div>
    </div>
</template>

<style>
  .my_profile{
    margin-top:0.2rem;
    margin-bottom:1.18rem;
  }
  .select_list{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height:1rem;
    margin-bottom:0.02rem;
    background-color:#ffffff;
  }
  .select_list span.select_title{
    margin-left:0.24rem;
    font-size: 0.30rem;
    color: #7B7B7B;
  }
  .select_right{
    display: flex;
    align-items: center;
    height:1.1rem;
    margin-right: 0.24rem;
  }
  .select_right input{
    font-size: 0.30rem;
    color: #393939;
    width:3rem;
    text-align: right;
    height:0.8rem;
  }
  .select_box{
    /*width:2.2rem;*/
    height:1rem;
    text-align: right;
    padding-right:0.2rem;
    background: url("../assets/loan_down_arrow.png") right center no-repeat;
    background-size: 0.24rem 0.16rem;
    border: 0;
    font-size: 0.30rem;
    color: #393939;
  }
  .select_box option{
    text-align: right;
  }

</style>

<script>
    export default {
        data (){
            return {

            }
        },
        created(){

        },
        computed: {},
        methods: {}
    }
</script>
