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
                    <input v-model="activeParams.keyword" @keyup.enter="searchTableList" placeholder="请输入活动名称、主办单位" style="width:280px;height:34px;border:1px solid #01A2E4;border-radius:4px 0px 0px 4px;padding-left:10px;outline: none" type="text">
                    <span @click="searchTableList" style="cursor:pointer;font-size:14px;font-weight:500;color:white;padding:9.5px 22px;background:linear-gradient(126deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);">
                        <i class="el-icon-search"></i>
                        搜索
                    </span>
                </div>
            </div>
            <el-form :inline="true" :model="formInline" style="margin-top:20px" class="demo-form-inline">
                <el-form-item label="" style="margin-right: 21px">
                    <el-select size="small" @change="handleActiveType" clearable  v-model="formInline.processType" placeholder="活动类型">
                        <el-option v-for="item in ActiveTypeData" :key="item.id" :label="item.value" :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="small" label="" style="margin-right: 21px;margin-top: 3px">
                    <el-select @change="handleFildType" clearable  v-model="formInline.financingType" placeholder="活动领域">
                        <el-option v-for="item in ActiveFildData" :key="item.id" :label="item.value" :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
              <el-form-item label="" style="margin-right: 21px">
                <el-cascader
                  clearable
                  size="small"
                  v-model="formInline.selectedOptions"
                  placeholder="活动地区"
                  :options="optionsArea"
                  @change="handleAreaChange"
                  :props="cascaderProps"
                ></el-cascader>
              </el-form-item >
                <el-form-item label="" style="margin-right: 21px" v-show="isPass">
                    <el-select @change="handleStateChange" size="small" clearable v-model="formInline.yourWant" placeholder="报名状态">
                        <el-option v-for="item in AppealData" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>

              <el-form-item label="" style="margin-right: 21px">
                <el-date-picker
                  size="small"
                  v-model="value1"
                  type="datetime"
                  @change="handleTimeChange"
                  format="yyyy/MM/dd HH:mm"
                  value-format="yyyy/MM/dd HH:mm"
                  placeholder="活动截止报名时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item  label="" style="margin-right: 21px" >
                <el-select v-show="isPass"  size="small" @change="handleTopChange" clearable v-model="formInline.topState" placeholder="置顶状态">
                  <el-option v-for="(item,key) in topData" :key="key" :label="item.label" :value="item.value"></el-option>
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
                prop="activitiesTopic"
                min-width="150"
                label="活动名称">
                <template slot-scope="scope">
                <div style="display:flex;flex-wrap:wrap">
                  <span>{{scope.row.activitiesTopic}}</span>
                  <el-tag style="margin: 0 3px" size="mini" v-if="scope.row.topState===0||scope.row.topState===1" type="success">置顶</el-tag>
                  <el-tag style="margin: 0 3px" size="mini" v-if="scope.row.topState===0">未开始</el-tag>
                  <el-tag style="margin: 0 3px" size="mini" v-if="scope.row.topState===1">进行中</el-tag>
                  <el-tag style="margin: 0 3px" size="mini" v-if="scope.row.topState===2">已结束</el-tag>
                </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="regFee"
                width=""
                label="活动费用">
                <template slot-scope="scope">
                  <div>
                    <span v-if="scope.row.isFee ==0">免费</span>
                    <span v-if="scope.row.isFee ==1">{{scope.row.regFee + '元/人'}}</span>
                  </div>
                </template>
              </el-table-column>
                <el-table-column
                    prop="regNumber"
                    label="活动名额"
                    width="">
                  <template slot-scope="scope">
                    <span>{{scope.row.regNumber + '人'}}</span>
                  </template>
                </el-table-column>

              <el-table-column
                prop="endTime"
                width="150"
                label="报名截止时间">
              </el-table-column>
                <el-table-column
                    prop="createTime"
                    width=""
                    label="提交时间">
                  <template slot-scope="scope">
                    <span>{{scope.row.createTime?scope.row.createTime.substring(0,10):''}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    prop="status"
                    width=""
                    label="审核状态">
                    <template slot-scope="scope">
                        <div style="box-sizing: border-box;padding-left: 10px">
                            <span class="circle-4"  v-if="scope.row.approvalStatus==4">{{scope.row.approvalStateLabel}}</span>
                            <span class="circle-2" v-else-if="scope.row.approvalStatus==0">{{scope.row.approvalStateLabel}}</span>
                            <span class="circle-1" v-else-if="scope.row.approvalStatus==1">{{scope.row.approvalStateLabel}}</span>
                            <span class="circle-3" v-else-if="scope.row.approvalStatus==2">{{scope.row.approvalStateLabel}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作列"
                    width="140">
                    <template slot-scope="scope">
                        <el-button type="text" size="small">
                            <span @click="seen(scope.row)" style="color:#2BB1E8;font-size:14px" >
                                查看
                            </span>
                        </el-button>
                        <!-- <div> -->
                        <el-dropdown style="display:inline-block;margin-left:10px" placement="right">
                            <span style="color:#2BB1E8;font-size:14px;cursor: pointer" class="el-dropdown-link" >
                                更多<i class="el-icon-arrow-down el-icon--right" ></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <!-- <el-dropdown-item>{{scope.row.name}}</el-dropdown-item> -->
                                <el-dropdown-item @click.native="deleteRow(scope.row)" :disabled="scope.row.approvalStatus===1" >删除</el-dropdown-item>
                                <el-dropdown-item @click.native="offlineRow(scope.row)" :disabled="scope.row.approvalStatus==1&&scope.row.status==1?false:true">{{scope.row.approvalStatus==4?'已下线':'下线'}}{{scope.row.approvalState,scope.row.status}}</el-dropdown-item>
                              <el-dropdown-item @click.native="recommendRow(scope.row)" :disabled="scope.row.approvalStatus==1?false:true">{{scope.row.topState===0||scope.row.topState===1?'取消置顶':'设为置顶'}}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <!-- </div> -->
                        <!-- <el-button type="text" size="small">更多</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
            <div style="display:flex;justify-content:space-between;margin-top:24px">
                <div>
                    <span>
                        <el-checkbox @change='checkChoose' v-model="isAllChecked">全选</el-checkbox>
                    </span>
                    <button style="margin-left:10px" :disabled="isAllowedButtonClick.batchDeleteButton" @click="batchPro(1)" class="bottom_table_button">删除</button>
                    <button v-if="isPass"   @click="setRecommend" class="bottom_table_button">设为置顶</button>
                </div>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="formInline.pageIndex"
                    :pager-count="5"
                    :page-sizes="[10, 20, 40, 100]"
                    :page-size="activeParams.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </div>
      <el-dialog
        title="置顶设置"
        :visible.sync="dialogVisible"
        width="584px"
        class="active-dialag"
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
           <el-button type="primary" @click="handleTopSetting" style="height:28px;line-height:0px;border:none;background:linear-gradient(36deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);border-radius:3px;">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
import { getAllProvince , getProvinceAllCity ,reqBatchTopping, getListSkillArea , getListUserArea ,  getListFruitType , getAllFinancingType ,  reqCloseActive  , getActiveType , getActiveList,delActiveItem,reqDeleateActive} from "./api";
import {cancelTop, reqSetTop} from "../releaseAudit/api";
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
                dialogVisible:false,
                total:1,
                value1:'',
                key: "value",
                isAllowedButtonClick:{
                    batchRecommendButton:false,
                    batchDeleteButton:false,
                    batchTrunOther:false,
                },
                OwnershipData : ['企业', '高校', '科研院所','个人团队','其他'],
                AppealData : ['进行中', '已结束'],
                SkillAreaData:[],
                UserAreaData:[],
                ActiveTypeData:[],
                FruitTypeData:[],
                FinancingTypeData:[],
                totalAll:0,
              cascaderProps:{
                lazy: true,
                lazyLoad: (node,resolve)=>{
                  const { level } = node;
                  console.log('触发了',node)
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
                    topState:'',
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
                ],
                activeParams:{
                  approvalStatus:'',   //审核状态
                  pageNum:1,
                  pageSize:10,
                  keyword:''
                },
               ActiveFildData:[], //活动领域
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
             }
        },
        methods: {
          //置顶改变
          handleTopChange(val){
            this.activeParams.topState = val;
            this.getActiveList();
          },
          //置顶确定
          handleTopSetting(isPath=false){
            this.checkboxSelected.length>0?isPath=true:isPath=false;
            this.$refs['form'].validate((valid) => {
              if (valid) {
                  //批量
                if (isPath){
                  let ids=[];
                  console.log('this.checkboxSelected',this.checkboxSelected)
                  for(let i=0;i<this.checkboxSelected.length;i++){
                    ids.push({
                      mainId:this.checkboxSelected[i].id,
                      linkUserId:this.checkboxSelected[i].createId,
                    });
                  }
                  let params = [];
                  ids.forEach((item,key)=>{
                    let paramsItem = {};
                    paramsItem.type = 'activities';
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
                        this.getActiveList()
                      }
                  })
                  //单个
                }else {
                  let params = {};
                  params.startTime = this.form.startEndTime[0];
                  params.endTime = this.form.startEndTime[1];
                  params.type = 'activities';
                  params.mainId = this.selectRow.id;
                  params.linkUserId = this.selectRow.createId;
                  reqSetTop(params).then(res=>{
                    console.log(res)
                    if (res.data.errcode==0){
                      this.$message.success('置顶成功');
                      this.dialogVisible = false;
                      this.getActiveList()
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
           //获取活动列表
            getActiveList(){
              let params = this.activeParams;
              getActiveList(params).then(res=>{
                if (res.data.errcode===0){
                  this.tableData= res.data.data.data.list;
                  this.total = res.data.data.data.total;
                  this.manageAuditType[1].num = res.data.data.count
                  console.log('res.data.count',this.manageAuditType,this.manageAuditType[1])
                }
              })
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

            },
            statusClick(item,key){
                if(this.statusClickIndex!=key){
                    this.activeParams.status = '';
                    this.formInline.yourWant = '';
                    this.statusClickIndex=key;
                    console.log('item',item);
                    item.value==1?this.isPass=true:this.isPass=false;
                    this.activeParams.approvalStatus=item.value;
                    this.activeParams.pageNum=1;
                    this.getActiveList();
                }
            },
            handleSizeChange(val) {
                console.log('handleSizeChange',val);
               this.activeParams.pageSize = val;
              this.getActiveList()

            },
            handleCurrentChange(val) {
               console.log('handleCurrentChange',val)
              this.activeParams.pageNum = val;
              this.getActiveList()
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
                 console.log(val)
                 if (val.length > 0){
                   this.activeParams.provinceId = val[0];
                   this.activeParams.cityId = val[1];
                   this.activeParams.districtId = val[2];
                   this.getActiveList();
                 }else {
                   this.activeParams.provinceId = '';
                   this.activeParams.cityId = '';
                   this.activeParams.districtId = '';
                   this.getActiveList();
                 }
            },
            seen(row){
                this.$router.push({path:'/index/activeAudit/AuditActive',query:{id:row.id}})
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
                param.id=row.id;
              reqCloseActive(param).then(res=>{
                    this.$message({
                        type:res.data.ret?'success':'error',
                        showClose: true,
                        message:res.data.ret?'下线成功':'下线失败',
                    })
                   this.getActiveList();
                })
            },
            //删除
            deleteRow(row){
                if (row.approvalStatus===1){
                  this.$message({
                    message: '已通过无法删除！',
                    type: 'warning'
                  });
                  return
                }
                let param={};
                console.log(row)
                param.id=row.id;
              delActiveItem(param).then(res=>{
                    this.$message({
                        type:res.data.ret?'success':'error',
                        showClose: true,
                        message:res.data.ret?'删除成功':'删除失败',
                    })
                   this.getActiveList();

                })
            },
          //推荐
          recommendRow(row){
            //取消置顶
            if (row.topState===0||row.topState===1){
              console.log('取消置顶',)
              let params = {};
              params.type = 'activities';
              params.mainId = row.id;
              cancelTop(params).then(res=>{
                console.log(res)
                if (res.data.errcode===0){
                  this.$message.success('取消成功');
                  this.dialogVisible = false;
                  this.getActiveList();
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
                // let optionFunc=flag==1?batchDeleteProFun:flag==2?batchRecommendProFun:'';
                // let str = flag==1?'批量删除':flag==2?'批量设为推荐':'';
                // if(flag==1){
                //     this.isAllowedButtonClick.batchDeleteButton=true;
                // }
                // if(flag==2){
                //     this.isAllowedButtonClick.batchRecommendButton=true;
                // }
                // if(flag==3){
                //     this.isAllowedButtonClick.batchTrunOther=true;
                // }
                // if(optionFunc==''){
                //     this.$message({
                //         type:'warning',
                //         showClose: true,
                //         message:'功能待开发',
                //         onClose:()=>{
                //             if(flag==1){
                //                 this.isAllowedButtonClick.batchDeleteButton=false;
                //             }
                //             if(flag==2){
                //                 this.isAllowedButtonClick.batchRecommendButton=false;
                //             }
                //             if(flag==3){
                //                 this.isAllowedButtonClick.batchTrunOther=false;
                //             }
                //         }
                //     })
                //     return false;
                // }
                // //判断是否选择复选框
                // if(this.checkboxSelected.length==0){
                //     this.$message({
                //         type:'warning',
                //         showClose: true,
                //         message:'请选择要操作的数据',
                //         onClose:()=>{
                //             if(flag==1){
                //                 this.isAllowedButtonClick.batchDeleteButton=false;
                //             }
                //             if(flag==2){
                //                 this.isAllowedButtonClick.batchRecommendButton=false;
                //             }
                //             if(flag==3){
                //                 this.isAllowedButtonClick.batchTrunOther=false;
                //             }
                //         }
                //     })
                //     return false;
                // }
                let ids=[];
                console.log('checkboxSelected',this.checkboxSelected)
                for(let i=0;i<this.checkboxSelected.length;i++){
                    ids.push(this.checkboxSelected[i].id);
                }
                let param={};
                param.ids=ids.join();

              reqDeleateActive(param).then(res=>{
                    console.log(res.data.errcode)
                    if (res.data.errcode===0){
                      this.$message({
                        message: '批量删除成功',
                        type: 'success'
                      });
                      this.getActiveList();
                    }

                })
            },
            //搜索事件
            searchTableList(){
              this.getActiveList();
            },
           //活动类型改变
          handleActiveType(val){
              console.log(val)
            this.activeParams.activitiesType = val;
            this.getActiveList();
          },
          //活动领域改变
          handleFildType(val){
            console.log(val)
            this.activeParams.activitiesIndustry = val;
            this.getActiveList();
          },
          //时间改变
          handleTimeChange(val){
              console.log(val)
             this.activeParams.endTime  = val;
             this.getActiveList();
          },
          //报名状态改变
          handleStateChange(val){
              console.log(val)
             if (val=='进行中'){
               this.activeParams.status = 1;
             }else if (val=='已结束'){
               this.activeParams.status = 2;
             }else {
               this.activeParams.status = '';
             }
            this.getActiveList();
          },
          //删除活动
          delActiveItem(){
            delActiveItem()
          },
          //设为推荐
          setRecommend(){
            this.dialogVisible = true;

            // this.handleTopSetting(true)
          }
        },
        created () {
            this.getAllPrivinceData();
            this.getAllSelectData();
            this.getActivityType();
            this.getActiveList();
            this.getActivityFilds();
        },
    }
</script>

<style  lang="less">
.auditMainList{
  .active-dialag {
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
