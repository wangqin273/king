<template>
    <div>
      <my-navbar leftType="back" title="在线留言"></my-navbar>

      <div class="online_message">
        <textarea maxlength="200" placeholder="请详细描述您遇到的问题，您的描述越详细，我们越更快的帮助您贷到款。"></textarea>
      </div>
    </div>
</template>

<style>
  .online_message{
    padding:0.2rem 0.24rem;
  }
  .online_message textarea{
    width:6.46rem;
    height:3.44rem;
    display: flex;
    padding:0.28rem;
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
