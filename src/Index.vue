<template>
  <div>
    <!-- <router-view></router-view> -->
    <Header/>
    <div style="display:flex">
      <NavBar/>
      <div style="display:flex;flex-direction:column;">
        <div height="3vh">{{menuTitle}}</div>
        <div v-bind:style="{border:'1px solid black',height:'85.5vh',width:routerWidth}">
            <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
import NavBar from './components/NavBar'
import store from '@/vuex/store'
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
export default {
  name: 'App',
  store,
  data() {
    return {
      // routerWidth:"88vw"
      // key: value
    }
  },
  computed: {
    ...mapState(['menuTitle','navbarData','routerWidth']),
  },
  components:{
    'Header':Header,
    'NavBar':NavBar
  },
  created () {
    console.log(location.href.split('#')[1]);
    //纠正页面刚加载显示title
    let key=location.href.split('#')[1];
    let filterUrl=this.navbarData.filter((val)=>{
        return val.path==key
    });
    let title='';
    if(filterUrl.length>0){
        title=filterUrl[0].title
    }
    this.$store.commit('changeMenuTitle',title);
    // console.log(this.$store);
    console.log(this.navbarData);
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
