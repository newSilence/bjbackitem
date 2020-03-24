<template>
  <div class="integralTypeSelf">
    <el-form style="margin:20px;float: right" :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="">
        <!-- <el-input v-model="formInline.username" placeholder="角色名称"></el-input> -->
        <el-input style="border-radius:12px;width: 368px" placeholder="请输入ID、积分接口、积分类型、说明" @keyup.enter.native="onSearch"  v-model="formInline.roleName">
          <el-button style="background:linear-gradient(126deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);border-radius:0px 4px 4px 0px;color:white" slot="append"  @click="onSearch"  icon="el-icon-search">搜索</el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <!-- <el-button type="primary" @click="onSearch">查询</el-button> -->
        <el-button style="background:linear-gradient(36deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);color:white" @click="onAddnew">新建</el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-table
        :header-row-style="theadRowStyle"
        :header-cell-style="theadRowCellStyle"
        :data="IntegralData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column
          prop="integralId"
          label="ID"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="integralName"
          label="积分类型"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="explain"
          label="说明"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="createName"
          label="操作人"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="newTime"
          label="最后更新时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
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
        :total="totalPage">
      </el-pagination>
    </div>
    <!-- 新增或者编辑弹框 -->
    <el-dialog width="49%" :title="dialogFormVisibleTitle" @open="openDialog" :visible.sync="dialogFormVisible" @close="dialogClose">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="180px">
        <el-form-item label="积分类型：" prop="integralName">
          <el-col :span="18">
            <el-input v-model="form.integralName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="触发接口：" prop="port">
          <el-col :span="18">
            <el-input v-model="form.port"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="对应页面：" prop="page">
          <el-col :span="18">
            <el-input v-model="form.hopRouting"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="说明：" prop="explain">
          <el-col :span="18">
            <el-input type="textarea" :maxlength="50" placeholder="请输入备注，限制在50字以内" :rows="4" v-model="form.explain"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" class="sure" @click="AddIntegralType" v-show="dialogFormVisibleTitle==='新增'">确定</el-button>
        <el-button type="primary" class="save" @click="modifyIntegralType" v-show="dialogFormVisibleTitle==='编辑'">保存</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import { reqIntegralTypeModify,reqAddIntegralPort,reqAddIntegralType,reqIntegralType, getAllRoleData , updateRoleStatus , getAllFuncPerm , updateRoleData , saveRoleData  } from '../api'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
    export default {
        name: "Integral-type",
      data(){
        var checkPassword=(rule, value, callback) => {
          //如果有用户Id
          if(this.form.userId&&this.form.password){
            if(this.form.password.length>20||this.form.password.length<6){
              callback(new Error('请输入6-20位密码'));
            }
            callback();
            // this.$refs.ruleForm.validateField('passwords');
          }
          //如果没有用户Id
          if (!this.form.userId) {
            if(!this.form.password){
              callback(new Error('请输入密码'));
            }else if(this.form.password.length>20||this.form.password.length<6){
              callback(new Error('请输入6-20位密码'));
            }else{
              callback()
            };
          }
          callback();
        };
          return {
            isSearch:false,
            integralItem:{},//item积分对象
            pageNumber:1,//当前页码
            pageLimit:10,//每页数量
            typeMember:0,
            defaultProps: {
              children: 'children',
              label: 'label'
            },
            tableData:[
              {userId:1,username:'admin',email:'1@qq.com',mobile:17521016266,status:1,roleIdList:[1,2],deptId:6,deptName:'测试分公司',createTime: "2016-11-11 11:11:11"}
            ],
            formInline: {
              roleName:'',
              page:1,
              limit:10,
            },
            form:{
              integralName:'',
              explain:'',
              port:'',
              hopRouting:''
            },
            rules:{
              integralName:[
                { required: true, message: '请输入积分类型', trigger: 'blur' },
                { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
              ],
              port:[
                { required: true, message: '请输入触发接口', trigger: 'blur' }
              ],
              hopRouting:[
                { required: false }
              ]
            },
            deptSelectOptions:[
              { max: 50, message: '说明在50字符以内', trigger: 'blur' }
            ],
            funcSelectOptions:[],
            roleOptions:[
              {roleId:1,roleName:'长沙分公司'},
              {roleId:2,roleName:'测试分公司'},
              {roleId:3,roleName:'上海分公司'},
              {roleId:4,roleName:'北京分公司'},
            ],//角色复选框
            dialogFormVisible:false,
            dialogFormVisibleTitle:'新增',
            IntegralData:[],  //积分类型
            totalPage:''
          }
      },
      created() {
        this.getIntegralType();
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
           console.log(this.formInline.roleName)
           this.pageNumber = 1;
           this.isSearch = true;
           this.getIntegralType();

        },
        //处理部门数据，返回符合渲染的数据格式
        treeData(source, id, parentId, children){
          let cloneData = JSON.parse(JSON.stringify(source))
          return cloneData.filter(father=>{
            let branchArr = cloneData.filter(child => father[id] == child[parentId]);
            branchArr.length>0 ? father[children] = branchArr : ''
            return father[parentId] == 0        // 如果第一层不是parentId=0，请自行修改
          })
        },
        //部门下拉框点击事件
        deptSelected(node){
        },
        opendialog(){
          return new Promise((resolve,rej)=>{})
        },
        //promise关于角色和部门请求接口封装
        getRoleOrDeptData(){
          return Promise.all( [ getAllFuncPerm() ] ).then(result=>{
            this.deptSelectOptions=result[0].data.data;
            for(let i=0;i<this.deptSelectOptions.length;i++){
              this.deptSelectOptions[i].id=this.deptSelectOptions[i].menuId;
              this.deptSelectOptions[i].label=this.deptSelectOptions[i].name;
            }
            this.deptSelectOptions=this.treeData(this.deptSelectOptions,'menuId','parentId','children');
          }).catch(err=>{
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          })
        },
        //新增
        onAddnew(){
          this.dialogFormVisible=true;
          this.dialogFormVisibleTitle="新增"
        },
        //确认新增
        confirmAdd(){
          this.$refs['ruleForm'].validate((valid) => {
            if (valid) {
              let param={};
              for(let key in this.form){
                param[key]=this.form[key];
              }
              param.menuIdList=param.menuIdList.join(',');
              delete param.createTime;
              if(param.roleId){
                updateRoleData(param).then(res=>{
                  this.fetchData();
                  this.dialogClose();
                })
              }else{
                saveRoleData(param).then(res=>{
                  this.fetchData();
                  this.dialogClose();
                })
              }

            } else {
              return false;
            }
          });

        },
        //编辑行
        editClick(row){
          this.integralItem = row;
          this.dialogFormVisible=true;
          this.dialogFormVisibleTitle = '编辑';
          this.form.integralName = row.integralName;
          this.form.explain = row.explain;
          this.form.hopRouting = row.hopRouting;
          let params = {
            integralId:row.integralId
          }
          reqAddIntegralPort(params)
            .then(res=>{
              if (res.data.errcode===0){
                this.form.port = res.data.data.port;
              }
            })
        },
        changeStatus(row,index){
          let param={};
          param.roleId=row.roleId;
          if(row.status!=1){
            // this.tableData[index].status=1;
            row.status=1;
            param.status=1;
            updateRoleStatus(param).then(res=>{
              if(res.data.code==0){
                this.tableData.splice(index,1,row);
              }else{}
            })

          }else{
            row.status=0;
            param.status=0;
            updateRoleStatus(param).then(res=>{
              if(res.data.code==0){
                this.tableData.splice(index,1,row);
              }else{}
            })
          }
        },
        //关闭弹框
        dialogClose(){
          this.dialogFormVisible=false;
          for(let key in this.form){
            if(Array.isArray(this.form[key])){
              this.form[key]=[];
            }else{
              this.form[key]='';
            }
          }
        },
        //打开弹框前回调事件
        openDialog(){
          this.dialogFormVisible = true
        },
        //获取表格数据
        fetchData(){
          getAllRoleData(this.formInline).then(res=>{
            if(res.data.code==0){
              this.tableData=res.data.data.list;
              this.total=res.data.data.totalCount;
            }
          })
        },
        //分页功能
        handleSizeChange(val){
          this.pageLimit = val;
          this.getIntegralType()
        },
        handleCurrentChange(val){
          this.pageNumber = val;
          this.getIntegralType()
        },
        //获取积分类型数据
        getIntegralType  (){
          let params = {
            pageNumber:this.pageNumber,
            pageSize:this.pageLimit,
          };
          this.isSearch?params.keyWord=this.formInline.roleName:'';
          reqIntegralType(params).then(res=>{
            if (res.data.errcode===0){
              //时间格式化获取前10位
              res.data.data.list.length>0?res.data.data.list.forEach((item,key)=>{
                res.data.data.list[key].newTime = item.updateTime.substring(0,10)
              }):'';
              this.IntegralData = res.data.data.list;
              this.totalPage = res.data.data.total;
            }
          })
        },

        //添加积分类型数据
        AddIntegralType(){
          this.$refs['ruleForm'].validate((valid) => {
            if (valid) {
              let params = {
                ...this.form,createId:1
              }
              reqAddIntegralType(params).then(res=>{
                if(res.data.errcode ===0){
                  this.$message({
                    message: res.data.errmsg,
                    type: 'success'
                  });
                  this.dialogFormVisible = false
                  this.getIntegralType()
                }else {
                  this.$message.error(res.data.errmsg);
                }
              })
            } else {
              return false;
            }
          })
        },
        //修改积分类型数据
        modifyIntegralType(){
          const {integralId} = this.integralItem;
          const {port,integralName,explain,hopRouting} = this.form;
          let params = {integralId,integralName,explain,port,hopRouting};
          reqIntegralTypeModify(params)
            .then(res=>{
              if (res.data.errcode===0){
                this.$message({
                  message: res.data.errmsg,
                  type: 'success'
                });
                this.dialogFormVisible = false
                this.getIntegralType()
              }
            })
        },
      }
    }
</script>

<style  lang="less">
  .integralTypeSelf {
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
    .el-dialog__header {
      background-color: #F2F7FA;
      font-size:22px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(51,51,51,1);
      text-align: center;
      padding: 15px 20px 15px;
      .el-dialog__headerbtn {
        top: 15px;
      }
      .el-icon-close {
        font-size: 26px;
      }
    }
    .save {
      width:82px;
      background:linear-gradient(36deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);
      border-radius:4px;
      border: none;
    }
    .el-dialog__footer {
      text-align: center;
    }
    .sure {
      width:82px;
      background:linear-gradient(36deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);
      border-radius:4px;
      border: none;
    }
  }
</style>
