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
                <div class="home_tab_datail" @click="detailItemClick(item)" v-for="(item,index) in homeTabDetailData[$store.state.headTabClickIndexStr]" style="width:255px;height:60px;margin-bottom:85px" :key="index">
                    <span style="vertical-align:middle">
                        <img style="width:54px;height:54px" :src="item.icon" alt="">
                        <!-- <i :classs="item.icon"></i> -->
                    </span>
                    <span>
                        {{item.title}}
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
    // import NavBar from '@/components/NavBar'
    export default {
        data() {
            return {
                clickHeadTabIndex:0,
                homeTabData: [
                    {key:'我的首页',icon:require('../../assets/indextab.png'),},
                    {key:'工业企业',icon:require('../../assets/comtab.png'),},
                    {key:'项目管理',icon:require('../../assets/gotab.png'),},
                    {key:'意见信箱',icon:require('../../assets/lettertab.png'),},
                    {key:'数据统计',icon:require('../../assets/digitaltab.png'),},
                ],
                homeTabDetailData:[
                    [
                        {title:'用户意向',icon:require('../../assets/allowindex.png'),path:'1'},
                        {title:'平台用户管理',icon:require('../../assets/userindex.png'),path:'2',children:[
                            {title:'个人用户管理',icon:require('../../assets/authindex.png'),path:'8'},
                            {title:'企业用户管理',icon:require('../../assets/infoindex.png'),path:'/index/consultManage'},
                            {title:'用户充值记录',icon:require('../../assets/optionindex.png'),path:'9'},
                        ]},
                        {title:'企业需求管理',icon:require('../../assets/demandindex.png'),path:'3'},
                        {title:'科技成果管理',icon:require('../../assets/techindex.png'),path:'4'},
                        {title:'推荐专家管理',icon:require('../../assets/expertindex.png'),path:'5'},
                        {title:'人才需求管理',icon:require('../../assets/talentindex.png'),path:'6'},
                        {title:'创新活动管理',icon:require('../../assets/actiindex.png'),path:'7'},
                        {title:'权限角色管理',icon:require('../../assets/authindex.png'),path:'8'},
                        {title:'综合资讯管理',icon:require('../../assets/infoindex.png'),path:'/index/consultManage'},
                        {title:'操作日志',icon:require('../../assets/optionindex.png'),path:'9'},
                        {title:'系统配置',icon:require('../../assets/systemindex.png'),path:'10'},
                        
                    ],
                    [
                        {title:'基本信息管理',icon:require('../../assets/baseinfoindex.png'),path:'/index/consultManage'},
                        {title:'生产信息管理',icon:require('../../assets/gocontindex.png'),path:'12'},
                    ],
                    [
                        {title:'项目申报管理',icon:require('../../assets/applyindex.png'),path:'13'},
                        {title:'项目融资管理',icon:require('../../assets/financeindex.png'),path:'14'},
                    ],
                    [
                        {title:'未处理信件',icon:require('../../assets/noletterindex.png'),path:'15'},
                        {title:'已处理信件',icon:require('../../assets/letteredindex.png'),path:'16'},
                    ],
                    [
                        {title:'数据管理',icon:'el-icon-eleme',path:'17'},
                        {title:'统计管理',icon:'el-icon-eleme',path:'18'},
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
                this.clickHeadTabIndex=index;
                this.$store.commit('changeHeadTabClickIndexStr',index);
            },
            detailItemClick(item){

                console.log("this.clickHeadTabIndex",item);
                this.$store.commit('changeMenuData',this.homeTabDetailData[this.$store.state.headTabClickIndexStr]);
                sessionStorage['navMenu']=JSON.stringify(this.homeTabDetailData[this.$store.state.headTabClickIndexStr]);
                sessionStorage['menuTitle']=item.title;
                console.log(sessionStorage['menuTitle']);
                console.log("sessionStorage['menuTitle']",sessionStorage['menuTitle']);
                this.$router.push(item.path)
            },
            detailChange(data){
                this.clickHeadTabIndex=data;
                console.log('data',data);
                // this.$router.push('/');
                
            }
        },
        created () {
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