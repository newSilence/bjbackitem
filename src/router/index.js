import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Index from '@/Index'
import Anthor from '@/pages/author/Anthor'
import Login from '@/pages/login/Login'
import ConsultManage from '@/pages/consultManage'
import Error from '@/pages/notFound/Error'
Vue.use(Router)
const routerAll=new Router({
  routes: [
    {
      path:'/',
      redirect:'/index',
    },
    {
      path: '/index',
      component: Index,
      children:[
        {path:'/',component:Home,},
        {
          path: 'author',
          name: 'Anthor',
          component: Anthor
        },
        {
          path:'consultManage',
          name:'ConsultManage',
          component:ConsultManage,
        },
      ]
    },
    {
      path:'/login',
      name:'Login',
      component:Login,
    },
    {
      path:'*',
      name:'Error',
      component:Error,
    }
  ]
});
export default routerAll;
