<template>
    <div>
      <my-navbar leftType="back" title="贷款进度查询"></my-navbar>
      <div class="mobile">
        <div class="mobile_top">
          <img class="mobile_logo" src="../assets/logo.png" alt="">
        </div>
        <div class="mobile_lis">
          <div class="recommend_title">
            <span class="recommend_title_wire"></span>
            <span class="black">填写注册手机号</span>
          </div>
          <div class="mobile_box">
            <div class="mobile_boxli">
              <span>手机号</span>
              <input placeholder="请输入手机号" maxlength="11" type="tel" v-model="mobile_phone"  value="" >
              <span class="icon_close" v-on:click="colse_phone()"></span>
            </div>
            <div class="mobile_boxli">
              <span>验证码</span>
              <input placeholder="请输入验证码" maxlength="6" type="tel">
              <span class="getcode_but">获取验证码</span>
            </div>
          </div>
        </div>
        <div class="mobile_lis">
          <div class="recommend_title">
            <span class="recommend_title_wire"></span>
            <span class="black">填写你的职业身份</span>
          </div>
          <div class="mobile_box">
            <ul id="mod_one" class="mobile_boxli">
              <li class="cur">上班族</li>
              <li>企业主</li>
              <li>其他</li>
            </ul>
          </div>
        </div>
        <div class="mobile_lis">
          <div class="recommend_title">
            <span class="recommend_title_wire"></span>
            <span class="black">填写你的职业身份</span>
          </div>
          <div class="mobile_box">
            <ul id="mod_two" class="mobile_boxli">
              <li class="cur">有信用卡</li>
              <li>无信用卡</li>
            </ul>
          </div>
        </div>
        <div class="mobile_lis">
          <div class="recommend_title">
            <span class="recommend_title_wire"></span>
            <span class="black">填写您的基本信息</span>
          </div>
          <div class="mobile_box">
            <div class="mobile_boxli">
              <span style="margin-right:0.3rem;">姓名</span>
              <input placeholder="请填写姓名" maxlength="11" type="text" v-model="user_name"/>
              <span class="icon_close" v-on:click="colse_name()"></span>
            </div>
            <div class="mobile_boxli">
              <span>手机号</span>
              <input placeholder="请输入手机号" maxlength="11" type="tel" value="" v-model="mobile_tel">
              <span class="icon_close" v-on:click="colse_tel()"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="loan_button">
        <span>立即申请</span>
      </div>
    </div>
</template>

<style>
  .mobile{
    padding-bottom:1.2rem;
  }
  .mobile_top{
    width: 100%;
    height:2.4rem;
    background-color:#fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .mobile_logo{
    width:1.5rem;
    height: 1.5rem;
  }
  .mobile_box{
    width:6.98rem;
    padding-left:0.52rem;
    background-color:#fff;
  }
  .mobile_boxli{
    height:1.1rem;
    width:6.98rem;
    display: flex;
    align-items: center;
    border-bottom-color: #F2F3F7;
    border-bottom-width: 0.02rem;
    border-bottom-style:solid;
    font-size: 0.30rem;
    color: #414141;
  }
  .mobile_boxli input{
    margin-left:0.5rem;
    height:1.1rem;
    width: 3rem;
    font-size:0.3rem;
    color: #444444;
    border: 0;
  }
  .mobile_boxli span.icon_close{
    margin-left:2rem;
    width:0.32rem;
    height: 0.32rem;
    background: url("../assets/mobile_certification_empty.png") center no-repeat;
    background-size:0.32rem;

  }
  .mobile_boxli input:focus {outline:none;}

  .mobile_boxli .getcode_but{
    margin-left:0.44rem;
    width: 1.9rem;
    height:0.6rem;
    font-size: 0.26rem;
    color: #FFFFFF;
    line-height:0.6rem;
    text-align: center;
    background-color:#FF5A5A;
    border-radius:0.3rem;
  }
  .mobile_boxli li{
    width:1.7rem;
    height: 0.56rem;
    border-radius:0.28rem;
    margin-right:0.6rem;
    line-height: 0.56rem;
    text-align: center;
    background-color:#ffffff;
    border:0.02rem solid #FF5A5A;
    color: #656565;
  }
  .mobile_boxli li.cur{
    background-color:#FF5A5A;
    color:#ffffff;
  }
</style>

<script>
    export default {
        data (){
            return {
              mobile_phone: '',
              user_name: '',
              mobile_tel: '',
            }
        },

        created(){

        },
      mounted(){
        console.log(this.mobile_phone)
      },
      computed: {},
      methods: {
        colse_phone:function () {
          console.log(this.mobile_phone)
          this.mobile_phone = ''
        },
        colse_name:function () {
          console.log(this.user_name)
          this.user_name = ''
        },
        colse_tel:function () {
          console.log(this.mobile_tel)
          this.mobile_tel = ''
        }
        }
    }
</script>
