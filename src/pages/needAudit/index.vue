<template>
    <div class="auditMainList" style="padding:32px 40px">
        <div>
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap">
                <div>
                    <span @click="statusClick(item,key)" :style="{position:'relative',fontSize:'16px',cursor:'pointer',fontWeight:500,color:key==statusClickIndex?'#2BB1E8':'#333333',borderRight:(key!=manageAuditType.length-1)?'1px solid #D2D2D2':'',paddingRight:'32px',paddingLeft:(key!=0)?'32px':'0',}" v-for="(item,key) in manageAuditType" :key="key">
                        {{item.label}}
                        <span v-show="item.value==='0'&&item.num" :class="item.count==1?'activeOne':''" style="position:absolute;top:-10px;border-radius:50%;font-size:12px;padding:2.5px;background:#FD2044;color:white;margin-left:-3px">{{item.num?item.num:''}}</span>
                    </span>
                </div>
                <div style="font-size: 0">
                    <input v-model="needParams.searchKey" @keydown.enter="searchTableList" placeholder="请输入需求主题或发布人" style="width:280px;height:34px;border:1px solid #01A2E4;border-radius:4px 0px 0px 4px;padding-left:10px;outline: none" type="text">
                    <span @click="searchTableList" style="cursor:pointer;font-size:14px;font-weight:500;color:white;padding:9.5px 22px;background:linear-gradient(126deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);">
                        <i class="el-icon-search"></i>
                        搜索
                    </span>
                </div>
            </div>
            <el-form :inline="true" :model="formInline" style="margin-top:20px" class="demo-form-inline">
                <el-form-item label="" style="margin-right: 21px">
                <el-select @change="handleTypeSelect" clearable style="width:100%" v-model="needParams.type" placeholder="需求类型">
                  <el-option v-for="item in needTypeData" :key="item.id" :label="item.desc" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
                <el-form-item prop="skillArea" label="" style="margin-right: 21px">
                    <el-select @change="handleFiledSelect" clearable style="width:100%" v-model="needParams.technicalFieldId" placeholder="技术领域">
                      <el-option v-for="item in TecFieldData" :key="item.id" :label="item.desc" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                  <el-date-picker
                    @change="handleTimeChange"
                    v-model="timeRange"
                    type="daterange"
                    format="yyyy/MM/dd"
                    value-format="yyyy/MM/dd"
                    range-separator="-"
                    start-placeholder="需求开始时间"
                    end-placeholder="需求截止时间">
                  </el-date-picker>
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
                    prop="title"
                    label="需求主题"
                    min-width="130">
                </el-table-column>
                <el-table-column
                    prop="userName"
                    min-width=""
                    label="发布人">
                </el-table-column>
                <el-table-column
                    prop="endDate"
                    width="120"
                    label="需求截止时间"
                    >
                </el-table-column>
                <el-table-column
                    prop="createDate"
                    min-width="100"
                    label="发布时间">
                </el-table-column>
                <el-table-column
                    prop="stateLabel"
                    min-width="70"
                    label="审核状态">
                  <template slot-scope="scope">
                    <div style="box-sizing: border-box;padding-left: 10px">
                      <span class="circle-2" v-if="scope.row.state==0" >{{scope.row.stateLabel}}</span>
                      <span class="circle-3" v-else-if="scope.row.state==2" >{{scope.row.stateLabel}}</span>
                      <span class="circle-1" v-else-if="scope.row.state==1" >{{scope.row.stateLabel}}</span>
                      <span class="circle-3" v-else-if="scope.row.state==3" >{{scope.row.stateLabel}}</span>
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
                                更多<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <!-- <el-dropdown-item>{{scope.row.name}}</el-dropdown-item> -->
                                <el-dropdown-item @click.native="deleteNeed(scope.row)">删除</el-dropdown-item>
                                <el-dropdown-item @click.native="offlineRow(scope.row)" :disabled="scope.row.state==1?false:true">{{scope.row.state==3?'已下线':'下线'}}</el-dropdown-item>
<!--                                <el-dropdown-item @click.native="recommendRow(scope.row)" :disabled="scope.row.approvalState==1?false:true">{{scope.row.isRecommend==1?'取消推荐':'设为推荐'}}</el-dropdown-item>-->
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
                    <button @click="setRecommend" :disabled="isAllowedButtonClick.batchRecommendButton" class="bottom_table_button">设为推荐</button>
<!--                    <button @click="batchPro(3)" :disabled="isAllowedButtonClick.batchTrunOther" class="bottom_table_button">转经纪人</button>-->
                </div>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="needParams.pageNum"
                    :pager-count="5"
                    :page-sizes="[10, 20, 40, 100]"
                    :page-size="needParams.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalAll">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { getAllProvince , getProvinceAllCity , getListSkillArea , getListUserArea , getListProcessType , getListFruitType , getAllFinancingType , reqDeleteNeed , offLineFun , deleteProFun , recommendProFun ,reqNeedList,reqTecField ,reqNeedInfoList ,reqOfflineNeed} from "./api";
    export default {
        data() {
            return {
                timeRange:'',
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
                    {label:'待审核',value:'0',num:0,count:0},
                    {label:'未通过',value:'2'},
                    {label:'发布中',value:'1'},
                    {label:'已下线',value:'3'},
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
                tableData:[],
                needTypeData:[],//需求类型数据
                TecFieldData:[],//技术领域数据
                needParams:{
                  state:'',
                  type:'',
                  technicalFieldId:'',
                  searchKey:'',
                  endDateS:'',
                  endDateE:'',
                  pageNum:1,
                  pageSize:10
                }
            }
        },
        methods: {
             //设为推荐
             setRecommend(){
               this.$message({
                 message: '功能暂未开发',
                 type: 'warning'
               });
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
            //需求类型
            handleTypeSelect(){
              this.reqNeedInfoList();
            },
            //技术领域
            handleFiledSelect(){
              this.reqNeedInfoList();
            },
            //时间改变
            handleTimeChange(val){
              console.log(val)
               if (val){
                 this.needParams.endDateS = val[0];
                 this.needParams.endDateE = val[1];
                 this.reqNeedInfoList();
               }else {
                 this.needParams.endDateS = '';
                 this.needParams.endDateE = '';
               }
            },
            statusClick(item,key){
                if(this.statusClickIndex!=key){
                    this.statusClickIndex=key;
                    this.needParams.state=item.value;
                    this.needParams.pageNum=1;
                    this.reqNeedInfoList();
                }
            },
            handleSizeChange(val) {
              this.needParams.pageSize = val;
              this.reqNeedInfoList();
            },
            handleCurrentChange(val) {
              this.needParams.pageNum = val;
              this.reqNeedInfoList();
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
                this.$router.push({path:'/index/needAudit/AuditRelease',query:{id:row.id}})
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
                param.id=row.id;
              reqOfflineNeed(param).then(res=>{
                    this.$message({
                        type:res.data.ret?'success':'error',
                        showClose: true,
                        message:res.data.ret?'下线成功':'下线失败',
                    })
                    if(res.data.ret){
                        this.reqNeedInfoList();
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
                let param={};
                param.id=row.projectId;
                param.state=row.isRecommend==1?0:1;
                let str=row.isRecommend==1?'取消推荐':'设置推荐';
                recommendProFun(param).then(res=>{
                    this.$message({
                        type:res.data.ret?'success':'error',
                        showClose: true,
                        message:res.data.ret?`${str}操作成功`:`${str}操作失败`,
                    })
                    if(res.data.ret){
                        this.fetch();
                    }
                })
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
                //判断是否选择复选框
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
                for(let i=0;i<this.checkboxSelected.length;i++){
                    ids.push(this.checkboxSelected[i].id);
                }
                let param={};
                param.id=ids.join();

              reqDeleteNeed(param).then(res=>{
                console.log(res)
                if (res.data.errcode===0){
                  this.$message({
                    message: '批量删除成功',
                    type: 'success'
                  });
                  this.reqNeedInfoList();
                }else {
                  this.$message({
                    message: res.data.data,
                    type: 'warning'
                  });
                }
                })
            },

            //搜索事件
            searchTableList(){
               this.reqNeedInfoList();
            },
          //获取需求类型
          reqNeedList(){
            reqNeedList().then(res=>{
              console.log('需求类型',res)
              if(res.data.errcode===0){
                 this.needTypeData =  res.data.data;
              }
            })
          },
          //获取技术领域
          reqTecField(){
            reqTecField().then(res=>{
              console.log('技术领域',res)
              if(res.data.errcode===0){
                this.TecFieldData =  res.data.data;
                console.log('TecFieldData',this.TecFieldData)
              }
            })
          },
          //获取需求审核列表
          reqNeedInfoList(){
              let params = this.needParams;
            reqNeedInfoList(params).then(res=>{
              console.log('reqNeedInfoList',res.data)
              if (res.data.errcode===0){
                 this.tableData = res.data.data.data.list;
                 this.totalAll = res.data.data.data.total;
                 this.manageAuditType[1].num =  res.data.data.count;
                this.manageAuditType[1].count = res.data.data.count? res.data.data.count.toString().length:'';
                 console.log('res.data.data.count.toString()',res.data.data.count.toString().length)
              }
            })
          },
          //删除需求
          deleteNeed(row){
            console.log(row.id)
            let id = row.id;
            let params = {id}
            reqDeleteNeed(params).then(res=>{
              console.log(res)
              if (res.data.errcode===0){
                this.$message({
                  message: res.data.data,
                  type: 'success'
                });
                this.reqNeedInfoList();
              }else {
                this.$message({
                  message: res.data.data,
                  type: 'warning'
                });
              }
            })
          }
        },
        created () {
            this.getAllPrivinceData();
            this.reqNeedInfoList()
            this.reqNeedList();
            this.reqTecField();
        },
    }
</script>

<style lang="less">
.auditMainList{
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
     .activeOne {
       padding-left: 5px!important;
       padding-right: 5px!important;
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
