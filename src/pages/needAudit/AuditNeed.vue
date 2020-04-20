<template>
    <div style="padding:28px 35px;background:white;height:100%" class="auditNeedSelf">
        <div style="display:flex;justify-content:space-between;font-size:16px;color:#333">
            <span>需求审核</span>
            <span @click="goBack" style="cursor:pointer">
                <i class="el-icon-back"></i>
            </span>
        </div>
        <!-- 待审核 -->
        <div v-if="needDetails.state==0" style="display:flex;justify-content:space-between;height:51px;align-items:center;
            background:rgba(242,247,250,1);border:1px solid #F3F3F3;margin-top:21px;
            padding-left:20px;padding-right:17px">
            <div>
                <span>当前进度：</span>
                <span style="color: #FAA800">待审核</span>
            </div>
            <div>
                <button @click="examinePass" style="border-radius:4px;background:#2BB1E8;padding:7px;font-size:14px;color:#FFFFFF;border:none;cursor:pointer">审核通过</button>
                <button @click="dialogTurnDownVisible=true" style="border-radius:4px;background:#FFFFFF;padding:7px 21px;font-size:14px;color:#989898;border:none;cursor:pointer;margin-left:10px">驳回</button>
                <button v-show="!isEdit" @click="editDetail" style="border-radius:4px;background:#FFFFFF;padding:7px 21px;font-size:14px;color:#989898;border:none;cursor:pointer;margin-left:10px">编辑</button>
                <button v-show="isEdit" @click="saveDetail()" style="border-radius:4px;background:#FFFFFF;padding:7px 21px;font-size:14px;color:#989898;border:none;cursor:pointer;margin-left:10px">保存</button>
            </div>
        </div>
        <!-- 未通过 -->
        <div v-if="needDetails.state==2" style="background:rgba(242,247,250,1);border:1px solid #F3F3F3;margin-top:21px;padding-left:20px;padding-right:17px;padding-bottom:17px">
            <div style="display:flex;justify-content:space-between;height:51px;align-items:center;">
                <div>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;当前进度：</span>
                    <span style="color:#FD2044">未通过</span>
                </div>
<!--                <div>-->
<!--                    <button v-show="!isEdit" @click="editDetail" style="border-radius:4px;background:#FFFFFF;padding:7px 21px;font-size:14px;color:#989898;border:none;cursor:pointer;margin-left:10px">编辑</button>-->
<!--                    <button v-show="isEdit" @click="saveDetail" style="border-radius:4px;background:#FFFFFF;padding:7px 21px;font-size:14px;color:#989898;border:none;cursor:pointer;margin-left:10px">保存</button>-->
<!--                </div>-->
            </div>
            <div style="font-size:16px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(94,94,94,1);">
                <div>
                    <span>未通过原因：{{needDetails.approvalOpinion}}</span>
                </div>
                <div style="margin-top:15px">
                    <span style="padding-right:70px">&nbsp;&nbsp;&nbsp;审核人员：{{needDetails.approvalUserName}}</span>
                    <span>审核时间：{{needDetails.approvalDate}}</span>
                </div>
            </div>

        </div>

        <!-- 已通过 -->
        <div v-if="needDetails.state==1" style="background:rgba(242,247,250,1);border:1px solid #F3F3F3;margin-top:21px;padding-left:20px;padding-right:17px;padding-bottom:17px">
            <div style="display:flex;justify-content:space-between;height:51px;align-items:center;">
                <div>
                    <span>当前进度：</span>
                    <span style="color:#52c41a">发布中</span>
                </div>
                <div>
                    <button v-show="!isEdit" @click="editDetail" style="border-radius:4px;background:#FFFFFF;padding:7px 21px;font-size:14px;color:#989898;border:none;cursor:pointer;margin-left:10px">编辑</button>
                    <button v-show="isEdit" @click="saveDetail" style="border-radius:4px;background:#FFFFFF;padding:7px 21px;font-size:14px;color:#989898;border:none;cursor:pointer;margin-left:10px">保存</button>
                </div>
            </div>
            <div style="font-size:16px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(94,94,94,1);">
                <span style="padding-right:70px">审核人员：{{needDetails.approvalUserName}}</span>
                <span>审核时间：{{needDetails.approvalDate}}</span>
            </div>
        </div>
        <!-- 已下线 -->
        <div v-if="needDetails.state==3" style="background:rgba(242,247,250,1);border:1px solid #F3F3F3;margin-top:21px;padding-left:20px;padding-right:17px;padding-bottom:17px">
        <div style="display:flex;justify-content:space-between;height:51px;align-items:center;">
          <div>
            <span>当前进度：</span>
            <span style="color:#656565">已下线</span>
          </div>
<!--          <div>-->
<!--            <button v-show="!isEdit" @click="editDetail" style="border-radius:4px;background:#FFFFFF;padding:7px 21px;font-size:14px;color:#989898;border:none;cursor:pointer;margin-left:10px">编辑</button>-->
<!--            <button v-show="isEdit" @click="saveDetail" style="border-radius:4px;background:#FFFFFF;padding:7px 21px;font-size:14px;color:#989898;border:none;cursor:pointer;margin-left:10px">保存</button>-->
<!--          </div>-->
        </div>
        <div style="font-size:16px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(94,94,94,1);">
          <span style="padding-right:70px">审核人员：{{needDetails.approvalUserName}}</span>
          <span>审核时间：{{needDetails.approvalDate}}</span>
        </div>
      </div>
        <el-form ref="form" :model="form" :rules="isEdit?rules:null" style="overflow:hidden" label-width="110px">
        <!-- 需求描述 -->
        <div>
            <div style="border-bottom:1px solid #E9E9E9;padding-bottom:7px;margin-top:26px;font-size:16px;color:#333333;margin-bottom:35px">
                <span style="border-bottom:2px solid #2BB1E8;padding-bottom:4px">需求描述</span>
            </div>
               <el-col :span="24">
                 <el-col :span="10">
                   <el-form-item prop="title" label="需求名称：">
                     <el-input  :readonly="!isEdit" placeholder="请一句话描述您的需求，20字以内" v-model="form.title"></el-input>
                   </el-form-item>
                 </el-col>
               </el-col>
                <el-col :span="24">
                    <el-col :span="10">
                        <el-form-item prop="typeLabel" label="需求分类：">
                            <el-select :disabled="!isEdit"   style="width:100%" v-model="form.typeLabel" placeholder="请选择需求分类">
                                <el-option v-for="item in UserAreaData" :key="item.id" :label="item.desc" :value="item.desc"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-col>
               <el-col :span="24">
                 <el-col :span="10">
                   <el-form-item prop="technicalFieldDesc" label="技术领域：">
                     <el-select :readonly="!isEdit" multiple :multiple-limit="3"  style="width:100%" @change="handleAreaChange" v-model="form.technicalFieldDesc" placeholder="请选择技术领域，最多选择3个">
                       <el-option v-for="item in SkillAreaData" :key="item.id" :label="item.desc" :value="item.desc"></el-option>
                     </el-select>
                   </el-form-item>
                 </el-col>
               </el-col>
                <el-col :span="24">
                    <el-col :span="10" >
                        <el-form-item prop="" label="预算：" :class="isEdit?'redIcon':''">
                            <el-col :span="8" style="min-width:100px">
                                <el-input :readonly="!isEdit" placeholder="请输入预算金额" required @input="valuInputChange"  v-model="form.budget"></el-input>
                            </el-col>
                            <span style="padding-left:10px">万元</span>
                            <el-checkbox :disabled="!isEdit" style="padding-left:15px" @change="checkBoxChange" v-model="form.isCheacked" label="1">面议</el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="24">
                  <el-col :span="10" >
                    <el-form-item prop="" label="截止时间：">
                      <el-date-picker
                        :readonly="!isEdit"
                        v-model="form.endDate"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <el-col :span="10" >
                    <el-form-item prop="note" label="需求描述：">
                      <el-input type="textarea" :readonly="!isEdit"   :autosize="{ minRows: 2, maxRows: 6}" placeholder="请输入您的需求描述" v-model="form.note"></el-input>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <el-col :span="10" >
                    <el-form-item label="关键词检索：">
                      <el-col :span="10" style="min-width:378px">
                        <el-input :readonly="!isEdit" v-model="searchKeyInput" placeholder="最多5个标签"></el-input>
                      </el-col>
                      <button type="button" :disabled="!isEdit" @click="addSearchKey" style="cursor:pointer;padding:11px 10px;font-size:14px;background:rgba(252,252,252,1);border-radius:0px 2px 2px 0px;border:1px solid rgba(237,237,237,1);">
                        <i class="el-icon-plus"></i>
                      </button>
                    </el-form-item>
                    <el-form-item prop="" label="关键词：">
                      <el-tag
                        style="margin-right:10px"
                        v-for="(item,index) in form.keyWord" :key="index"
                        :closable="isEdit"
                        @close="keyDataClose(item)"
                        type="info">
                        {{item}}
                      </el-tag>
                    </el-form-item>
                  </el-col>
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
                        maxlength="50"
                        placeholder="此处请输入不通过原因(50字以内)"
                        v-model="turnDownForm.opinion">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <button @click="examineReject" style="background:rgba(251,251,251,1);border-radius:3px;padding:5px 20px;color:#828282;margin-right:30px;cursor:pointer">确定</button>
                <button @click="cancelTurnDown" style="background:linear-gradient(36deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);border-radius:3px;padding:5px 20px;color:white;cursor:pointer">取消</button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import  uploadUrl  from '@/request/uploadUrl'
    import { toolbarOptions  } from "../../util/commonData";
    import {   getProvinceAllCity , rejectProById , updateProDetail , approvalProDetail,reqNeedClass,reqTecField ,reqNeedDetails,reqExamineNeed ,reqUpdateNeed} from "./api";

    export default {
        data() {
            var validateValuation = (rule,value,callback)=>{
                // console.log("outinputtttttttttttt")
                if(this.form.valuation=='' && !this.form.negotiable){
                    callback(new Error("请输入估值或选择面议"))
                }else if(this.form.valuation==''&&this.form.negotiable){
                    // console.log("inputtttttttttttt");
                    callback()
                }else if(this.form.valuation!='' && !this.form.negotiable){

                    let reg= /^\d+(?=\.{0,1}\d+$|$)/;
                    if(reg.test(this.form.valuation)&&this.form.valuation<99999999999){
                        callback()
                    }
                    if(!reg.test(this.form.valuation)){
                        callback(new Error('请输入大于0的数字'))
                    }

                }
            };
            return {
                key: "value",
                myHeaders:{},
                baseUrl:uploadUrl.uploadUrl,//图片上传地址，方便测试
                rowId:'',
                videoFlag:false,
                videoEndFlag:false,
                cascaderProps:{
                    lazy: true,
                    lazyLoad: async (node,resolve)=>{
                        // console.log("node",node);
                        const { level } = node;
                        let data={
                            provinceId:this.form.position[0]
                        }
                        // console.log("this",this);
                        await getProvinceAllCity(data).then(res=>{
                            // console.log('resfshgfhsgh',res);
                            if(res.data.data){
                                let data=res.data.data;
                                const nodes=data.map(item => ({
                                    value: item.regionId,
                                    label: item.name,
                                    leaf: level >=1
                                }));
                                this.optionsArea[1].children=nodes;
                                resolve(nodes);
                            }
                        });
                    }
                },
                optionsArea:[],
                prinvinceData:[],
                cityData:[],
                isEdit:false,
                // isEdit:true,
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
                  title:'',
                  typeLabel:'',
                  technicalFieldDesc:[],
                  endDate:'',
                  note:'',
                  keyWord:[],
                  isCheacked:false,
                  budget:''
                },
                rules:{
                  title:[{ required: true, message: '需求名称必须输入！', trigger: 'blur' },
                         { min: 1, max: 20, message: '需求名称20字以内', trigger: 'blur' }],
                  typeLabel:[{ required: true, message: '需求分类必须选择！', trigger: 'blur' }],
                  technicalFieldDesc:[{ required: true, message: '技术领域必须选择！', trigger: 'blur' }],
                  endDate:[{ required: true, message: '截止时间必须选择！', trigger: 'blur' }],
                  note:[{ required: true, message: '需求描述必须输入！', trigger: 'blur' }],
                  keyWord:[{ required: true, message: '关键词必须输入！', trigger: 'blur' }]
                },
                negotiable:true,
                OwnershipData : ['企业', '高校', '科研院所','个人团队','其他'],
                AppealData : ['项目融资', '项目落地', '技术交易','招人才','其他'],
                dialogTurnDownVisible:false,
                searchKeyInput:'',
                searchKeyData:[],
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
                dialogImageUrl: '',
                dialogPicImageUrl:'',
                dialogVisible: false,
                dialogPicVisible:false,
                needDetails:{}
            }
        },
        methods: {
           //技术领域
           getTecField(){
             reqTecField().then(res=>{
               console.log('技术领域',res)
               if (res.data.errcode===0){
                 this.SkillAreaData = res.data.data;
                 console.log('技术领域',res.data.data)
               }
             })
           },
           //需求分类
           getNeedClass(){
             reqNeedClass().then(res=>{
               if (res.data.errcode===0){
                 this.UserAreaData = res.data.data;
                 console.log('需求分类',res.data.data)
               }
             })
           },
          handleAreaChange(){
             console.log(this.form.skillArea)
          },
            //估值输入框值改变
            valuInputChange(value){
                if (value){
                  this.form.isCheacked = false
                }
            },
            //复选框事件
            checkBoxChange(val){
               if (val){
                 this.form.budget = '';

               }
            },
            //返回上一页
            goBack(){
                this.$router.back(-1);
            },
            //驳回事件
            turnDown(){
                this.dialogTurnDownVisible=true;
            },

            //上传图片相关
            handleRemove(file, fileList) {
                // console.log(file, fileList);
                this.form.photos = fileList;
                // console.log('form.photos',this.form.photos);
            },
            //handleStartVideoRemove
            handleStartVideoRemove(file,fileList){
                this.form.startVideo=[];
            },
            handleEndVideoRemove(file,fileList){
                this.form.endVideo=[];
            },
            handlePictureCardPreview(file) {
                // console.log(file);
                this.dialogPicImageUrl = file.url;
                this.dialogPicVisible = true;
            },
            handleStartVideoPreview(file) {
                // console.log(file);
                this.dialogImageUrl = file.url;
                // console.log(this.dialogImageUrl);
                this.dialogVisible = true;
            },
            beforeAvatarUpload(file){
                // const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                // if (!isJPG) {
                //     this.$message.error('上传头像图片只能是 JPG 格式!');
                // }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                    return isLt2M;
                    // return isJPG && isLt2M;
            },
            handleAvatarSuccess(res, file , fileList) {
                // console.log(res);
                if(res.ret){
                    let obj={};
                    obj.name=res.data;
                    // obj.url='http://139.196.236.125:8088/'+res.data;
                    obj.url=this.baseUrl+res.data;

                    this.form.photos.push(obj);
                }else{
                    // this.form.photos.pop();
                    this.$message.error('上传图片失败!');
                    // console.log(fileList);
                    fileList.pop();
                    // console.log("error",this.form.photos);
                }
                // this.imageUrl = URL.createObjectURL(file.raw);
            },
            imgUploadError(err, file, fileList){//图片上传失败调用
                // console.log(err)
                this.$message.error('上传图片失败!');
            },


            handleMaterialSuccess(res, file , fileList){
                if(res.ret){
                    let obj={};
                    obj.name=res.data;
                    // obj.url='http://139.196.236.125:8088/'+res.data;
                    obj.url=this.baseUrl+res.data;

                    this.form.proveUrl.push(obj);
                }else{
                    // this.form.photos.pop();
                    this.$message.error('上传材料失败!');
                    // console.log(fileList);
                    fileList.pop();
                    // console.log("error",this.form.photos);
                }
            },




            // 上传视频相关
            beforeUploadVideo(file) {
                const isLt50M = file.size / 1024 / 1024  < 50;
                if (['video/mp4', 'video/ogg', 'video/flv','video/avi','video/wmv','video/rmvb'].indexOf(file.type) == -1) {
                    this.$message.error('请上传正确的视频格式');
                    return false;
                }
                if (!isLt50M) {
                    this.$message.error('上传视频大小不能超过50MB哦!');
                    return false;
                }
            },

            // uploadVideoProcess(event, file, fileList){
            //     this.videoFlag = true;
            //     this.videoUploadPercent = file.percentage.toFixed(0);
            // },
            handleVideoSuccess(res, file) {                               //获取上传图片地址
                this.videoFlag = false;
                // this.videoUploadPercent = 0;
                // console.log("视频上传",res);
                if( res.ret ){
                    let obj={};
                    // obj.url=`http://139.196.236.125:8088/${res.data}`;
                    obj.url=this.baseUrl+res.data;

                    obj.uid=res.data;
                    this.form.startVideo.push(obj);
                    // this.form.startVideo = res.data;
                }else{
                    this.form.startVideo=[];
                    this.$message.error('视频上传失败，请重新上传！');
                }
            },
            handleEndVideoSuccess(res, file) {                               //获取上传图片地址
                this.videoEndFlag = false;
                // this.videoUploadPercent = 0;
                // console.log("视频上传",res);
                if( res.ret ){
                    let obj={};
                    // obj.url=`http://139.196.236.125:8088/${res.data}`;
                    obj.url=this.baseUrl+res.data;
                    obj.uid=res.data;
                    this.form.endVideo.push(obj);
                }else{
                    this.form.startVideo=[];
                    this.$message.error('视频上传失败，请重新上传！');
                }
            },


            // 上传材料事件
            handleMaterialRemove(file,fileList){
                // console.log(file,fileList);
                this.form.proveUrl=fileList;
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

            //新增关键词
            addSearchKey(){
                if (this.searchKeyInput===''){
                  this.$message({
                    message: '请输入关键词检索内容!',
                    type: 'warning'
                  });
                  return
                }

                if( this.form.keyWord.length<5 && this.form.keyWord.indexOf(this.form.searchKeyInput)==-1){
                    this.form.keyWord.push(this.searchKeyInput);
                    // this.searchKeyInput='';

                }else{

                }
                this.searchKeyInput='';

            },
            //删除关键词
            keyDataClose(item){
                this.form.keyWord.splice(this.form.keyWord.indexOf(item), 1);
            },
            //点击省切换
            handleProvinceChange(val){
                // this.$set(this.optionsArea[index], 'child', res.data.data)
                // console.log("chan")
                // console.log(val);
                // console.log(this.optionsArea);
            },
            //省下拉框
            provinceChange(item){
                // console.log("changechangehjshjhsjhdsjhjsdhj",item);
                if(item){
                    this.form.city='';
                    this.cityData=[];
                    this.getAllCityData(item);
                }

            },
            //省下拉框情况
            clearProvince(){
                this.form.city='';
                this.cityData=[];
            },

            //获取省下的市
            getAllCityData(item){
                let data={
                    provinceId:item
                }
                getProvinceAllCity(data).then(res=>{
                    // console.log('resfshgfhsgh',res);
                    if(res.data.data){
                        this.cityData=res.data.data
                    }
                });
            },


            //自定义面板
            clearTemplate(){
                this.form.detail='';
            },
            saveDetail(){
                // this.form.negotiable
                this.$refs["form"].validate((valid) => {
                    if (valid) {
                      console.log(this.form)
                      let formParams = {};
                      // reqUpdateNeed()
                      let {title,typeLabel,technicalFieldDesc,isCheacked,budget,endDate,note,keyWord} = this.form;
                      let type = '';
                      this.UserAreaData.map((item,key)=>{

                        if (item.desc === typeLabel ){
                             type = Number(item.id)
                        }
                      })
                        let technicalFieldId = [];
                      technicalFieldDesc.map((item,key)=>{

                        this.SkillAreaData.map((i,k)=>{
                          if (item==i.desc){
                            console.log(i)
                            technicalFieldId.push(i.id)
                          }
                        })
                      })
                      console.log('keyWord',keyWord)
                      isCheacked?budget = -1:''
                      technicalFieldId= technicalFieldId?technicalFieldId.join(','):'';
                      keyWord= keyWord?keyWord.join(','):'';
                      technicalFieldDesc= technicalFieldDesc?technicalFieldDesc.join(','):'';
                      let id = this.$route.query.id;
                      formParams = {title ,type ,technicalFieldId ,budget ,technicalFieldDesc,endDate ,note ,keyWord ,id};
                      reqUpdateNeed(formParams).then(res=>{
                        console.log(res)
                        if (res.data.errcode===0){
                          this.$message({
                            message: res.data.data,
                            type: 'success'
                          });
                          this.isEdit = false;
                          this.getNeedDetails();
                        }else {
                          this.$message.error(res.data.data);
                        }
                      })
                      console.log('formParams',formParams)

                    }
                });
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
                        param.id=this.rowId;
                        param.opinion=this.turnDownForm.opinion;
                        rejectProById(param).then(res=>{
                            if(res.data.ret){
                                this.dialogTurnDownVisible=false;
                                this.fetch(this.rowId);
                            }else{
                                this.$message({
                                    message:'驳回失败',
                                    type:'error',
                                })
                            }
                            // console.log(res);
                        })
                        // console.log(this.turnDownForm.opinion);
                        // alert('submit!');
                    } else {
                        // console.log('error submit!!');
                        return false;
                    }
                })
            },
            cancelTurnDown(){
                this.dialogTurnDownVisible=false;
            },
            //需求详情
            getNeedDetails(){
              let id = this.$route.query.id;
              let params = {id};
              reqNeedDetails(params).then(res=>{
                console.log('xxx',res)
                if (res.data.errcode===0){
                    this.form.title = res.data.data.title;
                    this.form.typeLabel = res.data.data.typeLabel;
                   this.form.technicalFieldDesc = res.data.data.technicalFieldDesc?res.data.data.technicalFieldDesc.split(','):'';
                   this.form.endDate = res.data.data.endDate;
                   this.form.note  = res.data.data.note;
                   this.form.keyWord = res.data.data.keyWord?res.data.data.keyWord.split(','):'';


                    this.needDetails = res.data.data;

                  if (this.needDetails.budget==-1){
                    this.form.budget = '';
                    this.form.isCheacked = true;
                  }else {
                    this.form.budget = this.needDetails.budget;
                    this.form.isCheacked = false;
                  }
                }
              })
            },
           //审核通过
          examinePass(){
              if (this.isEdit){
                this.$message({
                  message: '请先保存内容!',
                  type: 'warning'
                });
                return false
              }
              let id = this.$route.query.id;
              let params = {id,state:1};
               reqExamineNeed(params).then(res=>{
                 console.log(res)
                 if (res.data.errcode==0){
                   this.$message({
                     message: res.data.data,
                     type: 'success'
                   });
                   this.getNeedDetails();
                 }
               })
          },
          //审核驳回
          examineReject(){
            let id = this.$route.query.id;
            let params = {id,state:2,remarks:this.turnDownForm.opinion};
            reqExamineNeed(params).then(res=>{
              console.log(res)
              if (res.data.errcode==0){
                this.$message({
                  message: '驳回成功!',
                  type: 'success'
                });
                this.dialogTurnDownVisible=false;
                this.getNeedDetails();
              }
            })
          }
        },
        created () {
            this.myHeaders.token=sessionStorage.token;
            this.getNeedClass();
            this.getTecField();
            this.getNeedDetails();
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
// .edit_container.news .ql-editor{
//     min-height:160px
// }
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
  .auditNeedSelf {
    .redIcon {
      .el-form-item__label:before {
        content: '*';
        color: #F56C6C;
        margin-right: 4px;
      }
    }
  }
</style>
