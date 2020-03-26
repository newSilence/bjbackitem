<template>
    <div style="padding:28px 35px;background:white;height:100%">
        <div style="text-align:right;font-size:16px;color:#333">
            <!-- <span>审核详情</span> -->
            <span @click="goBack" style="cursor:pointer">
                <i class="el-icon-back"></i>
            </span>
        </div>
        <el-form ref="form" :model="form" style="overflow:hidden" label-width="140px">
        <!-- 服务商信息 -->
        <div>
            <div style="border-bottom:1px solid #E9E9E9;padding-bottom:7px;margin-top:26px;font-size:16px;color:#333333;margin-bottom:35px">
                <span style="border-bottom:2px solid #2BB1E8;padding-bottom:4px">机构信息</span>
            </div>
                <el-col :span="24">
                    <el-col :span="12">
                        <el-form-item label="单位名称：">
                            <el-input :readonly="!isEdit" v-model="form.companyName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="12">
                        <el-form-item label="统一社会信用代码：">
                            <el-input :readonly="!isEdit" v-model="form.companyCode"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="12">
                        <el-form-item label="单位性质：">
                            <el-input :readonly="!isEdit" v-model="form.companyTypeDetail"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所在地区：">
                            <el-input :readonly="!isEdit" v-model="form.district"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="12">
                        <el-form-item label="联系邮箱：">
                            <el-input :readonly="!isEdit" v-model="form.companyEmail"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="12">
                        <el-form-item label="营业执照：">
                            <img v-if="form.businessLicense" :src="form.businessLicense" alt="营业执照">
                            <span v-else>无</span>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-form-item  label="公司介绍：" class="edit_container news">
                        <div class="ql-editor" v-html="form.companyProviders" style="min-height:60px;width:100%;border:1px solid #EDEDED;border-radius:2px"></div>
                    </el-form-item>
                </el-col>
        </div>
        <!-- 服务商申请 -->
        <!-- <div>
            <div style="border-bottom:1px solid #E9E9E9;padding-bottom:7px;margin-top:26px;font-size:16px;color:#333333;margin-bottom:35px">
                <span style="border-bottom:2px solid #2BB1E8;padding-bottom:4px">服务商申请</span>
            </div>
            <el-col :span="24">
                <el-form-item  label="申请描述：" class="edit_container news">
                    <div class="ql-editor" v-html="form.applicationDescription" style="min-height:60px;width:100%;border:1px solid #EDEDED;border-radius:2px"></div>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item  label="主营业务介绍：" class="edit_container news">
                    <div class="ql-editor" v-html="form.description" style="min-height:60px;width:100%;border:1px solid #EDEDED;border-radius:2px"></div>
                </el-form-item>
            </el-col>
        </div> -->
        </el-form>
    </div>
</template>

<script>
    import  uploadUrl  from '@/request/uploadUrl'
    // import { getAllProvince , getProvinceAllCity , getListSkillArea , getListUserArea , getListProcessType , getListFruitType , getAllFinancingType , getProDetailById , rejectProById , updateProDetail , approvalProDetail } from "./api";
    import { getMemAccountSelectAuthenticationData , getMemAccountDetailData  } from "./api";
    export default {
        data() {
            return {
                key: "value",
                myHeaders:{},
                baseUrl:uploadUrl.uploadUrl,//图片上传地址，方便测试
                rowId:'',
                videoFlag:false,
                videoEndFlag:false,
                optionsArea:[],
                prinvinceData:[],
                cityData:[],
                isEdit:false,
                SkillAreaData:[],
                UserAreaData:[],
                ProcessTypeData:[],
                FruitTypeData:[],
                FinancingTypeData:[],
                turnDownForm:{
                    opinion:'',
                },
                // optionsArea:provinceAndCityData,
                form:{
                    auditStatus:'',
                    auditTime:'',
                    auditUser:'',
                    auditOpinion:'',
                    companyName:'',
                    companyCode:'',//统一社会信用代码
                    companyTypeDetail:'',
                    district:'',//地址
                    companyEmail:'',
                    businessLicense:'',
                    companyProviders:'',
                    applicationDescription:'',
                    description:'',
                },
                dialogTurnDownVisible:false,
            }
        },
        methods: {
            //返回上一页
            goBack(){
                this.$router.back(-1);
            },
            //查询数据
            fetch(routerObj){
                // let param={};
                let { id , type } = routerObj;
                if(!id || !type){
                    this.$message({
                        message:'参数传递有误',
                        type:'warning',
                        showClose:true,
                    })
                    return false;
                }
                getMemAccountSelectAuthenticationData({id , type}).then(res=>{
                    if(res.data.ret){
                        let resData=res.data.data;
                        for(let key in this.form){
                            if(resData.hasOwnProperty(key)){
                                this.form[key] = resData[key];
                            }
                        }
                        this.form.district=resData.provinceName?(resData.provinceName+'/'+resData.cityName):'';
                        this.form.companyTypeDetail=resData.companyType==1?'私企'
                                                    :resData.companyType==2?'国企'
                                                    :resData.companyType==3?'混合'
                                                    :resData.companyType==4?'外资':''
                    }
                    // console.log('reslinkUserId',res.data.data);
                })
            },
        },
        created () {
            // console.log("myHeaders",sessionStorage.token);
            this.myHeaders.token=sessionStorage.token;
            this.fetch(this.$route.query);
            // this.rowId=this.$route.query.id;

            // console.log("this.$route.query.id",this.$route.query.id)
        },
    }
</script>

<style lang="less">
.select_class_full{
    display:flex;
    margin-right:0px!important;
    .el-select{
        width:100%;
    }
    .el-form-item__content{
        width:100%
    }
}
.edit_container.news .ql-editor{
    min-height:160px
}
.turn_down_dialog .el-dialog__header{
    text-align: center;
    background: rgba(243,247,250,1);
    height: 44px;
}
.turn_down_dialog .el-dialog__headerbtn{
    top:15px;
}
.turn_down_dialog .el-dialog__title{
    line-height: 8px;
}
.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: '14px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
    content: '10px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
    content: '18px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
    content: '32px';
}
.disabled .el-upload.el-upload--picture-card {

display: none;

}
</style>