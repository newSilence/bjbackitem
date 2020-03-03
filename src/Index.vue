<template>
  <div>
    <!-- <router-view></router-view> -->
    <div style="display:flex">
      <NavBar/>
      <div style="flex:1">
      <Header/>
      <div style="flex:1;display:flex;flex-direction:column;background:rgba(242,247,250,1);padding-top:20px;padding-right:22px">
        <div style="margin-left:23px">
          <span  style="display:inline-block;font-size:16px;color:#616161;box-sizing:border-box;padding:16px;background:rgba(247,247,247,1);border:1px solid rgba(220,220,220,1);border-bottom:none">
            {{$store.state.menuTitle}}
            <i class="el-icon-close"></i>
          </span>
        </div>
        <div v-bind:style="{border:'1px solid #DCDCDC',minHeight:'85.5vh',overflow:'auto',marginLeft:'23px',paddingRight:'22px'}">
            <div style="width:100%">
              <router-view/>
            </div>
            
        </div>
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
    console.log("indexindexinxdexindex")
    //纠正页面刚加载显示title
    let key=location.href.split('#')[1];
    let filterUrl=this.navbarData.filter((val)=>{
        return val.path==key
    });
    console.log(this.navbarData);
  },
  methods: {
    getMenuTitle(arr,url) {
      let deepArr=JSON.parse(JSON.stringify(arr));
      
    }
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
