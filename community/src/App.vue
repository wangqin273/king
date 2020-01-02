<template>
    <div id="app">
        <router-view class="child-view"></router-view>
    </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return {
    }
  },
  mounted(){
  },
  watch: {
  }
}
</script>

<style>
  #app{
    width: 100%;
    height: 100%;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
  }
</style>
