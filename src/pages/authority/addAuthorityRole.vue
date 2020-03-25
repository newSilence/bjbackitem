<template>
    <div v-loading="loading" style="position:relative;">
        <!-- 新增或者编辑弹框 -->
        <!-- <el-dialog :title="dialogFormVisibleTitle" @open="openDialog" :visible.sync="dialogFormVisible" @close="dialogClose"> -->
            <el-form :model="form" :rules="rules" ref="ruleForm" style="margin-top:30px" label-width="100px">
                <el-form-item label="角色名称：" prop="roleName">
                    <el-col :span="8">
                        <el-input style="width:407px" v-model="form.roleName"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="备注：" prop="remark">
                    <el-col :span="8">
                        <el-input style="width:407px" type="textarea" placeholder="请输入备注，限制在100字以内" :rows="4" v-model="form.remark"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="权限配置：" prop="remark">
                        <div style="height:665px;overflow:auto">
                            <!-- v-show="deptSelectOptions.length>0" -->
                            <treeselect
                            v-show="deptSelectOptions.length>0"
                            class="no_select"
                            value-consists-of="ALL_WITH_INDETERMINATE"
                            :always-open="true"
                            @select="deptSelected"
                            v-model="form.menuIdList"
                            :multiple="true"
                            :flat="false" 
                            :default-expand-level="Infinity" 
                            :options="deptSelectOptions" />
                         </div>
                </el-form-item>
            </el-form>
            <div style="position:absolute;bottom:0px;left:557px">
                <el-button type="primary" style="background:linear-gradient(36deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);border:none" @click="confirmAdd">保存</el-button>
                <el-button style="background:rgba(255,255,255,1);color:#8A8A8A" @click="dialogClose">返回</el-button>
            </div>
        <!-- </el-dialog> -->
    </div>
</template>

<script>
    import { getAdminManageTable , getAllRoleData , updateRoleStatus ,getAllDepartData ,getAllSelectFuncPerm , saveAdminUser , updateAdminUser , getUserDetailInfo , getAllFuncPerm , updateRoleData , saveRoleData , getRoleDetailInfo } from './api'
    import Treeselect from '@riophae/vue-treeselect'
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'
    export default {
        data() {
            return {
                key: "value",
                loading:false,
                form:{
                    roleId:'',
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
                    menuIdList: [
                        { type: 'array', required: true, message: '请至少选择一个角色', trigger: 'change' }
                    ],
                    status: [
                        { required: true, message: '请选择当前状态', trigger: 'change' }
                    ],
                },
                deptSelectOptions:[],
            }
        },
        components: { Treeselect },
        methods: {
            deptSelected(node){
                // this.form.deptName=node.label;
            },
            fetchData(row){
                
                // return
                let param={
                    roleId:row.roleId
                }
                Promise.all([this.getRoleOrDeptData(),getRoleDetailInfo(param)]).then(result=>{
                    this.loading=false;
                    for(let key in this.form){
                        this.form[key]=result[1].data.data[key];
                    }
                }).catch(err=>{
                    this.$message({
                        showClose: true,
                        message: err,
                        type: 'error'
                    });
                    this.loading=false;
                })
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
            //promise关于角色和部门请求接口封装
            getRoleOrDeptData(){
                this.loading=true;
                return Promise.all( [ getAllFuncPerm() ] ).then(result=>{
                    this.deptSelectOptions=result[0].data.data;
                    for(let i=0;i<this.deptSelectOptions.length;i++){
                        this.deptSelectOptions[i].id=this.deptSelectOptions[i].menuId;
                        this.deptSelectOptions[i].label=this.deptSelectOptions[i].name;
                    }
                    this.deptSelectOptions=this.treeData(this.deptSelectOptions,'menuId','parentId','children');
                    this.loading=false;
                }).catch(err=>{
                    this.$message({
                        showClose: true,
                        message: err,
                        type: 'error'
                    });
                    this.loading=false;
                })
            },
            dialogClose(){
                this.$router.back(-1)
            },
            //确认新增
            confirmAdd(){
                // return false;

                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        let param={};
                        for(let key in this.form){
                            param[key]=this.form[key];
                        }
                        param.menuIdList=param.menuIdList.join(',');
                        delete param.createTime;
                        this.loading=true;
                        if(param.roleId){
                            updateRoleData(param).then(res=>{
                                // this.fetchData();
                                if(res&&res.data.ret){
                                    this.dialogClose();
                                }
                                this.loading=false;
                            })
                        }else{
                            saveRoleData(param).then(res=>{
                                if(res&&res.data.ret){
                                    this.dialogClose();
                                }
                                this.loading=false;
                                
                            })
                        }
                        
                    } else {
                        return false;
                    }
                });
                
            },
        },
        created () {
            // this.loading=true;
            if(this.$route.query.flag==1){
                let row = {roleId:this.$route.query.roleId}
                this.fetchData(row)
            }
            if(this.$route.query.flag==0){
                this.getRoleOrDeptData();
            }
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
    .no_select .vue-treeselect__menu{
        max-height:665px!important;
        width:407px;
    }

</style>