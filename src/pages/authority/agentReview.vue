<template>
  <div class="agent-review-self" style="padding:28px 47px;background:white;height:100%">
    <div style="font-size:16px;color:#333;text-align: right;box-sizing: border-box;padding-right: 21px">
          <div>
                <span  v-if="userDetailsData.state==1" @click="turnDownCard" style="padding:6px 10px;color:#2BB1E8;border:1px solid rgba(43,177,232,1);border-radius:4px;font-size:14px">撤回身份</span>
                <span v-if="userDetailsData.state==1" style="display:inline-block;width:10px"></span>
                <span @click="goBack" style="cursor:pointer">
                    <i class="el-icon-back"></i>
                </span>
            </div>
      <!-- <span @click="goBack" style="cursor:pointer">
                <i class="el-icon-back"></i>
            </span> -->
    </div>
    <!-- 待审核 -->
    <div v-if="userDetailsData.state==0" class="beAudit" style="display:flex;justify-content:space-between;height:51px;align-items:center;
            margin-top:21px;
            padding-left:20px;padding-right:17px">
      <div >
        <i class="el-icon-warning"></i>
        <span style="font-size:16px;font-weight:600;
color:#FAA800;">待审核</span>
      </div>
      <div>
        <button @click="saveDetail(1)" style="border-radius:4px;background:#2BB1E8;padding:7px;font-size:14px;color:#FFFFFF;border:none;cursor:pointer">审核通过</button>
        <button @click="turnDown" style="border-radius:4px;background:#FFFFFF;padding:7px 21px;font-size:14px;color:#989898;border:none;cursor:pointer;margin-left:10px">驳回</button>
      </div>
    </div>
    <!-- 未通过 -->
    <div v-if="userDetailsData.state==2" style="background:rgba(242,247,250,1);border:1px solid #F3F3F3;margin-top:21px;padding-left:20px;padding-right:17px;padding-bottom:17px">
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
          <span>未通过原因：{{userDetailsData.approvalOpinion}}</span>
        </div>
        <div style="margin-top:15px">
          <span style="padding-right:70px">&nbsp;&nbsp;&nbsp;审核人员：{{userDetailsData.approvalUserName}}</span>
          <span>审核时间：{{userDetailsData.approvalDate}}</span>
        </div>
      </div>

    </div>

    <!-- 已通过 -->
    <div v-if="userDetailsData.state==1" style="background:rgba(242,247,250,1);border:1px solid #F3F3F3;margin-top:21px;padding-left:20px;padding-right:17px;padding-bottom:17px">
      <div style="display:flex;justify-content:space-between;height:51px;align-items:center;">
        <div>
          <span>当前进度：</span>
          <span style="color:#52c41a">已通过</span>
        </div>
        <div>
        </div>
      </div>
      <div style="font-size:16px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(94,94,94,1);">
        <span style="padding-right:70px">审核人员：{{userDetailsData.approvalUserName}}</span>
        <span>审核时间：{{userDetailsData.approvalDate}}</span>
      </div>
    </div>
    <!-- 已撤回 -->
    <div v-if="userDetailsData.state==3" style="background:rgba(242,247,250,1);border:1px solid #F3F3F3;margin-top:21px;padding-left:20px;padding-right:17px;padding-bottom:17px">
      <div style="display:flex;justify-content:space-between;height:51px;align-items:center;">
        <div>
          <span>当前进度：</span>
          <span style="color:#F3A157">已撤回</span>
        </div>
        <div>
        </div>
      </div>
      <div style="font-size:16px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(94,94,94,1);">
        <span style="padding-right:70px">审核人员：{{userDetailsData.approvalUserName}}</span>
        <span>审核时间：{{userDetailsData.approvalDate}}</span>
      </div>
    </div>

    <el-form ref="form" :model="form" v-if="userDetailsData" style="overflow:hidden" label-width="160px">
      <!-- 个人信息 -->
      <div v-if="userDetailsData.userInfoCompany.type==1">
        <div style="padding-bottom:7px;margin-top:26px;font-size:16px;color:#333333;margin-bottom:35px;padding-left: 17px">
          <span class="active" style="padding-bottom:4px">个人信息</span>
        </div>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item label="姓名：" required>
              <el-input size="small" disabled="disabled" :readonly="!isEdit" v-model="userDetailsData.userInfoCompany.realName"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item label="性别：" >
              <el-radio v-model="radio" label="1">{{userDetailsData.sexLabel}}</el-radio>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item label="邮箱：" required>
              <el-input size="small" disabled="disabled" :readonly="!isEdit" v-model="userDetailsData.userInfoCompany.email"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item label="出生年月：" required>
              <el-input size="small" disabled="disabled" :readonly="!isEdit" v-model="userDetailsData.userInfoCompany.birthdate"></el-input>
            </el-form-item>
          </el-col>

        </el-col>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item label="城市：" required>
              <el-input size="small" disabled="disabled" :readonly="!isEdit" v-model="userDetailsData.newCityName"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item label="工作单位：" required>
              <el-input size="small" disabled="disabled" :readonly="!isEdit" v-model="userDetailsData.userInfoCompany.workUnit"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
      </div>
      <!-- 机构信息 -->
      <div v-if="userDetailsData.userInfoCompany.type==2">
        <div style="padding-bottom:7px;margin-top:26px;font-size:16px;color:#333333;margin-bottom:35px;padding-left: 17px">
          <span class="active" style="padding-bottom:4px">机构信息</span>
        </div>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item label="单位名称：">
              <el-input required size="small" disabled="disabled" :readonly="!isEdit" v-model="userDetailsData.userInfoCompany.companyName"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item label="统一社会信用代码：" required>
              <el-input size="small" disabled="disabled" :readonly="!isEdit" v-model="userDetailsData.userInfoCompany.companyCode"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item label="单位性质：" required>
              <el-input size="small" disabled="disabled" :readonly="!isEdit" v-model="userDetailsData.userInfoCompany.companyTypeLabel"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item label="所在地区：" required>
              <el-input size="small" disabled="disabled" :readonly="!isEdit" v-model="userDetailsData.newCityName"></el-input>
            </el-form-item>
          </el-col>

        </el-col>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item label="联系邮箱：" required>
              <el-input size="small" disabled="disabled" :readonly="!isEdit" v-model="userDetailsData.userInfoCompany.companyEmail"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item label="营业执照：" required>
              <img style="width:170px" v-if="userDetailsData.userInfoCompany.businessLicense" :src="userDetailsData.userInfoCompany.businessLicense" alt="营业执照">
              <span v-else>无</span>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item label="公司简介：" required>
              <el-input size="small" disabled="disabled" :readonly="!isEdit"   type="textarea" :rows="6" v-model="userDetailsData.userInfoCompany.companyProviders"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
      </div>
      <!-- 专家信息 -->
      <div >
        <div style="padding-bottom:7px;margin-top:26px;font-size:16px;color:#333333;margin-bottom:35px;padding-left: 17px">
          <span class="active" style="padding-bottom:4px;display: inline-block;margin-top: 29px">经纪人信息</span>
        </div>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item label="关注行业：" required>
              <el-tag type="info" style="margin-right: 10px" v-for="(item,key) in userDetailsData.researchAreaLabel" :key="key">{{item}}</el-tag>
            </el-form-item>
          </el-col>

        </el-col>
        <el-col :span="24">
        <el-col :span="12">
          <el-form-item label="技术领域：" required>
            <el-tag type="info" style="margin-right: 10px" v-for="(item,key) in userDetailsData.skillAreaLabel" :key="key">{{item}}</el-tag>
          </el-form-item>
        </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item prop="phoneNumber" label="上传形象照：" required>
              <img style="width:125px" v-if="userDetailsData.imagePhoto" :src="userDetailsData.imagePhoto" alt="形象照">
              <span v-else>无</span>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item prop="phoneNumber" label="实名认证：" required>
              <img style="width:200px" v-if="userDetailsData.autPhotoFront" :src="userDetailsData.autPhotoFront" alt="认证照正面">
              <img style="width:200px" v-if="userDetailsData.autPhotoBack" :src="userDetailsData.autPhotoBack" alt="认证照反面">
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-form-item  label="申请描述：" class="angency_review" required>
            <div class="ql-editor" v-html="userDetailsData.applyNote" style="min-height:60px;width:100%;border:1px solid #EDEDED;border-radius:2px"></div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item  label="是否官网公开：" class="angency_review">
               <el-radio v-model="showPublicRadio" label="1">{{userDetailsData.showPublic==1?'是':'否'}}</el-radio>
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
        <el-form-item label="不通过原因：" prop="opinion" label-width="160px">
          <el-input
            type="textarea"
            :rows="7"
            placeholder="此处为不通过原因"
            v-model="turnDownForm.opinion">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <button @click="confirmTurnDown" style="background:linear-gradient(36deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);
border-radius:3px;color:rgba(255,255,255,1);padding:5px 20px;margin-right:30px;cursor:pointer;border: none;height: 29px;">确定</button>
                <button @click="cancelTurnDown" style="background:rgba(251,251,251,1);
border-radius:3px;
border:1px solid rgba(219,219,219,1);padding:5px 20px;color:#828282;cursor:pointer">取消</button>
            </span>
    </el-dialog>


    <el-dialog
        title="撤销身份"
        center
        class="turn_down_card_dialog"
        :visible.sync="dialogTurnCardVisible"
        width="330px">
        <div style="display:flex;">
            <div style="flex-shrink:0;border-radius:50%;width:22px;height:22px;background:#FF4D4F;color:white;text-align:center;line-height:22px;font-weight:600;font-size:15px;margin-right:9px;margin-top:2px">
                <span>!</span>
            </div>
            <div style="font-size:14px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(51,51,51,1);line-height:20px;">
                身份一旦撤销，用户认证的信息都会清除，不可恢复，确定要撤销吗？
            </div>
        </div>
        <div style="padding:11px 0px 16px 15px;background:#F3F7FF;font-size:14px;color:#858585;margin-top:38px;">
            <div style="margin-bottom:10px">温馨提示：</div>
            <div style="">撤销前，可将数据保存到本地</div>
        </div>
        <div style="margin-top:26px;margin-bottom:20px;border-bottom:1px solid #F5F5F5"></div>
        <span slot="footer" class="dialog-footer">
            <button @click="cancelTurnOff"  style="background:rgba(251,251,251,1);border-radius:3px;padding:5px 20px;color:#828282;margin-right:30px;cursor:pointer">取消</button>
            <button @click="confirmTurnOff" style="background:linear-gradient(36deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);border-radius:3px;padding:5px 20px;color:white;cursor:pointer">确定</button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import  uploadUrl  from '@/request/uploadUrl'
  import { toolbarOptions , proTemplate } from "../../util/commonData";
  import {  getMemAccountDetailData , accountReviewInter , rejectProById } from "./api";
  export default {
    data() {
      return {
        dialogTurnCardVisible:false,
        showPublicRadio:'1',
        radio:'1',
        userDetailsData:'',
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
      //确认撤销身份
            confirmTurnOff(){
                let param={};
                param={...this.transferQuery};
                param.linkId=this.linkId;
                console.log(param);
                // return
                turnOffCard(param).then(res=>{
                    console.log("撤回身份",res);
                    if(res.data.ret){
                        this.$message({
                            message:res.data.data,
                            type:'success',
                            showClose:true
                        })
                        this.fetch(this.transferQuery);
                        this.dialogTurnCardVisible=false;
                    }else{
                        this.$message({
                            message:'网络问题',
                            type:'error',
                            showClose:true
                        })
                    }
                })
            },
            //取消撤销身份
            cancelTurnOff(){
                this.dialogTurnCardVisible=false;
            },
            //撤销身份
            turnDownCard(){
                this.dialogTurnCardVisible=true
            },
      //自定义下载
      batchDownload(){
        let batchArr=this.form.titleCertificate.split(',');
        for (let i = 0; i < batchArr.length; i++) {
          this.downloadMaterial(batchArr[i]);
        }
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
        // console.log(this.transferQuery);
        let param={};
        param={...this.transferQuery};
        param.linkId=this.linkId;
        // console.log(param);
        // return
        accountReviewInter(param).then(res=>{
          // console.log('resresres',res);
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
            this.userDetailsData = res.data.data;
            this.userDetailsData.researchAreaLabel =   this.userDetailsData.researchAreaLabel?this.userDetailsData.researchAreaLabel.split(','):'';
            this.userDetailsData.newCityName = this.userDetailsData.userInfoCompany.provinceName +'/' + this.userDetailsData.userInfoCompany.cityName;
            this.userDetailsData.sexLabel = this.userDetailsData.userInfoCompany.sex === 0 ? '女':'男';
            this.linkId = this.userDetailsData.userInfoId;
            console.log(res.data.data)
          }
        })
      },
    },
    created () {
      this.transferQuery=this.$route.query;
      this.myHeaders.token=sessionStorage.token;

      this.fetch(this.$route.query);
    },
  }
</script>

<style  lang="less">
  .agent-review-self{
    .el-form-item {
      margin-bottom: 11px;
    }
    .el-radio__input.is-checked+.el-radio__label {
      color: #333333;
    }
    .el-input.is-disabled .el-input__inner{
      background:rgba(252,252,252,1);
      border:1px solid rgba(217,217,217,1);
      color: #333333;
    }
    .dialog {
      box-shadow:0px 2px 21px 0px rgba(0,0,0,0.16);
      border-radius:3px;
    }
    .turn_down_card_dialog .el-dialog__title{
        color:white!important
    }
.turn_down_card_dialog .el-dialog__header{
    text-align: center;
    background:linear-gradient(36deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);
    // height: 44px;
    // line-height: 44px;
    color:white;
}
.turn_down_card_dialog .el-dialog__body{
    padding:41px 21px 0px 21px
}
    .el-dialog__header {
      background:rgba(243,247,250,1);
      padding: 16px 20px 10px;
      .el-dialog__title {
        font-size:22px;
        font-weight:500;
        color:rgba(51,51,51,1);
      }
      .el-dialog__close {
        font-size: 22px;
        color: #949494;
      }
      .el-dialog__headerbtn {
        top: 12px!important;
      }
    }
    .active {
      position: relative;
    }
    .active:before {
      content: '';
      display: block;
      position: absolute;
      width:3px;
      height:16px;
      background:rgba(50,119,250,1);
      left: -14px;
      top: 41%;
      transform: translateY(-50%);
    }
    .el-icon-back {
      font-size: 25px;
    }
    .el-icon-warning {
      font-size: 22px;
      color: #FAA800;
      vertical-align: middle;
      display: inline-block;
      margin-right: 6px;
      margin-bottom: 3px;
    }
    .beAudit {
      background:rgba(255,251,230,1);
      border-radius:4px;
      border:1px solid rgba(255,230,148,1);
      line-height: 51px;
    }
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
  }
</style>
