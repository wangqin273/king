import App from '../App'
//import Path from '../utils/path'

import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/index'
import loan from '@/view/loan'
import strategy from '@/view/strategy'
import personal from '@/view/personal'
import particulars from '@/view/particulars'
import my_profile from '@/view/my_profile'
import loan_query from '@/view/loan_query'
import progress_query from '@/view/progress_query'
import online_message from '@/view/online_message'
import helpyou_recommend from '@/view/helpyou_recommend'
import mobile_certification from '@/view/mobile_certification'
import loan_list from '@/view/loan_list'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: App,
      children:[
        {
          name: index,
          path: '/',
          component: index
        },
        {
          name: 'strategy',
          path: '/strategy',
          component: strategy
        },
        {
          name: 'personal',
          path: '/personal',
          component: personal
        },
        {
          name: 'loan',
          path: '/loan',
          component: loan
        },
        {
          name:'particulars',
          path: '/particulars/:id',
          component: particulars
        },
        {
          name: 'my_profile',
          path: '/my_profile',
          component: my_profile
        },
        {
          name: 'loan_query',
          path: '/loan_query',
          component: loan_query
        },
        {
          name: 'progress_query',
          path: '/progress_query',
          component: progress_query
        },
        {
          name: 'helpyou_recommend',
          path: '/helpyou_recommend',
          component: helpyou_recommend
        },
        {
          name: 'online_message',
          path: '/online_message',
          component: online_message
        },
        {
          name: 'mobile_certification',
          path: '/mobile_certification',
          component: mobile_certification
        },
        {
          name: 'loan_list',
          path: '/loan_list',
          component: loan_list
        },
        {
          path: '*',
          redirect: '/'
        }
      ]
    },
  ]
})
