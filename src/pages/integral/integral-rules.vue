<template>
  <div>
    <!-- 积分类型 -->
    <div style="display:flex;justify-content:flex-end;align-items:center">
      <!--<div style="margin:20px">
        <span class="point_class" @click="changeTypeMem(0)" :style="{paddingRight:20+'px',color:typeMember==0?'#2BB1E8':'#333333'}">积分类型配置</span>
        <el-divider direction="vertical"></el-divider>
        &lt;!&ndash; @click="changeTypeMem(1)" &ndash;&gt;
        <span class="point_class"  :style="{paddingRight:20+'px',paddingLeft:20+'px',color:typeMember==1?'#2BB1E8':'#333333'}">积分规则设置</span>
        <el-divider direction="vertical"></el-divider>
        &lt;!&ndash; @click="changeTypeMem(2)" &ndash;&gt;
        <span class="point_class" :style="{paddingLeft:20+'px',color:typeMember==2?'#2BB1E8':'#333333'}">积分兑换活动设置</span>
      </div>-->
      <el-form style="margin:20px" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-select style="border:1px solid #01A2E4;border-radius:12px" v-model="value" placeholder="积分状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-input style="border:1px solid #01A2E4;border-radius:12px" placeholder="请输入ID、积分接口、积分名称、说明"  v-model="formInline.roleName">
            <el-button style="background:linear-gradient(126deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);border-radius:0px 4px 4px 0px;color:white" slot="append"  @click="onSearch" icon="el-icon-search">搜索</el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="background:linear-gradient(36deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);color:white" @click="onAddnew">新建</el-button>
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
          prop="roleName"
          label="ID"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="modifyBy"
          label="积分类型"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="modifyBy"
          label="积分状态"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="备注"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="操作人"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="updateTime"
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
    <!-- 新增或者编辑弹框 -->
    <el-dialog :title="dialogFormVisibleTitle" @open="openDialog" :visible.sync="dialogFormVisible" @close="dialogClose">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="积分类型：" prop="roleName">
          <el-col :span="8">
            <el-input v-model="form.roleName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="出发接口：" prop="roleName">
          <el-col :span="8">
            <el-input v-model="form.roleName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="说明：" prop="remark">
          <el-col :span="8">
            <el-input type="textarea" placeholder="请输入备注，限制在50字以内" :rows="4" v-model="form.remark"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getAdminManageTable , getAllRoleData , updateRoleStatus ,getAllDepartData ,getAllSelectFuncPerm , saveAdminUser , updateAdminUser , getUserDetailInfo , getAllFuncPerm , updateRoleData , saveRoleData , getRoleDetailInfo } from './api'
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  export default {

    data() {
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
          // console.log('jjjj');
          if(!this.form.password){
            callback(new Error('请输入密码'));
          }else if(this.form.password.length>20||this.form.password.length<6){
            callback(new Error('请输入6-20位密码'));
          }else{
            console.log("yanzheng")
            callback()
          };
          console.log(this.$refs.ruleForm.validateField('passwords'));
        }
        callback();
      };
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        typeMember:0,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        tableData:[
          {userId:1,username:'admin',email:'1@qq.com',mobile:17521016266,status:1,roleIdList:[1,2],deptId:6,deptName:'测试分公司',createTime: "2016-11-11 11:11:11"}
        ],
        total:0,
        formInline: {
          roleName:'',
          page:1,
          limit:10,
        },
        form:{
          roleName:'',
          remark:'',
          menuIdList:[],
        },
        rules:{
          roleName:[
            { required: true, message: '请输入角色名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          remark:[
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ],
          passwords:[
            { required: true, message: '请输入用户密码', trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ],
          password:[
            { validator: checkPassword, trigger: 'blur' }
            // { required: true, message: '请输入用户密码', trigger: 'blur' },
            // { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ],
          menuIdList: [
            { type: 'array', required: true, message: '请至少选择一个角色', trigger: 'change' }
          ],
          status: [
            { required: true, message: '请选择当前状态', trigger: 'change' }
          ],
        },
        deptSelectOptions:[
          // {deptId:1,parentId:0,name:'人人开源集团',parentName:null},
          // {deptId:2,parentId:1,name:'长沙分公司',parentName:"人人开源集团"},
          // {deptId:3,parentId:1,name:'上海分公司',parentName:"人人开源集团"},
          // {deptId:4,parentId:3,name:'技术部',parentName:"上海分公司"},
          // {deptId:5,parentId:3,name:'销售部',parentName:"上海分公司"},
          // {deptId:6,parentId:1,name:'测试分公司',parentName:"人人开源集团"},
          // {deptId:7,parentId:6,name:'测试部门',parentName:"测试分公司"},
          // {deptId:11,parentId:0,name:'1231',parentName:null},
        ],//部门下拉框
        funcSelectOptions:[],
        roleOptions:[
          {roleId:1,roleName:'长沙分公司'},
          {roleId:2,roleName:'测试分公司'},
          {roleId:3,roleName:'上海分公司'},
          {roleId:4,roleName:'北京分公司'},
        ],//角色复选框
        dialogFormVisible:false,
        dialogFormVisibleTitle:'新建角色',
      }
    },
    components: { Treeselect },
    methods: {
      onSearch() {
        debugger
        this.formInline.page=1;
        this.fetchData();
        console.log("search");
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
        console.log(node);
        // this.form.deptName=node.label;
      },
      opendialog(){
        return new Promise((resolve,rej)=>{})
      },
      //promise关于角色和部门请求接口封装
      getRoleOrDeptData(){
        return Promise.all( [ getAllFuncPerm() ] ).then(result=>{
          console.log('promise',result);
          this.deptSelectOptions=result[0].data.data;
          // for(let i=0;i<this.funcSelectOptions.length;i++){
          //     this.funcSelectOptions[i].id=this.funcSelectOptions[i].menuId;
          //     this.funcSelectOptions[i].label=this.funcSelectOptions[i].name;
          // }
          // this.funcSelectOptions=this.treeData(this.funcSelectOptions,'menuId','parentId','children');
          // this.deptSelectOptions=result[1].data.data;
          for(let i=0;i<this.deptSelectOptions.length;i++){
            this.deptSelectOptions[i].id=this.deptSelectOptions[i].menuId;
            this.deptSelectOptions[i].label=this.deptSelectOptions[i].name;
          }
          this.deptSelectOptions=this.treeData(this.deptSelectOptions,'menuId','parentId','children');
          // console.log("promise",res);
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
        // 后端联调放开
        this.getRoleOrDeptData();
      },
      //确认新增
      confirmAdd(){
        console.log(this.form);
        // return false;
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            console.log(this.form);
            // console.log('console.log(this.form);',this.value)
            let param={};
            for(let key in this.form){
              // if(key=="roleIdList"){
              //     param[key]=JSON.stringify(this.form[key])
              // }else{
              //     param[key]=this.form[key];
              // }
              param[key]=this.form[key];
            }
            param.menuIdList=param.menuIdList.join(',');
            delete param.createTime;
            if(param.roleId){
              updateRoleData(param).then(res=>{
                console.log(res);
                this.fetchData();
                this.dialogClose();
              })
            }else{
              saveRoleData(param).then(res=>{
                console.log(res);
                this.fetchData();
                this.dialogClose();
              })
            }

          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      //编辑行
      editClick(row){
        console.log(row);
        this.dialogFormVisible=true;
        this.dialogFormVisibleTitle="编辑"
        let param={
          roleId:row.roleId
        }
        Promise.all([this.getRoleOrDeptData(),getRoleDetailInfo(param)]).then(result=>{
          console.log(result);
          for(let key in this.form){
            this.form[key]=result[1].data.data[key];
          }
          // this.form=result[1].data.data;
          // this.form.menuIdList=result[1].data.data.selectMenuIdList?result[1].data.data.selectMenuIdList:[];
          // this.form.deptIdList=result[1].data.data.selectDeptIdList?result[1].data.data.selectDeptIdList:[];

        }).catch(err=>{
          this.$message({
            showClose: true,
            message: err,
            type: 'error'
          });
        })
      },
      changeStatus(row,index){
        console.log(row);
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
            // console.log(res);
          })

        }else{
          row.status=0;
          param.status=0;
          updateRoleStatus(param).then(res=>{
            if(res.data.code==0){
              this.tableData.splice(index,1,row);
            }else{}
            // console.log(res);
          })
        }
        console.log(this.tableData)
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
        // this.form.deptId=null;
      },
      //打开弹框前回调事件
      openDialog(){

      },
      //获取表格数据
      fetchData(){
        getAllRoleData(this.formInline).then(res=>{
          console.log(res);
          if(res.data.code==0){
            this.tableData=res.data.data.list;

            console.log('this.tableData',this.tableData)
            this.total=res.data.data.totalCount;
          }
        })
      },
      //分页功能
      handleSizeChange(val){
        this.formInline.limit=val;
        this.fetchData();
      },
      handleCurrentChange(val){
        this.formInline.page=val;
        this.fetchData();
      }
    },
    created () {
      this.fetchData();
      //先处理成vue-treeselect的需求字段。
      for(let i=0;i<this.deptSelectOptions.length;i++){
        this.deptSelectOptions[i].id=this.deptSelectOptions[i].deptId;
        this.deptSelectOptions[i].label=this.deptSelectOptions[i].name;
      }
      console.log('this.treeData',this.treeData(this.deptSelectOptions,'deptId','parentId','children'));
    },
  }
</script>

<style lang="less">
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
