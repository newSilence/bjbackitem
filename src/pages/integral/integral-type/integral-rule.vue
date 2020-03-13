<template>
  <div class="integral-rule-self">
    <el-form style="margin:20px;float: right" :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="">
        <!-- <el-input v-model="formInline.username" placeholder="角色名称"></el-input> -->
        <el-input style="border-radius:12px" placeholder="请输入ID、积分接口、积分名称、说明"  v-model="formInline.roleName">
          <el-button style="background:linear-gradient(126deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);border-radius:0px 4px 4px 0px;color:white" slot="append"  @click="onSearch" icon="el-icon-search">搜索</el-button>
        </el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-table
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
            <el-button @click="editClick(scope.row)" type="text" size="small">配置</el-button>
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
    <el-dialog  :title="dialogFormVisibleTitle" @open="openDialog" :visible.sync="dialogFormVisible" @close="dialogClose">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="140px">
        <el-form-item label="积分类型：" prop="integralName">
            <el-input v-model="form.integralName" disabled></el-input>
        </el-form-item>
        <el-form-item label="分类：" prop="ruleClass">
          <el-cascader
            v-model="form.ruleClass"
            :options="classOptions"
            ></el-cascader>
        </el-form-item>
        <el-form-item label="有效时间：" prop="integralName">
            <el-date-picker
              v-model="form.effectiveTime"
              type="daterange"
              @change="timeChange"
              range-separator=""
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          <el-checkbox v-model="checked" @change="radioChange" style="margin-left: 20px">永久有效</el-checkbox>
        </el-form-item>
        <el-form-item label="积分值设置：" prop="set" class="redSign">
          <el-row :gutter="20">
            <el-col :span="7"><div class="grid-content bg-purple integralTitle">会员等级</div></el-col>
            <el-col :span="7"><div class="grid-content bg-purple">用户类型</div></el-col>
            <el-col :span="7"><div class="grid-content bg-purple">积分值</div></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="7"><div class="grid-content bg-purple">
              <i class="el-icon-circle-plus integarl-add" @click="addTntegral"></i>
              <el-select v-model="membership" @change="handleLeaveChange" placeholder="请选择" style="display: inline-block;width: 80%">
                <el-option
                  v-for="item in leaveOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div></el-col>
            <el-col :span="7"><div class="grid-content bg-purple">
              <el-select v-model="userType" @change="handleTypeChange" placeholder="请选择">
                <el-option
                  v-for="item in personTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div></el-col>
            <el-col :span="7"><div class="grid-content bg-purple">
              <el-input v-model="integralValue" placeholder="请输入内容" style="width: 80%"></el-input>
            </div></el-col>
          </el-row>
          <el-row :gutter="20" v-for="(item,index) in integralSetting" :key="index">
            <el-col :span="7"><div class="grid-content bg-purple integralCenter">
              <el-tag
                :key="1"
                effect="plain">
                {{item.membership}}
              </el-tag>
            </div></el-col>
            <el-col :span="7"><div class="grid-content bg-purple integralCenter">
              <el-tag
                :key="1"
                :type="'success'"
                effect="plain">
                {{item.userType}}
              </el-tag>
            </div></el-col>
            <el-col :span="7"><div class="grid-content bg-purple integralCenter">
              <el-tag
                :key="1"
                :type="'info'"
                effect="plain">
                {{item.integralValue}}
              </el-tag>
              <i @click="deleateIntegralType(index)" class="el-icon-delete-solid" style="font-size: 20px;margin-left: 10px;vertical-align: middle"></i>
            </div></el-col>
          </el-row>

        </el-form-item>
        <el-form-item label="备注：" prop="remark">
          <el-input type="textarea" :rows="4" v-model="form.remark"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="this.handleSaveRules">保存</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import { reqIntegralRuleConfig,reqSaveIntegralRule,reqAllIntegralClass,reqIntegralTypeModify,reqAddIntegralPort,reqAddIntegralType,reqIntegralType,getAdminManageTable , getAllRoleData , updateRoleStatus ,getAllDepartData ,getAllSelectFuncPerm , saveAdminUser , updateAdminUser , getUserDetailInfo , getAllFuncPerm , updateRoleData , saveRoleData , getRoleDetailInfo } from '../api'
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  export default {
    name: "Integral-type",
    data(){
      return {

        membership:'',
        userType:'',
        integralValue:'',
        integralSetting:[],
        integralSettingCode:[],
        classOptions:[],
        leaveOptions:[
          {
            value:'0',
            label:'VIP0'
          },
          {
            value:'1',
            label:'VIP1'
          },
          {
            value:'2',
            label:'VIP2'
          },
          {
            value:'3',
            label:'VIP3'
          }
        ],//会员等级数据
        personTypeOptions:[
          {
            value:'0',
            label:'普通个人用户'
          },
          {
            value:'1',
            label:'机构用户'
          },
          {
            value:'2',
            label:'服务商用户'
          },
          {
            value:'3',
            label:'专家用户'
          }
        ],
        checked:false,
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
          ruleClass:'',
          effectiveTime:'',
        },

        rules:{
          integralName:[
            { required: true, message: '请输入积分类型', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          remark:[
            { required: true, message: '请输入备注', trigger: 'blur' }
          ],
          ruleClass:[
            { required: true, message: '请选择分类', trigger: 'blur' }
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
      this.reqAllIntegralClass();
    },
    methods: {
      onSearch() {
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
      },
      opendialog(){
        return new Promise((resolve,rej)=>{})
      },
      //promise关于角色和部门请求接口封装
      getRoleOrDeptData(){
        return Promise.all( [ getAllFuncPerm() ] ).then(result=>{
          console.log('promise',result);
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
        console.log(this.form);
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            console.log(this.form);
            let param={};
            for(let key in this.form){
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
        console.log(this.integralItem.integralId)
        this.getIntegralRuleConfig(this.integralItem.integralId)
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
        this.dialogFormVisible = true
      },
      //获取表格数据
      fetchData(){
        getAllRoleData(this.formInline).then(res=>{
          console.log(res);
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
        reqIntegralType(params).then(res=>{
          if (res.data.errcode===0){
            //时间格式化获取前10位
            res.data.data.list.length>0?res.data.data.list.forEach((item,key)=>{
              console.log(item)
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
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
                this.dialogFormVisible = false
                this.getIntegralType()
              }else {

              }
            })
          } else {
            return false;
          }
        })
      },
      //修改积分类型数据
      modifyIntegralType(){
        console.log(this.integralItem)
        const {integralId} = this.integralItem;
        const {port,integralName,explain} = this.form;
        let params = {integralId,integralName,explain,port};
        reqIntegralTypeModify(params)
          .then(res=>{
            console.log(res)
            if (res.data.errcode===0){
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.dialogFormVisible = false
              this.getIntegralType()
            }
          })
      },
      //添加积分规则
      addTntegral(){
        //添加默认 + - 号
            let addSub = '';
            console.log(this.form.ruleClass)

            if (this.form.ruleClass[0]=='2000'){
              addSub = '-'
            }else if (this.form.ruleClass[0]=='1000'){
              addSub = '+'
          }
         else if (this.form.ruleClass===''){
         this.$message({
           message: '请先选择分类',
           type: 'warning'
         });
         return

       }
         if(this.membership===''){
           this.$message({
             message: '请先选择会员等级',
             type: 'warning'
           });
           return
         }
        if(this.userType===''){
          this.$message({
            message: '请先选择用户类型',
            type: 'warning'
          });
          return
        }
        if(this.integralValue===''){
          this.$message({
            message: '请输入积分值',
            type: 'warning'
          });
          return
        }

       //重复性判断
        var isRepeat = false
        console.log('integralSetting',this.integralSetting);
        this.integralSettingCode.length>0?this.integralSettingCode.forEach((item,key)=>{
          if (item.membership==this.membership&&item.userType==this.userType){
            this.$message({
              message: '请勿重复添加',
              type: 'warning'
            });
            isRepeat = true;
          }
        }):'';
        if (isRepeat){
          return false;
        }
        let  membershipValue;
        this.leaveOptions.forEach((item,key)=>{
          if (item.value==this.membership){
            membershipValue = item.label
          }
        });
        let  userType;
        this.personTypeOptions.forEach((item,key)=>{
          if (item.value==this.userType){
            userType = item.label
          }
        })
        this.integralSetting.push({
          membership:membershipValue,
          userType:userType,
          integralValue: addSub + this.integralValue
        })
        this.integralSettingCode.push({
          membership:this.membership,
          userType:this.userType,
          integralValue: addSub + this.integralValue
        })


      },
      //删除积分类型
      deleateIntegralType(index){
        this.integralSetting.splice(index,1)
        this.integralSettingCode.splice(index,1)
      },
      //时间改变
      timeChange(val){
        val?this.checked=false:'';
      },
      //选择框改变
      radioChange(val){
        val?this.form.effectiveTime='':'';
      },
      //保存积分规则
      handleSaveRules(){
        this.$refs['ruleForm'].validate((valid)=>{
          if (valid){
            let params = {};
            console.log(this.integralItem);
            const  {integralId,integralName} = this.integralItem;
            params.linkUserId = 1;
            params.interalNameId = integralId;
            params.integralName = integralName;
            params.remark  = this.form.remark;
            if (this.form.effectiveTime.length===0&&this.checked==false){
              this.$message({
                message: '请选择有效时间',
                type: 'warning'
              });
              return
            }
            if (this.integralSettingCode.length===0){
              this.$message({
                message: '请添加积分值设置',
                type: 'warning'
              });
              return
            }
            this.integralSettingCode.length>0?this.integralSettingCode.forEach((item,index)=>{
              params['membershipValues['+index+'].membership']=item.membership
              params['membershipValues['+index+'].userType']=item.userType
              params['membershipValues['+index+'].integralValue']=item.integralValue
            }):'';
            // params.membershipValues = this.integralSetting;
            params.rankOne = this.form.ruleClass[0];
            params.rankTwo = this.form.ruleClass[1];
            this.checked?params.perpetual=1:params.perpetual=0; //是否永久
            if (!this.checked){
              let effectiveTime = this.form.effectiveTime.toLocaleString().split(',')
              console.log(this.form.effectiveTime.toLocaleString().split(','))
              params.startTime = effectiveTime[0].substring(0,10).split('/').join('-')
              params.finishTime = effectiveTime[1].substring(0,10).split('/').join('-')
            }
            reqSaveIntegralRule(params).then(res=>{
               console.log(res)
              if (res.data.errcode===0){
                this.$message({
                  message: res.data.errmsg,
                  type: 'success'
                });
               this.dialogFormVisible = false
              }
            })
          }
        })

      },
      //获取积分分类
      reqAllIntegralClass(){
        reqAllIntegralClass()
        .then(res=>{
          console.log('二级分类',res)
          if (res.data.errcode===0){
            let classOptions = [];
            res.data.data.forEach((item,index)=>{
              classOptions.push({
                value:item.code.toString(),
                label:item.ofTypeName
              })
              let i = index
              classOptions[i].children = []
              item.integralOfTypes.forEach((value,index)=>{
                classOptions[i].children.push(
                  {
                    value:value.code.toString(),
                    label:value.ofTypeName
                  }
                )

              })
            })
            console.log('11111111111111',classOptions)
            this.classOptions = classOptions;
          }

        })
      },
      //处理等级改变
      handleLeaveChange(value){
          console.log(value)
      },
      //处理类型改变
      handleTypeChange(value){
        console.log(value)
      },
      //获取配置数据
      getIntegralRuleConfig(id){
        let params = {
          integralRecordId:id,

        }
        reqIntegralRuleConfig(params).then(res=>{
          console.log(res)
          if (res.data.errcode===0){
            console.log(res.data.data.remark)
            this.form.remark = res.data.data.remark
          }
        })
      }
    }
  }
</script>

<style  lang="less">
  .integral-rule-self {
    .redSign {
       label:before {
         content: '*';
         color: #F56C6C;
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
      color: #2BB1E8;
    }
    .el-icon-delete-solid {
      cursor: pointer;
    }
    .el-icon-delete-solid:hover {
      color: #2BB1E8;
    }
    .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
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
    .dialog-footer {
      text-align: center;
    }
    .el-dialog__header {
     background-color: #F2F7FA;
      padding-top: 10px;
      .el-dialog__headerbtn {
        top: 10px;
        .el-dialog__close {
         font-size: 26px;
        }

      }
    }
    .el-dialog__body {
      padding-right: 127px;
    }
    .el-dialog {
      width: 45%;
    }
     }



</style>
