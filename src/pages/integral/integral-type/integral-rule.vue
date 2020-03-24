<template>
  <div class="integral-rule-self">
    <el-form
      style="margin:20px;float: right"
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
    >
      <el-form-item label>
        <!-- <el-input v-model="formInline.username" placeholder="角色名称"></el-input> -->
        <el-input
          style="border-radius:12px;width: 368px"
          placeholder="请输入ID、积分类型、积分状态、备注"
          v-model="formInline.roleName"
          @keyup.enter.native="onSearch"
        >
          <el-button
            style="background:linear-gradient(126deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);border-radius:0px 4px 4px 0px;color:white"
            slot="append"
            @click="onSearch"
            icon="el-icon-search"
          >搜索</el-button>
        </el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-table :data="IntegralData" tooltip-effect="dark" style="width: 100%" :header-row-style="theadRowStyle"
                :header-cell-style="theadRowCellStyle">
        <el-table-column prop="integralId" label="ID" show-overflow-tooltip></el-table-column>
        <el-table-column prop="integralName" label="积分类型" show-overflow-tooltip></el-table-column>
        <el-table-column prop="stateName" label="积分状态" show-overflow-tooltip></el-table-column>
        <el-table-column prop="integralRecord.remark" label="备注" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createName" label="操作人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="integralRecord.updateTime" label="最后更新时间" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="editClick(scope.row)" type="text" size="small">配置</el-button>
<!--            <el-popover-->
<!--              placement="top"-->
<!--              width="160"-->
<!--              v-if="scope.row.state===1"-->
<!--              v-model="visible1">-->
<!--              <p>请确认是否上线？</p>-->
<!--              <div style="text-align: right; margin: 0">-->
<!--                <el-button size="mini" type="text" @click="visible1 = false">取消</el-button>-->
<!--                <el-button type="primary" size="mini" @click="editOnLine(scope.row)">确定</el-button>-->
<!--              </div>-->
              <el-button slot="reference" v-if="scope.row.state===1" @click="editOnLine(scope.row)"  style="color: rgb(243, 161, 87)" type="text">上线</el-button>
<!--            </el-popover>-->
<!--            <el-popover-->
<!--              placement="top"-->
<!--              width="160"-->
<!--              v-if="scope.row.state===0"-->
<!--              v-model="visible2">-->
<!--              <p>请确认是否下线？</p>-->
<!--              <div style="text-align: right; margin: 0">-->
<!--                <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>-->
<!--                <el-button type="primary" size="mini" @click="">确定</el-button>-->
<!--              </div>-->
              <el-button slot="reference" v-if="scope.row.state===0" @click="editOffLine(scope.row)"  type="text">下线</el-button>
<!--            </el-popover>-->
          </template>
        </el-table-column>
      </el-table>


    </div>
    <div style="text-align: right;margin: 20px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="formInline.page"
        :page-sizes="[10, 40, 100, 200]"
        :page-size="formInline.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage"
      ></el-pagination>
    </div>
    <!-- 新增或者编辑弹框 -->
    <el-dialog
      :title="dialogFormVisibleTitle"
      @open="openDialog"
      :visible.sync="dialogFormVisible"
      @close="dialogClose"
    >
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="140px">
        <el-form-item label="积分类型：" prop="integralName">
          <el-input style="width:350px" v-model="form.integralName" disabled></el-input>
        </el-form-item>
        <el-form-item label="分类：" prop="ruleClass">
          <el-cascader
            style="width:350px"
            v-model="form.ruleClass"
            :options="classOptions"
            @change="handleClassChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="有效时间：" prop="integralName">
          <el-date-picker
            v-model="form.effectiveTime"
            type="daterange"
            value-format="yyyy-MM-dd">
            @change="timeChange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
          <el-checkbox v-model="checked" @change="radioChange" style="margin-left: 20px">永久有效</el-checkbox>
        </el-form-item>
        <el-form-item label="积分值设置：" prop="set" class="redSign">
          <el-row :gutter="0">
            <el-col :span="8">
              <div class="grid-content bg-purple integralTitle" style="width:120px;">会员等级</div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple" style="width:120px;">用户类型</div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple" style="width:120px;">积分值</div>
            </el-col>
          </el-row>
          <el-row :gutter="10" v-for="(item,index) in formDatas" :key="index" style="margin-bottom: 8px">
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <i v-if="index===0" class="el-icon-circle-plus integarl-add" @click="addTntegral"></i>
                <i v-else class="el-icon-remove-outline integarl-add" @click="removeTntegral(index)"></i>

                <el-select
                  v-model="formDatas[index].membership"
                  placeholder="请选择"
                  style="display: inline-block;width: 120px;"
                >
                  <el-option
                    v-for="item in leaveOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-select
                  v-model="formDatas[index].userType"
                  @change="handleTypeChange"
                  placeholder="请选择"
                  style="width:120px"
                >
                  <el-option
                    v-for="item in personTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-input
                  v-model="formDatas[index].integralValue"
                  @keyup.enter.native="handleClick"
                  :placeholder="form.ruleClass[0]=='2000'?'请输入扣减积分值':'请输入奖励积分值'"
                  style="width:130px"
                ></el-input>
              </div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="备注：" prop="remark">
          <el-input type="textarea" :rows="4" v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" style="width:82px;border:none;background:linear-gradient(36deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);border-radius:4px;" @click="this.handleSaveRules">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqOffLineIntegralRule,
  reqIntegralRuleConfig,
  reqSaveIntegralRule,
  reqAllIntegralClass,
  reqIntegralTypeModify,
  reqAddIntegralType,
  reqIntegralType,
  getAllRoleData,
  updateRoleStatus,
  getAllFuncPerm,
  updateRoleData,
  saveRoleData,
  reqRuleList
} from "../api"
export default {
  name: "Integral-type",
  data() {
    return {
      visible1:false,
      visible2:false,
      isSave: false, //是否保存
      membership: "",
      userType: "",
      integralValue: "",
      integralSetting: [],
      classOptions: [],
      leaveOptions: [
        {
          value: "全部",
          label: "全部"
        }
      ], //会员等级数据
      personTypeOptions: [
        {
          value: "全部",
          label: "全部"
        },
        {
          value: "普通用户",
          label: "普通用户"
        },
        {
          value: "机构用户",
          label: "机构用户"
        },
        {
          value: "服务商用户",
          label: "服务商用户"
        },
        {
          value: "专家用户",
          label: "专家用户"
        }
      ],
      checked: false,
      integralItem: {}, //item积分对象
      pageNumber: 1, //当前页码
      pageLimit: 10, //每页数量
      typeMember: 0,
      defaultProps: {
        children: "children",
        label: "label"
      },
      formDatas:[{
        membership:''
      }],
      tableData: [
        {
          userId: 1,
          username: "admin",
          email: "1@qq.com",
          mobile: 17521016266,
          status: 1,
          roleIdList: [1, 2],
          deptId: 6,
          deptName: "测试分公司",
          createTime: "2016-11-11 11:11:11"
        }
      ],
      formInline: {
        roleName: "",
        page: 1,
        limit: 10
      },
      form: {
        integralName: "",
        explain: "",
        port: "",
        ruleClass: "",
        effectiveTime: "",
        remark: ""
      },

      rules: {
        integralName: [
          { required: true, message: "请输入积分类型", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }],
        ruleClass: [{ required: true, message: "请选择分类", trigger: "blur" }]
      },
      deptSelectOptions: [
        { max: 50, message: "说明在50字符以内", trigger: "blur" }
      ],
      funcSelectOptions: [],
      roleOptions: [
        { roleId: 1, roleName: "长沙分公司" },
        { roleId: 2, roleName: "测试分公司" },
        { roleId: 3, roleName: "上海分公司" },
        { roleId: 4, roleName: "北京分公司" }
      ], //角色复选框
      dialogFormVisible: false,
      dialogFormVisibleTitle: "新增",
      IntegralData: [], //积分类型
      totalPage: "",
      total:0
    };
  },
  created() {
    this.getIntegralType();
    this.reqAllIntegralClass();
  },
  methods: {
    //设置表格样式
    theadRowStyle(){
      return "color:#333333;font-size:14px;font-weight:500;height:20px;line-height:20px;background:rgba(250,250,252,1);"
    },
    theadRowCellStyle(){
      return 'background:rgba(250,250,252,1);'
    },
    onSearch() {
      this.pageNumber = 1;
      this.isSearch = true;
      this.getIntegralType();
    },
    //处理部门数据，返回符合渲染的数据格式
    treeData(source, id, parentId, children) {
      let cloneData = JSON.parse(JSON.stringify(source));
      return cloneData.filter(father => {
        let branchArr = cloneData.filter(
          child => father[id] == child[parentId]
        );
        branchArr.length > 0 ? (father[children] = branchArr) : "";
        return father[parentId] == 0; // 如果第一层不是parentId=0，请自行修改
      });
    },
    //部门下拉框点击事件
    deptSelected(node) {},
    opendialog() {
      return new Promise((resolve, rej) => {});
    },
    //promise关于角色和部门请求接口封装
    getRoleOrDeptData() {
      return Promise.all([getAllFuncPerm()])
        .then(result => {
          this.deptSelectOptions = result[0].data.data;
          for (let i = 0; i < this.deptSelectOptions.length; i++) {
            this.deptSelectOptions[i].id = this.deptSelectOptions[i].menuId;
            this.deptSelectOptions[i].label = this.deptSelectOptions[i].name;
          }
          this.deptSelectOptions = this.treeData(
            this.deptSelectOptions,
            "menuId",
            "parentId",
            "children"
          );
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: err,
            type: "error"
          });
        });
    },
    //新增
    onAddnew() {
      this.dialogFormVisible = true;
      this.dialogFormVisibleTitle = "新增";
    },
    //确认新增
    confirmAdd() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let param = {};
          for (let key in this.form) {
            param[key] = this.form[key];
          }
          param.menuIdList = param.menuIdList.join(",");
          delete param.createTime;
          if (param.roleId) {
            updateRoleData(param).then(res => {
              this.fetchData();
              this.dialogClose();
            });
          } else {
            saveRoleData(param).then(res => {
              this.fetchData();
              this.dialogClose();
            });
          }
        } else {
          return false;
        }
      });
    },
    //编辑行
    editClick(row) {
      this.integralItem = row;
      this.dialogFormVisible = true;
      this.dialogFormVisibleTitle = "编辑";
      this.form.integralName = row.integralName;
      this.clearForm();
      this.getIntegralRuleConfig(this.integralItem.integralId);
    },
    changeStatus(row, index) {
      let param = {};
      param.roleId = row.roleId;
      if (row.status != 1) {
        // this.tableData[index].status=1;
        row.status = 1;
        param.status = 1;
        updateRoleStatus(param).then(res => {
          if (res.data.code == 0) {
            this.tableData.splice(index, 1, row);
          } else {
          }
        });
      } else {
        row.status = 0;
        param.status = 0;
        updateRoleStatus(param).then(res => {
          if (res.data.code == 0) {
            this.tableData.splice(index, 1, row);
          } else {
          }
        });
      }
    },
    //关闭弹框
    dialogClose() {
      this.dialogFormVisible = false;
      for (let key in this.form) {
        if (Array.isArray(this.form[key])) {
          this.form[key] = [];
        } else {
          this.form[key] = "";
        }
      }
      // this.form.deptId=null;
    },
    //打开弹框前回调事件
    openDialog() {
      this.dialogFormVisible = true;
    },
    //获取表格数据
    fetchData() {
      getAllRoleData(this.formInline).then(res => {
        if (res.data.code == 0) {
          let tableData = res.data.data.list
          tableData.forEach((item,key)=>{
            console.log(item)
            if (item.state==0){
              tableData[key].stateName = '生效中'
            }else {
              tableData[key].stateName = '未生效'
            }
          });
          console.log(tableData)
          this.tableData = tableData;
          this.total = res.data.data.totalCount;
        }
      });
    },
    //分页功能
    handleSizeChange(val) {
      this.pageLimit = val;
      this.getIntegralType();
    },
    handleCurrentChange(val) {
      this.pageNumber = val;
      this.getIntegralType();
    },
    //获取积分类型数据
    getIntegralType() {
      let params = {
        pageNumber: this.pageNumber,
        pageSize: this.pageLimit
      };
      this.isSearch ? (params.keyWord = this.formInline.roleName) : "";
      reqRuleList(params).then(res => {
        if (res.data.errcode === 0) {
          //时间格式化获取前10位
          // res.data.data.list.length > 0
          //   ? res.data.data.list.forEach((item, key) => {
          //       res.data.data.list[key].newTime = item.updateTime.substring(
          //         0,
          //         10
          //       );
          //     })
          //   : "";
          let tableData = res.data.data.list
          tableData.forEach((item,key)=>{
            console.log(item)
            if (item.state==0){
              tableData[key].stateName = '生效中'
            }else {
              tableData[key].stateName = '未生效'
            }
          });
          this.IntegralData = tableData;
          console.log('IntegralData',this.IntegralData)
          this.totalPage = res.data.data.total;
        }
      });
    },

    //添加积分类型数据
    AddIntegralType() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let params = {
            ...this.form,
            createId: 1
          };
          reqAddIntegralType(params).then(res => {
            if (res.data.errcode === 0) {
              this.$message({
                message: res.data.errmsg,
                type: "success"
              });
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.dialogFormVisible = false;
              this.getIntegralType();
            } else {
            }
          });
        } else {
          return false;
        }
      });
    },
    //修改积分类型数据
    modifyIntegralType() {
      const { integralId } = this.integralItem;
      const { port, integralName, explain } = this.form;
      let params = { integralId, integralName, explain, port };
      reqIntegralTypeModify(params).then(res => {
        if (res.data.errcode === 0) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.dialogFormVisible = false;
          this.getIntegralType();
        }
      });
    },
    removeTntegral(index){
      this.formDatas.splice(index,1);
    },
    //添加积分规则
    addTntegral() {
      //添加默认 + - 号
      let addSub = "";
      this.formDatas.push({
        membership:''
      });
    },
    //删除积分类型
    deleateIntegralType(index) {
      this.integralSetting.splice(index, 1);
    },
    //时间改变
    timeChange(val) {
      val ? (this.checked = false) : "";
    },
    //选择框改变
    radioChange(val) {
      val ? (this.form.effectiveTime = "") : "";
    },
    //保存积分规则
    handleSaveRules() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          console.log('formDatas ', this.formDatas);
          let params = {};
          const { integralId, integralName } = this.integralItem;
          params.linkUserId = 1;
          params.interalNameId = integralId;
          if (this.isSave) {
            params.integralRecordId = this.integralRecordId;
          }
          params.integralName = integralName;
          params.remark = this.form.remark;
          if (this.form.effectiveTime.length === 0 && this.checked == false) {
            this.$message({
              message: "请选择有效时间",
              type: "warning"
            });
            return;
          }
          if (this.formDatas.length===0){
            this.$message({
              message: "请添加积分值设置",
              type: "warning"
            });
          }
          //重复性检查


          let newArr = [];
          this.formDatas.length > 0
            ? this.formDatas.forEach((item, index) => {
                newArr.push(item.userType)
                params["membershipValues[" + index + "].membership"] =
                  item.membership;
                params["membershipValues[" + index + "].userType"] =
                  item.userType;
                params["membershipValues[" + index + "].integralValue"] =
                  item.integralValue;
              })
            : "";
          console.log('newArr',newArr);
          var s = newArr.join(",")+",";
          let isRepeat = false;
          for(var i=0;i<newArr.length;i++) {
            if (s.replace(newArr[i] + ",", "").indexOf(newArr[i] + ",") > -1) {
               isRepeat = true;
            }
          }
          if (isRepeat){
            this.$message({
              message: '积分值设置有重复添加',
              type: 'warning'
            });
            return false
          }
          params.rankOne = this.form.ruleClass[0];
          params.rankTwo = this.form.ruleClass[1];
          this.checked ? (params.perpetual = 1) : (params.perpetual = 0); //是否永久
          if (!this.checked) {
            let effectiveTime = this.form.effectiveTime
            params.startTime = effectiveTime[0]
            params.finishTime = effectiveTime[1]

          }
          reqSaveIntegralRule(params).then(res => {
            if (res.data.errcode === 0) {
              this.$message({
                message: res.data.errmsg,
                type: "success"
              });
              this.dialogFormVisible = false;
            }
          });
        }
      });
    },
    //获取积分分类
    reqAllIntegralClass() {
      reqAllIntegralClass().then(res => {
        if (res.data.errcode === 0) {
          let classOptions = [];
          res.data.data.forEach((item, index) => {
            classOptions.push({
              value: item.code.toString(),
              label: item.ofTypeName
            });
            let i = index;
            classOptions[i].children = [];
            item.integralOfTypes.forEach((value, index) => {
              classOptions[i].children.push({
                value: value.code.toString(),
                label: value.ofTypeName
              });
            });
          });
          this.classOptions = classOptions;
        }
      });
    },
    //处理等级改变
    handleLeaveChange(value) {},
    //处理类型改变
    handleTypeChange(value) {

    },
    //清空表单
    clearForm() {
      this.form.remark = "";
      this.integralSetting = [];
      this.form.effectiveTime = "";
      this.form.ruleClass = "";
      this.checked = false;
    },
    //获取配置数据
    getIntegralRuleConfig(id) {
      let params = {
        IntegralNameId: id
      };
      reqIntegralRuleConfig(params).then(res => {
        if (res.data.errcode === 0 && res.data.data) {
          this.isSave = true;
          this.integralRecordId = res.data.data.integralRecordId;
          this.form.remark = res.data.data.remark;
          let newArr = [];
          let arr = res.data.data.membershipValues;
          arr.length > 0
            ? arr.forEach((item, key) => {
                newArr.push({
                  membership: item.membership,
                  userType: item.userType,
                  integralValue: item.integralValue
                });
              })
            : "";
          this.formDatas = newArr;
          if (res.data.data.rankOne && res.data.data.rankTwo) {
            this.form.ruleClass = [
              res.data.data.rankOne.toString(),
              res.data.data.rankTwo.toString()
            ];
          }
          if (res.data.data.perpetual === 1) {
            this.checked = true;
          } else {
            this.form.effectiveTime = [
              res.data.data.startTime,
              res.data.data.finishTime
            ];
          }
        } else {
          this.formDatas = [{
            membership:''
          }]
          this.isSave = false;
        }
      });
    },
    //积分类型修改
    handleClassChange(val) {
      console.log(val);
    },
    //下线
    editOffLine(row) {
      console.log(row);
      let data = {
        state: 1,
        integralId: row.integralId
      };
      reqOffLineIntegralRule(data).then(res => {
        console.log(res);
        if (res.data.errcode === 0) {
          this.$message({
            message: '下线成功',
            type: "success"
          });
          this.visible2 = false;
          this.getIntegralType();
        }
      });
    },
    //上线
    editOnLine(row) {
      console.log(row);
      let data = {
        state: 0,
        integralId: row.integralId
      };
      reqOffLineIntegralRule(data).then(res => {
        console.log(res);
        if (res.data.errcode === 0) {
          this.$message({
            message: '上线成功',
            type: "success"
          });
          this.visible1 = false;
          this.getIntegralType();
        }
      });
    },
    handleClick() {
      this.integralValue = this.integralValue.replace(/[^\w]/g, "");
    }
  }
};
</script>

<style  lang="less">
.integral-rule-self {
  .el-dialog__header {
    text-align: center;
    padding: 15px 20px 15px;
  }
  .redSign {
    overflow: hidden;
    label:before {
      content: "*";
      color: #f56c6c;
      margin-right: 4px;
    }
  }
  .integralCenter {
    box-sizing: border-box;
  }
  .integarl-add {
    font-size: 20px;
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: -20px;
  }
  .integarl-add:hover {
    color: #2bb1e8;
  }
  .el-icon-delete-solid {
    cursor: pointer;
  }
  .el-icon-delete-solid:hover {
    color: #2bb1e8;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .no_select .vue-treeselect__value-container {
    display: none;
  }
  .no_select .vue-treeselect__x-container {
    display: none;
  }
  .no_select .vue-treeselect__menu-container {
    position: relative;
  }
  .no_select .vue-treeselect__control {
    display: none !important;
  }
  .point_class {
    cursor: pointer;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
  }
  .dialog-footer {
    text-align: center;
  }
  .el-dialog__header {
    background-color: #f2f7fa;
    .el-dialog__headerbtn {
      top: 15px;
      .el-dialog__close {
        font-size: 26px;
      }
    }
  }
  .el-dialog__body {
    padding-right: 127px;
  }
  .el-dialog {
    width: 56%;
  }
}
</style>
