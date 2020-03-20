<template>
    <div style="background:rgba(30,30,30,1);min-height: 100vh;">
        <!-- <div style="height:88vh;background:red;width:15vw"> -->
            <div style="padding-top:22px;padding-bottom:20px;background:rgba(30,30,30,1);text-align:center">
                <img style="height:20px" :src="imgSrc">
            </div>
            <el-menu :default-active="$route.path" router class="el-menu-vertical-demo" @select="menuClick" :collapse="menuIsCollapse">
                <template>
                    <div v-for="item in navbarData" :key="item.url">
                        <el-menu-item class="nosubmenu" v-if="!item.list" :index="item.url">
                            <!-- <i :class="item.icon"></i> -->
                            <!-- <img style="width:27px;height:27px;vertical-align:middle" :src="item.icon" alt=""> -->
                            <span slot="title">{{item.name}}</span>
                        </el-menu-item>
                        <el-submenu class="submenu" v-else :index="item.url">
                            <template slot="title">
                                <!-- <img style="width:27px;height:27px;vertical-align:middle" :src="item.icon" alt=""> -->
                                <span slot="title">{{item.name}}</span>
                            </template>
                            <el-menu-item v-for="subitem in item.list" :key="subitem.url" :index="subitem.url">{{subitem.name}}</el-menu-item>
                        </el-submenu>
                    </div>
                </template>
                
            </el-menu>
        <!-- </div> -->
        <!-- <div style="width:0px;text-align:center;margin-top:200px;"> -->
            <!-- <i @click="changeMenuType"  :class="menuIsCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'"></i> -->
        <!-- </div> -->
    </div>
</template>

<script>
// import store from '@/vuex/store'
// import scienceTechLogo from '@/assets/scienceTechLogo.png'
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
export default {
    data() {
        return {
            imgSrc:require('../assets/scienceTechLogo.png')
        }
    },
    computed: {
        ...mapState(['menuTitle','navbarData','menuIsCollapse']),
        // name() {
        //     return this.data 
        // }
    },
    // store,
    methods: {
        menuClick(key,keyPath){
            // console.log(key);
            // console.log(keyPath);
            let menuTitle;
            // console.log('this.navbarData',this.navbarData);
            for(let i=0;i<this.navbarData.length;i++){
                if(this.navbarData[i].list&&this.navbarData[i].list.length>0){
                    let filterData=this.navbarData[i].list.filter(val=>{
                        return val.url==key
                    });
                    if(filterData.length>0){
                        menuTitle=filterData[0].name;
                        break;
                    }
                }else{
                    // console.log('ifelse');
                    if(this.navbarData[i].url==key){
                        // console.log('this.navbarData[i]',this.navbarData[i]);
                        menuTitle=this.navbarData[i].name;
                        break;
                    }
                }
            }
            // console.log('menuTitle',menuTitle);
            this.$store.commit('changeMenuTitle',menuTitle);
            sessionStorage['menuTitle']=menuTitle;
            // let title=this.navbarData.filter((val)=>{
            //     return val.path==key
            // })[0].title
            // this.$store.commit('changeMenuTitle',title);
            // sessionStorage['menuTitle']=title;
        },
        changeMenuType(){
            this.$store.commit('changeMenuCollapse');
        }
    },
    mounted () {
        this.$store.commit('changeMenuTitle',sessionStorage['menuTitle']);
    },
}
</script>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 9vw;
    min-width: 220px;
    background:rgba(30,30,30,1);
    border-right:none;
    
  }
  .el-menu{
      background-color: rgba(30,30,30,1)!important;
  }
  .el-submenu__title *{
      color:white;
      height: 50px;
      font-size:16px
  }
  .el-submenu__title:hover{
      background:rgba(60,60,68,1);
      color:white;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) .el-menu-item{
      color:white;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) .el-menu-item.is-active{
      background:linear-gradient(36deg,rgba(42,213,210,1) 0%,rgba(43,180,232,0.32) 100%);
      color:white;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) .el-menu-item.is-active:hover{
      background:linear-gradient(36deg,rgba(42,213,210,1) 0%,rgba(43,180,232,0.32) 100%);
      color:white;
  }
  .nosubmenu.el-menu-item{
      height: 50px;
      line-height: 50px;
      font-size:16px;
  }
  .submenu .el-menu-item{
      height: 40px;
      line-height: 40px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) .el-menu-item:hover{
      background:rgba(60,60,68,1);
      color:white;
  }
  .el-menu-vertical-demo.el-menu--collapse {
    width: 4vw;
    min-width: 55px;
    min-height: 100vh;
    background:rgba(30,30,30,1);
  }
  .el-menu-vertical-demo .el-menu{
      
  }
</style>