<template>
    <div>
      <div style="text-align: right">
        <el-form style="" :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="">
            <el-input style="border-radius:12px;width: 368px" placeholder="请输入用户名、手机号"  v-model="formInline.roleName">
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
            label="用户名"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="id"
            label="手机号"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="account"
            label="奖励积分"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="integralChange"
            label="使用积分"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="describe"
            label="扣减积分"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="describe"
            label="当前积分"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="describe"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="editClick(scope.row)" type="text" size="small">查看</el-button>
            </template>
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
        name: "integral-account",
      data(){
          return {
            tableData:[
              {time:'2020/02/03 19:00',id:'8889999877',account:'15311937006',integralChange:'+300',describe:'用户注册奖励积分'},
              {time:'2020/02/03 19:00',id:'8889999877',account:'15311937006',integralChange:'+300',describe:'用户首次下单奖励积分（订单88889）'},
              {time:'2020/02/03 19:00',id:'8889999877',account:'15311937006',integralChange:'+300',describe:'用户下单积分消费（订单88889）'},
            ],
            total:0,
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
