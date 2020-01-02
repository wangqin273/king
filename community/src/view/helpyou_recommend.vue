<template>
    <div>
      <my-navbar leftType="back" title="帮你推荐"></my-navbar>
      <div class="my_profile">
        <div class="helpyou_title">
          <span>提供真实信息，现金超人会为您推荐合适贷款产品</span>
        </div>
        <div class="select_list">
          <span class="select_title">贷款金额</span>
          <div class="select_right">
            <select class="select_box" name="cars">
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
          </div>
        </div>
        <div class="select_list">
          <span class="select_title">贷款期限</span>
          <div class="select_npright">
            <select class="select_box" name="cars">
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
        <div class="select_list">
          <span class="select_title">身份信息</span>
          <div class="select_right">
            <select class="select_box" name="cars">
              <option value="上班族" selected="selected">上班族</option>
              <option value="企业主">企业主</option>
              <option value="其他">其他</option>
            </select>
          </div>
        </div>
        <div class="select_list">
          <span class="select_title">所在地区</span>
          <div class="select_right">
            <select class="select_box" name="cars">
              <option value="北京－朝阳区" selected="selected">北京－朝阳区</option>

            </select>
          </div>
        </div>
        <div class="select_list">
          <span class="select_title">有无公积金</span>
          <div class="select_right">
            <select class="select_box" name="cars">
              <option value="有" selected="selected">有</option>
              <option value="没有">没有</option>
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
        <div class="select_list">
          <span class="select_title">真实姓名</span>
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
      </div>
      <router-link to="/loan_list" class="loan_button" >
        <span>去贷款</span>
      </router-link>
    </div>
</template>

<style>
  .helpyou_title{
    height:0.88rem;
    width:100%;
    line-height: 0.88rem;
    margin-bottom:0.2rem;
    background: url("../assets/helpyou_speaker.png") #fff 0.24rem center no-repeat;
    background-size:0.49rem 0.4rem;
  }
  .helpyou_title span{
    margin-left:0.92rem;
    font-size: 0.28rem;
    color: #7B7B7B;
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
