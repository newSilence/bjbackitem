<template>
    <div class="home">
        <Head :headClickIndex='clickHeadTabIndex' @headClick="detailChange"/>
        <!-- <div style="display:flex;padding:11px 45px;background:linear-gradient(to bottom,#f1f1f1 0%,#f1f1f1 50%,#e1e1e1 50%,#e1e1e1 100%);">
            <div @click="tabClick(item,index)" v-for="(item,index) in homeTabData" style="border-radius:8px;cursor:pointer" :key="index">
                <div :class="['head_tab',clickHeadTabIndex==index?'active_tab':'']">
                    <span style="vertical-align:middle">
                        <img style="width:33px;height:33px" :src="item.icon" alt="">
                    </span>
                    <span>
                        {{item.key}}
                    </span>
                </div>
                
            </div>
        </div> -->
        <div style="background:rgb(238,252,243);display:flex;padding:60px 31px 0px 51px;height:90vh">
            <div style="width:65%;min-width:800px;display:flex;justify-content:space-between;align-content:flex-start;font-size:20px;flex-wrap:wrap;padding-right:6%">
                <div class="home_tab_datail" @click="detailItemClick(item)" v-for="(item,index) in $store.state.homeTabList[$store.state.headTabClickIndexStr].list" style="width:255px;height:60px;margin-bottom:85px" :key="index">
                    <span style="vertical-align:middle">
                        <img style="width:54px;height:54px" :src="item.icon" alt="">
                        <!-- <i :classs="item.icon"></i> -->
                    </span>
                    <span>
                        {{item.name}}
                    </span>
                </div>
                <div style="width:255px"></div>
                <div style="width:255px"></div>
                <div style="width:255px"></div>
                <div style="width:255px"></div>
            </div>
            <div style="width:35%;">
                <div style="padding:15px 0 15px 105px;border:1px solid #e1e1e1;background:white;font-size:20px;color:#0A483C">公告</div>
                <div style="margin-top:19px;border:1px solid #e1e1e1;background:white;font-size:14px;color:#2E2E2E;padding:26px 50px 0px 26px">
                    <div style="width:100%;margin-bottom:30px;display:flex" :title="item.title" v-for="(item,index) in announcementData" :key="index">
                        <span class="annou_item" style="width: 65%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{item.title}}</span>
                        <span style="width: 35%;text-align:right;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;margin-left:0px">{{item.time}}</span>
                    </div>
                </div>
                
            </div>
        </div>
        <!-- 这是首页 -->
    </div>
</template>

<script>
    import Head from '@/components/Header'
    import { getNavMenu } from "./api";
    // import NavBar from '@/components/NavBar'
    export default {
        data() {
            return {
                clickHeadTabIndex:0,
                // homeTabData: [
                //     {name:'我的首页',icon:require('../../assets/indextab.png'),},
                //     {name:'工业企业',icon:require('../../assets/comtab.png'),},
                //     {name:'项目管理',icon:require('../../assets/gotab.png'),},
                //     {name:'意见信箱',icon:require('../../assets/lettertab.png'),},
                //     {name:'数据统计',icon:require('../../assets/digitaltab.png'),},
                // ],
                // homeTabData: [
                //     {key:'我的首页',icon:require('../../assets/indextab.png'),},
                //     {key:'工业企业',icon:require('../../assets/comtab.png'),},
                //     {key:'项目管理',icon:require('../../assets/gotab.png'),},
                //     {key:'意见信箱',icon:require('../../assets/lettertab.png'),},
                //     {key:'数据统计',icon:require('../../assets/digitaltab.png'),},
                // ],
                homeTabDetailData:[
                    [
                        {name:'用户意向',icon:require('../../assets/allowindex.png'),url:'1'},
                        {name:'平台用户管理',icon:require('../../assets/userindex.png'),url:'2',children:[
                            {name:'个人用户管理',icon:require('../../assets/authindex.png'),url:'8'},
                            {name:'企业用户管理',icon:require('../../assets/infoindex.png'),url:'/index/consultManage'},
                            {name:'用户充值记录',icon:require('../../assets/optionindex.png'),url:'9'},
                        ]},
                        {name:'企业需求管理',icon:require('../../assets/demandindex.png'),url:'3'},
                        {name:'科技成果管理',icon:require('../../assets/techindex.png'),url:'4'},
                        {name:'推荐专家管理',icon:require('../../assets/expertindex.png'),url:'5'},
                        {name:'人才需求管理',icon:require('../../assets/talentindex.png'),url:'6'},
                        {name:'创新活动管理',icon:require('../../assets/actiindex.png'),url:'7'},
                        {name:'权限角色管理',icon:require('../../assets/authindex.png'),url:'/index/authority',children:[
                            {name:'管理员管理',icon:require('../../assets/authindex.png'),url:'/index/authority/admin'},
                            {name:'部门管理',icon:require('../../assets/infoindex.png'),url:'/index/authority/depart'},
                            {name:'角色管理',icon:require('../../assets/infoindex.png'),url:'/index/authority/role'},
                            {name:'菜单管理',icon:require('../../assets/infoindex.png'),url:'/index/authority/menu'},
                        ]},
                        {name:'综合资讯管理',icon:require('../../assets/infoindex.png'),url:'/index/consultManage'},
                        {name:'操作日志',icon:require('../../assets/optionindex.png'),url:'9'},
                        {name:'系统配置',icon:require('../../assets/systemindex.png'),url:'10'},
                        
                    ],
                    [
                        {name:'基本信息管理',icon:require('../../assets/baseinfoindex.png'),url:'/index/consultManage'},
                        {name:'生产信息管理',icon:require('../../assets/gocontindex.png'),url:'12'},
                    ],
                    [
                        {name:'项目申报管理',icon:require('../../assets/applyindex.png'),url:'13'},
                        {name:'项目融资管理',icon:require('../../assets/financeindex.png'),url:'14'},
                    ],
                    [
                        {name:'未处理信件',icon:require('../../assets/noletterindex.png'),url:'15'},
                        {name:'已处理信件',icon:require('../../assets/letteredindex.png'),url:'16'},
                    ],
                    [
                        {name:'数据管理',icon:'el-icon-eleme',url:'17'},
                        {name:'统计管理',icon:'el-icon-eleme',url:'18'},
                    ],
                ],
                announcementData:[
                    {title:'2019年1月1日—3月24日备案项目公示',time:'2019-03-24'},
                    {title:'2019年1月1日—3月24日备案项目公示',time:'2019-03-24'},
                    {title:'2019年1月1日—3月24日备案项目公示',time:'2019-03-24'},
                    {title:'2019年1月1日—3月24日备案项目公示',time:'2019-03-24'},
                    {title:'2019年1月1日—3月24日备案项目公示',time:'2019-03-24'},
                ],
            }
        },
        components: {
            Head,
        },
        methods: {
            tabClick(item,index) {
                console.log("changeIndex");
                this.clickHeadTabIndex=index;
                this.$store.commit('changeHeadTabClickIndexStr',index);
                sessionStorage['headTabClickIndexStr']=index;
            },
            detailItemClick(item){

                console.log("this.clickHeadTabIndex",item);
                // this.$store.commit('changeMenuData',this.homeTabDetailData[this.$store.state.headTabClickIndexStr]);
                this.$store.commit('changeMenuData',this.$store.state.homeTabList[this.$store.state.headTabClickIndexStr].list);
                sessionStorage['navMenu']=JSON.stringify(this.$store.state.homeTabList[this.$store.state.headTabClickIndexStr].list);
                // sessionStorage['navMenu']=JSON.stringify(this.homeTabDetailData[this.$store.state.headTabClickIndexStr]);
                // sessionStorage['menuTitle']=item.title;
                // console.log(sessionStorage['menuTitle']);
                // console.log("sessionStorage['menuTitle']",sessionStorage['menuTitle']);
                if(item.type==0&&item.list.length>0){
                    sessionStorage['menuTitle']=item.list[0].name;
                    this.$store.commit('changeMenuTitle',item.list[0].name);
                    this.$router.push(item.list[0].url);
                }else{
                    this.$store.commit('changeMenuTitle',item.name);
                    sessionStorage['menuTitle']=item.name;
                    this.$router.push(item.url);
                }
                
            },
            detailChange(data){
                this.clickHeadTabIndex=data;
                console.log('data',data);
                // this.$router.push('/');
                
            }
        },
        created () {
            getNavMenu().then(res=>{
                console.log('resres',res);
            })
            if(this.$route&&this.$route.query&&this.$route.query.clickHeadTabIndex){
                this.clickHeadTabIndex=this.$route.query.clickHeadTabIndex
            }
            console.log(this.$route.query.clickHeadTabIndex);
        },
    }
</script>

<style lang="less">
    .home{
        height: 100%;
        overflow-x: auto;
        overflow-y:hidden;
        .head_tab{
            color:white;
            padding:13px 19px 13px 13px;
            font-size:20px;
            color:#272727;
            margin-right:76px;
        }
        .active_tab{
            background:rgba(11,80,66,1);
            box-shadow:0px 2px 7px 0px rgba(0, 0, 0, 0.47);
            border-radius:8px;
            color: white;
        }
        .annou_item:hover{
            cursor: pointer;
            color:#0A483C;
            border-bottom: 1px solid #0A483C
        }
        .home_tab_datail:hover{
            cursor: pointer;
            color:#318011;
            span+span{
                border-bottom:1px solid #318011;
            }
        }
    }
</style>