<template>
    <div class="head">
        <!-- <div style="height:10vh;min-height:52px;border:1px solid black;display:flex;align-items:center;justify-content:space-between;background:linear-gradient(0deg,rgba(8,60,50,1),rgba(13,92,77,1));color:white"> -->
        <div style="height:60px;min-height:52px;border:1px solid #F2F7FA;display:flex;align-items:center;justify-content:space-between;background:white;color:#333333">        
            <div style="margin-left:22px;font-size:14px;">
                <span>科创汇后台管理系统</span>
                <span @click="logout" style="margin:0 24px;cursor:pointer">【退出】</span>
            </div>
            <div style="margin-right:21px;font-size:14px">
                回首页<i class="el-icon-arrow-right"></i>
            </div>
            <!-- <div style="display:flex;align-items:center;font-size:17px">
                <span>你好,{{$store.state.username}}</span>
                <span style="margin:0 24px;width:0px;height:17px;border-left:1px white solid"></span>
                <span style="">修改密码</span>
            </div> -->
        </div>
        <!-- <div style="display:flex;padding:11px 45px;background:linear-gradient(to bottom,#f1f1f1 0%,#f1f1f1 50%,#e1e1e1 50%,#e1e1e1 100%);">
            <div @click="tabClick(item,index)" v-for="(item,index) in $store.state.homeTabList" style="border-radius:8px;cursor:pointer" :key="index">
                <div :class="['head_tab',$store.state.headTabClickIndexStr==index?'active_tab':'']">
                    <span style="vertical-align:middle">
                        <img style="width:24px;height:25px" :src="item.icon" alt="">
                    </span>
                    <span>
                        {{item.name}}
                    </span>
                </div>
                
            </div>
        </div> -->
    </div>
</template>

<script>
import { Logout } from "./api";
    export default {
        props: {
            headClickIndex: {
                default: 0
            },
        },
        data() {
            return {
                clickHeadTabIndex:this.headClickIndex,
                departData:[
                    
                ],
                homeTabData: [
                    {name:'我的首页',icon:require('../assets/indextab.png'),},
                    {name:'工业企业',icon:require('../assets/comtab.png'),},
                    {name:'项目管理',icon:require('../assets/gotab.png'),},
                    {name:'意见信箱',icon:require('../assets/lettertab.png'),},
                    {name:'数据统计',icon:require('../assets/digitaltab.png'),},
                ],
            }
        },
        methods: {
            tabClick(item,index) {
                
                // console.log('location.href',location.href);
                
                if(location.href.indexOf('home')!=-1){
                    this.clickHeadTabIndex=index-0;
                    this.$emit('headClick',index)
                }else{
                    this.clickHeadTabIndex=index-0;
                    this.$router.push({path:'/'});
                }
                this.$store.commit('changeHeadTabClickIndexStr',index);
                sessionStorage['headTabClickIndexStr']=index;
                
                
            },
            logout(){
                sessionStorage.clear();
                this.$store.commit('setToken','');
                Logout().then(res=>{
                    location.href='/login';
                })
                
            },
            
        },
        created () {
            console.log(this.$store.state.headTabClickIndexStr);
            
        },
    }
</script>

<style lang="less" scoped>
.head{
    .head_tab{
            color:white;
            padding:10px 19px 9px 14px;
            font-size:14px;
            color:#272727;
            margin-right:76px;
        }
        .active_tab{
            background:rgba(11,80,66,1);
            box-shadow:0px 2px 7px 0px rgba(0, 0, 0, 0.47);
            border-radius:8px;
            color: white;
        }
}
</style>

