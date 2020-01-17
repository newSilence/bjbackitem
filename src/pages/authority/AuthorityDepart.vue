<template>
    <div>
        <div style="text-align:right">
            <el-button style="margin:20px;" type="primary" @click="onAddnew">新增</el-button>
        </div>
        
        <el-table
            :data="tableData"
            style="width: 100%;margin-bottom: 20px;"
            row-key="deptId"
            border
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column
            prop="deptId"
            label="部门ID"
            sortable
            width="180">
            </el-table-column>
            <el-table-column
            prop="name"
            label="部门名称"
            sortable
            width="180">
            </el-table-column>
            <el-table-column
            prop="parentName"
            label="上级部门">
            </el-table-column>
            <el-table-column
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="editClick(scope.row)" type="text" icon="el-icon-edit" size="small"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog width="400px" :title="dialogFormVisibleTitle" :visible.sync="dialogFormVisible" @close="dialogClose">
            <el-form :model="form" ref="ruleForm" label-width="100px">
                <el-form-item label="部门名称" prop="name">
                    <el-col :span="20">
                        <el-input v-model="form.name"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="上级部门" prop="parentId">
                    <el-col :span="20">
                        <treeselect @select="deptSelected" v-model="form.parentId" :multiple="false" :flat="false" :default-expand-level="1" :options="deptSelectOptions" />
                        <!-- <el-input v-model="form.username"></el-input> -->
                    </el-col>
                </el-form-item>
            </el-form>
            <div slot="footer" style="text-align:center;" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmAdd">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { getAdminManageTable , getAllRoleData , getAllDepartData , saveAdminUser , getAllAboutOneDepartData , updateDept , saveDeptData } from './api'
import  treeData  from '@/request/uploadUrl'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
    export default {
        data() {
            return {
                dialogFormVisibleTitle:'新增编辑',
                dialogFormVisible:false,
                form:{
                    parentId:'',
                    name:'',
                },
                tableData:[
                    // {deptId:1,parentId:0,name:'人人开源集团',parentName:null},
                    // {deptId:2,parentId:1,name:'长沙分公司',parentName:"人人开源集团"},
                    // {deptId:3,parentId:1,name:'上海分公司',parentName:"人人开源集团"},
                    // {deptId:4,parentId:3,name:'技术部',parentName:"上海分公司"},
                    // {deptId:5,parentId:3,name:'销售部',parentName:"上海分公司"},
                    // {deptId:6,parentId:1,name:'测试分公司',parentName:"人人开源集团"},
                    // {deptId:7,parentId:6,name:'测试部门',parentName:"测试分公司"},
                    // {deptId:11,parentId:0,name:'1231',parentName:null},
                ],
                deptSelectOptions:[
                    {deptId:1,parentId:0,name:'人人开源集团',parentName:null},
                    {deptId:2,parentId:1,name:'长沙分公司',parentName:"人人开源集团"},
                    {deptId:3,parentId:1,name:'上海分公司',parentName:"人人开源集团"},
                    {deptId:4,parentId:3,name:'技术部',parentName:"上海分公司"},
                    {deptId:5,parentId:3,name:'销售部',parentName:"上海分公司"},
                    {deptId:6,parentId:1,name:'测试分公司',parentName:"人人开源集团"},
                    {deptId:7,parentId:6,name:'测试部门',parentName:"测试分公司"},
                    {deptId:11,parentId:0,name:'1231',parentName:null},
                    {deptId:0,parentId:-1,name:'一级部门',parentName:null}
                ],//部门下拉框
                
            }
        },
        components: { Treeselect },
        methods: {
            //新增
            onAddnew(){
                this.dialogFormVisibleTitle="新增部门"
                this.form={
                    parentId:null,
                    name:'',
                };
                getAllAboutOneDepartData().then(res=>{
                    console.log("dddddeeppt",res);
                    this.deptSelectOptions=res.data.data;
                    for(let i=0;i<this.deptSelectOptions.length;i++){
                        this.deptSelectOptions[i].id=this.deptSelectOptions[i].deptId;
                        this.deptSelectOptions[i].label=this.deptSelectOptions[i].name;
                    }
                    this.deptSelectOptions=treeData.treeData(this.deptSelectOptions,'deptId','parentId','children',-1);
                    this.dialogFormVisible=true;
                })
            },
            //获取部门所有下拉数据promise
            getAllDeptPromise(){
                return 
            },
            //编辑
            editClick(row) {
                console.log(row);
                this.dialogFormVisibleTitle="编辑部门"
                this.form={
                    parentId:null,
                    name:'',
                };
                getAllAboutOneDepartData().then(res=>{
                    console.log("dddddeeppt",res);
                    this.deptSelectOptions=res.data.data;
                    for(let i=0;i<this.deptSelectOptions.length;i++){
                        this.deptSelectOptions[i].id=this.deptSelectOptions[i].deptId;
                        this.deptSelectOptions[i].label=this.deptSelectOptions[i].name;
                    }
                    this.deptSelectOptions=treeData.treeData(this.deptSelectOptions,'deptId','parentId','children',-1);
                    this.dialogFormVisible=true;
                    this.form=JSON.parse(JSON.stringify(row));
                    delete this.form.children;
                    this.form.parentId=row.parentId;
                    this.form.name=row.name;
                })
                
                
            },
            //确认编辑或者新增
            confirmAdd(){
                if(this.form.deptId){
                    updateDept(this.form).then(res=>{
                        console.log(res);
                        if(res.data.code==0){
                            this.dialogFormVisible=false;
                            this.fetchData();
                        }
                    })
                }else{
                    saveDeptData(this.form).then(res=>{
                        console.log(res);
                        if(res.data.code==0){
                            this.dialogFormVisible=false;
                            this.fetchData();
                        }
                    })
                }
                
            },
            deptSelected(node){
                console.log(node);
                this.form.parentName=node.label;
            },
            dialogClose(){
                this.form={
                    parentId:null,
                    name:'',
                }
            },
            fetchData(){
                getAllDepartData().then(res=>{
                    console.log("fetchData",res);
                    if(res.data.code==0){
                        this.tableData=JSON.parse(JSON.stringify(res.data.data));
                        this.tableData=treeData.treeData(this.tableData,'deptId','parentId','children',0);
                        // this.deptSelectOptions=JSON.parse(JSON.stringify(res.data.data));
                        // for(let )
                    }
                })
            }
        },
        created () {
            console.log(treeData);
            this.fetchData();
            
            console.log(this.tableData);
        },
    }
</script>

<style lang="less" scoped>

</style>