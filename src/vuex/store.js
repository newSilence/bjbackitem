import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state={
  menuTitle:"首页",
  menuIsCollapse:false,
  headTabClickIndexStr:0,
  routerWidth:"88vw",
  navbarData:[
    {icon:'el-icon-phone',path:'/index',title:'首页'},
    {icon:'el-icon-user',path:'/index/author',title:'权限'},
    {icon:'el-icon-office-building',path:'/index/consultManage',title:'资讯管理'},
  ]
}
const mutations={
  changeMenuTitle(state,data){
      state.menuTitle=data;
  },
  changeMenuCollapse(state){
      state.menuIsCollapse=!state.menuIsCollapse;
      if(state.menuIsCollapse){
        state.routerWidth="93vw"
      }else{
        state.routerWidth="88vw"
      }
  },
  changeMenuData(state,data){
    state.navbarData=data;
  },
  changeHeadTabClickIndexStr(state,data){
    state.headTabClickIndexStr=data;
  }
}
export default new Vuex.Store({state,mutations})
