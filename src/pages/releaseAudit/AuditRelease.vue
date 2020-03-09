<template>
    <div style="padding:28px 35px;background:white;height:100%">
        <div style="display:flex;justify-content:space-between;font-size:16px;color:#333">
            <span>项目审核</span>
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
        <!-- 项目描述 -->
        <div>
            <div style="border-bottom:1px solid #E9E9E9;padding-bottom:7px;margin-top:26px;font-size:16px;color:#333333;margin-bottom:35px">
                <span style="border-bottom:2px solid #2BB1E8;padding-bottom:4px">项目描述</span>
            </div>
            <!-- <el-form ref="form" :model="form" :rules="isEdit?rules:''" style="overflow:hidden" label-width="110px"> -->
                <el-form-item prop="projectName" label="项目名称：">
                    <el-input :readonly="!isEdit" v-model="form.projectName"></el-input>
                </el-form-item>
                <el-col :span="24">
                    <el-col :span="12">
                        <el-form-item prop="skillArea" label="技术领域：">
                            <el-select multiple :disabled="!isEdit" style="width:100%" v-model="form.skillArea" placeholder="技术领域">
                                <el-option-group
                                    v-for="group in SkillAreaData"
                                    :key="group.id"
                                    :label="group.desc">
                                    <el-option
                                        v-for="item in group.list"
                                        :key="item.id"
                                        :label="item.desc"
                                        :value="item.id">
                                    </el-option>
                                </el-option-group>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="useArea" label="应用领域：：">
                            <el-select multiple :disabled="!isEdit" style="width:100%" v-model="form.useArea" placeholder="应用领域：">
                                <el-option v-for="item in UserAreaData" :key="item.id" :label="item.desc" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="12">
                        <el-form-item prop="fruitType" label="成果类型：">
                            <el-select :disabled="!isEdit" style="width:100%" v-model="form.fruitType" placeholder="成果类型">
                                <el-option v-for="item in FruitTypeData" :key="item.id" :label="item.desc" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="processType" label="当前阶段：">
                            <el-select :disabled="!isEdit" style="width:100%" v-model="form.processType" placeholder="当前阶段">
                                <el-option v-for="item in ProcessTypeData" :key="item.id" :label="item.desc" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="12">
                        <el-form-item prop="financingType" label="融资阶段：">
                            <el-select :disabled="!isEdit" style="width:100%" v-model="form.financingType" placeholder="融资阶段">
                                <el-option v-for="item in FinancingTypeData" :key="item.id" :label="item.desc" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" style="display:flex;">
                        <el-form-item prop="" label="估值：">
                            <el-col :span="4" style="min-width:100px">
                                <el-input required @change="valuInputChange" :readonly="!isEdit || (isEdit&&form.negotiable)" v-model="form.valuation"></el-input>
                            </el-col>
                            <!-- {{form.negotiable}} -->
                            <span style="padding-left:10px">万元</span>
                            <el-checkbox :disabled="!isEdit" style="padding-left:15px" @change="checkBoxChange" v-model="form.negotiable" label="1">面议</el-checkbox>
                        </el-form-item>
                        <!-- <el-form-item prop="negotiable" label-width="0px"  label="">
                            <el-checkbox :disabled="!isEdit" style="padding-left:15px" @change="checkBoxChange" v-model="form.negotiable" label="1">面议</el-checkbox>
                        </el-form-item> -->
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-form-item prop="cooperateType" label="归属方性质：">
                        <el-checkbox-group :disabled="!isEdit" v-model="form.cooperateType">
                            <el-checkbox v-for="(item,index) in OwnershipData" :key='index' :label="item"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item prop="yourWant" label="项目诉求：">
                        <el-checkbox-group :disabled="!isEdit" v-model="form.yourWant">
                            <el-checkbox v-for="(item,index) in AppealData" :key='index' :label="item"></el-checkbox>                            
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item prop="yourWantContent" label="诉求描述：">
                        <el-input :readonly="!isEdit" type="textarea" :rows="2" placeholder="请输入内容" v-model="form.yourWantContent"></el-input>
                    </el-form-item>
                </el-col>
            <!-- </el-form> -->
        </div>
        <!-- 项目方信息 -->
        <div>
            <div style="border-bottom:1px solid #E9E9E9;padding-bottom:7px;margin-top:26px;font-size:16px;color:#333333;margin-bottom:35px">
                <span style="border-bottom:2px solid #2BB1E8;padding-bottom:4px">项目方信息</span>
            </div>
            <!-- <el-form ref="form" :model="form"  :rules="isEdit?rules:''" style="overflow:hidden" label-width="110px"> -->
                <el-col :span="24">
                    <el-col :span="12">
                        <el-form-item prop="companyName" label="单位名称：">
                            <el-input :readonly="!isEdit" v-model="form.companyName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="contactName" label="联系人姓名：">
                            <el-input :readonly="!isEdit" v-model="form.contactName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="12">
                        <el-form-item prop="phoneNumber" label="手机号：">
                            <el-input :readonly="!isEdit" v-model="form.phoneNumber"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="email" label="电子邮箱：">
                            <el-input :readonly="!isEdit" v-model="form.email"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
                <!-- {{this.form.position}} -->
                <el-col :span="24">
                    <el-col :span="12" style="display:flex">
                        <el-form-item prop="province" label="所在省份：">
                            <el-select :disabled="!isEdit" clearable @clear="clearProvince" @change="provinceChange" v-model="form.provinceId">
                                <el-option
                                  v-for="(item,index) in prinvinceData"
                                  :key="index"
                                  :label="item.name"
                                  :value="item.regionId"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="city" label="所在城市：">
                            <el-select :disabled="!isEdit" clearable v-model="form.cityId">
                                <el-option
                                  v-for="(item,index) in cityData"
                                  :key="index"
                                  :label="item.name"
                                  :value="item.regionId"
                                ></el-option>
                            </el-select>
                            <!-- <el-cascader
                                clearable
                                v-model="form.position"
                                placeholder="请选择所在地区"
                                :options="optionsArea"
                                :props="cascaderProps"
                            ></el-cascader> -->
                        </el-form-item>
                    </el-col>
                </el-col>
            <!-- </el-form> -->
        </div>
        <!-- 项目技术内容 -->
        <div>
            <div style="border-bottom:1px solid #E9E9E9;padding-bottom:7px;margin-top:26px;font-size:16px;color:#333333;margin-bottom:35px">
                <span style="border-bottom:2px solid #2BB1E8;padding-bottom:4px">项目技术内容</span>
            </div>
            <!-- <el-form ref="form"  :rules="isEdit?rules:''" :model="form" style="overflow:hidden" label-width="110px"> -->
                <el-form-item prop="photos" label="宣传图片：">
                    <el-upload
                        :disabled="!isEdit"
                        :action="baseUrl+'/upLoading'"
                        list-type="picture-card"
                        accept="image/*"
                        :limit='3'
                        :data="{model:'publish'}"
                        :file-list="form.photos"
                        :on-preview="handlePictureCardPreview"
                        :before-upload="beforeAvatarUpload"
                        :on-error="imgUploadError"
                        :on-success="handleAvatarSuccess"
                        :on-remove="handleRemove">
                        <i v-if="form.photos.length<2" class="el-icon-plus"></i>
                        <div slot="tip" class="el-upload__tip">建议上传图片最多3张，尺寸为285*196，不能超过2M</div>
                    </el-upload>
                    <el-dialog :visible.sync="dialogPicVisible">
                        <img width="100%" :src="dialogPicImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <!-- 上传视频 -->
                <!-- action="http://139.196.236.125:8088/upLoading" -->
                <el-form-item label="宣传视频（开头）：">
                    <el-upload
                        :disabled="!isEdit"  
                        :action="baseUrl+'/upLoading'"
                        list-type="picture-card"
                        accept=".mp4,.ogg,.avi,.flv,.wmv,.rmvb"
                        :limit='1'
                        :data="{model:'video'}"
                        :file-list="form.startVideo"
                        :on-preview="handleStartVideoPreview"
                        :before-upload="beforeUploadVideo"
                        :on-success="handleVideoSuccess"
                        :on-remove="handleStartVideoRemove">
                        <i class="el-icon-plus"></i>
                        <div slot="tip" class="el-upload__tip">支持上传mp4、ogg、avi、flv、wmv、rmvb视频，且不超过50M</div>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <video controls="controls" :src="dialogImageUrl">您的浏览器不支持视频播放</video>
                    </el-dialog>
                    <!-- <el-upload :on-remove="handleRemove" :on-preview="handlePictureCardPreview" :data="{model:'video'}" accept=".mp4,.ogg,.avi,.flv,.wmv,.rmvb" :limit="1" list-type="picture-card" class="avatar-uploader el-upload--text" action="http://139.196.236.125:8088/upLoading" :show-file-list="false" :on-success="handleVideoSuccess" :before-upload="beforeUploadVideo">
                        <video v-if="form.startVideo !='' && videoFlag == false" :src="form.startVideo" class="avatar" controls="controls">您的浏览器不支持视频播放</video>
                        <i v-else-if="form.startVideo =='' && videoFlag == false" class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <P class="text">请保证视频格式正确，且不超过50M</P> -->
                </el-form-item>
                <el-form-item label="项目详情：">
                    <button @click="getTemplate" :disabled="!isEdit" style="background:rgba(43,177,232,1);border-radius:2px;border:none;padding:6px 15px;color:white;cursor:pointer">获取项目面板</button>
                    <button @click="clearTemplate" :disabled="!isEdit" style="margin-left:10px;border-radius:2px;border:1px solid #2BB1E8;padding:6px 15px;color:#2BB1E8;cursor:pointer">自定义项目面板</button>
                </el-form-item>
                <!-- 上传视频 -->
                <el-form-item label="宣传视频（结束）：">
                    <!-- <el-upload :data="{model:'video'}" accept=".mp4,.ogg,.avi,.flv,.wmv,.rmvb" :limit="1" list-type="picture-card" class="avatar-uploader el-upload--text" action="http://139.196.236.125:8088/upLoading" :show-file-list="false" :on-success="handleEndVideoSuccess" :before-upload="beforeUploadVideo">
                        <video v-if="form.endVideo !='' && videoEndFlag == false" :src="form.endVideo" class="avatar" controls="controls">您的浏览器不支持视频播放</video>
                        <i v-else-if="form.endVideo =='' && videoEndFlag == false" class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <P class="text">请保证视频格式正确，且不超过50M</P> -->
                    <!-- action="http://139.196.236.125:8088/upLoading" -->
                    <el-upload
                        :disabled="!isEdit"
                        :action="baseUrl+'/upLoading'"
                        list-type="picture-card"
                        accept=".mp4,.ogg,.avi,.flv,.wmv,.rmvb"
                        :limit='1'
                        :data="{model:'video'}"
                        :file-list="form.endVideo"
                        :on-preview="handleStartVideoPreview"
                        :before-upload="beforeUploadVideo"
                        :on-success="handleEndVideoSuccess"
                        :on-remove="handleEndVideoRemove">
                        <i class="el-icon-plus"></i>
                        <div slot="tip" class="el-upload__tip">支持上传mp4、ogg、avi、flv、wmv、rmvb视频，且不超过50M</div>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <video controls="controls" :src="dialogImageUrl">您的浏览器不支持视频播放</video>
                    </el-dialog>
                </el-form-item>
                <el-form-item  class="edit_container news">
                    <!-- :action="baseUrl+'/fileUpload'" -->
                    <!-- action="http://139.196.236.125:8088/upLoading" -->
                    <el-upload
                        class="avatar-uploader quill-img"
                        :action="baseUrl+'/upLoading'"
                        :data="{model:'publish'}"                      
                        :show-file-list="false"
                        :on-success="quillImgSuccess"
                        >
                    </el-upload>
                    <quill-editor 
                        :disabled="!isEdit"
                        v-model="form.detail" 
                        ref="myQuillEditor" 
                        :options="editorOption">
                    </quill-editor>
                </el-form-item>
                <!-- :on-change="handleChange" -->
                <!-- action="http://139.196.236.125:8088/upLoading" -->
                <el-form-item label="上传材料：">
                    <el-upload
                        class="upload-demo"
                        :action="baseUrl+'/upLoading'"
                        :on-remove="handleMaterialRemove"
                        :on-success="handleMaterialSuccess"
                        :limit="5"
                        accept=".jpg , .doc , .pdf , .rar, .zip , .docx, .pdf, .png"
                        :data="{model:'publish'}"   
                        :file-list="form.proveUrl">
                        <button style="background:rgba(255,255,255,1);border-radius:2px;border:1px solid rgba(237,237,237,1);cursor:pointer;padding:6px 9px;font-size:14px;color:#5A5A5A">
                            <i class="el-icon-upload"></i>
                            <span>上传</span>
                        </button>
                        <!-- <el-button size="small" type="text"></el-button> -->
                        <div slot="tip" class="el-upload__tip">上传证明材料有利于提高您的技术的可信度，最多5个材料。助力技术推广，支持扩展名：jpg、doc、pdf</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="关键词搜索：">
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
            <!-- </el-form> -->
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
                <button style="background:linear-gradient(36deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);border-radius:3px;padding:5px 20px;color:white;cursor:pointer">取消</button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import  uploadUrl  from '@/request/uploadUrl'
    import { toolbarOptions , proTemplate } from "../../util/commonData";
    import { getAllProvince , getProvinceAllCity , getListSkillArea , getListUserArea , getListProcessType , getListFruitType , getAllFinancingType , getProDetailById , rejectProById , updateProDetail , approvalProDetail } from "./api";
    // import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
    export default {
        data() {
            var validateValuation = (rule,value,callback)=>{
                console.log("outinputtttttttttttt")
                if(this.form.valuation=='' && this.form.negotiable.length==0){
                    callback(new Error("请输入估值或选择面议"))
                }else if(this.form.valuation==''&&this.form.negotiable.length!=0){
                    console.log("inputtttttttttttt");
                    callback()
                }else if(this.form.valuation!='' && this.form.negotiable.length==0){
                    
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
                baseUrl:uploadUrl.uploadUrl,//图片上传地址，方便测试
                rowId:'',
                videoFlag:false,
                videoEndFlag:false,
                // videoForm:{
                //     startVideo:'',
                //     endVideo:'',
                // },
                // materialFileList:[],
                cascaderProps:{
                    lazy: true,
                    lazyLoad: async (node,resolve)=>{
                        console.log("node",node);
                        const { level } = node;
                        let data={
                            provinceId:this.form.position[0]
                        }
                        console.log("this",this);
                        await getProvinceAllCity(data).then(res=>{
                            console.log('resfshgfhsgh',res);
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
                    negotiable:[],
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
                    //     { required: true, message: '请输入估值', trigger: 'blur' },
                        
                    // ],
                    // valuationType:[{ validator: validateValuation, trigger: 'blur' }],
                    // negotiable:[{ validator: validateValuation, type: 'array', trigger: 'change' }],
                    // valuation : [
                    //     { required: true, message: '项目名称必须输入！', trigger: 'blur' },
                    // ],
                    // negotiable:[{ validator: validateNegotable, trigger: 'blur' }],
                },
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
            //估值输入框值改变
            valuInputChange(value){
                console.log(value)
            },
            //复选框事件
            checkBoxChange(){
                console.log("checkbox");
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
                console.log('form.photos',this.form.photos);
            },
            //handleStartVideoRemove
            handleStartVideoRemove(file,fileList){
                this.form.startVideo=[];
            },
            handleEndVideoRemove(file,fileList){
                this.form.endVideo=[];
            },
            handlePictureCardPreview(file) {
                console.log(file);
                this.dialogPicImageUrl = file.url;
                this.dialogPicVisible = true;
            },
            handleStartVideoPreview(file) {
                console.log(file);
                this.dialogImageUrl = file.url;
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
                console.log(res);
                if(res.ret){
                    let obj={};
                    obj.name=res.data;
                    // obj.url='http://139.196.236.125:8088/'+res.data;
                    obj.url=this.baseUrl+res.data;
                    
                    this.form.photos.push(obj);
                }else{
                    // this.form.photos.pop();
                    this.$message.error('上传图片失败!');
                    console.log(fileList);
                    fileList.pop();
                    console.log("error",this.form.photos);
                }
                // this.imageUrl = URL.createObjectURL(file.raw);
            },
            imgUploadError(err, file, fileList){//图片上传失败调用
                console.log(err)
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
                    console.log(fileList);
                    fileList.pop();
                    console.log("error",this.form.photos);
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
                console.log("视频上传",res);
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
                console.log("视频上传",res);
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
                console.log(file,fileList);
                this.form.proveUrl=fileList;
            },







            //富文本编辑器图片上传
            quillImgSuccess(res, file) { // 富文本编辑框图片上传
                // console.log(URL.createObjectURL(file.raw));
                // this.form.icon = URL.createObjectURL(file.raw);
                // res为图片服务器返回的数据
                // 获取富文本组件实例
                let quill = this.$refs.myQuillEditor.quill;
                console.log(res);
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
                console.log("chan")
                console.log(val);
                console.log(this.optionsArea);
            },
            //省下拉框
            provinceChange(item){
                console.log("changechangehjshjhsjhdsjhjsdhj",item);
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
            //获取所有的省
            getAllPrivinceData(){
                getAllProvince().then(res=>{
                    // console.log(res);
                    if(res.data.ret){
                        this.optionsArea = res.data.data;
                        this.prinvinceData=res.data.data;
                        for(let i=0;i<this.optionsArea.length;i++){
                            this.optionsArea[i].label=this.optionsArea[i].name;
                            this.optionsArea[i].value=this.optionsArea[i].regionId;
                            // this.optionsArea[i].level=this.optionsArea[i].enumRegionLevel
                        }
                        // console.log("this.optionsArea",this.optionsArea)
                    }
                    
                });
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
                console.log("获取");
                console.log(proTemplate);

                this.form.detail=proTemplate;
            },
            //自定义面板
            clearTemplate(){
                this.form.detail='';
            },
            //保存
            saveDetail(flag){
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
                        console.log('error submit!!');
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
                            console.log(res);
                        })
                        console.log(this.turnDownForm.opinion);
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            },
            //查询数据
            fetch(id){
                let param={};
                param.id=id;
                getProDetailById(param).then(res=>{
                    // console.log("resdata",res);
                    if(res.data.ret && res.data.data){
                        let formData = res.data.data;
                        for(let key in this.form){
                            this.form[key] = formData[key];
                        }
                        this.form.fruitType=this.form.fruitType[0];
                        this.form.processType=this.form.processType[0];
                        this.form.financingType=this.form.financingType[0];
                        this.form.searchKeyData=formData.words;
                        this.form.negotiable=formData.valuationType==1?true:false;
                        // if(startVideo)
                        this.form.startVideo=this.form.startVideo?[this.form.startVideo]:[];
                        
                        this.form.endVideo=this.form.endVideo?[this.form.endVideo]:[];
                        for(let i=0;i<this.form.startVideo.length;i++){
                            let obj={};
                            obj.uid=this.form.startVideo[i];
                            obj.url=this.form.startVideo[i];
                            this.form.startVideo.splice(i,1,obj)
                        }
                        console.log('this.form.startVideo',this.form.startVideo);
                        for(let i=0;i<this.form.endVideo.length;i++){
                            let obj={};
                            obj.uid=this.form.endVideo[i];
                            obj.url=this.form.endVideo[i];
                            this.form.endVideo.splice(i,1,obj)
                        }
                        console.log('this.form.endVideo',this.form.endVideo);
                        // this.form.endVideo=[];
                        if(this.form.negotiable){
                            this.form.valuation='';
                        }
                        for(let i=0;i<this.form.photos.length;i++){
                            let obj={};
                            obj.uid=this.form.photos[i];
                            obj.url=this.form.photos[i];
                            this.form.photos.splice(i,1,obj);
                        }
                        for(let i=0;i<this.form.proveUrl.length;i++){
                            let obj={};
                            obj.uid=this.form.proveUrl[i];
                            obj.url=this.form.proveUrl[i];
                            this.form.proveUrl.splice(i,1,obj);
                        }
                        this.getAllCityData(this.form.provinceId);
                        // this.form.fruitType='';
                    }
                })
            },
        },
        created () {
            this.getAllPrivinceData();
            this.getAllSelectData();
            this.fetch(this.$route.query.id);
            this.rowId=this.$route.query.id;

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
</style>