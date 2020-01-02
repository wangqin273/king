<template>
    <div>
      <my-navbar title="我的"></my-navbar>

      <div class="personal">
        <div class="personal_top">
          <img class="personal_header" src="../assets/personal_header.png" alt="">
          <p class="personal_name">姓名</p>
          <router-link to="/my_profile" class="personal_edit">
            <div class="personal_editbg"></div>
            <span>编辑个人资料</span>
            <span class="personal_editicon"></span>
          </router-link>
        </div>
        <div class="personal_box">
          <router-link to="/loan_query">
            贷款进度查询
                </router-link>
          <a >我的征信报告</a>
          <router-link to="/online_message">在线留言</router-link>
        </div>
      </div>

      <my-header thisindex="3"></my-header>
    </div>
</template>

<style>

  .personal{

  }
  .personal_top{
    height:3.16rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color:#FF5A5A;
  }
  .personal_header{
    width:1.2rem;
    height: 1.2rem;
    background-color:#f40;
    border-radius: 0.6rem;
  }

  .personal_name{
    margin-top: 0.1rem;
    font-size: 0.32rem;
    color: #FFFFFF;
  }
  .personal_edit{
    font-size: 0.26rem;
    color: #FFFFFF;
    margin-top: 0.22rem;
    justify-content: center;
    align-items: center;
    display: flex;
    position: relative;
    width:2.7rem;
    height:0.46rem;
    border-radius:0.23rem;
  }
  .personal_editbg{
    width:2.7rem;
    height: 0.46rem;
    background-color:#ffffff;
    opacity:0.3;
    position: absolute;
    left: 0;
    top:0;
    border-radius:0.23rem;
  }
  .personal_editicon{
    width:0.22rem;
    height:0.23rem;
    margin-left: 0.2rem;
    background: url("../assets/personal_edit.png") center center no-repeat;
    background-size: 0.22rem 0.23rem;
  }
  .personal_box{
    padding-top:0.2rem;
    display: flex;
    flex-direction: column;
  }
  .personal_box a{
    background: url("../assets/personal_right_arrow.png") #fff 7rem center no-repeat;
    background-size:0.18rem 0.32rem;
    width:7.26rem;
    height:1.1rem;
    font-size: 0.28rem;
    color: #393939;
    line-height: 1.1rem;
    padding-left:0.24rem;
    margin-bottom:0.02rem;
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
