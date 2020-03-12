<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import store from '@/vuex/store'
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
export default {
  name: 'App',
  // store,
  data() {
    return {
      // routerWidth:"88vw"
      // key: value
    }
  },
  computed: {
    ...mapState(['menuTitle','navbarData','routerWidth']),
  },
  mounted () {
    // console.log("app mounetd");
  },
  created () {
    // console.log("页面刷新了");
    // console.log("页面刷新了",sessionStorage);
    // console.log("页面刷新了",this.$store.state);
    if(sessionStorage.length==0){
      // console.log("暂时未登录")
    }else{
      this.$store.commit("changeUserName",sessionStorage['username']);
      // this.$store.commit("changeHomeTabList",JSON.parse(sessionStorage['homeTabList']));
      this.$store.commit("changeHeadTabClickIndexStr",sessionStorage['headTabClickIndexStr']);
      if(sessionStorage['navMenu']){
        this.$store.commit("changeMenuData",JSON.parse(sessionStorage['navMenu']));
      }
      this.$store.commit('changeMenuTitle',sessionStorage['menuTitle']);
      this.$store.commit("setToken",sessionStorage['token']);
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
