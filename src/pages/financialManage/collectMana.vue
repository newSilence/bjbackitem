<template>
    <div style="padding:15px 40px" class="collect-mana-self">
      <div style="display: flex;justify-content: space-between;margin-bottom: 5px;align-items:center">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <el-form style="margin:0px 20px 2px 20px" :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
                <el-date-picker
                style=";height:32px"
                v-model="formInline.time"
                clearable
                type="daterange"
                range-separator="至"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item class="heightlow">
                <el-input class="search_input" placeholder="请输入订单号、商品名称、付款人手机号"  v-model="formInline.keyWord">
                </el-input>
            </el-form-item>
                <el-button class="self_btn" style="background:linear-gradient(126deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);border-radius:4px;color:white;height:32px"  @click="onSearch" icon="el-icon-search">搜索</el-button>
                <el-button class="self_btn" style="background:linear-gradient(126deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);border-radius:4px;color:white;height:32px"  @click="onExport">导出</el-button>
          </el-form>
            
        </div>
      </div>
        <div>
            <el-table
                @selection-change="chooseTr"
                :header-row-style="theadRowStyle"
                :header-cell-style="theadRowCellStyle"
                :data="tableData"
                ref="multipleTable"
                tooltip-effect="dark"
                style="width: 100%"
                >
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                prop="orderCode"
                label="订单号">
                </el-table-column>
                <el-table-column
                prop="title"
                label="商品/服务"
                width="">
                </el-table-column>
                <el-table-column
                prop="userInfoName"
                label="付款人"
                show-overflow-tooltip>
                 </el-table-column>
                <el-table-column
                prop="actualPrice"
                label="付款金额/元"
                width="200px"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="payDate"
                label="付款时间"
                width="200px"
                show-overflow-tooltip>
                </el-table-column>
                 <el-table-column
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button @click="seenDeatil(scope.row)" type="text" size="small">
                            详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="margin-top:30px">
            <el-pagination
                style="text-align:right"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="formInline.pageNumber"
                :page-sizes="[10, 40, 100, 200]"
                :page-size="formInline.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { getTableListData , exportList } from './api'

    export default {

        data() {
            return {
                statusClickIndex:0,
                personClickIndex:0,
                //复选框选择的数据
                chooseUseData:[],
                optionName:'',
                isShowOther:false,
                //权限设置弹框
                dialogSetPermitFormVisible:false,
                //当前的用户Id
                userId:'',
                value:[4,6,3,1],
                typeMember:0,
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                tableData:[],
                total:0,
                formInline: {
                    keyWord:'',
                    time:'',
                    pageNumber:1,
                    pageSize:10,
                },

                form:{
                    roleName:'',
                    deptName:'',
                    deptId:null,
                    remark:'',
                    menuIdList:[],
                    deptIdList:[],
                }
            }
        },
        methods: {
            //设置表格样式
            theadRowStyle(){
                return "color:#333333;font-size:14px;font-weight:500;height:20px;line-height:20px;background:rgba(250,250,252,1);"
            },
            theadRowCellStyle(){
                return 'background:rgba(250,250,252,1);'
            },
            chooseTr(val){
                this.chooseUseData=val;
            },
            //点击表格行
            seenDeatil(row){
              // console.log(row);
              // return
              this.$router.push({path:'/index/finacing/collecManaDetail',query:{id:row.id}})
            },
            onSearch() {
                this.formInline.pageNumber=1;
                // console.log(this.formInline)
                // return;
                this.fetchData();
            },
            onExport (){
              exportList(this.formInline).then(res=>{
                console.log(res);
                if(res.data.ret){
                  const exportData = res.data.data;
                  require.ensure([], () => {

      //                 const { export_json_to_excel } = require("resource/plugins/excel/Export2Excel.js");
                      const { export_json_to_excel } = require('@/vendor/Export2Excel')

                      const tHeader = ["订单号", "类型","商品/服务","付款金额","订单金额","下单时间","付款时间","付款用户名","手机号","订单状态","财务备注"];

                      // 上面设置Excel的表格第一行的标题

                      const filterVal = ["orderCode", "typeLable","title","actualPrice","totalPrice","createDate","payDate","userInfoName","userInfoPhone","stateLable","finRemarks"];

                      // 上面的index、nickName、name是tableData里对象的属性

                      const list = exportData; //把data里的tableData存到list

                      const data = this.formatJson(filterVal, list);

                      export_json_to_excel(tHeader, data, "订单收款明细excel");

                  });
                }
                
              })
              return false;
              // console.log(this.tableData);
              

    },

    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
              console.log(this.chooseUseData);
    },
            //获取表格数据
            fetchData(){
                if(this.formInline.time.length>0){
                    this.formInline.sdate=this.formInline.time[0];
                    this.formInline.edate=this.formInline.time[1];
                }else{
                    this.formInline.sdate='';
                    this.formInline.edate='';
                }
                getTableListData(this.formInline).then(res=>{
                    console.log(res);
                    if(res.data.ret){
                        this.tableData=res.data.data.list;
                        this.total=res.data.data.total;
                        console.log('res.data',res.data)
                    }
                })
            },
            //分页功能
            handleSizeChange(val){
                this.formInline.pageSize=val;
                this.fetchData();
            },
            handleCurrentChange(val){
                this.formInline.pageNumber=val;
                this.fetchData();
            }
        },
        created () {
            this.optionName=sessionStorage['username'];
            this.fetchData();
        },
    }
</script>

<style lang="less">
    .collect-mana-self {
      .heightlow{
        margin-top:-3px;
      }
      .self_btn{
          padding:7px 20px;
      }
      .heightlow input{
        height:32px;
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
      .el-badge__content.is-fixed {
        right: 32px;
      }
      .el-table tbody tr:hover>td {
        background-color:#E6F7FF!important
      }
      .search_input .el-input__inner{
        border:1px solid #D9D9D9;
        border-radius: 2px;
        width: 293px;
        border-top-left-radius:4px;
        border-bottom-left-radius:4px;
      }
      .no_select .vue-treeselect__value-container{
        display:none;
      }
      .no_select .vue-treeselect__x-container{
        display:none;
      }
      .no_select .vue-treeselect__menu-container{
        position: relative;
      }
      .no_select .vue-treeselect__control{
        display: none!important;
      }
      .point_class{
        cursor: pointer;
        font-size:16px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
      }
    }

</style>