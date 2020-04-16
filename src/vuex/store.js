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
  isShowMessage:true,
  navbarData:[
    // {icon:'el-icon-phone',url:'/index',name:'首页'},
    {icon:'el-icon-user',url:'/index/authority/memberreview',name:'会员审核认证'},
    {icon:'el-icon-user',url:'/index/finacing/',name:'财务管理',list:[
      {icon:'el-icon-user',url: '/index/finacing/collectmana',name: '收款管理'},
    ]},
    {icon:'el-icon-user',url:'/index/authoritys',name:'账号管理',list:[
      {icon:'el-icon-user',url: '/index/authority/menu',name: '会员账号管理'},
    ]},
    {icon:'el-icon-user',url:'/index/releaseAudit',name:'发布审核管理',list:[
        {icon:'el-icon-user',url: '/index/releaseAudit/ReleaseAudit',name: '项目审核'},
        {icon:'el-icon-user',url: '/index/needAudit/NeedAudit',name: '需求审核'},
        {icon:'el-icon-user',url: '/index/activeAudit/ActiveAudit',name: '活动审核'},
    ]},
    {icon:'el-icon-user',url:'/index/authority',name:'权限角色管理',list:[
      {icon:'el-icon-user',url: '/index/authority/role',name: '角色管理'},
      {icon:'el-icon-user',url: '/index/authority/carte',name: '菜单管理'},
    ]},
    // {icon:'el-icon-office-building',url:'/index/consultManage',name:'资讯管理'},

    {icon:'el-icon-user',url:'/index/integral/1',name:'系统设置',list:[
        {icon:'el-icon-user',url: '/index/integral/IntegralType',name: '积分设置'},
      ]},
    {icon:'el-icon-user',url:'/index/integral',name:'积分管理',list:[
        {icon:'el-icon-user',url: '/index/integral/IntegralRules',name: '积分账户'},
      ]},

  ],
  homeTabList:[],
}
const mutations={
  changeMenuTitle(state,data){
    // console.log('clickclickmenutitle');
    // console.log(sessionStorage);
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
    state.token=data;
  },
  setIsShowMessage(state,data){
    state.isShowMessage=data;
  }
}
export default new Vuex.Store({state,mutations})
