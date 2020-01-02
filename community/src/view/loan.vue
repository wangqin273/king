<template>
    <div>
      <my-navbar title="贷款"></my-navbar>

      <div class="loan_box">
        <div class="loan_boxli">
          <p>职业身份</p>
          <ul>
            <li @click="sclcets(index)" v-for="(item,index) in slist" :class="{cur:scindex==index}">{{item}}</li>
          </ul>
        </div>
        <div class="loan_boxli">
          <p>贷款金额</p>
          <select class="loan_select" name="cars">
            <option value="500以内" selected="selected">500以内</option>
            <option value="1000-2000">1000-2000</option>
            <option value="2000-3000">2000-3000</option>
            <option value="3000-5000">3000-5000</option>
            <option value="5000-10000">5000-10000</option>
            <option value="10000-20000">10000-20000</option>
            <option value="20000-50000">20000-50000</option>
            <option value="50000以上">50000以上</option>
            <option value="不限">不限</option>
          </select>
          <p>期限</p>
          <select class="loan_select" name="cars">
            <option value="3天" selected="selected">3天</option>
            <option value="一周内">一周内</option>
            <option value="1个月">1个月</option>
            <option value="3个月">3个月</option>
            <option value="6个月">6个月</option>
            <option value="9个月">9个月</option>
            <option value="12个月">12个月</option>
            <option value="24个月">24个月</option>
            <option value="36个月">36个月</option>
            <option value="不限">不限</option>
          </select>
        </div>
      </div>
      <ul class="recommend_box">
        <!--list-->
        <router-link tag="li" to="/particulars/134">
          <list-item></list-item>
        </router-link>
        <router-link tag="li" to="/particulars/134">
          <list-item></list-item>
        </router-link>
        <router-link tag="li" to="/particulars/134">
          <list-item></list-item>
        </router-link>
        <router-link tag="li" to="/particulars/134">
          <list-item></list-item>
        </router-link>
      </ul>
      <my-header thisindex="1"></my-header>
    </div>
</template>

<style>
  .recommend_box{
    padding-top:0.2rem;
    padding-bottom:1.1rem;
  }

  /*贷款*/
  .loan_box{
    height:2.2rem;
    margin-top:0.2rem;
    background-color: #ffffff;
  }
  .loan_boxli{
    display: flex;
    padding-bottom: 0.24rem;
    padding-top: 0.3rem;
    width: 100%;
    align-items: center;

  }
  .loan_boxli p{
    margin-left: 0.24rem;
    font-size:0.28rem;
    color: #9F9F9F;
  }
  .loan_boxli ul{
    display: flex;
  }
  .loan_boxli ul li{
    margin-left: 0.46rem;
    height:0.5rem;
    width: 1.48rem;
    font-size: 0.26rem;
    color: #474747;
    line-height: 0.5rem;
    text-align: center;
    background-color: #F1F1F1;
    border-radius: 0.25rem;
  }
  .loan_boxli ul li.cur{
    background-color: #FF5A5A;
    color: #ffffff;
  }
  .loan_select{
    width: 2.2rem;
    height: 0.5rem;
    margin-left: 0.38rem;
    font-size: 0.26rem;
    color: #464646;
    border: 1px solid #979797;
    border-radius: 0.25rem;
    text-align: center;
    background: url("../assets/loan_down_arrow.png") 1.8rem center no-repeat;
    background-size:0.24rem 0.16rem;
  }
</style>

<script>
    export default {
        data (){
            return {
                id:1111,
                scindex:0,
                slist:['上班族','企业主','其他']
            }
        },
        created(){

        },
        computed: {},
        methods: {
          sclcets(index){
              this.scindex=index;
          }

        }
    }
</script>
