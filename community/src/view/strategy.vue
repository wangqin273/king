
<template>
    <div>
      <my-navbar title="攻略"></my-navbar>

      <div class="strategy">
        <a href="#">
          <img src="../assets/strategy_guide.png" alt="">
          <span>新手指南</span>
        </a>
        <a href="#">
          <img src="../assets/strategy_direction.png" alt="">
          <span>经验指导</span>
        </a>
        <a href="#">
          <img src="../assets/strategy_process.png" alt="">
          <span>贷款流程</span>
        </a>
        <a href="#">
          <img src="../assets/strategy_problem.png" alt="">
          <span>常见问题</span>
        </a>
      </div>

      <my-header thisindex="2"></my-header>
    </div>
</template>

<style>
  .strategy{
    margin-top:0.2rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .strategy a{
    width:3.74rem;
    height:2.6rem;
    background-color: #ffffff;
    display: flex;
    margin-bottom:0.02rem;
    justify-content:center;
    align-items: center;
    flex-direction: column;
  }
  .strategy a img{
    width: 1.1rem;
    height:1.1rem;
    margin-bottom: 0.18rem;
  }
  .strategy a span{
    font-size: 0.28rem;
    color: #464646;
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
