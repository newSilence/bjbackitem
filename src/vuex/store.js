import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state={
  menuTitle:"首页",
  menuIsCollapse:false,
  routerWidth:"88vw",
  navbarData:[
    {icon:'el-icon-phone',path:'/index',title:'首页'},
    {icon:'el-icon-user',path:'/index/author',title:'权限'},
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
  }
}
export default new Vuex.Store({state,mutations})
