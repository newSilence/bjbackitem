<template>
    <div style="display:flex">
        <!-- <div style="height:88vh;background:red;width:15vw"> -->
            <el-menu :default-active="$route.path" router class="el-menu-vertical-demo" @select="menuClick" :collapse="menuIsCollapse">
                <template>
                    <div v-for="item in navbarData" :key="item.path">
                        <el-menu-item v-if="!item.children" :index="item.path">
                            <!-- <i :class="item.icon"></i> -->
                            <img style="width:27px;height:27px;vertical-align:middle" :src="item.icon" alt="">
                            <span slot="title">{{item.title}}</span>
                        </el-menu-item>
                        <el-submenu v-else :index="item.path">
                            <template slot="title">
                                <img style="width:27px;height:27px;vertical-align:middle" :src="item.icon" alt="">
                                <span slot="title">{{item.title}}</span>
                            </template>
                            <el-menu-item v-for="subitem in item.children" :key="subitem.path" :index="subitem.path">{{subitem.title}}</el-menu-item>
                        </el-submenu>
                    </div>
                </template>
                
            </el-menu>
        <!-- </div> -->
        <div style="width:2vw;text-align:center;margin-top:200px">
            <i @click="changeMenuType" :class="menuIsCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'"></i>
        </div>
    </div>
</template>

<script>
// import store from '@/vuex/store'
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
export default {
    data() {
        return {
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
            let title=this.navbarData.filter((val)=>{
                return val.path==key
            })[0].title
            this.$store.commit('changeMenuTitle',title);
        },
        changeMenuType(){
            this.$store.commit('changeMenuCollapse');
        }
    },
    mounted () {
        console.log("navBar mounted");
    },
}
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 9vw;
    min-width: 155px;
    min-height: 400px;
  }
  .el-menu-vertical-demo.el-menu--collapse {
    width: 4vw;
    min-width: 55px;
    min-height: 400px;
  }
</style>