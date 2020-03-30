<template>
    <div class="auditMainList" style="padding:32px 40px">
        <div>
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap">
                <div>
                    <span @click="statusClick(item,key)" :style="{position:'relative',fontSize:'16px',cursor:'pointer',fontWeight:500,color:key==statusClickIndex?'#2BB1E8':'#333333',borderRight:(key!=manageAuditType.length-1)?'1px solid #D2D2D2':'',paddingRight:'32px',paddingLeft:(key!=0)?'32px':'0',}" v-for="(item,key) in manageAuditType" :key="key">
                        {{item.label}}
                        <span v-show="item.value==='0'" style="position:absolute;top:-10px;border-radius:50%;font-size:12px;padding:2.5px;background:#FD2044;color:white;margin-left:-3px">{{item.num?item.num:''}}</span>
                    </span>
                </div>
                <div style="font-size: 0">
                    <input v-model="activeParams.keyword" @keyup.enter="searchTableList" placeholder="请输入活动名称、主办单位" style="width:280px;height:34px;border:1px solid #01A2E4;border-radius:4px 0px 0px 4px;padding-left:10px" type="text">
                    <span @click="searchTableList" style="cursor:pointer;font-size:14px;font-weight:500;color:white;padding:9.5px 22px;background:linear-gradient(126deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);">
                        <i class="el-icon-search"></i>
                        搜索
                    </span>
                </div>
            </div>
            <el-form :inline="true" :model="formInline" style="margin-top:20px" class="demo-form-inline">
                <el-form-item label="">
                    <el-select @change="handleActiveType" clearable style="width:100%" v-model="formInline.processType" placeholder="活动类型">
                        <el-option v-for="item in ActiveTypeData" :key="item.id" :label="item.value" :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-select @change="handleFildType" clearable style="width:100%" v-model="formInline.financingType" placeholder="活动领域">
                        <el-option v-for="item in ActiveFildData" :key="item.id" :label="item.value" :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
              <el-form-item label="">
                <el-cascader
                  clearable
                  v-model="formInline.selectedOptions"
                  placeholder="活动地区"
                  :options="optionsArea"
                  @change="handleAreaChange"
                  :props="cascaderProps"
                ></el-cascader>
              </el-form-item>
                <el-form-item label="">
                    <el-select @change="handleStateChange" clearable v-model="formInline.yourWant" placeholder="报名状态">
                        <el-option v-for="item in AppealData" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>

              <el-form-item label="">
                <el-date-picker
                  v-model="value1"
                  type="datetime"
                  @change="handleTimeChange"
                  format="yyyy/MM/dd HH:mm"
                  value-format="yyyy/MM/dd HH:mm"
                  placeholder="活动截止报名时间">
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
                prop="activitiesTopic"
                width=""
                label="活动名称">
              </el-table-column>
              <el-table-column
                prop="regFee"
                width=""
                label="活动费用">
                <template slot-scope="scope">
                  <div>
                    <span v-if="scope.row.isFee ==0">免费</span>
                    <span v-if="scope.row.isFee ==1">{{scope.row.regFee}}</span>
                  </div>
                </template>
              </el-table-column>
                <el-table-column
                    prop="regNumber"
                    label="活动名额"
                    width="">
                </el-table-column>

              <el-table-column
                prop="endTime"
                width=""
                label="报名截止时间">
              </el-table-column>
                <el-table-column
                    prop="createTime"
                    width=""
                    label="提交时间">
                </el-table-column>
                <el-table-column
                    prop="status"
                    width="100"
                    label="审核状态">
                    <template slot-scope="scope">
                        <div>
                            <span style="color:#A7A7A7" v-if="scope.row.approvalStatus==4">已下线</span>
                            <span style="color:#333333" v-else-if="scope.row.approvalStatus==0">待审核</span>
                            <span style="color:#F3A157" v-else-if="scope.row.approvalStatus==1">已通过</span>
                            <span style="color:#FD2044" v-else-if="scope.row.approvalStatus==2">未通过</span>
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
<!--                                <el-dropdown-item  :disabled="scope.row.approvalState==1?false:true">{{scope.row.isRecommend==1?'取消推荐':'设为推荐'}}</el-dropdown-item>-->
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
                    <button   @click="setRecommend" class="bottom_table_button">设为推荐</button>
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
    </div>
</template>

<script>
import { getAllProvince , getProvinceAllCity , getListSkillArea , getListUserArea ,  getListFruitType , getAllFinancingType ,  reqCloseActive  , recommendProFun , batchDeleteProFun , batchRecommendProFun ,getActiveType , getActiveList,delActiveItem,reqDeleateActive} from "./api";
    export default {
        data() {
            return {
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
                    {label:'已通过',value:'1'},
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
                ],
                activeParams:{
                  approvalStatus:'',   //审核状态
                  pageNum:1,
                  pageSize:10,
                  keyword:''
                },
               ActiveFildData:[] //活动领域
            }
        },
        methods: {
           //获取活动列表
            getActiveList(){
              let params = this.activeParams;
              getActiveList(params).then(res=>{
                if (res.data.errcode===0){
                  console.log('------------------',res.data.data)
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
                    this.statusClickIndex=key;
                    console.log('item',item)
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
            this.$message({
              message: '功能暂未开发',
              type: 'warning'
            });
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

<style lang="less">
.auditMainList{
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
