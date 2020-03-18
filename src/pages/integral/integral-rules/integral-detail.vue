<template>
  <div>
    <div style="display:flex;justify-content:space-between">
      <el-form style="" :inline="true" :model="formInline" class="demo-form-inline">
        <el-date-picker
          style="width: 227px;margin-right: 27px"
          v-model="startEndTime"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-form-item>
          <el-select style="border-radius:12px;width: 126px;height: 32px" v-model="integralType" placeholder="积分类型" >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form style="" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="">
          <el-input style="border-radius:12px;width: 368px" placeholder="请输入用户名、手机号、描述"  v-model="formInline.roleName">
            <el-button style="background:linear-gradient(126deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);border-radius:0px 4px 4px 0px;color:white" slot="append"  @click="onSearch" icon="el-icon-search">搜索</el-button>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column
          prop="time"
          label="时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="id"
          label="ID"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="account"
          label="积分账户"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="integralChange"
          label="积分变动"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="describe"
          label="描述"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="formInline.page"
        :page-sizes="[10, 40, 100, 200]"
        :page-size="formInline.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "integral-detail",
    data(){
      return {
        integralType:'',
        startEndTime:'',//开始结束日期
        tableData:[
          {time:'2020/02/03 19:00',id:'8889999877',account:'15311937006',integralChange:'+300',describe:'用户注册奖励积分'},
          {time:'2020/02/03 19:00',id:'8889999877',account:'15311937006',integralChange:'+300',describe:'用户首次下单奖励积分（订单88889）'},
          {time:'2020/02/03 19:00',id:'8889999877',account:'15311937006',integralChange:'+300',describe:'用户下单积分消费（订单88889）'},
        ],
        total:0,
        options:[
          {
          value:'使用积分',
          label:'使用积分'
          },
          {
            value:'扣减积分',
            label:'扣减积分'
          },
          {
            value:'奖励积分',
            label:'奖励积分'
          }
        ],
        formInline: {
          roleName:'',
          page:1,
          limit:10,
        },
      }
    },
    methods:{
      //分页功能
      handleSizeChange(val){
        this.pageLimit = val;
        this.getIntegralType()
      },
      handleCurrentChange(val){
        this.pageNumber = val;
        this.getIntegralType()
      },
    }
  }
</script>

<style scoped lang="less">
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
</style>
