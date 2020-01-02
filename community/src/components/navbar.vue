<template>
  <div>
    <div class="navbar">
      <div class="left" @click="$router.go(-1)">
        <img  v-if="leftType=='back'" src="../assets/common_icon_title_back.png">
        <span v-if="leftText!=null">{{leftText}}</span>
      </div>
      <p class="title">{{title}}</p>
      <div class="right">
        <span v-if="rightText!=null">{{rightText}}</span>
        <img v-if="rightIcon!=null" :src="rightIcon">
      </div>
    </div>
    <div style="height:1rem;"></div>
  </div>
</template>

<style>
  .navbar{
    z-index:101;
    position: fixed;
    top: 0;
    left: 0;
    width:100%;
    display: flex;
    height:1rem;
    background-color:#FF5A5A;
    align-items: center;
    justify-content: space-between;
  }
  .navbar .title{
    font-size:0.34rem;
    color:#ffffff;
  }
  .navbar .left img{
    width:0.38rem;
    height:0.38rem;
  }
  .navbar .left{
    padding-left:0.20rem;
    height:1rem;
    display:flex;
    align-items: center;

  }
  .navbar .right{
    padding-right:0.24rem;
    height:1rem;
    display:flex;
    align-items: center;
    font-size:0.3rem;
    color:#ffffff;
  }
</style>

<script>
    export default {
        props:[
          'leftType',
          'title',
          'leftIcon',
          'leftText',
          'rightText',
          'rightIcon',
        ],
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
