<template>
    <div style="padding:28px 35px;background:white;height:100%" class="auditActiveSelf">
        <div style="display:flex;justify-content:space-between;font-size:16px;color:#333">
            <span>活动审核</span>
            <span @click="goBack" style="cursor:pointer">
                <i class="el-icon-back"></i>
            </span>
        </div>
        <!-- 待审核 -->
        <div v-if="activeDetails.approvalStatus==0" style="display:flex;justify-content:space-between;height:51px;align-items:center;
            background:rgba(242,247,250,1);border:1px solid #F3F3F3;margin-top:21px;
            padding-left:20px;padding-right:17px">
            <div>
                <span>当前进度：</span>
                <span>待审核</span>
            </div>
            <div >
<!--                <button @click="saveDetail(1)" style="border-radius:4px;background:#2BB1E8;padding:7px;font-size:14px;color:#FFFFFF;border:none;cursor:pointer">审核通过</button>-->
              <button @click="handlePass" style="border-radius:4px;background:#2BB1E8;padding:7px;font-size:14px;color:#FFFFFF;border:none;cursor:pointer">审核通过</button>
              <button @click="handleCloseActive" style="border-radius:4px;background:#FFFFFF;padding:7px 21px;font-size:14px;color:#989898;border:none;cursor:pointer;margin-left:10px">驳回</button>
                <button v-show="!isEdit" @click="editDetail" style="border-radius:4px;background:#FFFFFF;padding:7px 21px;font-size:14px;color:#989898;border:none;cursor:pointer;margin-left:10px">编辑</button>
                <button v-show="isEdit" @click="saveDetail()" style="border-radius:4px;background:#FFFFFF;padding:7px 21px;font-size:14px;color:#989898;border:none;cursor:pointer;margin-left:10px">保存</button>
            </div>
        </div>
        <!-- 未通过 -->
        <div v-if="activeDetails.approvalStatus==2" style="background:rgba(242,247,250,1);border:1px solid #F3F3F3;margin-top:21px;padding-left:20px;padding-right:17px;padding-bottom:17px">
            <div style="display:flex;justify-content:space-between;height:51px;align-items:center;">
                <div>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;当前进度：</span>
                    <span style="color:#FD2044">未通过</span>
                </div>
                <div>
<!--                    <button v-show="!isEdit" @click="editDetail" style="border-radius:4px;background:#FFFFFF;padding:7px 21px;font-size:14px;color:#989898;border:none;cursor:pointer;margin-left:10px">编辑</button>-->
<!--                    <button v-show="isEdit" @click="saveDetail" style="border-radius:4px;background:#FFFFFF;padding:7px 21px;font-size:14px;color:#989898;border:none;cursor:pointer;margin-left:10px">保存</button>-->
                </div>
            </div>
            <div style="font-size:16px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(94,94,94,1);">
                <div>
                    <span>未通过原因：{{activeDetails.approvalOpinion}}</span>
                </div>
                <div style="margin-top:15px">
                    <span style="padding-right:70px">&nbsp;&nbsp;&nbsp;审核人员：{{activeDetails.approvalUser}}</span>
                    <span>审核时间：{{activeDetails.approvalTime?renderTime(activeDetails.approvalTime):''}}</span>
                </div>
            </div>

        </div>

        <!-- 已通过 -->
        <div v-if="activeDetails.approvalStatus==1" style="background:rgba(242,247,250,1);border:1px solid #F3F3F3;margin-top:21px;padding-left:20px;padding-right:17px;padding-bottom:17px">
            <div style="display:flex;justify-content:space-between;height:51px;align-items:center;">
                <div>
                    <span>当前进度：</span>
                    <span style="color:#F3A157">已通过</span>
                </div>
                <div>
                  <button v-show="!isEdit" @click="editDetail" style="border-radius:4px;background:#FFFFFF;padding:7px 21px;font-size:14px;color:#989898;border:none;cursor:pointer;margin-left:10px">编辑</button>
                  <button v-show="isEdit" @click="saveDetail()" style="border-radius:4px;background:#FFFFFF;padding:7px 21px;font-size:14px;color:#989898;border:none;cursor:pointer;margin-left:10px">保存</button>
                </div>
            </div>
            <div style="font-size:16px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(94,94,94,1);">
                <span style="padding-right:70px">审核人员：{{activeDetails.approvalUser}}</span>
                <span>审核时间：{{renderTime(activeDetails.approvalTime)}}</span>
            </div>
        </div>
        <!-- 已下线  -->
      <div v-if="activeDetails.approvalStatus==4" style="background:rgba(242,247,250,1);border:1px solid #F3F3F3;margin-top:21px;padding-left:20px;padding-right:17px;padding-bottom:17px">
        <div style="display:flex;justify-content:space-between;height:51px;align-items:center;">
          <div>
            <span>当前进度：</span>
            <span style="color:#F3A157">已下线</span>
          </div>
<!--          <div>-->
<!--            <button v-show="!isEdit" @click="editDetail" style="border-radius:4px;background:#FFFFFF;padding:7px 21px;font-size:14px;color:#989898;border:none;cursor:pointer;margin-left:10px">编辑</button>-->
<!--            <button v-show="isEdit" @click="saveDetail" style="border-radius:4px;background:#FFFFFF;padding:7px 21px;font-size:14px;color:#989898;border:none;cursor:pointer;margin-left:10px">保存</button>-->
<!--          </div>-->
        </div>
        <div style="font-size:16px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(94,94,94,1);">
          <span style="padding-right:70px">审核人员：{{activeDetails.approvalUser}}</span>
          <span>审核时间：{{renderTime(activeDetails.approvalTime)}}</span>
        </div>
      </div>

      <el-form ref="form" :model="activeDetails" :rules="isEdit?rules:null" style="overflow:hidden" label-width="130px">
        <!-- 活动描述 -->
        <div>
            <div style="border-bottom:1px solid #E9E9E9;padding-bottom:7px;margin-top:26px;font-size:16px;color:#333333;margin-bottom:35px">
                <span style="border-bottom:2px solid #2BB1E8;padding-bottom:4px">活动描述</span>
            </div>
            <!-- <el-form ref="form" :model="form" :rules="isEdit?rules:''" style="overflow:hidden" label-width="110px"> -->
          <el-col :span="24">
            <el-col :span="12">
                <el-form-item prop="activitiesTopic" label="活动名称：">
                    <el-input :readonly="!isEdit" placeholder="请输入活动名称，不超过30字" v-model="activeDetails.activitiesTopic"></el-input>
                </el-form-item>
            </el-col>
          </el-col>
         <el-col :span="24">
                    <el-col :span="12">
                      <el-form-item prop="" :class="isEdit?'redIcon':''" label="所在省份：">
                        <el-select :disabled="!isEdit" clearable @clear="clearProvince" @change="provinceChange" v-model="form.provinceId">
                          <el-option
                            v-for="(item,index) in prinvinceData"
                            :key="index"
                            :label="item.name"
                            :value="item.regionId"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item prop="" :class="isEdit?'redIcon':''" label="所在城市：">
                        <el-select :disabled="!isEdit" clearable v-model="form.cityId" @change="cityChange">
                          <el-option
                            v-for="(item,index) in cityData"
                            :key="index"
                            :label="item.name"
                            :value="item.regionId"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item prop="" :class="isEdit?'redIcon':''" label="所在地区：">
                        <el-select :disabled="!isEdit" clearable v-model="form.areaId">
                          <el-option
                            v-for="(item,index) in areaData"
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
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item :class="isEdit?'redIcon':''" style="margin-right: 21px" prop="" label="活动领域：">
                <el-select multiple :multiple-limit="3" @change="handleActivitiesIndustry" :disabled="!isEdit"  clearable style="width:100%" v-model="form.activitiesIndustry"  placeholder="请选择活动领域">
                  <el-option v-for="item in ActiveFildData" :key="item.id" :label="item.value" :value="item.code"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item :class="isEdit?'redIcon':''" style="margin-right: 21px" prop="" label="活动方式：">
                <el-select :disabled="!isEdit"  clearable style="width:100%" v-model="form.activitiesMode"  placeholder="请选择活动方式">
                  <el-option  :disabled="item.disabled" v-for="item in ActiveMethodsData" :key="item.label" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item prop="address" label="详细地址：">
                <el-input placeholder="请输入详细地址，不超过30字" :readonly="!isEdit" v-model="activeDetails.address"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
          <el-col :span="12" style="display:flex;">
            <el-form-item :class="isEdit?'redIcon':''" prop="" label="报名费：">
              <el-col :span="10" style="min-width:100px">
                <el-input style="width: 100%" @input="valuInputChange"   :readonly="true " :disabled="true" v-model="activeDetails.regFee"></el-input>
              </el-col>
              <span style="padding-left:10px">元</span>
              <el-checkbox :disabled="true" :readonly="true " style="padding-left:15px" @change="checkBoxChange" v-model="form.isChecked"   :checked="form.isChecked" label="0">免费</el-checkbox>
            </el-form-item>
          </el-col>
          </el-col>
                <el-col :span="24">
                    <el-col :span="12">
                      <el-form-item prop="regNumber" label="人数：">
                        <el-input :readonly="true" :disabled="true" v-model="activeDetails.regNumber"></el-input>
                      </el-form-item>
                    </el-col>

                </el-col>
                <el-col :span="24">
                    <el-col :span="12">
                        <el-form-item :class="isEdit?'redIcon':''" prop="" label="活动起止时间：">
                          <el-date-picker
                            :readonly="!isEdit"
                            v-model="form.startEndTime"
                            type="datetimerange"
                            @change="handleTimeChange"
                            format="yyyy/MM/dd HH:mm"
                            value-format="yyyy/MM/dd HH:mm"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                          </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="24">
                  <el-col :span="12">
                    <el-form-item prop="activitiesTypeName" label="活动类型：">
                      <el-select :disabled="!isEdit" v-model="activeDetails.activitiesTypeName" @change="handleActiveType" style="width: 100%" placeholder="请选择活动类型">
                        <el-option
                          v-for="item in ActiveTypeData"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <el-col :span="12">
                    <el-form-item prop="regEndTime" label="报名截止时间：">
                      <el-date-picker
                        :disabled="true"
                        style="width: 100%"
                        format="yyyy/MM/dd HH:mm"
                        value-format="yyyy/MM/dd HH:mm"
                        v-model="activeDetails.regEndTime "
                        type="datetime"
                        placeholder="选择报名截止时间">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-col>
            <!-- </el-form> -->
        </div>
        <!-- 主办方信息 -->
        <div>
            <div style="border-bottom:1px solid #E9E9E9;padding-bottom:7px;margin-top:26px;font-size:16px;color:#333333;margin-bottom:35px">
                <span style="border-bottom:2px solid #2BB1E8;padding-bottom:4px">主办方信息</span>
            </div>
            <!-- <el-form ref="form" :model="form"  :rules="isEdit?rules:''" style="overflow:hidden" label-width="110px"> -->
                <el-col :span="24">
                    <el-col :span="12">
                      <el-form-item label="主办单位：">
                        <el-col :span="10" style="min-width:378px">
                          <el-input :readonly="!isEdit" v-model="searchKeyInput1" placeholder="可增加主办方,最多10个"></el-input>
                        </el-col>
                        <button type="button" :disabled="!isEdit" @click="addSearchKey" style="cursor:pointer;padding:11px 10px;font-size:14px;background:rgba(252,252,252,1);border-radius:0px 2px 2px 0px;border:1px solid rgba(237,237,237,1);">
                          <i class="el-icon-plus"></i>
                        </button>
                      </el-form-item>
                      <el-form-item prop="organizers" label="单位：" >
                        <el-tag
                          style="margin-right:10px"
                          v-for="(item,index) in activeDetails.organizers" :key="index"
                          :closable="isEdit"
                          @close="keyDataClose1(item)"
                          type="info">
                          {{item}}
                        </el-tag>
                      </el-form-item>
                    </el-col>
                  <el-col :span="12">
                    <el-form-item label="协办方：">
                      <el-col :span="10" style="min-width:378px">
                        <el-input :readonly="!isEdit" v-model="searchKeyInput2" placeholder="可增加协办方，最多10个(每个不超过20字)"></el-input>
                      </el-col>
                      <button  type="button" :disabled="!isEdit" @click="addSearchKey1" style="cursor:pointer;padding:11px 10px;font-size:14px;background:rgba(252,252,252,1);border-radius:0px 2px 2px 0px;border:1px solid rgba(237,237,237,1);">
                        <i class="el-icon-plus"></i>
                      </button>
                    </el-form-item>
                    <el-form-item prop="" label="单位：" v-if="activeDetails">
                      <el-tag
                        style="margin-right:10px"
                        v-for="(item,index) in activeDetails.coOrganizers" :key="index"
                        :closable="isEdit"
                        @close="keyDataClose2(item)"
                        type="info">
                        {{item}}
                      </el-tag>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <el-col :span="12">
                    <el-form-item prop="contact" label="联系人：">
                      <el-input :readonly="!isEdit" v-model="activeDetails.contact"></el-input>
                    </el-form-item>
                  </el-col>
                    <el-col :span="12">
                        <el-form-item prop="phoneNumber" label="联系电话：">
                            <el-input :readonly="!isEdit" v-model="activeDetails.phoneNumber"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
        </div>
        <!-- 活动内容 -->
        <div>
            <div style="border-bottom:1px solid #E9E9E9;padding-bottom:7px;margin-top:26px;font-size:16px;color:#333333;margin-bottom:35px">
                <span style="border-bottom:2px solid #2BB1E8;padding-bottom:4px">活动内容</span>
            </div>
               <el-form-item prop="photos" label="活动宣传图：">
            <el-upload
              :disabled="!isEdit"
              :headers="myHeaders"
              :action="baseUrl+'/upLoading'"
              list-type="picture-card"
              accept="image/*"
              :limit='1'
              :data="{model:'publish'}"
              :file-list="form.photos"
              :on-preview="handlePictureCardPreview"
              :before-upload="beforeAvatarUpload"
              :on-error="imgUploadError"
              :on-success="handleAvatarSuccess"
              :on-remove="handleRemove">
              <i v-if="form.photos.length<1" class="el-icon-plus"></i>
              <div slot="tip" class="el-upload__tip">建议尺寸为285*200px不能超过2M</div>
            </el-upload>
            <el-dialog :visible.sync="dialogPicVisible">
              <img width="100%" :src="dialogPicImageUrl" alt="">
            </el-dialog>
          </el-form-item>
                <el-form-item  class="edit_container news" label="活动详情：">
                    <el-upload
                        class="avatar-uploader quill-img"
                        style="height:0px"
                        :headers="myHeaders"
                        :action="baseUrl+'/upLoading'"
                        :data="{model:'publish'}"
                        :show-file-list="false"
                        :on-success="quillImgSuccess"
                        >
                    </el-upload>
                    <quill-editor
                        :disabled="!isEdit"
                        v-model="activeDetails.activitiesContent"
                        ref="myQuillEditor"
                        :options="editorOption">
                    </quill-editor>
                </el-form-item>
                <el-form-item label="关键词搜索：">
                    <el-col :span="10" style="min-width:378px">
                        <el-input :readonly="!isEdit" v-model="searchKeyInput3" placeholder="最多5个标签"></el-input>
                    </el-col>
                    <button type="button" :disabled="!isEdit" @click="addSearchKey2" style="cursor:pointer;padding:11px 10px;font-size:14px;background:rgba(252,252,252,1);border-radius:0px 2px 2px 0px;border:1px solid rgba(237,237,237,1);">
                        <i class="el-icon-plus"></i>
                    </button>
                </el-form-item>
                <el-form-item prop="" label="关键词：">
                    <el-tag
                        style="margin-right:10px"
                        v-for="(item,index) in activeDetails.words" :key="index"
                        :closable="isEdit"
                        @close="keyDataClose3(item)"
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
                        maxlength="50"
                        placeholder="此处为不通过原因(50字以内)"
                        v-model="turnDownForm.opinion">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <button @click="confirmTurnDown" :disabled="isDisabled" style="background:rgba(251,251,251,1);border-radius:3px;padding:5px 20px;color:#828282;margin-right:30px;cursor:pointer">确定</button>
                <button @click="cancelTurnDown" style="background:linear-gradient(36deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);border-radius:3px;padding:5px 20px;color:white;cursor:pointer">取消</button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import  uploadUrl  from '@/request/uploadUrl'
    import { toolbarOptions , proTemplate } from "../../util/commonData";
    import {
      getAllProvince,
      getProvinceAllCity,
      getListSkillArea,
      getListUserArea,
      getListProcessType,
      getListFruitType,
      getAllFinancingType,
      getProDetailById,
      getActiveType,
      reqActiveDetails,
      reqActivePass,
      reqActiveReject,
      reqmodifyActive
    } from "./api";
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
              isAddMoney:false,
              ActiveMethodsData:[{
                  value: 0,
                  label: '线上活动'
                }, {
                  value: 1,
                  label: '线下活动',
                  disabled: true
                },],
                searchKeyInput3:'',
                searchKeyInput2:'',
                searchKeyInput1:'',
                isDisabled:false,
                key: "value",
                myHeaders:{},
                baseUrl:uploadUrl.uploadUrl,//图片上传地址，方便测试
                rowId:'',
                videoFlag:false,
                videoEndFlag:false,
                cascaderProps:{
                lazy: true,
                lazyLoad: (node,resolve)=>{
                  const { level } = node;
                  let data={
                    provinceId:node.value
                  }
                  !node.value?''
                    :getProvinceAllCity(data).then(res=>{
                      if(res.data.data){
                        let data=res.data.data;
                        const nodes=data.map(item => ({
                          value: item.regionId,
                          label: item.name,
                          leaf: level >=2
                        }));
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
                        { min: 1, max: 200, message: '活动名称200字以内', trigger: 'blur' }
                    ],
                },
                // optionsArea:provinceAndCityData,
                form:{
                    startEndTime:[],
                    isChecked:false,
                    activitiesIndustry:[],
                    activitiesMode:'',
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
                    photos:[],
                    proveUrl:[],
                    provinceId:'',
                    cityId:'',
                    createId:'',
                    areaId:''
                },
                rules:{
                  provinceId : [{ required: true, message: '省份必须选择！', trigger: 'blur' },],
                  cityId: [{ required: true, message: '城市必须选择！', trigger: 'blur' },],
                  areaId: [{ required: true, message: '地区必须选择！', trigger: 'blur' },],
                  activitiesTopic : [
                        { required: true, message: '活动名称必须输入！', trigger: 'blur' },
                        { min: 1, max: 30, message: '活动名称30字以内', trigger: 'blur' }
                    ],
                  address:[{ required: true, message: '详细地址必须输入!' , trigger: 'blur' },
                         { min: 1, max: 30, message: '详细地址30字以内', trigger: 'blur' }
                   ],
                  regNumber:[{required: true, message: '人数必须输入!' , trigger: 'blur' }],
                  startEndTime:[{required: true, message: '活动起止时间必须选择!' , trigger: 'blur' }],
                  activitiesTypeName:[{required: true, message: '活动类型必须选择!' , trigger: 'blur' }],
                  regEndTime:[{required: true, message: '报名截止时间必须选择!' , trigger: 'blur' }],
                  contact:[{required: true, message: '联系人必须输入!' , trigger: 'blur' }],
                  phoneNumber: [
                        { required: true, message: '联系电话必须输入!' , trigger: 'blur' },
                    ],
                   organizers : [
                        { type: 'array', required: true, message: '请填入主办单位' }
                    ],
                  activitiesIndustry : [{ required: true, message: '请选择活动领域' }]
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
                activeDetails:{
                  activitiesTopic:'',//活动名称
                  startEndTime:[],
                },
               ActiveTypeData:[],
               areaData:[],
               areaDatas:'',
              ActiveFildData:[], //活动领域
            }
        },
        watch:{

        },
        methods: {
          //活动领域改变
          handleActivitiesIndustry(){
            console.log(this.form.activitiesIndustry)
          },
          //获取活动类型
          getActivityType(){
            let params = {
              type:'activities_type'
            }
            getActiveType(params).then(res=>{
              if (res.data.errcode===0){
                this.ActiveTypeData = res.data.data.children;
                console.log('活动类型',this.ActiveTypeData)
              }
            })
          },
          //获取活动领域
          getActivityFilds(){
            let params = {
              type:'activities_industry'
            }
            getActiveType(params).then(res=>{
              if (res.data.errcode===0){
                this.ActiveFildData = res.data.data.children;
                console.log('活动领域',this.ActiveFildData)
              }
            })
          },
          //时间格式化函数
          renderTime(date){
            var dateee = new Date(date).toJSON();
            return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
          },
          //城市改变
          handleAreaChange(val){
            console.log(this.activeDetails.selectedOptions)
          },
            //活动类型
           handleActiveType(val){
             console.log(val)
           },
            //获取活动详情
            reqActiveDetails(){
              let id = this.$route.query.id;
              let params = {id};
              reqActiveDetails(params).then(res=>{
                console.log('活动详情',res.data.data)
                if (res.data.errcode===0){
                     this.activeDetails = res.data.data;
                     this.form.startEndTime = [res.data.data.startTime,res.data.data.endTime];
                     let arr = [];
                     // this.activeDetails.imgAddrs=this.activeDetails.imgAddrs.split(',');
                     let imgAddrs = this.activeDetails.imgAddrs;
                     imgAddrs?this.form.photos=[{uid:imgAddrs,url:imgAddrs}]:''

                     this.activeDetails.selectedOptions = [this.activeDetails.provinceId,this.activeDetails.cityId,this.activeDetails.districtId]
                     this.activeDetails.coOrganizers = this.activeDetails.coOrganizers?this.activeDetails.coOrganizers.split(','):[];
                     this.activeDetails.organizers = this.activeDetails.organizers?this.activeDetails.organizers.split(','):[]
                     this.activeDetails.imgAddrs = arr
                     this.activeDetails.areaId = this.activeDetails.districtId;
                     this.getAllCityData(this.activeDetails.provinceId,true);
                     this.getAllAreaData(this.activeDetails.cityId,true);
                     this.$nextTick(()=>{
                       this.form.provinceId = this.activeDetails.provinceId;
                       // console.log('-------------------',this.activeDetails.activitiesIndustry)
                       this.form.activitiesIndustry = this.activeDetails.activitiesIndustry?this.activeDetails.activitiesIndustry.split(','):'';
                       // console.log('...............',this.form.activitiesIndustry)
                       this.activeDetails.isFee===1?this.form.isChecked=false:this.form.isChecked=true;
                       console.log('this.form.isChecked',this.form.isChecked)
                     })
                      this.form.activitiesMode  =   this.activeDetails.activitiesMode;




                }
              })
            },
            //估值输入框值改变
            valuInputChange(value){
                if (value){
                  this.form.isChecked = false;
                }
            },
            //复选框事件
            checkBoxChange(val){
                // console.log(val)
                if (val){
                  this.isAddMoney=true;
                  this.activeDetails.regFee='';
                }else {
                  this.isAddMoney=false;
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
                if (res.ret) {
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
                 console.log('this.searchKeyInput1',this.searchKeyInput1)
                 if (this.searchKeyInput1==''){
                   this.$message({
                     message: '请输入主办单位内容!',
                     type: 'warning'
                   });
                   return
                 }
                if( this.activeDetails.organizers.length<10 && this.activeDetails.organizers.indexOf(this.activeDetails.organizers)==-1){
                    this.activeDetails.organizers.push(this.searchKeyInput1);
                }else{

                }
                this.searchKeyInput1='';

            },
          addSearchKey1(){
            console.log('this.searchKeyInput1',this.searchKeyInput2)
            if (this.searchKeyInput2==''){
              this.$message({
                message: '请输入协办单位内容!',
                type: 'warning'
              });
              return
            }
            if( this.activeDetails.coOrganizers.length<10 && this.activeDetails.coOrganizers.indexOf(this.activeDetails.coOrganizers)==-1){
              this.activeDetails.coOrganizers.push(this.searchKeyInput2);
            }else{

            }
            this.searchKeyInput2='';
          },
          addSearchKey2(){
            console.log('this.searchKeyInput1',this.searchKeyInput3)
            if (this.searchKeyInput3==''){
              this.$message({
                message: '请输入关键词!',
                type: 'warning'
              });
              return
            }
            if( this.activeDetails.words.length<5 && this.activeDetails.words.indexOf(this.activeDetails.words)==-1){
              this.activeDetails.words.push(this.searchKeyInput3);
            }else{

            }
            this.searchKeyInput3='';
          },
            //删除关键词
            keyDataClose1(item){
              this.activeDetails.organizers.splice(this.activeDetails.organizers.indexOf(item), 1);
            },
          //删除关键词
          keyDataClose2(item){
            this.activeDetails.coOrganizers.splice(this.activeDetails.coOrganizers.indexOf(item), 1);
          },
          //删除关键词
          keyDataClose3(item){
            this.activeDetails.words.splice(this.activeDetails.words.indexOf(item), 1);
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
            //获取所有区
           cityChange(item){
             if(item){
               this.form.areaId='';
               this.areaData=[];
               this.getAllAreaData(item);
             }
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
            getAllCityData(item,isFirst){
                let data={
                    provinceId:item
                }
                getProvinceAllCity(data).then(res=>{
                    // console.log('resfshgfhsgh',res);
                    if(res.data.data){
                        this.cityData=res.data.data
                        if(isFirst){
                          this.$nextTick(()=>{
                            this.form.cityId = this.activeDetails.cityId;
                          })
                        }
                    }
                });
            },
          //获取市下的区
          getAllAreaData(item,isFirst){
            let data={
              provinceId:item
            }
            getProvinceAllCity(data).then(res=>{
              // console.log('resfshgfhsgh',res);
              if(res.data.data){
                this.areaData=res.data.data
                console.log(res.data.data)
                if(isFirst){
                  this.$nextTick(()=>{
                    this.form.areaId = this.activeDetails.districtId;
                  })
                }
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
                // console.log("获取");
                // console.log(proTemplate);

                this.form.detail=proTemplate;
            },
            //自定义面板
            clearTemplate(){
                this.form.detail='';
            },
            //保存
            saveDetail(){
                this.$refs["form"].validate((valid) => {
                  if (valid) {
                      if (this.form.provinceId===''){
                        this.$message({
                          message: '请选择所在省份',
                          type: 'warning'
                        });
                        return
                      }
                    if (this.form.cityId===''){
                      this.$message({
                        message: '请选择所在城市',
                        type: 'warning'
                      });
                      return
                    }
                    if (this.form.areaId===''){
                      this.$message({
                        message: '请选择所在地区',
                        type: 'warning'
                      });
                      return
                    }
                    if (this.form.activitiesIndustry===''){
                      this.$message({
                        message: '请选择活动领域',
                        type: 'warning'
                      });
                      return
                    }

                    if (this.form.activitiesMode===''){
                      this.$message({
                        message: '请选择活动方式',
                        type: 'warning'
                      });
                      return
                    }
                    if (this.activeDetails.regFee===''&&!this.form.isChecked){
                      this.$message({
                        message: '请选择或输入报名费',
                        type: 'warning'
                      });
                      return
                    }
                    if (this.form.activitiesMode===''){
                      this.$message({
                        message: '请选择活动方式',
                        type: 'warning'
                      });
                      return
                    }
                    if (this.form.startEndTime===''){
                      this.$message({
                        message: '请选择活动起止时间',
                        type: 'warning'
                      });
                      return
                    }
                      let paramsForm = {};
                      let {activitiesTopic,address,regFee,regNumber,regEndTime,organizers,coOrganizers,words,activitiesContent,contact,phoneNumber,activitiesTypeName}  = this.activeDetails
                      let {provinceId,cityId,areaId,activitiesIndustry,activitiesMode,isChecked,startEndTime,photos} = this.form;
                      // console.log('startEndTime',startEndTime)
                      let id = this.$route.query.id;
                      let startTime = startEndTime[0];
                      let endTime = startEndTime[1];
                      let isFee = 0;
                      isChecked?isFee = 0:isFee = 1;
                      activitiesIndustry= activitiesIndustry?activitiesIndustry.join(','):'';
                      // console.log('photos',photos[0].url)
                      let imgAddrs = photos.length>0?photos[0].url:'';
                      console.log('activitiesTypeName',activitiesTypeName)
                      var activitiesType = '';
                      this.ActiveTypeData.forEach((item,key)=>{
                        console.log(item)
                        if (item.value===activitiesTypeName){
                          activitiesType = item.code
                        }
                      })
                      organizers = organizers?organizers.join(','):'';
                      coOrganizers = coOrganizers?coOrganizers.join(','):'';
                      words = words?words.join(','):'';
                      paramsForm = {activitiesTopic,provinceId,cityId,
                        districtId:areaId,activitiesIndustry,activitiesMode,
                        address,isFee,regFee,regNumber,startTime,
                        endTime,regEndTime,organizers,coOrganizers,words,activitiesContent,contact,phoneNumber,imgAddrs,id,activitiesType};
                      console.log('paramsForm',paramsForm)
                    reqmodifyActive(paramsForm).then(res=>{
                    console.log('xiugai',res)
                      if (res.data.errcode===0){
                        this.$message({
                          message: res.data.data,
                          type: 'success'
                        });
                        this.reqActiveDetails();
                        this.isEdit = false;
                      }else {
                        this.$message.error(res.data.data)
                      }
                 })
                  }

                })
            },
            //编辑
            editDetail(){
                this.isEdit=true;
            },
            openTurnDown(){
                this.turnDownForm.opinion='';
            },
            //防抖
            antiShake(){
              this.isDisabled = true;
              setTimeout(()=>{
                this.isDisabled = false;
              },2000)
            },
            //确认驳回
            confirmTurnDown(){
                this.antiShake();
                this.$refs["turn_down_form"].validate((valid) => {
                    if (valid) {
                      let id = this.$route.query.id;
                      console.log(this.$route.query.id)
                      let params = {id}

                      params.approvalOpinion = this.turnDownForm.opinion;
                      reqActiveReject(params).then(res=>{
                           console.log('驳回活动',res)
                        if (res.data.errcode===0){
                          this.$message({
                            message:'驳回成功',
                            type:'success'
                          })
                         this.dialogTurnDownVisible = false;
                          this.reqActiveDetails();
                        }else {
                          this.$message.error('驳回成功');
                        }
                      })
                    } else {
                        // console.log('error submit!!');
                        return false;
                    }
                })
            },
            cancelTurnDown(){
                this.dialogTurnDownVisible=false;
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
                        // console.log('this.form.startVideo',this.form.startVideo);
                        for(let i=0;i<this.form.endVideo.length;i++){
                            let obj={};
                            obj.uid=this.form.endVideo[i];
                            obj.url=this.form.endVideo[i];
                            this.form.endVideo.splice(i,1,obj)
                        }
                        // console.log('this.form.endVideo',this.form.endVideo);
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
                        if(this.form.proveUrl){
                            for(let i=0;i<this.form.proveUrl.length;i++){
                                let obj={};
                                obj.uid=this.form.proveUrl[i];
                                obj.url=this.form.proveUrl[i];
                                this.form.proveUrl.splice(i,1,obj);
                            }
                        }else{
                            this.form.proveUrl=[];
                        }

                        this.getAllCityData(this.form.provinceId);
                        // this.form.fruitType='';
                    }
                })
            },
          //通过活动
            handlePass(){
              if (this.isEdit){
                this.$message({
                  message: '请先保存内容!',
                  type: 'warning'
                });
                return false
              }
              let id = this.$route.query.id;
              console.log(this.$route.query.id)
              let params = {id}
              reqActivePass(params).then(res=>{
                if (res.data.errcode===0){
                  this.$message({
                    message: '审核成功',
                    type: 'success'
                  });
                  this.reqActiveDetails();
                }
                console.log(res.data.errcode)
              })
            },
          //下线活动
          handleCloseActive(){

            this.dialogTurnDownVisible = true;
          },
          handleTimeChange(val){
              console.log(val)
          }
        },
        created () {
            this.myHeaders.token=sessionStorage.token;
            this.getAllPrivinceData();
            this.getActivityFilds();
            this.reqActiveDetails();
            this.getActivityType();
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
  .auditActiveSelf {
    .redIcon {
      .el-form-item__label:before {
        content: '*';
        color: #F56C6C;
        margin-right: 4px;
      }
    }
  }
</style>
