<template>
    <div class="integral-account-self">
      <div style="display:flex;justify-content:space-between">
        <el-form style="" :inline="true" :model="params" class="demo-form-inline">
          <el-date-picker
            style="width: 227px;margin-right: 27px"
            v-model="startEndTime"
            @change="handleDataSearch"
            type="daterange"
            range-separator="-"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <el-form-item>
            <el-select style="border-radius:12px;width: 126px;height: 32px" v-model="classification" @change="handleClassChange" placeholder="分类" >
              <el-option
                v-for="item in classOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form style="" :inline="true" :model="params" class="demo-form-inline">
          <el-form-item label="">
            <el-input style="border-radius:12px;width: 368px" placeholder="请输入用户名、手机号、描述"  @keyup.enter.native="onSearch"   v-model="params.keyWord">
              <el-button style="background:linear-gradient(126deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);border-radius:0px 4px 4px 0px;color:white" slot="append"  @click="onSearch"   icon="el-icon-search">搜索</el-button>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-table
          :header-row-style="theadRowStyle"
          :header-cell-style="theadRowCellStyle"
          :data="pageDatas"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column
            prop="createTime"
            label="时间"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="userInfo.realName"
            label="用户名"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="userInfo.phoneNumber"
            label="手机号"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="integralValue"
            label="积分变动"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="historyExplain"
            label="描述"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>
      <div style="float: right;margin: 20px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 40, 100, 200]"
          :page-size="params.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
</template>

<script>
     import {reqUserIntegralHistoryManager} from '../api'
    export default {
        name: "integral-account",
      data(){
          return {
            total:0,
            pageDatas:[],
            currentPage:1,
            classOptions:[
              {
                value:'全部',
                label:'全部'
              },
              {
                value:'收入',
                label:'收入'
              },
              {
                value:'支出',
                label:'支出'
              }
            ],
            typeOptions:[
              {
                value:'',
                label:''
              }
            ],
            startEndTime:'',
            classification:'全部',
            params:{
              pageNumber:1,
              pageSize:10,
              keyWord:''
            }
          }
      },
      created() {
          this.getDetails()
      },
      methods:{
        //设置表格样式
        theadRowStyle(){
          return "color:#333333;font-size:14px;font-weight:500;height:20px;line-height:20px;background:rgba(250,250,252,1);"
        },
        theadRowCellStyle(){
          return 'background:rgba(250,250,252,1);'
        },
        //分页功能
        handleSizeChange(val){
          this.params.pageSize = val;
          this.getDetails();
        },
        handleCurrentChange(val){
          this.params.pageNumber = val;
          this.getDetails();
        },
        //获取积分账户明细
        getDetails(){
          let params = this.params;
          reqUserIntegralHistoryManager(params).then(res=>{
            if (res.data.errcode===0){
               this.total = res.data.data.total;
               this.pageDatas = res.data.data.list;
            }
          })
        },
        //积分账户搜索
        onSearch(){
          this.getDetails();
        },
        //日期改变
        handleDataSearch(val){
          if (val){
            this.params.startTime = val[0];
            this.params.endTime = val[1];
          }else {
            this.params.startTime = '';
            this.params.endTime = '';
          }
          this.getDetails();
        },
        //分类改变
        handleClassChange(val){
          if (val==='收入'){
            this.params.income = '收入';
            this.params.expenditure = '';
          }else if (val==='支出') {
            this.params.income = '';
            this.params.expenditure = '支出';
          }else {
            this.params.income = '';
            this.params.expenditure = '';
          }
          this.getDetails();
        }
      }
    }
</script>

<style scoped lang="less">
  .integral-account-self {
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
      font-size:16px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
    }
  }

</style>
