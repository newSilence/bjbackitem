<template>
    <div style="padding:20px 40px">
        <div style="text-align:right">
            <el-button style="margin:20px;background:linear-gradient(36deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);border:none" type="primary" @click="onAddnew">新增</el-button>
            <!-- <el-button style="margin:20px;" type="primary" @click="onDelete">删除</el-button> -->
        </div>
        
        <el-table
            :data="tableData"
            :header-row-style="theadRowStyle"
            :header-cell-style="theadRowCellStyle"
            style="width: 100%;margin-bottom: 20px;"
            row-key="menuId"
            :indent="24"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column
            prop="menuId"
            label="菜单ID"
            width="">
            </el-table-column>
            <el-table-column
            prop="name"
            label="菜单名称"
            width="">
            </el-table-column>
            <el-table-column
            prop="parentName"
            label="上级菜单">
            </el-table-column>
            <el-table-column
            prop="parentName"
            width="100px"
            label="图标">
                <template slot-scope="scope">
                    <i :class="scope.row.icon" size="small"></i>
                </template>
            </el-table-column>
            <el-table-column
            prop="parentName"
            width="100px"
            label="类型">
                <template slot-scope="scope">
                    <!-- <span style="border:1px solid #999999;border-radius:4px;padding:2px 13px;font-size:14px"> -->
                        {{scope.row.type==0?'目录':scope.row.type==1?'菜单':scope.row.type==2?'按钮':''}}
                    <!-- </span> -->
                </template>
            </el-table-column>
            <el-table-column
                prop="url"
                label="菜单URL">
            </el-table-column>
            <el-table-column
                prop="perms"
                label="授权标示">
            </el-table-column>
            <el-table-column
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button style="color:#2BB1E8;font-size:14px" @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button style="color:#2BB1E8;font-size:14px" @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="dialogFormVisibleTitle" :visible.sync="dialogFormVisible" @close="dialogClose">
            <el-form :model="form" ref="ruleForm" label-width="100px">
                <el-form-item label="类型" prop="name">
                    <el-radio-group v-model="form.type">
                        <el-radio :label="0">目录</el-radio>
                        <el-radio :label="1">菜单</el-radio>
                        <el-radio :label="2">按钮</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="菜单名称" prop="name">
                    <el-col :span="20">
                        <el-input v-model="form.name"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="上级菜单" prop="parentId">
                    <el-col :span="20">
                        <treeselect @select="deptSelected" v-model="form.parentId" :multiple="false" :flat="false" :default-expand-level="1" :options="deptSelectOptions" />
                        <!-- <el-input v-model="form.username"></el-input> -->
                    </el-col>
                </el-form-item>
                <el-form-item v-if="form.type!=2" label="菜单URL" prop="url">
                    <el-col :span="20">
                        <el-input v-model="form.url"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item v-if="form.type!=0" label="授权标示" prop="perms">
                    <el-col :span="20">
                        <el-input v-model="form.perms"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item v-if="form.type!=2" label="图标" prop="icon">
                    <el-col :span="20">
                        <el-input v-model="form.icon"></el-input>
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
import {  getAllSelectFuncPerm , getAllFuncPerm , updateMenuData , saveMenuData , deleteMenuData } from './api'
import  treeData  from '@/request/uploadUrl'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
    export default {
        data() {
            return {
                dialogFormVisibleTitle:'新增编辑',
                dialogFormVisible:false,
                form:{
                    type:1,
                    parentId:'',
                    parentName:null,
                    name:'',
                    perms:'',
                    icon:'',
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
            //设置表格样式
            theadRowStyle(){
                return "color:#333333;font-size:14px;font-weight:500;height:20px;line-height:20px;background:rgba(250,250,252,1);"
            },
            theadRowCellStyle(){
                return 'background:rgba(250,250,252,1);'
            },
            //新增
            onAddnew(){
                this.dialogFormVisibleTitle="新增菜单"
                // this.form={
                //     parentId:null,
                //     name:'',
                // };
                this.dialogClose();
                getAllSelectFuncPerm().then(res=>{
                    this.deptSelectOptions=res.data.data;
                    for(let i=0;i<this.deptSelectOptions.length;i++){
                        this.deptSelectOptions[i].id=this.deptSelectOptions[i].menuId;
                        this.deptSelectOptions[i].label=this.deptSelectOptions[i].name;
                    }
                    this.deptSelectOptions=treeData.treeData(this.deptSelectOptions,'menuId','parentId','children',-1);
                    this.dialogFormVisible=true;
                })
            },
            onDelete(){},
            //获取部门所有下拉数据promise
            getAllDeptPromise(){
                return 
            },
            //编辑
            editClick(row) {
                this.dialogFormVisibleTitle="编辑菜单"
                this.dialogClose();
                getAllSelectFuncPerm().then(res=>{
                    this.deptSelectOptions=res.data.data;
                    for(let i=0;i<this.deptSelectOptions.length;i++){
                        this.deptSelectOptions[i].id=this.deptSelectOptions[i].menuId;
                        this.deptSelectOptions[i].label=this.deptSelectOptions[i].name;
                    }
                    this.deptSelectOptions=treeData.treeData(this.deptSelectOptions,'menuId','parentId','children',-1);
                    this.dialogFormVisible=true;
                    this.form=JSON.parse(JSON.stringify(row));
                    delete this.form.children;
                    this.form.parentId=row.parentId;
                    this.form.name=row.name;
                })
                
                
            },
            //删除
            deleteClick(row){
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let param={
                            menuId:row.menuId
                        }
                        deleteMenuData(param).then(res=>{
                            if(res.data.ret){
                                this.fetchData();
                            }else{
                                this.$message({
                                    showClose: true,
                                    message: '删除失败',
                                    type: 'error'
                                });
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                    });
            },
            //确认编辑或者新增
            confirmAdd(){
                if(this.form.menuId){
                    updateMenuData(this.form).then(res=>{
                        if(res.data.ret){
                            this.dialogFormVisible=false;
                            this.fetchData();
                        }
                    })
                }else{
                    saveMenuData(this.form).then(res=>{
                        if(res.data.ret){
                            this.dialogFormVisible=false;
                            this.fetchData();
                        }
                    })
                }
                
            },
            deptSelected(node){
                this.form.parentName=node.label;
            },
            dialogClose(){
                this.form={
                    type:1,
                    parentId:'',
                    parentName:null,
                    name:'',
                    perms:'',
                    icon:'',
                }
            },
            fetchData(){
                getAllFuncPerm().then(res=>{
                    if(res.data.ret){
                        this.tableData=JSON.parse(JSON.stringify(res.data.data));
                        this.tableData=treeData.treeData(this.tableData,'menuId','parentId','children',0);
                    }
                })
            }
        },
        created () {
            this.fetchData();
        },
    }
</script>

<style lang="less">
    .el-table tbody tr:hover>td { 
        background-color:#E6F7FF!important
    }
</style>