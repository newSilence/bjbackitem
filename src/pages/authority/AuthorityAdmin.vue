<template>
    <div>
        <!-- 管理员管理页面 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="">
                <el-input v-model="formInline.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSearch">查询</el-button>
                <el-button type="primary" @click="onAddnew">新增</el-button>
            </el-form-item>
        </el-form>
        
        <div>
            <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                >
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                label="用户ID"
                width="120">
                <template slot-scope="scope">{{ scope.row.userId }}</template>
                </el-table-column>
                <el-table-column
                prop="username"
                label="用户名"
                width="120">
                </el-table-column>
                <el-table-column
                prop="deptName"
                label="所属部门"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="email"
                label="邮箱"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="mobile"
                label="手机号"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                label="状态"
                width="120">
                <template slot-scope="scope">{{ scope.row.status==1?'正常':'禁用' }}</template>
                </el-table-column>
                <el-table-column
                prop="createTime"
                label="创建时间"
                show-overflow-tooltip>
                </el-table-column>
                 <el-table-column
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
                        <el-button @click="editClick(scope.row)" type="text" icon="el-icon-edit" size="small"></el-button>
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
            <el-form :model="form" ref="ruleForm" :rules="rules" label-width="100px">
                <el-form-item label="用户名" prop="username">
                    <el-col :span="8">
                        <el-input v-model="form.username"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="所属部门" prop="deptId">
                    <el-col :span="8">
                        <treeselect @select="deptSelected" v-model="form.deptId" :multiple="false" :flat="false" :default-expand-level="1" :options="deptSelectOptions" />
                        <!-- <el-input v-model="form.username"></el-input> -->
                    </el-col>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-col :span="8">
                        <el-input v-model="form.password"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-col :span="8">
                        <el-input v-model="form.email"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-col :span="8">
                        <el-input v-model="form.mobile"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="角色" prop="roleIdList">
                    <el-checkbox-group v-model="form.roleIdList">
                        <el-checkbox v-for="role in roleOptions" :label="role.roleId" :key="role.roleId">{{role.roleName}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-radio-group v-model="form.status">
                        <el-radio :label="0">禁用</el-radio>
                        <el-radio :label="1">正常</el-radio>
                    </el-radio-group>
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
import { getAdminManageTable , getAllRoleData , getAllDepartData , saveAdminUser , updateAdminUser , getUserDetailInfo ,  } from './api'
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
                
                tableData:[
                    {userId:1,username:'admin',email:'1@qq.com',mobile:17521016266,status:1,roleIdList:[1,2],deptId:6,deptName:'测试分公司',createTime: "2016-11-11 11:11:11"}
                ],
                total:0,
                formInline: {
                    username:'',
                    page:1,
                    limit:10,
                },
                form:{
                    username:'',
                    deptName:'',
                    deptId:null,
                    password:'',
                    email:'',
                    mobile:'',
                    roleIdList:[],
                    status:''
                },
                rules:{
                    username:[
                        { required: true, message: '请输入用户名称', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    deptId:[
                        { required: true, message: '请选择所属部门', trigger: 'change' }
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
                    roleIdList: [
                        { type: 'array', required: true, message: '请至少选择一个角色', trigger: 'change' }
                    ],
                    status: [
                        { required: true, message: '请选择当前状态', trigger: 'change' }
                    ],
                },
                deptSelectOptions:[
                    {deptId:1,parentId:0,name:'人人开源集团',parentName:null},
                    {deptId:2,parentId:1,name:'长沙分公司',parentName:"人人开源集团"},
                    {deptId:3,parentId:1,name:'上海分公司',parentName:"人人开源集团"},
                    {deptId:4,parentId:3,name:'技术部',parentName:"上海分公司"},
                    {deptId:5,parentId:3,name:'销售部',parentName:"上海分公司"},
                    {deptId:6,parentId:1,name:'测试分公司',parentName:"人人开源集团"},
                    {deptId:7,parentId:6,name:'测试部门',parentName:"测试分公司"},
                    {deptId:11,parentId:0,name:'1231',parentName:null},
                ],//部门下拉框
                roleOptions:[
                    {roleId:1,roleName:'长沙分公司'},
                    {roleId:2,roleName:'测试分公司'},
                    {roleId:3,roleName:'上海分公司'},
                    {roleId:4,roleName:'北京分公司'},
                ],//角色复选框
                dialogFormVisible:false,
                dialogFormVisibleTitle:'新增',
            }
        },
        components: { Treeselect },
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
                this.form.deptName=node.label;
            },
            opendialog(){
                return new Promise((resolve,rej)=>{})
            },
            //promise关于角色和部门请求接口封装
            getRoleOrDeptData(){
                return Promise.all( [ getAllRoleData() , getAllDepartData() ] ).then(result=>{
                    console.log('promise',result);
                    this.roleOptions=result[0].data.data.list;
                    this.deptSelectOptions=result[1].data.data;
                    for(let i=0;i<this.deptSelectOptions.length;i++){
                        this.deptSelectOptions[i].id=this.deptSelectOptions[i].deptId;
                        this.deptSelectOptions[i].label=this.deptSelectOptions[i].name;
                    }
                    this.deptSelectOptions=this.treeData(this.deptSelectOptions,'deptId','parentId','children');
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
                // 后端联调放开
                this.getRoleOrDeptData();
            },
            //确认新增
            confirmAdd(){
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        console.log(this.form);
                        let param={};
                        for(let key in this.form){
                            // if(key=="roleIdList"){
                            //     param[key]=JSON.stringify(this.form[key])
                            // }else{
                            //     param[key]=this.form[key];
                            // }
                            param[key]=this.form[key];
                        }
                        delete param.createTime;
                        if(param.userId){
                            updateAdminUser(param).then(res=>{
                                console.log(res);
                                this.dialogClose();
                                this.fetchData();
                            })
                        }else{
                            saveAdminUser(param).then(res=>{
                                console.log(res);
                                this.dialogClose();
                                this.fetchData();
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
                let param={
                    userId:row.userId
                }
                Promise.all([this.getRoleOrDeptData(),getUserDetailInfo(param)]).then(result=>{
                    console.log(result);
                    this.form=result[1].data.data;
                }).catch(err=>{
                    this.$message({
                        showClose: true,
                        message: err,
                        type: 'error'
                    });
                })
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
                this.form.deptId=null;
            },
            //打开弹框前回调事件
            openDialog(){
                
            },
            //获取表格数据
            fetchData(){
                getAdminManageTable(this.formInline).then(res=>{
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

<style lang="less" scoped>

</style>