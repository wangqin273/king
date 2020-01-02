<template>
    <div>
      <my-navbar title="首页"></my-navbar>
      <div style="padding-bottom:1.1rem;">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(img, index) in imgs">  <img :src="img.imgUrl" :alt="index+1"> </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>
        </div>
        <!--帮你推荐-->
        <div class="recommend_cen">
          <router-link to="/loan" class="recommend_cenli">
            <img src="../assets/recommend_loan.png" alt="">
            <p>急速放款</p>
          </router-link>
          <router-link to="/helpyou_recommend" class="recommend_cenli">
            <img src="../assets/recommend_help.png" alt="">
            <p>帮你推荐</p>
          </router-link>
          <a class="recommend_cenli">
            <img src="../assets/recommend_credit.png" alt="">
            <p>征信查询</p>
          </a>
        </div>
        <div v-for="(item,index) in articles">
          {{index+1}}、{{item.title}}
        </div>
        <div class="recommend_box">
          <div class="recommend_title">
            <span class="recommend_title_wire"></span>
            <span>热门贷款</span>
          </div>
          <!--list-->
          <ul>
            <router-link tag="li" to="/particulars/1111">
              <list-item></list-item>
            </router-link>
            <router-link tag="li" to="/particulars/222">
              <list-item></list-item>
            </router-link>
            <router-link tag="li" to="/particulars/333">
              <list-item></list-item>
            </router-link>
          </ul>
        </div>
      </div>
      <my-header thisindex="0"></my-header>
    </div>
</template>

<style>
  .swiper-container {
    width:100%;
    height: auto;
  }
  .swiper-slide{
    background-color:#f40;
  }
  .swiper-slide img{ width: 100%;}
  .recommend_cen{
    width: 100%;
    height: 2.24rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
  }
  .recommend_cenli{
    height: 2.24rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .recommend_cenli img{
    border-radius: 0.57rem;
    width: 1.14rem;
    height:1.14rem;
    margin-bottom: 0.14rem;
  }
  .recommend_cenli p{
    font-size:0.28rem;
    color: #4f4f4f;
  }
  .recommend_box{
    padding-top:0.2rem;

  }

  /*通用标题头*/
  .recommend_title{
    height:0.88rem;
    width: 100%;
    display: flex;
    font-size: 0.32rem;
    color: #FF5A5A;
    align-items: center;
    background-color:#fff;
  }
  .recommend_title span.black{
    color: #393939;
  }
  .recommend_title_wire{
    width: 0.04rem;
    height: 0.4rem;
    margin-left:0.24rem;
    margin-right:0.2rem;
    background-color: #FF5A5A;
  }

</style>

<script>
  import '../../static/swiper.min.js'
  import '../../static/swiper.min.css'
  import banner1 from '@/assets/banner-1.png'
  import banner2 from '@/assets/banner-2.png'
  import banner3 from '@/assets/banner-3.png'
  import banner4 from '@/assets/banner-4.png'

  import app from '../utils/api'
    export default {
        data (){
            return {
              text:111111,
              apiurl:'http://www.vue-js.com/api/v1/topics',
              articles:'',
              imgs: [
                {imgUrl: banner1},
                {imgUrl: banner2},
                {imgUrl: banner3},
                {imgUrl: banner4}
              ]

            }
        },

//      created:function(){
//        var url="json.jsp";
//        this.$http.get(app.getApi()+'/wx/products/recommend').then(function(data){
//          var json=data.body;
//          this.data=eval("(" + json +")");
//        },function(response){
//          console.info(response);
//        })
//      },
        mounted(){
//            轮播图
            new Swiper('.swiper-container', {
              pagination: '.swiper-pagination',
              loop: true,
            });

//          Vue.axios.get(app.getApi()+'/wx/products/recommend').then((response) => {
//            console.log(response.data)
//          })
 /*         this.$http.jsonp(app.getApi()+'/wx/products/recommend').then((response)=>{
            this.articles=response.data
            console.log(response.data)
          })
*/
//          this.$http.get(app.getApi()+'/wx/products/recommend').then((response) => {
//            console.log(response.data)
//          })
        },
      created() {},
        computed: {},
        methods: {}
    }
</script>
