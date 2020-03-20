<template>
    <div style="padding:28px 35px;background:white;height:100%">
        <div style="display:flex;justify-content:space-between;font-size:16px;color:#333">
            <span>审核详情</span>
            <span @click="goBack" style="cursor:pointer">
                <i class="el-icon-back"></i>
            </span>
        </div>
        <!-- 待审核 -->
        <div v-if="form.auditStatus==0" style="display:flex;justify-content:space-between;height:51px;align-items:center;
            background:rgba(242,247,250,1);border:1px solid #F3F3F3;margin-top:21px;
            padding-left:20px;padding-right:17px">
            <div>
                <span>当前进度：</span>
                <span>待审核</span>
            </div>
            <div>
                <button @click="saveDetail(1)" style="border-radius:4px;background:#2BB1E8;padding:7px;font-size:14px;color:#FFFFFF;border:none;cursor:pointer">审核通过</button>
                <button @click="turnDown" style="border-radius:4px;background:#FFFFFF;padding:7px 21px;font-size:14px;color:#989898;border:none;cursor:pointer;margin-left:10px">驳回</button>
            </div>
        </div>
        <!-- 未通过 -->
        <div v-if="form.auditStatus==2" style="background:rgba(242,247,250,1);border:1px solid #F3F3F3;margin-top:21px;padding-left:20px;padding-right:17px;padding-bottom:17px">
            <div style="display:flex;justify-content:space-between;height:51px;align-items:center;">
                <div>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;当前进度：</span>
                    <span style="color:#FD2044">未通过</span>
                </div>
                <div>
                </div>
            </div>
            <div style="font-size:16px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(94,94,94,1);">
                <div>
                    <span>未通过原因：{{form.auditOpinion}}</span>
                </div>
                <div style="margin-top:15px">
                    <span style="padding-right:70px">&nbsp;&nbsp;&nbsp;审核人员：{{form.auditUser}}</span>
                    <span>审核时间：{{form.auditTime}}</span>
                </div>
            </div>
            
        </div>
        
        <!-- 已通过 -->
        <div v-if="form.auditStatus==1" style="background:rgba(242,247,250,1);border:1px solid #F3F3F3;margin-top:21px;padding-left:20px;padding-right:17px;padding-bottom:17px">
            <div style="display:flex;justify-content:space-between;height:51px;align-items:center;">
                <div>
                    <span>当前进度：</span>
                    <span style="color:#F3A157">已通过</span>
                </div>
                <div>
                </div>
            </div>
            <div style="font-size:16px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(94,94,94,1);">
                <span style="padding-right:70px">审核人员：{{form.auditUser}}</span>
                <span>审核时间：{{form.auditTime}}</span>
            </div>
        </div>
        
        <el-form ref="form" :model="form" style="overflow:hidden" label-width="110px">
        <!-- 专家审核 -->
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
        <!-- 专家信息 -->
        <div>
            <div style="border-bottom:1px solid #E9E9E9;padding-bottom:7px;margin-top:26px;font-size:16px;color:#333333;margin-bottom:35px">
                <span style="border-bottom:2px solid #2BB1E8;padding-bottom:4px">专家信息</span>
            </div>
                <el-col :span="24">
                    <el-col :span="12">
                        <el-form-item label="研究领域：">
                            <el-input :readonly="!isEdit" v-model="form.researchArea"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="研究方向：">
                            <el-input :readonly="!isEdit" v-model="form.research"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="12">
                        <el-form-item label="职务头衔：">
                            <el-input :readonly="!isEdit" v-model="form.jobTitle"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="最高职称：">
                            <el-input :readonly="!isEdit" v-model="form.topTitle"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="12">
                        <el-form-item label="取得时间：">
                            <el-input :readonly="!isEdit" v-model="form.getTime"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label-width="30px">
                                <span @click="batchDownload" style="color:#2BB1E8 ; cursor:pointer"><i class="el-icon-download"></i>职称审核材料</span>
                                <!-- <a style="text-decoration:none;color:#2BB1E8 ; cursor:pointer" :href="form.titleCertificate" :download="form.titleCertificate">
                                    <i class="el-icon-download"></i>
                                    职称审核材料
                                </a> -->
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="12">
                        <el-form-item label="百科人物：">
                            <el-input :readonly="!isEdit" v-model="form.expertLink"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="12">
                        <el-form-item label="是否官网公开：">
                            <el-radio v-show="form.showPublic===1" v-model="form.showPublic" :label="1">否</el-radio>
                            <el-radio v-show="form.showPublic===0" v-model="form.showPublic" :label="0">是</el-radio>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否展示全名：">
                            <el-radio v-show="form.fullName===0" v-model="form.fullName" :label="0">是</el-radio>
                            <el-radio v-show="form.fullName===1" v-model="form.fullName" :label="1">否</el-radio>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="12">
                        <el-form-item prop="phoneNumber" label="宣传照：">
                            <img v-if="form.headPortrait" :src="form.headPortrait" alt="宣传照">
                            <span v-else>无</span>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-form-item  label="个人简介：" class="angency_review">
                        <div class="ql-editor" v-html="form.individual" style="min-height:60px;width:100%;border:1px solid #EDEDED;border-radius:2px"></div>
                    </el-form-item>
                </el-col>
            </div>
        </el-form>
        <el-dialog
            title="提示"
            center
            @open="openTurnDown"
            class="turn_down_dialog"
            :visible.sync="dialogTurnDownVisible"
            width="30%">
            <el-form ref="turn_down_form" :model="turnDownForm" :rules="turnDownFormRules">
                <el-form-item label="不通过原因：" prop="opinion" label-width="120px">
                    <el-input
                        type="textarea"
                        :rows="7"
                        placeholder="此处为不通过原因"
                        v-model="turnDownForm.opinion">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <button @click="confirmTurnDown" style="background:rgba(251,251,251,1);border-radius:3px;padding:5px 20px;color:#828282;margin-right:30px;cursor:pointer">确定</button>
                <button @click="cancelTurnDown" style="background:linear-gradient(36deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);border-radius:3px;padding:5px 20px;color:white;cursor:pointer">取消</button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import  uploadUrl  from '@/request/uploadUrl'
    import { toolbarOptions , proTemplate } from "../../util/commonData";
    // import { getMemAccountSelectAuthenticationData , getMemAccountDetailData , getListSkillArea , getListUserArea , getListProcessType , getListFruitType , getAllFinancingType  , rejectProById , updateProDetail , approvalProDetail } from "./api";
    import { getMemAccountSelectAuthenticationData , getMemAccountDetailData , accountReviewInter , rejectProById } from "./api";
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
                editorOption: {
                    placeholder: '',
                    theme: 'snow',  // or 'bubble'
                    modules: {
                    toolbar: {
                        container: toolbarOptions,  // 工具栏
                        handlers: {
                        'image': function (value) {
                        if (value) {
                            // 触发input框选择图片文件
                            document.querySelector('.quill-img input').click()
                        } else {
                            this.quill.format('image', false);
                        }
                        }
                        }
                    }
                    }
                },
            }
        },
        methods: {
            //自定义下载
            batchDownload(){
                // console.log(this.form.titleCertificate);
                let batchArr=this.form.titleCertificate.split(',');
                for (let i = 0; i < batchArr.length; i++) {
                    this.downloadMaterial(batchArr[i]);
                }
                console.log(batchArr);
            },
            downloadMaterial(href){
                var a = document.createElement("a"), //创建a标签
                e = document.createEvent("MouseEvents"); //创建鼠标事件对象
                e.initEvent("click", false, false); //初始化事件对象
                a.href = href; //设置下载地址
                a.download = href; //设置下载文件名
                a.dispatchEvent(e); //给指定的元素，执行事件click事件
            },
            //返回上一页
            goBack(){
                this.$router.back(-1);
            },
            //驳回事件
            turnDown(){
                this.dialogTurnDownVisible=true;
            },
            //富文本编辑器图片上传
            quillImgSuccess(res, file) { // 富文本编辑框图片上传
                // console.log(URL.createObjectURL(file.raw));
                // this.form.icon = URL.createObjectURL(file.raw);
                // res为图片服务器返回的数据
                // 获取富文本组件实例
                let quill = this.$refs.myQuillEditor.quill;
                // console.log(res);
                // 如果上传成功
                if (res.code == '0') {
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片  res.data为服务器返回的图片地址
                    quill.insertEmbed(length, 'image', this.baseUrl+res.data)
                    // 调整光标到最后
                    quill.setSelection(length + 1)
                } else {
                    this.$message.error('图片插入失败')
                }
            },
            //获取技术领域
            getAllSelectData(){
                getListSkillArea().then(res=>{
                    // console.log("getListSkillArea()",res);
                    if(res.data.ret){
                        this.SkillAreaData=res.data.data;
                    }
                })
                getListUserArea().then(res=>{
                    if(res.data.ret){
                        this.UserAreaData=res.data.data;
                    }
                    // console.log("getListUserArea()",res);
                })
                getListProcessType().then(res=>{
                    if(res.data.ret){
                        this.ProcessTypeData=res.data.data;
                    }
                    // console.log("getListProcessType()",res);
                })
                getListFruitType().then(res=>{
                    if(res.data.ret){
                        this.FruitTypeData=res.data.data;
                    }
                    // console.log("getListFruitType()",res);
                })
                getAllFinancingType().then(res=>{
                    if(res.data.ret){
                        this.FinancingTypeData=res.data.data;
                    }
                    // console.log("getAllFinancingType()",res);
                })
            },
            //获取面板
            getTemplate(){
                this.form.detail=proTemplate;
            },
            //自定义面板
            clearTemplate(){
                this.form.detail='';
            },
            //保存或者审核，根据flag判断，1代表审核，2代表保存
            saveDetail(flag){
                console.log(this.transferQuery);
                let param={};
                param={...this.transferQuery};
                param.linkId=this.linkId;
                // console.log(param);
                // return
                accountReviewInter(param).then(res=>{
                    console.log('resresres',res);
                    if(res.data.ret){
                        this.$message({
                            message:res.data.data,
                            type:'success',
                            showClose:true
                        })
                        this.fetch(this.transferQuery);
                    }else{
                        this.$message({
                            message:'网络问题',
                            type:'error',
                            showClose:true
                        })
                    }
                })
                // accountReviewInter
            },
            //编辑
            editDetail(){
                this.isEdit=true;
            },
            openTurnDown(){
                this.turnDownForm.opinion='';
            },
            //确认驳回
            confirmTurnDown(){
                this.$refs["turn_down_form"].validate((valid) => {
                    if (valid) {
                        let param={};
                        param.approvalType=this.transferQuery.approvalType;
                        param.id=this.transferQuery.id;
                        param.auditOpinion=this.turnDownForm.opinion;
                        rejectProById(param).then(res=>{
                            if(res.data.ret){
                                this.dialogTurnDownVisible=false;
                                this.fetch(this.transferQuery);
                            }else{
                                this.$message({
                                    message:'驳回失败',
                                    type:'error',
                                })
                            }
                        })
                    } else {
                        return false;
                    }
                })
            },
            cancelTurnDown(){
                this.dialogTurnDownVisible=false;
            },
            //查询数据
            fetch(routerObj){
                // let param={};
                let { id , approvalType } = routerObj;
                if(!id || !approvalType){
                    this.$message({
                        message:'参数传递有误',
                        type:'warning',
                        showClose:true,
                    })
                    return false;
                }
                getMemAccountDetailData({id,approvalType}).then(res=>{
                    if(res.data.ret){
                        let resData=res.data.data;
                        for(let key in this.form){
                            if(resData.hasOwnProperty(key)){
                                this.form[key] = resData[key];
                            }
                        }
                        this.form.district=resData.provinceName+'/'+resData.cityName;
                        this.linkId = resData.userId;
                    }
                    console.log('reslinkUserId',res.data.data);
                })
                // getMemAccountSelectAuthenticationData({ id , type }).then(res=>{
                //     console.log('getMemAccountSelectAuthenticationData',res);
                //     if(res.data.ret){
                //         let resData=res.data.data;
                //         for(let key in this.form){
                //             if(resData.hasOwnProperty(key)){
                //                 this.form[key] = resData[key];
                //             }
                //         }
                //     }
                // })
            },
        },
        created () {
            console.log(this.$route.query);
            this.transferQuery=this.$route.query;
            // this.getAllSelectData();
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