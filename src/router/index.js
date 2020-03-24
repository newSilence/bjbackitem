import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Index from '@/Index'
import AuthorityAdmin from '@/pages/authority/AuthorityAdmin'
import AuthorityDepart from '@/pages/authority/AuthorityDepart'
import AuthorityRole from '@/pages/authority/AuthorityRole'
import AddAuthorityRole from '@/pages/authority/addAuthorityRole'
import AuthorityMenu from '@/pages/authority/AuthorityMenu'
import memberReview from '@/pages/authority/memberReview'
import ExpertReview from '@/pages/authority/expertReview'
import ServiceReview from '@/pages/authority/serviceReview'
import AngencyReview from '@/pages/authority/angencyReview'
import ReleaseAudit from '@/pages/releaseAudit'
import AuditRelease from '@/pages/releaseAudit/AuditRelease'


import carte from '@/pages/authority/carte'
import WebMenu from '@/pages/webauthority/WebMenu'
import WebRole from '@/pages/webauthority/WebRole'
import WebAdmin from '@/pages/webauthority/WebAdmin'
import Login from '@/pages/login/Login'
import ConsultManage from '@/pages/consultManage'
import Error from '@/pages/notFound/Error'

// 积分类型
import IntegralType from '@/pages/integral/integral-type'
import IntegralRules from '@/pages/integral/integral-rules'


Vue.use(Router)
const routerAll=new Router({
  routes: [
    {
      path:'/',
      redirect:'/home',
    },
    {
      path:'/login',
      component:Login,
    },
    {path:'/home',component:Home,},
    {
      path: '/index',
      component: Index,
      children:[
        {path:'authority/',redirect:'authority/admin',},
        {
          path: 'authority/admin',
          name: 'AuthorityAdmin',
          component: AuthorityAdmin
        },{
          path: 'authority/depart',
          name: 'AuthorityDepart',
          component: AuthorityDepart
        },{
          path: 'authority/role',
          name: 'AuthorityRole',
          component: AuthorityRole
        },{
          path: 'authority/modifyrole',
          name: 'AddAuthorityRole',
          component: AddAuthorityRole
        },{
          path: 'authority/menu',//会员账号
          name: 'AuthorityMenu',
          component: AuthorityMenu
        },{
          path: 'authority/carte',//会员账号
          name: 'carte',
          component: carte
        },{
          path: 'authority/memberreview',//会员账号审核认证
          name: 'memberReview',
          component: memberReview
        },{
          path: 'authority/expertReview',//ExpertReview
          name: 'expertReview',
          component: ExpertReview
        },{
          path: 'authority/serviceReview',//angencyReview
          name: 'serviceReview',
          component: ServiceReview
        },{
          path: 'authority/angencyReview',//
          name: 'angencyReview',
          component: AngencyReview
        },{
          path: 'webauthority/webmenu',
          name: 'WebMenu',
          component: WebMenu
        },{
          path: 'webauthority/webadmin',
          name: 'WebAdmin',
          component: WebAdmin
        },{
          path: 'webauthority/webrole',
          name: 'WebRole',
          component: WebRole
        },{
          path:'consultManage',
          name:'ConsultManage',
          component:ConsultManage,
        },
        {
          path:'integral/IntegralType',
          name:'IntegralType',
          component:IntegralType,
        },
        {
          path:'integral/IntegralRules',
          name:'IntegralRules',
          component:IntegralRules,
        },{
          path: 'releaseAudit/ReleaseAudit',//发布审核管理主界面
          name: 'ReleaseAudit',
          component: ReleaseAudit
        },{
          path: 'releaseAudit/AuditRelease',//项目审核详情页面
          name: 'AuditRelease',
          component: AuditRelease
        }
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
routerAll.beforeEach((to, from, next) => {
//   判断会话如果存在用户名，就跳转
  if(sessionStorage['username']){
    next()
    ////判断如果不存在用户名且又不是登录页，跳到登陆页
  }else if(!sessionStorage['username']&&to.path!='/login'){
    console.log('loginlogin');
    next('/login')
    //判断如果是登陆页，就直接登陆
  }else if(to.path=='/login'){
    next()
  }
  // to and from are both route objects. must call `next`.
})
export default routerAll;
