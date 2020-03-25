<template>
    <div style="padding:28px 35px;background:white;height:100%">
        <div style="text-align:right">
            <span @click="goBack" style="cursor:pointer">
                <i class="el-icon-back"></i>
            </span>
        </div>
        <el-form ref="form" :model="form" style="overflow:hidden" label-width="110px">
        <div>
            <div style="border-bottom:1px solid #E9E9E9;padding-bottom:7px;margin-top:26px;font-size:16px;color:#333333;margin-bottom:35px">
                <span style="border-bottom:2px solid #2BB1E8;padding-bottom:4px">基本信息</span>
            </div>
                <el-col :span="24">
                    <el-col :span="12">
                        <el-form-item label="姓名：">
                            <el-input :readonly="!isEdit" v-model="form.realName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="性别：">
                            <el-radio v-if="form.sex===0" v-model="form.sex" :label="0">男</el-radio>
                            <el-radio v-else-if="form.sex===1" v-model="form.sex" :label="1">女</el-radio>
                            <span v-else>未填</span>
                            <!-- <el-input :readonly="!isEdit" v-model="form.contactName"></el-input> -->
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="12">
                        <el-form-item label="出生日期：">
                            <el-input :readonly="!isEdit" v-model="form.birthdate"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="12">
                        <el-form-item label="联系邮箱：">
                            <el-input :readonly="!isEdit" v-model="form.email"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="12">
                        <el-form-item label="所在单位：">
                            <el-input :readonly="!isEdit" v-model="form.workUnit"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所在地区：">
                            <el-input :readonly="!isEdit" v-model="form.district"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
        </div>
        </el-form>
    </div>
</template>

<script>
    import  uploadUrl  from '@/request/uploadUrl'
    import { getMemAccountSelectAuthenticationData } from "./api";
    export default {
        data() {
            return {
                key: "value",
                transferQuery:{},
                linkId:'',
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
                turnDownFormRules:{
                    opinion : [
                        { required: true, message: '驳回原因必须输入！', trigger: 'blur' },
                        { min: 1, max: 200, message: '项目名称200字以内', trigger: 'blur' }
                    ],
                },
                // optionsArea:provinceAndCityData,
                form:{
                    auditStatus:'',
                    auditTime:'',
                    auditUser:'',
                    auditOpinion:'',
                    realName:'',
                    sex:'',
                    birthdate:'',
                    email:'',
                    workUnit:'',
                    district:'',
                    researchArea:'',
                    research:'',
                    jobTitle:'',
                    topTitle:'',
                    getTime:'',
                    titleCertificate:'',
                    expertLink:'',
                    showPublic:'',
                    fullName:'',
                    headPortrait:'',
                    individual:'',
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
                getMemAccountSelectAuthenticationData({id,type}).then(res=>{
                    if(res.data.ret){
                        let resData=res.data.data;
                        for(let key in this.form){
                            if(resData.hasOwnProperty(key)){
                                this.form[key] = resData[key];
                            }
                        }
                        this.form.district=resData.provinceName?(resData.provinceName+'/'+resData.cityName):'';
                        this.linkId = resData.userId;
                    }
                })
            },
        },
        created () {
            this.transferQuery=this.$route.query;
            // console.log(this.$route.query);
            // return
            this.myHeaders.token=sessionStorage.token;
            this.fetch(this.$route.query);
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
.angency_review .ql-editor{
    min-height:60px
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