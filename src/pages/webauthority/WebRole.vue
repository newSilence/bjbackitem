<template>
    <div>
        <!-- 角色管理页面 -->
        <el-form style="margin:20px" :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="">
                <el-input v-model="formInline.username" placeholder="角色名称"></el-input>
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
                label="角色ID"
                width="120">
                <template slot-scope="scope">{{ scope.row.roleId }}</template>
                </el-table-column>
                <el-table-column
                prop="roleName"
                label="角色名称"
                width="120">
                </el-table-column>
                <el-table-column
                prop="remark"
                label="备注"
                show-overflow-tooltip>
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
            <el-form :model="form" ref="ruleForm" label-width="100px">
                <el-form-item label="角色名称" prop="roleName">
                    <el-col :span="8">
                        <el-input v-model="form.roleName"></el-input>
                    </el-col>
                </el-form-item>
                <!-- <el-form-item label="所属部门" prop="deptId">
                    <el-col :span="8">
                        <treeselect @select="deptSelected" v-model="form.deptId" :multiple="false" :flat="false" :default-expand-level="1" :options="deptSelectOptions" />
                        
                    </el-col>
                </el-form-item> -->
                <el-form-item label="备注" prop="remark">
                    <el-col :span="8">
                        <el-input v-model="form.remark"></el-input>
                    </el-col>
                </el-form-item>
                <div style="display:flex;padding:10px 50px">
                    <div>
                        <div>功能权限</div>
                        <el-tree
                            ref="func_tree"
                            :data="funcSelectOptions"
                            show-checkbox
                            :default-checked-keys="form.menuIdList"
                            default-expand-all
                            node-key="id"
                            :props="defaultProps">
                        </el-tree>
                    </div>
                    <!-- <div style="margin-left:50px">
                        <div>数据权限</div> -->
                        <!-- <treeselect
                         class="no_select"
                         value-consists-of="ALL_WITH_INDETERMINATE"
                         :always-open="true"
                         @select="deptSelected"
                         v-model="value"
                         :multiple="true"
                         :flat="false" 
                         :default-expand-level="Infinity" 
                         :options="deptSelectOptions" /> -->
                        <!-- <el-tree
                            ref="dept_tree"
                            :data="deptSelectOptions"
                            show-checkbox
                            :default-checked-keys="form.deptIdList"
                            default-expand-all
                            node-key="id"
                            :props="defaultProps">
                        </el-tree>
                    </div> -->
                    <div style="margin-left:200px">
                        
                    </div>
                    
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="getTreeData">获取树节点</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmAdd">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getAdminManageTable , getAllRoleData , getAllDepartData , saveAdminUser , updateAdminUser , getUserDetailInfo , getAllFuncPerm , updateRoleData , saveRoleData , getRoleDetailInfo } from './api'
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
                value:[4,6,3,1],
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
                    deptName:'',
                    deptId:null,
                    remark:'',
                    menuIdList:[],
                    deptIdList:[],
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
                    menuIdList: [
                        { type: 'array', required: true, message: '请至少选择一个角色', trigger: 'change' }
                    ],
                    status: [
                        { required: true, message: '请选择当前状态', trigger: 'change' }
                    ],
                },
                // deptSelectOptions:[
                //     {deptId:1,parentId:0,name:'人人开源集团',parentName:null},
                //     {deptId:2,parentId:1,name:'长沙分公司',parentName:"人人开源集团"},
                //     {deptId:3,parentId:1,name:'上海分公司',parentName:"人人开源集团"},
                //     {deptId:4,parentId:3,name:'技术部',parentName:"上海分公司"},
                //     {deptId:5,parentId:3,name:'销售部',parentName:"上海分公司"},
                //     {deptId:6,parentId:1,name:'测试分公司',parentName:"人人开源集团"},
                //     {deptId:7,parentId:6,name:'测试部门',parentName:"测试分公司"},
                //     {deptId:11,parentId:0,name:'1231',parentName:null},
                // ],//部门下拉框
                funcSelectOptions:[],
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
            getTreeData(){
                console.log("获取",this.$refs.func_tree);
                console.log(this.$refs.func_tree.getCheckedNodes(false,true));
                console.log(this.$refs.func_tree.getCheckedKeys());
                console.log(this.$refs.func_tree.getHalfCheckedKeys());
                console.log('value',this.value);
            },
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
                return Promise.all( [ getAllFuncPerm() ] ).then(result=>{
                    console.log('promise',result);
                    this.funcSelectOptions=result[0].data.data;
                    for(let i=0;i<this.funcSelectOptions.length;i++){
                        this.funcSelectOptions[i].id=this.funcSelectOptions[i].menuId;
                        this.funcSelectOptions[i].label=this.funcSelectOptions[i].name;
                    }
                    this.funcSelectOptions=this.treeData(this.funcSelectOptions,'menuId','parentId','children');
                    // this.deptSelectOptions=result[1].data.data;
                    // for(let i=0;i<this.deptSelectOptions.length;i++){
                    //     this.deptSelectOptions[i].id=this.deptSelectOptions[i].deptId;
                    //     this.deptSelectOptions[i].label=this.deptSelectOptions[i].name;
                    // }
                    // this.deptSelectOptions=this.treeData(this.deptSelectOptions,'deptId','parentId','children');
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
                        param.selectMenuIdList=this.$refs.func_tree.getCheckedKeys()?this.$refs.func_tree.getCheckedKeys():[];
                        let halfMenuId=this.$refs.func_tree.getHalfCheckedKeys()?this.$refs.func_tree.getHalfCheckedKeys():[];
                        console.log("halfMenuId",halfMenuId)
                        param.menuIdList=param.selectMenuIdList.concat(halfMenuId);
                        // console.log('this.$refs.dept_tree.getCheckedKeys()',this.$refs.dept_tree.getCheckedKeys());
                        // console.log("this.$refs.dept_tree.getHalfCheckedKeys()",this.$refs.dept_tree.getHalfCheckedKeys());
                        // param.selectDeptIdList=this.$refs.dept_tree.getCheckedKeys()?this.$refs.dept_tree.getCheckedKeys():[];
                        // param.deptIdList=param.selectDeptIdList.concat(this.$refs.dept_tree.getHalfCheckedKeys()?this.$refs.dept_tree.getHalfCheckedKeys():[]);
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
                    this.form=result[1].data.data;
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
            // for(let i=0;i<this.deptSelectOptions.length;i++){
            //     this.deptSelectOptions[i].id=this.deptSelectOptions[i].deptId;
            //     this.deptSelectOptions[i].label=this.deptSelectOptions[i].name;
            // }
            // console.log('this.treeData',this.treeData(this.deptSelectOptions,'deptId','parentId','children'));
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

</style>