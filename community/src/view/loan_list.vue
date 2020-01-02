<template>
    <div>
      <my-navbar leftType="back" title="现金超人"></my-navbar>
      <div class="recommend_box">
        <div class="helpyou_title">
          <span>申请多个产品，可大幅度提高贷款成功率</span>
        </div>
        <div class="recommend_title">
          <span class="recommend_title_wire"></span>
          <span class="black">以下产品非常适合您</span>
        </div>
        <!--list-->
        <router-link to="/particulars/9876"> <list-item></list-item></router-link>
        <li  v-on:click="doSth()"><list-item></list-item></li>

      </div>
    </div>
</template>

<style>

</style>

<script>
    export default {

        data (){
            return {}
        },
        computed: {},
         methods: {
          doSth: function () {
              console.log('我跳转页面了')
            console.log('from 命名路由 ='+this.$route.name)
//          this.$router.push('/loan');
//           this.$router.push({ path: '/loan' })
           this.$router.push({ name: 'loan', params: { id: 123 }})
//            this.$router.push({ path: 'loan', query: { plan: 'private' }})
            console.log('动态路径参数为 ='+this.$route.params.id)
            console.log('to 命名路由 ='+this.$route.name)
            console.log('完成解析后的 URL ='+this.$route.fullPath)
            console.log('当前路由的 hash 值 ='+this.$route.hash)

            }
        }

    }
</script>
