<template>
    <div class="auditMainList" style="padding:32px 40px">
        <div>
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap">
                <div>
                    <span @click="statusClick(item,key)" :style="{position:'relative',fontSize:'16px',cursor:'pointer',fontWeight:500,color:key==statusClickIndex?'#2BB1E8':'#333333',borderRight:(key!=manageAuditType.length-1)?'1px solid #D2D2D2':'',paddingRight:'32px',paddingLeft:(key!=0)?'32px':'0',}" v-for="(item,key) in manageAuditType" :key="key">
                        {{item.label}}
                        <span v-show="item.value==='0'&&item.num" style="position:absolute;top:-10px;border-radius:50%;font-size:12px;padding:2.5px;background:#FD2044;color:white;margin-left:-3px">{{item.num?item.num:''}}</span>
                    </span>
                </div>
                <div style="font-size: 0">
                    <input v-model="formInline.keyWord" placeholder="请输入项目名称或发布单位" style="width:280px;height:34px;border:1px solid #01A2E4;border-radius:4px 0px 0px 4px;padding-left:10px;outline: none" type="text">
                    <span @click="searchTableList" style="cursor:pointer;font-size:14px;font-weight:500;color:white;padding:9.5px 22px;background:linear-gradient(126deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);">
                        <i class="el-icon-search"></i>
                        搜索
                    </span>
                </div>
            </div>
            <el-form :inline="true" :model="formInline" style="display:flex;flex-wrap:wrap;justify-content:space-between;margin-top:20px" class="demo-form-inline">
                <el-form-item label="">
                    <el-select size="small" clearable style="width:100%;" @change="handleSelect" v-model="formInline.useArea" placeholder="应用领域">
                        <el-option v-for="item in UserAreaData" :key="item.id" :label="item.desc" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="skillArea" label="">
                    <el-select size="small" @change="handleSelect" clearable style="width:100%" v-model="formInline.skillArea" placeholder="技术领域">
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
                <el-form-item label="">
                    <el-select size="small" @change="handleSelect" clearable style="width:100%" v-model="formInline.fruitType" placeholder="成果类型">
                        <el-option v-for="item in FruitTypeData" :key="item.id" :label="item.desc" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-select size="small" @change="handleSelect" clearable style="width:100%" v-model="formInline.processType" placeholder="当前阶段">
                        <el-option v-for="item in ProcessTypeData" :key="item.id" :label="item.desc" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-select size="small" @change="handleSelect" clearable style="width:100%" v-model="formInline.financingType" placeholder="融资阶段">
                        <el-option v-for="item in FinancingTypeData" :key="item.id" :label="item.desc" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-select size="small" @change="handleSelect" clearable v-model="formInline.yourWant" placeholder="诉求">
                        <el-option v-for="item in AppealData" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-cascader
                        size="small"
                        clearable
                        v-model="formInline.selectedOptions"
                        placeholder="请选择所在地区"
                        :options="optionsArea"

                        @change="handleAreaChange"
                        :props="cascaderProps"
                    ></el-cascader>
                </el-form-item>
                <el-form-item label="">
                    <el-select size="small" @change="handleSelect" clearable v-model="formInline.cooperateType" placeholder="归属方性质">
                        <el-option v-for="item in OwnershipData" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
              <el-form-item  label=""  >
                <el-select v-show="isPass"  size="small" @change="handleTopChange" clearable v-model="formInline.topState" placeholder="置顶状态">
                  <el-option v-for="(item,key) in topData" :key="key" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
                <el-form-item class="nomarginbottom" style="height:0;overflow:hidden" label="">
                    <el-select size="small" v-model="formInline.region" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="nomarginbottom" style="height:0;overflow:hidden" label="">
                    <el-select size="small" v-model="formInline.region" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="nomarginbottom" style="height:0;overflow:hidden" label="">
                    <el-select v-model="formInline.region" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="nomarginbottom" style="height:0;overflow:hidden" label="">
                    <el-select v-model="formInline.region" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
              <el-form-item class="nomarginbottom" style="height:0;overflow:hidden" label="">
                <el-select v-model="formInline.region" placeholder="活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
        </div>
        <div>
            <el-table
                :data="tableData"
                :header-row-style="theadRowStyle"
                :cell-style="cellStyleFunc"
                :header-cell-style="theadRowCellStyle"
                ref="multipleTable"
                @selection-change="checkboxChange"
                style="width: 100%">
                <el-table-column
                    type="selection"
                    width="45">
                </el-table-column>
                <el-table-column
                    prop="projectName"
                    label="项目名称"
                    width="">
                    <template slot-scope="scope">
                        <div style="display:flex;flex-wrap:wrap">
                            <span>{{scope.row.projectName}}</span>
<!--                            <span v-if="scope.row.topState" style="border:1px solid rgba(43,177,232,1);color:#01A2E4;padding:0px 3px;border-radius:4px;font-size:12px;box-shadow:0px 0px 4px 3px rgba(237,236,255,0.37);">置顶</span>-->
<!--                            <span v-if="scope.row.approvalState==4&&scope.row.isRecommend" style="border:1px solid #A7A7A7;color:color:#A7A7A7;padding:0px 3px;border-radius:4px;font-size:12px;box-shadow:0px 0px 4px 3px rgba(237,236,255,0.37);">置顶</span>-->
                            <!-- {{scope.row.projectName+'/'+scope.row.cityName}} -->
                          <el-tag style="margin: 0 3px" size="mini" v-if="scope.row.topState===0||scope.row.topState===1" type="success">置顶</el-tag>
                          <el-tag style="margin: 0 3px" size="mini" v-if="scope.row.topState===0">未开始</el-tag>
                          <el-tag style="margin: 0 3px" size="mini" v-if="scope.row.topState===1">进行中</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="yourWant"
                    label="项目诉求">
                    <template slot-scope="scope">
                        <div>
                            {{scope.row.yourWant && scope.row.yourWant.length>0?scope.row.yourWant.join():''}}
                            <!-- {{scope.row.provinceName+'/'+scope.row.cityName}} -->
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="companyName"
                    label="发布单位"
                    width="">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    width="120"
                    label="提交时间">
                </el-table-column>
                <el-table-column
                    prop="processType"
                    width="100"
                    label="当前进度">
                    <template slot-scope="scope">
                        <div style="box-sizing: border-box;padding-left: 10px">
                            <span class="circle-4" v-if="scope.row.approvalState==4">{{scope.row.approvalStateLabel}}</span>
                            <span class="circle-2" v-else-if="scope.row.approvalState==0">{{scope.row.approvalStateLabel}}</span>
                            <span class="circle-1"  v-else-if="scope.row.approvalState==1">{{scope.row.approvalStateLabel}}</span>
                            <span class="circle-3" v-else-if="scope.row.approvalState==2">{{scope.row.approvalStateLabel}}</span>
                            <span v-else></span>
                            <!-- {{scope.row.approvalState==4?'已下线':scope.row.approvalState==0?'待审核':scope.row.approvalState==1?'发布中':scope.row.approvalState==2?'未通过':''}} -->
                            <!-- {{scope.row.processTypeStr && scope.row.processTypeStr.length>0?scope.row.processTypeStr.join():''}} -->
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="140">
                    <template slot-scope="scope">
                        <el-button type="text" size="small">
                            <span @click="seen(scope.row)" style="color:#2BB1E8;font-size:14px" >
                                查看
                            </span>
                        </el-button>
                        <!-- <div> -->
                        <el-dropdown style="display:inline-block;margin-left:10px" placement="right">
                            <span style="color:#2BB1E8;font-size:14px;cursor: pointer" class="el-dropdown-link">
                                更多<i  class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="deleteRow(scope.row)">删除</el-dropdown-item>
                                <el-dropdown-item @click.native="offlineRow(scope.row)" :disabled="scope.row.approvalState==1?false:true">{{scope.row.approvalState==4?'已下线':'下线'}}</el-dropdown-item>
                                <el-dropdown-item @click.native="recommendRow(scope.row)" :disabled="scope.row.approvalState==1?false:true">{{scope.row.topState===0||scope.row.topState===1?'取消置顶':'设为置顶'}}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
            <div style="display:flex;justify-content:space-between;margin-top:24px">
                <div>
                    <span>
                        <el-checkbox @change='checkChoose' v-model="isAllChecked">全选</el-checkbox>
                    </span>
                    <button style="margin-left:10px" :disabled="isAllowedButtonClick.batchDeleteButton" @click="batchPro(1)" class="bottom_table_button">删除</button>
                    <button v-show="formInline.approvalState==='1'" @click="setRecommend" :disabled="isAllowedButtonClick.batchRecommendButton" class="bottom_table_button">设为置顶</button>
                    <button @click="batchPro(3)" :disabled="isAllowedButtonClick.batchTrunOther" class="bottom_table_button">转经纪人</button>
                </div>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="formInline.pageIndex"
                    :pager-count="5"
                    :page-sizes="[10, 20, 40, 100]"
                    :page-size="formInline.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalAll">
                </el-pagination>
            </div>
        </div>
      <el-dialog
        title="置顶设置"
        :visible.sync="dialogVisible"
        width="584px"
        class="release-dialag"
        :before-close="handleClose">
        <el-form ref="form" :model="form" :rules="rules"  label-width="120px">
          <el-form-item label="置顶起止时间" prop="startEndTime">
            <el-date-picker
              size="small"
              style="width: 312px"
              v-model="form.startEndTime"
              type="datetimerange"
              value-format="yyyy/MM/dd hh:mm:ss"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions1"
              :default-time="['12:00:00']">
            </el-date-picker>
          </el-form-item>
          <div style="padding-top: 4px">
            <i style="color: red;display: inline-block;" class="el-icon-warning"></i>
            <span style="font-size:14px;font-weight:400;color:rgba(133,133,133,1);">注：设置后，内容将在首页及列表页置顶展示，置顶时间到期后取消置顶展示</span>
          </div>

        </el-form>

        <span slot="footer" class="dialog-footer">
           <el-button @click="dialogVisible = false" style="color: #828282;height:28px;line-height:0px;background:rgba(251,251,251,1);border-radius:3px;border:1px solid rgba(219,219,219,1);">取 消</el-button>
           <el-button type="primary" style="height:28px;line-height:0px;border:none;background:linear-gradient(36deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);border-radius:3px;" @click="handleTopSetting">确 定</el-button>
        </span>
      </el-dialog>

    </div>
</template>

<script>
import { getAllProvince ,reqSetTop, getProvinceAllCity , getListSkillArea , getListUserArea , getListProcessType , getListFruitType , getAllFinancingType , getProjectList , offLineFun , deleteProFun , cancelTop , batchDeleteProFun , batchRecommendProFun } from "./api";
import {reqBatchTopping} from "../activityAudit/api";
    export default {
        data() {
            return {
              topData:[
                {
                  value:0,
                  label:'置顶未开始'
                },
                {
                  value:1,
                  label:'置顶进行中'
                },
                {
                  value:-1,
                  label:'未置顶'
                },
              ],
              isPass:false,
               pickerOptions1: {
                 disabledDate(time) {
                   return time.getTime() < Date.now() - 8.64e7;//如果没有后面的-8.64e7就是不可以选择今天的
                 }
               },
               selectRow: {},
                form:{
                  startEndTime:'',
                },
                rules:{
                  startEndTime:[
                    { required: true, message: '请选择置顶起止时间', trigger: 'change' }
                    ],
                },
                dialogVisible:false,
                key: "value",
                isAllowedButtonClick:{
                    batchRecommendButton:false,
                    batchDeleteButton:false,
                    batchTrunOther:false,
                },
                OwnershipData : ['企业', '高校', '科研院所','个人团队','其他'],
                AppealData : ['项目融资', '项目落地', '技术交易','招人才','其他'],
                SkillAreaData:[],
                UserAreaData:[],
                ProcessTypeData:[],
                FruitTypeData:[],
                FinancingTypeData:[],
                totalAll:0,
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
                                    leaf: level >=1
                                }));
                                resolve(nodes);
                            }
                        });
                    }
                },
                statusClickIndex:0,
                manageAuditType:[
                    {label:'全部',value:''},
                    {label:'待审核',value:'0',num:0},
                    {label:'未通过',value:'2'},
                    {label:'发布中',value:'1'},
                    {label:'已下线',value:'4'},
                ],
                optionsArea:[],
                formInline:{
                    keyWord:'',
                    pageSize:10,
                    pageIndex:1,
                    userArea:'',
                    fruitType:'',
                    processType:'',
                    financingType:'',
                    skillArea:'',
                    yourWant:'',
                    cooperateType:'',
                    state:'',
                    approvalState:'',
                    selectedOptions:[],
                },
                isAllChecked:false,
                checkboxSelected:[],
                tableData:[
                ]
            }
        },
        methods: {
          //设为置顶
          setRecommend(){
            this.dialogVisible = true;
          },
          //置顶改变
          handleTopChange(val){
            this.formInline.topState = val;
            this.fetch();
          },
           //置顶确定
          handleTopSetting(isPath=false){
            this.checkboxSelected.length>0?isPath=true:isPath=false;
            this.$refs['form'].validate((valid) => {
              if (valid) {
                //批量置顶
                if (isPath){
                  let ids=[];
                  console.log('this.checkboxSelected',this.checkboxSelected)
                  for(let i=0;i<this.checkboxSelected.length;i++){
                    ids.push({
                      mainId:this.checkboxSelected[i].projectId,
                      linkUserId:this.checkboxSelected[i].createId,
                    });
                  }
                  let params = [];
                  ids.forEach((item,key)=>{
                    let paramsItem = {};
                    paramsItem.type = 'project';
                    paramsItem.mainId = item.mainId;
                    paramsItem.linkUserId = item.linkUserId;
                    paramsItem.startTime = this.form.startEndTime[0];
                    paramsItem.endTime = this.form.startEndTime[1];
                    params.push(paramsItem)
                  })
                  console.log(params)
                  reqBatchTopping(params).then(res=>{
                    console.log(res)
                    if (res.data.errcode==0){
                      this.$message.success('批量置顶成功');
                      this.dialogVisible = false;
                      this.fetch()
                    }
                  })
                  //单个
                }else {
                  let params = {};
                  params.startTime = this.form.startEndTime[0];
                  params.endTime = this.form.startEndTime[1];
                  params.type = 'project';
                  params.mainId = this.selectRow.projectId;
                  params.linkUserId = this.selectRow.createId;
                  reqSetTop(params).then(res=>{
                    console.log(res)
                    if (res.data.errcode==0){
                      this.$message.success('置顶成功');
                      this.dialogVisible = false;
                      this.fetch()
                    }
                  })
                }
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
           //关闭弹窗
            handleClose(done) {
                this.dialogVisible = true;
              },
            //设置表格样式
            cellStyleFunc(row,column,roeIndex){
                // #A7A7A7
                if(row.row.approvalState==4){
                    return 'color:#A7A7A7'
                }
            },
            theadRowStyle(){
                return "color:#333333;font-size:14px;font-weight:500;height:20px;line-height:20px;background:rgba(250,250,252,1);"
            },
            theadRowCellStyle(){
                return 'background:rgba(250,250,252,1);'
            },
            handleSelect(){
                this.fetch();
            },
            statusClick(item,key){
                if(this.statusClickIndex!=key){
                    this.statusClickIndex=key;
                    // if(item.value==3){
                    //     this.formInline.state=1;
                    //     this.formInline.approvalState='';
                    // }else{
                    //     this.formInline.state='';
                    //     this.formInline.approvalState=item.value;
                    // }
                    item.value==1?this.isPass=true:this.isPass=false;
                    this.formInline.approvalState=item.value;
                    this.formInline.pageIndex=1;
                    this.fetch();
                }
            },
            handleSizeChange(val) {
                this.formInline.pageSize=val;
                this.formInline.pageIndex=1;
                this.fetch();
            },
            handleCurrentChange(val) {
                this.formInline.pageIndex=val;
                this.fetch();
            },
            // 复选框全选事件
            checkChoose(){
                this.$refs.multipleTable.toggleAllSelection();
            },
            checkboxChange(selection){
                this.checkboxSelected=selection;
                if(selection.length!=this.tableData.length){
                    this.isAllChecked=false
                }else{
                    this.isAllChecked=true;
                }
            },
            handleAreaChange(val){
                this.formInline.pageIndex=1;
                this.fetch();
            },
            seen(row){
                this.$router.push({path:'/index/releaseAudit/AuditRelease',query:{id:row.projectId}})
            },
            //获取所有的省
            getAllPrivinceData(){
                getAllProvince().then(res=>{
                    if(res.data.ret){
                        this.optionsArea = res.data.data;
                        for(let i=0;i<this.optionsArea.length;i++){
                            this.optionsArea[i].label=this.optionsArea[i].name;
                            this.optionsArea[i].value=this.optionsArea[i].regionId;
                        }
                    }

                });
            },
            //获取技术领域
            getAllSelectData(){
                getListSkillArea().then(res=>{
                    if(res.data.ret){
                        this.SkillAreaData=res.data.data;
                    }
                })
                getListUserArea().then(res=>{
                    if(res.data.ret){
                        this.UserAreaData=res.data.data;
                    }
                })
                getListProcessType().then(res=>{
                    if(res.data.ret){
                        this.ProcessTypeData=res.data.data;
                    }
                })
                getListFruitType().then(res=>{
                    if(res.data.ret){
                        this.FruitTypeData=res.data.data;
                    }
                })
                getAllFinancingType().then(res=>{
                    if(res.data.ret){
                        this.FinancingTypeData=res.data.data;
                    }
                })
            },
            //下线
            offlineRow(row){
                let param={};
                param.id=row.projectId;
                offLineFun(param).then(res=>{
                    this.$message({
                        type:res.data.ret?'success':'error',
                        showClose: true,
                        message:res.data.ret?'下线成功':'下线失败',
                    })
                    if(res.data.ret){
                        this.fetch();
                    }
                })
            },
            //删除
            deleteRow(row){
                let param={};
                param.id=row.projectId;
                deleteProFun(param).then(res=>{
                    this.$message({
                        type:res.data.ret?'success':'error',
                        showClose: true,
                        message:res.data.ret?'删除成功':'删除失败',
                    })
                    if(res.data.ret){
                        this.fetch();
                    }
                })
            },
            //推荐
            recommendRow(row){
               //取消置顶
               if (row.topState===0||row.topState===1){
                 console.log('取消置顶',)
                 let params = {};
                 params.type = 'project';
                 params.mainId = row.projectId
                 cancelTop(params).then(res=>{
                   console.log(res)
                   if (res.data.errcode===0){
                     this.$message.success('取消成功');
                     this.dialogVisible = false;
                     this.fetch();
                   }
                 })
               }else {
                 //置顶
                 this.selectRow = row;
                 this.form.startEndTime = '';
                 this.dialogVisible = true;
               }
            },
            //批量操作功能
            batchPro(flag){
                //根据标志判断是哪个批量操作功能
                let optionFunc=flag==1?batchDeleteProFun:flag==2?batchRecommendProFun:'';
                let str = flag==1?'批量删除':flag==2?'批量设为置顶':'';
                if(flag==1){
                    this.isAllowedButtonClick.batchDeleteButton=true;
                }
                if(flag==2){
                    this.isAllowedButtonClick.batchRecommendButton=true;
                }
                if(flag==3){
                    this.isAllowedButtonClick.batchTrunOther=true;
                }
                if(optionFunc==''){
                    this.$message({
                        type:'warning',
                        showClose: true,
                        message:'功能待开发',
                        onClose:()=>{
                            if(flag==1){
                                this.isAllowedButtonClick.batchDeleteButton=false;
                            }
                            if(flag==2){
                                this.isAllowedButtonClick.batchRecommendButton=false;
                            }
                            if(flag==3){
                                this.isAllowedButtonClick.batchTrunOther=false;
                            }
                        }
                    })
                    return false;
                }
                //判断是否选择复选框
                if(this.checkboxSelected.length==0){
                    this.$message({
                        type:'warning',
                        showClose: true,
                        message:'请选择要操作的数据',
                        onClose:()=>{
                            if(flag==1){
                                this.isAllowedButtonClick.batchDeleteButton=false;
                            }
                            if(flag==2){
                                this.isAllowedButtonClick.batchRecommendButton=false;
                            }
                            if(flag==3){
                                this.isAllowedButtonClick.batchTrunOther=false;
                            }
                        }
                    })
                    return false;
                }
                let ids=[];
                for(let i=0;i<this.checkboxSelected.length;i++){
                    ids.push(this.checkboxSelected[i].projectId);
                }
                let param={};
                param.ids=ids.join();

                optionFunc(param).then(res=>{
                    this.$message({
                        type:res.data.ret?'success':'error',
                        showClose: true,
                        message:res.data.ret?`${str}成功`:`${str}失败`,
                        onClose:()=>{
                            if(flag==1){
                                this.isAllowedButtonClick.batchDeleteButton=false;
                            }
                            if(flag==2){
                                this.isAllowedButtonClick.batchRecommendButton=false;
                            }
                            if(flag==3){
                                this.isAllowedButtonClick.batchTrunOther=false;
                            }
                        }
                    })
                    if(res.data.ret){
                        this.fetch();
                    }
                })
            },
            //获取列表数据
            fetch(){
                this.formInline.provinceId=this.formInline.selectedOptions[0];
                this.formInline.cityId=this.formInline.selectedOptions[1];
                let searchForm=JSON.parse(JSON.stringify(this.formInline));
                for(let key in searchForm){
                    if(searchForm[key]===''){
                        delete searchForm[key];
                    }
                }
                delete searchForm.selectedOptions;
                getProjectList(searchForm).then(res=>{
                    if(res.data && res.data.data){
                        this.tableData = res.data.data.data.list;
                        this.totalAll=res.data.data.data.total-0;
                        this.manageAuditType[1].num = res.data.data.count;
                    }
                })
            },
            //搜索事件
            searchTableList(){
                this.formInline.pageIndex=1;
                this.fetch();
            },
        },
        created () {
            this.getAllPrivinceData();
            this.getAllSelectData();
            this.fetch();
        },
    }
</script>

<style   lang="less">
.auditMainList{
  .release-dialag {
    .el-dialog__header {
      background:linear-gradient(36deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);
      border-radius:3px 3px 0px 0px;
      text-align: center;
      padding: 10px 20px 10px;
      .el-dialog__title{
        font-size:18px;
        font-weight:500;
        color:rgba(255,255,255,1);
      }
      .el-dialog__headerbtn {
        top: 12px;
        .el-icon-close {
          font-size: 22px;
          color: #FFFFFF;
        }
      }
    }
    .el-dialog__footer {
      text-align: center;
      padding-bottom: 47px;
    }
    .el-dialog__body {
      padding: 45px;
    }
  }
  .demo-form-inline {

  }
  .circle-1 {
    font-size:14px;
    font-weight:400;
    color:rgba(101,101,101,1);
    position: relative;
  }
  .circle-1:after {
    content: '';
    display: block;
    position: absolute;
    width:6px;
    height:6px;
    background:rgba(82,196,26,1);
    border-radius: 50%;
    left: -11px;
    top: 50%;
    transform: translateY(-50%);
  }
  .circle-2 {
    font-size:14px;
    font-weight:400;
    color:rgba(101,101,101,1);
    position: relative;
  }
  .circle-2:after {
    content: '';
    display: block;
    position: absolute;
    width:6px;
    height:6px;
    background:#FAA800;
    border-radius: 50%;
    left: -11px;
    top: 50%;
    transform: translateY(-50%);
  }
  .circle-3 {
    font-size:14px;
    font-weight:400;
    color:rgba(101,101,101,1);
    position: relative;
  }
  .circle-3:after {
    content: '';
    display: block;
    position: absolute;
    width:6px;
    height:6px;
    background:#FD2044;
    border-radius: 50%;
    left: -11px;
    top: 50%;
    transform: translateY(-50%);
  }
  .circle-4 {
    font-size:14px;
    font-weight:400;
    color:rgba(101,101,101,1);
    position: relative;
  }
  .circle-4:after {
    content: '';
    display: block;
    position: absolute;
    width:6px;
    height:6px;
    background:#656565;
    border-radius: 50%;
    left: -11px;
    top: 50%;
    transform: translateY(-50%);
  }
    .search_input .el-input__inner{
        border:1px solid #01A2E4;
        border-top-left-radius:4px;
        border-bottom-left-radius:4px;
    }
    .el-form--inline .el-form-item{
        margin-right:0px;
        margin-bottom: 12px;
        // margin-bottom:10px;
    }
    .nomarginbottom.el-form-item{
        margin-bottom:0px;
    }
    thead .el-checkbox{
        display:none;
    }
    .bottom_table_button{
        background:linear-gradient(36deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);
        border-radius:4px;
        cursor: pointer;
        padding:6px 18px;
        margin-right:14px;
        height:32px;
        border:none;
        color:white;
    }
}
</style>
