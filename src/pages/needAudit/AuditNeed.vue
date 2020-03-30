<template>
    <div style="padding:28px 35px;background:white;height:100%">
        <div style="display:flex;justify-content:space-between;font-size:16px;color:#333">
            <span>需求审核</span>
            <span @click="goBack" style="cursor:pointer">
                <i class="el-icon-back"></i>
            </span>
        </div>
        <!-- 待审核 -->
        <div v-if="form.approvalState==0" style="display:flex;justify-content:space-between;height:51px;align-items:center;
            background:rgba(242,247,250,1);border:1px solid #F3F3F3;margin-top:21px;
            padding-left:20px;padding-right:17px">
            <div>
                <span>当前进度：</span>
                <span>待审核</span>
            </div>
            <div>
                <button @click="saveDetail(1)" style="border-radius:4px;background:#2BB1E8;padding:7px;font-size:14px;color:#FFFFFF;border:none;cursor:pointer">审核通过</button>
                <button @click="turnDown" style="border-radius:4px;background:#FFFFFF;padding:7px 21px;font-size:14px;color:#989898;border:none;cursor:pointer;margin-left:10px">驳回</button>
                <button v-show="!isEdit" @click="editDetail" style="border-radius:4px;background:#FFFFFF;padding:7px 21px;font-size:14px;color:#989898;border:none;cursor:pointer;margin-left:10px">编辑</button>
                <button v-show="isEdit" @click="saveDetail(2)" style="border-radius:4px;background:#FFFFFF;padding:7px 21px;font-size:14px;color:#989898;border:none;cursor:pointer;margin-left:10px">保存</button>
            </div>
        </div>
        <!-- 未通过 -->
        <div v-if="form.approvalState==2" style="background:rgba(242,247,250,1);border:1px solid #F3F3F3;margin-top:21px;padding-left:20px;padding-right:17px;padding-bottom:17px">
            <div style="display:flex;justify-content:space-between;height:51px;align-items:center;">
                <div>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;当前进度：</span>
                    <span style="color:#FD2044">未通过</span>
                </div>
                <div>
                    <button v-show="!isEdit" @click="editDetail" style="border-radius:4px;background:#FFFFFF;padding:7px 21px;font-size:14px;color:#989898;border:none;cursor:pointer;margin-left:10px">编辑</button>
                    <button v-show="isEdit" @click="saveDetail" style="border-radius:4px;background:#FFFFFF;padding:7px 21px;font-size:14px;color:#989898;border:none;cursor:pointer;margin-left:10px">保存</button>
                </div>
            </div>
            <div style="font-size:16px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(94,94,94,1);">
                <div>
                    <span>未通过原因：{{form.approvalOpinion}}</span>
                </div>
                <div style="margin-top:15px">
                    <span style="padding-right:70px">&nbsp;&nbsp;&nbsp;审核人员：{{form.approvalUser}}</span>
                    <span>审核时间：{{form.approvalTime}}</span>
                </div>
            </div>

        </div>

        <!-- 已通过 -->
        <div v-if="form.approvalState==1" style="background:rgba(242,247,250,1);border:1px solid #F3F3F3;margin-top:21px;padding-left:20px;padding-right:17px;padding-bottom:17px">
            <div style="display:flex;justify-content:space-between;height:51px;align-items:center;">
                <div>
                    <span>当前进度：</span>
                    <span style="color:#F3A157">已通过</span>
                </div>
                <div>
                    <button v-show="!isEdit" @click="editDetail" style="border-radius:4px;background:#FFFFFF;padding:7px 21px;font-size:14px;color:#989898;border:none;cursor:pointer;margin-left:10px">编辑</button>
                    <button v-show="isEdit" @click="saveDetail" style="border-radius:4px;background:#FFFFFF;padding:7px 21px;font-size:14px;color:#989898;border:none;cursor:pointer;margin-left:10px">保存</button>
                </div>
            </div>
            <div style="font-size:16px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(94,94,94,1);">
                <span style="padding-right:70px">审核人员：{{form.approvalUser}}</span>
                <span>审核时间：{{form.approvalTime}}</span>
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
                   <el-form-item prop="projectName" label="需求名称：">
                     <el-input :readonly="!isEdit" v-model="form.projectName"></el-input>
                   </el-form-item>
                 </el-col>
               </el-col>
                <el-col :span="24">
                    <el-col :span="10">
                        <el-form-item prop="useArea" label="需求分类：">
                            <el-select multiple  style="width:100%" v-model="form.useArea" placeholder="请选择需求分类">
                                <el-option v-for="item in UserAreaData" :key="item.id" :label="item.desc" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-col>
               <el-col :span="24">
                 <el-col :span="10">
                   <el-form-item prop="skillArea" label="技术领域：">
                     <el-select multiple  style="width:100%" v-model="form.skillArea" placeholder="请选择技术领域，最多选择3个">
                       <el-option v-for="item in SkillAreaData" :key="item.id" :label="item.desc" :value="item.id"></el-option>
                     </el-select>
                   </el-form-item>
                 </el-col>
               </el-col>
                <el-col :span="24">
                    <el-col :span="10" >
                        <el-form-item prop="valuationType" label="预算：">
                            <el-col :span="8" style="min-width:100px">
                                <el-input placeholder="请输入预算金额" required @change="valuInputChange" :readonly="!isEdit || (isEdit&&form.negotiable)" v-model="form.valuation"></el-input>
                            </el-col>
                            <span style="padding-left:10px">万元</span>
                            <el-checkbox :disabled="!isEdit" style="padding-left:15px" @change="checkBoxChange" v-model="form.negotiable" label="1">面议</el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="24">
                  <el-col :span="10" >
                    <el-form-item prop="cooperateType" label="截止时间：">
                      <el-date-picker
                        v-model="value1"
                        type="date"
                        placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <el-col :span="10" >
                    <el-form-item prop="yourWant" label="需求描述：">
                      <el-input :readonly="!isEdit" type="textarea" :rows="2" placeholder="请输入内容" v-model="form.yourWantContent"></el-input>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <el-col :span="10" >
                    <el-form-item label="关键词检索：">
                      <el-col :span="10" style="min-width:378px">
                        <el-input :readonly="!isEdit" v-model="searchKeyInput" placeholder="最多5个标签"></el-input>
                      </el-col>
                      <button :disabled="!isEdit" @click="addSearchKey" style="cursor:pointer;padding:11px 10px;font-size:14px;background:rgba(252,252,252,1);border-radius:0px 2px 2px 0px;border:1px solid rgba(237,237,237,1);">
                        <i class="el-icon-plus"></i>
                      </button>
                    </el-form-item>
                    <el-form-item prop="searchKeyData" label="关键词：">
                      <el-tag
                        style="margin-right:10px"
                        v-for="(item,index) in form.searchKeyData" :key="index"
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
    import {   getProvinceAllCity , rejectProById , updateProDetail , approvalProDetail,reqNeedClass,reqTecField } from "./api";

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
                    approvalState:'',
                    approvalUser:'',
                    approvalTime:'',
                    approvalOpinion:'',
                    projectName:'',
                    useArea:'',
                    skillArea:'',
                    valuation:'',
                    negotiable:false,
                    fruitType:'',
                    detail:'',
                    processType:'',
                    financingType:'',
                    cooperateType:[],
                    yourWant:[],
                    yourWantContent:'',
                    companyName:'',
                    contactName:'',
                    phoneNumber:'',
                    email:'',
                    searchKeyData:[],
                    projectId:'',
                    startVideo:[],
                    endVideo:[],
                    // isTrue:false,
                    // position:[416,6],
                    // checkList:[],
                    photos:[],
                    proveUrl:[],
                    // province:'',
                    provinceId:'',
                    cityId:'',
                    createId:'',
                    // city:'',
                },
                rules:{
                    projectName : [
                        { required: true, message: '项目名称必须输入！', trigger: 'blur' },
                        { min: 1, max: 30, message: '项目名称30字以内', trigger: 'blur' }
                    ],

                    useArea :[
                        { required: true, message: '请选择应用领域',trigger: 'change' },
                    ],
                    skillArea : [
                        { required: true, message: '请选择技术领域',trigger: 'change' },
                    ],
                    fruitType : [
                        { required: true, message: '请选择成果类型',trigger: 'change' },
                    ],
                    processType : [
                        { required: true, message: '请选择当前阶段',trigger: 'change' },
                    ],
                    financingType : [
                        { required: true, message: '请选择融资阶段',trigger: 'change' },
                    ],
                    cooperateType : [
                        { type: 'array', required: true, message: '请至少选择一个归属方性质', trigger: 'change' }
                    ],
                    yourWant : [
                        { type: 'array', required: true, message: '请至少选择一个诉求', trigger: 'change' }
                    ],
                    yourWantContent : [
                        { required: true, message: '诉求描述必须输入', trigger: 'blur' },
                        { min: 1, max: 150, message: '名称150字以内', trigger: 'blur' }
                    ],
                    companyName : [
                        { required: true, message: '项目方单位名称必须输入!' , trigger: 'blur' },
                    ],
                    contactName : [
                        { required: true, message: '联系人姓名必须输入!' , trigger: 'blur' },
                    ],
                    phoneNumber : [
                        { required: true, message: '手机号必须输入!' , trigger: 'blur' },
                        {
                            validator (rule, value, callback) {
                                let reg=/^((13[0-9])|(14[5,7,9])|(15[^4])|(16[0-9])|(18[0-9])|(17[0,1,3,5,6,7,8]))[0-9]{8}$/;
                                if (reg.test(value)) {
                                    callback()
                                } else {
                                    callback(new Error('请输入正确的手机号'))
                                }
                            },
                            trigger: 'blur'
                        }
                    ],
                    email : [
                        { required: true, message: '邮箱必须输入!' , trigger: 'blur' },
                        {type: 'email', message: '请输入正确的邮箱地址!'}
                    ],
                    position : [
                        { required: true, message: '请选择所在地区',trigger: 'change' },
                    ],
                    provinceId : [
                        { required: true, message: '请选择所在地区',trigger: 'change' },
                    ],
                    cityId : [
                        { required: true, message: '请选择所在地区',trigger: 'change' },
                    ],
                    photos : [
                        { type: 'array', required: true, message: '请上传图片' }
                    ],
                    searchKeyData : [
                        { type: 'array', required: true, message: '请填入关键词' }
                    ],
                    // searchKeyData : [
                    //     { type: 'array', required: true, message: '请至少选择一个归属方性质' }
                    // ],
                    // valuation : [
                    //     { required:this.negotiable?false:true, message: '请输入估值', trigger: 'blur' },
                    // ],
                    valuationType:[{ validator: validateValuation, trigger: 'blur' }],
                    // negotiable:[{ validator: validateValuation, type: 'array', trigger: 'change' }],
                    // negotiable:[{ validator: validateNegotable, trigger: 'blur' }],
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
            //估值输入框值改变
            valuInputChange(value){
                console.log(value)
            },
            //复选框事件
            checkBoxChange(){
                // console.log("checkbox");
                this.form.valuation='';
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
                if( this.form.searchKeyData.length<5 && this.form.searchKeyData.indexOf(this.form.searchKeyInput)==-1){
                    this.form.searchKeyData.push(this.searchKeyInput);
                    // this.searchKeyInput='';

                }else{

                }
                this.searchKeyInput='';

            },
            //删除关键词
            keyDataClose(item){
                this.form.searchKeyData.splice(this.form.searchKeyData.indexOf(item), 1);
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
            //保存或者审核，根据flag判断，1代表审核，2代表保存
            saveDetail(flag){
                // this.form.negotiable
                this.$refs["form"].validate((valid) => {
                    if (valid) {
                        // console.log(this.form);
                        let funcUrl=flag==1?approvalProDetail:updateProDetail;
                        let str=flag==1?"审核":"保存";
                        let postData={};
                        for(let key in this.form){
                            // console.log(key);
                            // console.log(this.form[key]);
                            // console.log(Object.prototype.toString(this.form[key]));
                            if(Object.prototype.toString.call(this.form[key]) === "[object Object]"||Object.prototype.toString.call(this.form[key]) === "[object Array]"){
                                postData[key] = JSON.parse(JSON.stringify(this.form[key]));
                            }else{
                                postData[key] = this.form[key];
                            }
                        }
                        postData.fruitType = [this.form.fruitType];
                        postData.processType = [this.form.processType];
                        postData.financingType = [this.form.financingType];
                        postData.words = this.form.searchKeyData;
                        for(let i=0;i<postData.photos.length;i++){
                            postData.photos.splice(i,1,postData.photos[i].url)
                        }
                        if(postData.proveUrl){
                            for(let i=0;i<postData.proveUrl.length;i++){
                                postData.proveUrl.splice(i,1,postData.proveUrl[i].url)
                            }
                        }
                        postData.startVideo=postData.startVideo[0]?postData.startVideo[0].url:'';
                        postData.endVideo=postData.endVideo[0]?postData.endVideo[0].url:'';
                        postData.valuationType = postData.negotiable ? '1' : '2';
                        delete postData.approvalUser;
                        delete postData.approvalTime;
                        funcUrl(postData).then(res=>{
                            // console.log("数据保存了",res);
                            this.$message({
                                type:res.data.ret?'success':'error',
                                showClose: true,
                                message:res.data.ret?`${str}成功`:`${str}失败`,
                            })
                            if(res.data.ret){
                                this.fetch(this.rowId);
                                this.isEdit=false;
                            }
                        })
                        // console.log(postData);
                        // alert('submit!');
                    } else {
                        // console.log('error submit!!');
                        return false;
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

        },
        created () {
            this.myHeaders.token=sessionStorage.token;
            this.getNeedClass();
            this.getTecField();
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
</style>
