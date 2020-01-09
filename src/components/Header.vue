<template>
    <div class="head">
        <div style="height:10vh;min-height:52px;border:1px solid black;display:flex;align-items:center;justify-content:space-between;background:linear-gradient(0deg,rgba(8,60,50,1),rgba(13,92,77,1));color:white">
            <div style="margin-left:50px;font-size:40px;">
                <!-- <i class="el-icon-platform-eleme"></i> -->
                <span>工业经济运营平台</span>
            </div>
            <div style="display:flex;align-items:center;font-size:17px">
                <!-- <span style="width:25px;height:25px;border-radius:50%;border:1px solid black;display:inline-block"></span> -->
                <span>你好，管理员</span>
                <span style="margin:0 24px;width:0px;height:17px;border-left:1px white solid"></span>
                <span style="">修改密码</span>
                <span style="margin:0 24px">退出</span>
                <!-- <i class="el-icon-setting"></i> -->
                <!-- <el-button type="primary" icon="el-icon-setting"></el-button> -->
            </div>
        </div>
        <div style="display:flex;padding:11px 45px;background:linear-gradient(to bottom,#f1f1f1 0%,#f1f1f1 50%,#e1e1e1 50%,#e1e1e1 100%);">
            <div @click="tabClick(item,index)" v-for="(item,index) in homeTabData" style="border-radius:8px;cursor:pointer" :key="index">
                <div :class="['head_tab',$store.state.headTabClickIndexStr==index?'active_tab':'']">
                    <span style="vertical-align:middle">
                        <!-- <i :class="item.icon"></i> -->
                        <img style="width:24px;height:25px" :src="item.icon" alt="">
                    </span>
                    <span>
                        {{item.key}}
                    </span>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            headClickIndex: {
                // type: Number,
                default: 0
            },
        },
        data() {
            return {
                // headClickIndex:0,
                clickHeadTabIndex:this.headClickIndex,
                homeTabData: [
                    {key:'我的首页',icon:require('../assets/indextab.png'),},
                    {key:'工业企业',icon:require('../assets/comtab.png'),},
                    {key:'项目管理',icon:require('../assets/gotab.png'),},
                    {key:'意见信箱',icon:require('../assets/lettertab.png'),},
                    {key:'数据统计',icon:require('../assets/digitaltab.png'),},
                ],
                // key: value
            }
        },
        methods: {
            tabClick(item,index) {
                
                console.log('location.href',location.href);
                
                if(location.href.indexOf('home')!=-1){
                    this.clickHeadTabIndex=index-0;
                    // console.log(this.headClickIndex);
                    this.$emit('headClick',index)
                }else{
                    // setTimeout(() => {
                    //     console.log('dingshi');
                    //     this.$emit('headClick',index);
                    // }, 10000);
                    this.clickHeadTabIndex=index-0;
                    this.$router.push({path:'/'});
                }
                this.$store.commit('changeHeadTabClickIndexStr',index);
                
                
                
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

