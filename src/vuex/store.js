import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state={
  username:'',
  token:'',
  menuTitle:"首页",
  menuIsCollapse:false,
  headTabClickIndexStr:0,
  routerWidth:"88vw",
  navbarData:[
    {icon:'el-icon-phone',url:'/index',name:'首页'},
    {icon:'el-icon-user',url:'/index/authority/memberreview',name:'会员账号审核认证'},
    {icon:'el-icon-user',url:'/index/authoritys',name:'账号管理',list:[
      {icon:'el-icon-user',url: '/index/authority/menu',name: '会员账号管理'},
    ]},
    {icon:'el-icon-user',url:'/index/authority',name:'权限角色管理',list:[
      {icon:'el-icon-user',url: '/index/authority/role',name: '角色管理'},
      {icon:'el-icon-user',url: '/index/authority/carte',name: '菜单管理'},
    ]},
    {icon:'el-icon-office-building',url:'/index/consultManage',name:'资讯管理'},


    {icon:'el-icon-user',url:'/index/integral',name:'积分管理',list:[
        {icon:'el-icon-user',url: '/index/integral/IntegralType',name: '积分设置'},
        {icon:'el-icon-user',url: '/index/integral/IntegralRules',name: '积分账户'},
      ]},

  ],
  homeTabList:[],
}
const mutations={
  changeMenuTitle(state,data){
    console.log('click');
    console.log(sessionStorage);
      state.menuTitle=data;
  },
  changeMenuCollapse(state){
      state.menuIsCollapse=!state.menuIsCollapse;
      if(state.menuIsCollapse){
        state.routerWidth="100%"
      }else{
        state.routerWidth="100%"
      }
  },
  changeMenuData(state,data){
    state.navbarData=data;
  },
  changeHeadTabClickIndexStr(state,data){
    state.headTabClickIndexStr=data;
  },
  changeUserName(state,data){
    state.username=data;
  },
  changeHomeTabList(state,data){
    state.homeTabList=data;
  },
  setToken(state,data){
    state.token=data
  }
}
export default new Vuex.Store({state,mutations})
