// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import Header from './components/header.vue'
import ListItem from './components/list-item.vue'
import Navbar from './components/navbar.vue'

Vue.component('my-header',  Header)
Vue.component('my-navbar',  Navbar)
Vue.component('list-item',  ListItem)
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
