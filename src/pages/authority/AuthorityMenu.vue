<template>
    <div style="padding:22px 40px">
        <!-- 会员账号管理页面 -->
        <div style="display:flex;justify-content:space-between;align-items:center">
            <el-form style="margin:20px 20px 2px 20px" :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="账号性质：">
                    <el-select v-model="formInline.identity" placeholder="请选择">
                        <el-option
                        v-for="item in accountTypeData"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-form style="margin:20px 20px 2px 20px" :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="">
                    <el-input class="search_input" style="" placeholder="请输入关键词"  v-model="formInline.keyWord">
                        <el-button style="background:linear-gradient(126deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);border-radius:0px 4px 4px 0px;color:white;border:1px solid #01A2E4;" slot="append"  @click="onSearch" icon="el-icon-search">搜索</el-button>
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-table
                :header-row-style="theadRowStyle"
                :header-cell-style="theadRowCellStyle"
                :data="tableData"
                ref="multipleTable"
                @selection-change="checkboxChange"
                tooltip-effect="dark"
                style="width: 100%"
                >
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                label="会员名称"
                
                width="">
                 <!-- @click="seenDeatil(scope.row)" -->
                <template slot-scope="scope">
                    <p @click="seenDeatil(scope.row)" :style="{cursor:'pointer',height:23+'px',color:scope.row.state==2?'red':''}" >{{ scope.row.realName }}</p>
                </template>
                </el-table-column>
                <el-table-column
                prop="phoneNumber"
                label="会员账号"
                width="">
                </el-table-column>
                <el-table-column
                label="账号性质"
                width="120"
                show-overflow-tooltip>
                    <template slot-scope="scope">{{ 
                        scope.row.type==1?'个人'
                        :scope.row.type==2?'机构':''}}
                    </template>
                </el-table-column>
                <el-table-column
                prop="identity"
                label="身份"
                width="">
                </el-table-column>
                <el-table-column
                prop="provinceName"
                label="所在地区"
                show-overflow-tooltip>
                    <template slot-scope="scope">{{ scope.row.provinceName?(scope.row.provinceName+ '/'+ scope.row.cityName):''}}</template>
                </el-table-column>
                <el-table-column
                prop="updateTime"
                label="更新时间"
                show-overflow-tooltip>
                </el-table-column>
                 <el-table-column
                    label="操作"
                    width="150">
                    <template slot-scope="scope">
                        <!-- @click="seenDeatil(scope.row)" -->
                        <el-button @click="seenDeatil(scope.row)" type="text" style="color:#2BB1E8;font-size:14px" size="small">查看</el-button>
                        <el-button @click="setPermit(scope.row)" type="text" style="color:#2BB1E8;font-size:14px" size="small">权限设置</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="display:flex;justify-content:space-between">
            <div style="margin-top:10px">
                <span style="margin-left:15px">
                    <el-checkbox @change='checkChoose' v-model="isAllChecked">全选</el-checkbox>
                </span>
                <button @click="canUse(0)" style="margin-left:5px;margin-right:5px;color:white;background:linear-gradient(36deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);border-radius:4px;width:70px;height:32px">启用</button>
                <button @click="canUse(2)" style="color:white;background:linear-gradient(36deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);border-radius:4px;width:70px;height:32px">禁用</button>
            </div>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="formInline.pageNumber"
                :page-sizes="[10, 40, 100, 200]"
                :page-size="formInline.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
        <div style="margin-left:75px">
            <span style="color:#FD2044;font-size:12px">会员名称标红时，则该账号权限已被禁用</span>
        </div>
        <!-- 新增或者编辑弹框 -->
        <el-dialog :title="dialogFormVisibleTitle" @open="openDialog" :visible.sync="dialogFormVisible" @close="dialogClose">
            <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="角色名称：" prop="roleName">
                    <el-col :span="8">
                        <el-input v-model="form.roleName"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="角色类型：" prop="roleName">
                    <el-col :span="8">
                        <el-input v-model="form.roleName"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="备注：" prop="remark">
                    <el-col :span="8">
                        <el-input type="textarea" placeholder="请输入备注，限制在100字以内" :rows="4" v-model="form.remark"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="权限配置：" prop="remark">
                    <el-col :span="8">
                        <div style="height:300px;overflow:auto">
                            <treeselect
                            class="no_select"
                            value-consists-of="ALL_WITH_INDETERMINATE"
                            :always-open="true"
                            @select="deptSelected"
                            v-model="value"
                            :multiple="true"
                            :flat="false" 
                            :default-expand-level="Infinity" 
                            :options="deptSelectOptions" />
                         </div>
                    </el-col>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="getTreeData">获取树节点</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmAdd">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 专家详情、审核状态 -->
        <el-dialog  :title="dialogExpertFormTitle" :visible.sync="dialogExpertFormVisible">
            <!-- 基本信息 -->
            <div style="display:flex">
                <div style="width:130px">
                    <span style="padding-left:10px;border-left:3px solid #2BB1E8;color:#333333;font-size:16px;font-weight:500;vertical-align:middle">基本信息：</span>
                </div>
                <el-form ref="baseform" :model="baseform" label-width="100px">
                    <el-form label-width="100px" :inline="true" class="demo-form-inline">
                        <el-form-item label="姓名：">
                            <el-input readonly v-model="baseform.realName"></el-input>
                        </el-form-item>
                        <el-form-item style="padding-left:100px" label="性别：">
                            <el-radio-group  v-model="baseform.sex">
                                <el-radio readonly  label="男"></el-radio>
                                <el-radio readonly  label="女"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                    <el-form-item label="出生日期：">
                        <el-input readonly v-model="baseform.birthdate"></el-input>
                    </el-form-item>
                    <el-form-item label="联系邮箱：">
                        <el-input readonly v-model="baseform.email"></el-input>
                    </el-form-item>
                    <el-form label-width="100px" :inline="true" class="demo-form-inline">
                        <el-form-item label="所在单位：">
                            <span style="border:1px solid #EDEDED;padding:10px">
                                {{baseform.companyName}}
                            </span>
                        </el-form-item>
                        <el-form-item label="所在城市：">
                            <el-input readonly v-model="baseform.cityName"></el-input>
                        </el-form-item>
                    </el-form>
                </el-form>
            </div>
            <!-- 专家描述 -->
            <!-- <div v-show="isShowOther" style="display:flex">
                <div style="width:100px">
                    <span style="padding-left:10px;border-left:3px solid #2BB1E8;color:#333333;font-size:16px;font-weight:500;vertical-align:middle">专家描述：</span>
                </div>
                <el-form ref="baseform" :model="baseform" label-width="100px">
                    <el-form-item label="研究领域：">
                        <el-input readonly v-model="baseform.researchArea"></el-input>
                    </el-form-item>
                    <el-form-item label="研究方向：">
                        <el-input readonly v-model="baseform.research"></el-input>
                    </el-form-item>
                    <el-form-item label="职称头衔：">
                        <el-input readonly v-model="baseform.jobTitle"></el-input>
                    </el-form-item>
                    <el-form label-width="100px" :inline="true" class="demo-form-inline">
                        <el-form-item label="最高职称：">
                            <el-input readonly v-model="baseform.topTitle"></el-input>
                        </el-form-item>
                        <el-form-item label="取得时间：">
                            <el-input readonly v-model="baseform.getTime"></el-input>
                        </el-form-item>
                    </el-form>
                    
                    <el-form-item label="百科人物：">
                        <el-input readonly v-model="baseform.expertLink"></el-input>
                    </el-form-item>
                    <el-form label-width="110px" :inline="true" class="demo-form-inline">
                        <el-form-item style="padding-left:100px" label="是否官网公开：">
                            <el-radio-group v-model="baseform.showPublic">
                                <el-radio :label="0">是</el-radio>
                                <el-radio :label="1">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item style="padding-left:100px" label="是否展示全名：">
                            <el-radio-group v-model="baseform.fullName">
                                <el-radio :label="0">是</el-radio>
                                <el-radio :label="1">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        
                    </el-form>
                    <el-form-item label="宣传照：">
                        <img :src="baseform.headPortrait" alt="">
                    </el-form-item>
                    <el-form label-width="100px" :inline="true" class="demo-form-inline">
                        <div style="display:flex">
                            <el-form-item label="个人简介：">
                                
                            </el-form-item>
                            <div style="border:1px solid #EDEDED;width:100%" class="detail-content content ql-editor" >
                                <div  v-html="baseform.individual"></div>
                            </div>
                        </div>
                    </el-form>
                </el-form>
            </div> -->
            <!-- 经纪人信息 -->
            <!-- <div v-show="isShowOther" style="display:flex">
                <div style="width:100px">
                    <span style="padding-left:10px;border-left:3px solid #2BB1E8;color:#333333;font-size:16px;font-weight:500;vertical-align:middle">专家描述：</span>
                </div>
                <el-form ref="baseform" :model="baseform" label-width="100px">
                    <el-form label-width="100px" :inline="true" class="demo-form-inline">
                        <el-form-item label="描述：">
                            <div style="border:1px solid #EDEDED" class="detail-content content ql-editor" >
                                <div  v-html="baseform.des"></div>
                            </div>
                        </el-form-item>
                    </el-form>
                </el-form>
            </div> -->
        </el-dialog>
        <!-- 机构详情、审核状态 -->
        <el-dialog  :title="dialogFactoraFormTitle" :visible.sync="dialogFactoraFormVisible">
            <!-- 基本信息 -->
            <div style="display:flex">
                <div style="width:130px">
                    <span style="padding-left:10px;border-left:3px solid #2BB1E8;color:#333333;font-size:16px;font-weight:500;vertical-align:middle">基本信息：</span>
                </div>
                <el-form ref="factoBaseForm" :model="factoBaseForm" label-width="150px">
                    <el-form label-width="150px" :inline="true" class="demo-form-inline">
                        <el-form-item label="单位名称：">
                            <el-input readonly v-model="factoBaseForm.companyName"></el-input>
                        </el-form-item>
                        
                        
                    </el-form>
                    <el-form-item label="统一社会信用代码：">
                        <el-input readonly v-model="factoBaseForm.companyCode"></el-input>
                    </el-form-item>
                    <el-form-item label="单位性质：">
                        <el-input readonly v-model="factoBaseForm.companyType"></el-input>
                    </el-form-item>
                    <el-form-item label="所在城市：">
                        <el-input readonly v-model="factoBaseForm.cityName"></el-input>
                    </el-form-item>
                    <el-form-item label="联系邮箱：">
                        <el-input readonly v-model="factoBaseForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="营业执照：">
                        <img :src="factoBaseForm.businessLicense" alt="">
                    </el-form-item>
                    <el-form label-width="150px" :inline="true" class="demo-form-inline">
                        <div style="display:flex">
                            <el-form-item label="公司介绍：">
                                
                            </el-form-item>
                            <div style="border:1px solid #EDEDED;width:100%" class="detail-content content ql-editor" >
                                <div  v-html="factoBaseForm.serviceProviders"></div>
                            </div>
                        </div>
                    </el-form>
                </el-form>
            </div>
            <!-- 服务商信息 -->
            <div v-show="isShowOther" style="display:flex">
                <div style="width:130px">
                    <span style="padding-left:10px;border-left:3px solid #2BB1E8;color:#333333;font-size:16px;font-weight:500;vertical-align:middle">服务商信息：</span>
                </div>
                <div>
                <el-form ref="factoBaseForm" :model="factoBaseForm" label-width="100px">
                    <el-form label-width="150px" :inline="true" class="demo-form-inline">
                        <div style="display:flex">
                            <el-form-item label="描述：">
                                
                            </el-form-item>
                            <div style="border:1px solid #EDEDED;width:100%;min-width:200px" class="detail-content content ql-editor" >
                                <div  v-html="factoBaseForm.applicationDescription"></div>
                            </div>
                        </div>
                    </el-form>
                </el-form>
                <el-form ref="factoBaseForm" :model="factoBaseForm" label-width="100px">
                    <el-form label-width="150px" :inline="true" class="demo-form-inline">
                        <div style="display:flex">
                            <el-form-item label="主营业务介绍：">
                                
                            </el-form-item>
                            <div style="border:1px solid #EDEDED;width:100%" class="detail-content content ql-editor" >
                                <div  v-html="factoBaseForm.description"></div>
                            </div>
                        </div>
                    </el-form>
                </el-form>
                </div>
            </div>
        </el-dialog>
        <!-- 权限设置页面 -->
        <el-dialog title="权限设置" width="453px" class="set_auth_dialog" :visible.sync="dialogSetPermitFormVisible">
            <el-form :model="permitForm" label-width="120px">
                <el-form-item label="基本角色：">
                    <el-select v-model="permitForm.roleId" placeholder="请选择">
                        <el-option
                        v-for="item in roleOptionsData"
                        :key="item.roleId"
                        :label="item.roleName"
                        :value="item.roleId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="自定义角色：">
                    <el-select v-model="permitForm.customRoleId" multiple placeholder="请选择">
                        <el-option
                        v-for="item in customRoleOptionsData"
                        :key="item.roleId"
                        :label="item.roleName"
                        :value="item.roleId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="操作管理员：">
                    {{optionName}}
                </el-form-item>
            </el-form>
            <div style="text-align:center">
                <el-button style="background:rgba(251,251,251,1);;color:#828282" @click="dialogSetPermitFormVisible = false">取 消</el-button>
                <el-button type="primary" style="background:linear-gradient(36deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);border:none" @click="confirmSetAccountRolePer">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getAdminManageTable  , getAllDepartData , saveAdminUser , updateAdminUser , getUserDetailInfo , getAllFuncPerm , updateRoleData , saveRoleData , getRoleDetailInfo } from './api'
import { getAllMemAccountData , getMemAccountDetailData , getAccountMemPermWebrole , setAccountRolePerUrl , getAccountPermWebrole , getMemAccountSelectAuthenticationData , updateCanOrUse } from './api'

import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
    export default {
       
        data() {
            return {
                //复选框选择的数据
                isAllChecked:false,
                chooseUseData:[],
                optionName:'',
                accountTypeData:[//账号性质
                    {value:'',label:'全部'},
                    {value:'1',label:'普通个人'},
                    {value:'2',label:'机构'},
                    //{value:'3',label:'专家'},
                    // {value:'经纪人',label:'经纪人'},
                    //{value:'4',label:'服务商'},
                    // {value:'其他自定义',label:'其他自定义'},
                ],
                //专家详情弹框
                dialogExpertFormVisible:false,
                dialogFactoraFormVisible:false,
                //基本角色下拉框数据
                roleOptionsData:[
                    {
                        value: '选项1',
                        label: '黄金糕'
                    }, {
                        value: '选项2',
                        label: '双皮奶'
                    },
                ],
                //自定义角色下拉框数据
                customRoleOptionsData:[],
                //
                permitForm:{
                    roleId:'',
                    customRoleId:[],
                },
                dialogExpertFormTitle:'会员详情',
                dialogFactoraFormTitle:'会员详情',
                baseform:{
                    realName:'张三',
                    sex:'男',
                    birthdate:'',
                    email:'',
                    companyName:'',
                    cityName:'',
                    researchArea:'',
                    research:'',
                    jobTitle:'',
                    topTitle:'',
                    getTime:'',
                    expertLink:'',
                    showPublic:'',
                    fullName:'',
                    headPortrait:'',
                    individual:'',
                },
                factoBaseForm:{
                  companyName:'',
                  companyCode:'',  
                  companyType:'',
                  cityName:'',
                  email:'',
                  businessLicense:'',
                  serviceProviders:'',
                  applicationDescription:'',
                  description:'',
                },
                isShowOther:false,
                //权限设置弹框
                dialogSetPermitFormVisible:false,
                //当前的用户Id
                userId:'',
                value:[4,6,3,1],
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
                    keyWord:'',
                    identity:'',
                    auditStatus:'',
                    pageNumber:1,
                    pageSize:10,
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
            //设置表格样式
            theadRowStyle(){
                return "color:#333333;font-size:14px;font-weight:500;height:20px;line-height:20px;background:rgba(250,250,252,1);"
            },
            theadRowCellStyle(){
                return 'background:rgba(250,250,252,1);'
            },
            // chooseTr(val){
            //     this.chooseUseData=val;
            // },
            //切换会员类型
            changeTypeMem(type){
                if(this.formInline.auditStatus!==type){
                    this.formInline.auditStatus=type;
                    this.fetchData();
                }
            },
            //点击表格行
            seenDeatil(row){
                // console.log(row);
                // return
                // return row.nickname=='专家'
                if(row.nickname=='个人'){
                    this.$router.push({path:'/index/authority/detailself',query:{id:row.userId,type:1}})
                }
                // if(row.nickname=='专家'){
                //     this.$router.push({path:'/index/authority/expertReview',query:{id:row.userId,approvalType:3}})
                // }
                if(row.nickname=='机构'){
                    this.$router.push({path:'/index/authority/detailangency',query:{id:row.userId,type:2}})
                }
                return;
                if(row.expertInfo||row.type==1){
                    this.dialogExpertFormVisible=true;
                }
                if(row.facilitator||row.type==2){
                    this.dialogFactoraFormVisible=true;
                }
                let param={};
                param.linkUserId=row.userId;
                getMemAccountDetailData(param).then(res=>{
                    if(res.data.data){
                        for(let key in this.baseform){
                            if(res.data.data.hasOwnProperty(key)){
                                this.baseform[key]=res.data.data[key];
                            }
                        }
                        for(let key in this.factoBaseForm){
                            if(res.data.data.hasOwnProperty(key)){
                                if(key=="companyType"){
                                    this.factoBaseForm[key]=res.data.data[key]==1?'私企'
                                    :res.data.data[key]==2?'国企'
                                    :res.data.data[key]==3?'混合'
                                    :res.data.data[key]==4?'外资':''
                                }else{
                                    this.factoBaseForm[key]=res.data.data[key];
                                }
                            }
                            
                        }
                        
                    }
                })
                let oparam={};
                this.isShowOther=false;
                if(row.expertInfo){
                    this.isShowOther=true;
                    oparam.type=1;
                    oparam.id=row.expertInfo.expertId;
                }
                if(row.facilitator){
                    this.isShowOther=true;
                    oparam.type=2;
                    oparam.id=row.facilitator.facilitatorId
                }
                getMemAccountSelectAuthenticationData(oparam).then(res=>{
                    if(res.data.data){
                        for(let key in this.baseform){
                            if(res.data.data.hasOwnProperty(key)){
                                this.baseform[key]=res.data.data[key];
                            }
                            
                        }
                        for(let key in this.factoBaseForm){
                            if(res.data.data.hasOwnProperty(key)){
                                this.factoBaseForm[key]=res.data.data[key];
                            }
                            
                        }
                    }
                })
            },
            // 复选框全选事件
            checkChoose(){
                this.$refs.multipleTable.toggleAllSelection();
            },
            checkboxChange(selection){
                // this.checkboxSelected=selection;
                this.chooseUseData=selection;
                if(selection.length!=this.tableData.length){
                    this.isAllChecked=false
                }else{
                    this.isAllChecked=true;
                }
            },
            //权限设置
            setPermit(row){
                this.userId=row.userId;
                let param={userId:this.userId};
                getAccountPermWebrole(param).then(res=>{
                    if(res.data.ret){
                        let roleIdList=res.data.data.roleIdList.filter(val=>{
                            return val==1||val==3
                        });
                        this.permitForm.roleId=roleIdList.length>0?roleIdList[0]:'';
                        let customRoleIdList=res.data.data.roleIdList.filter(val=>{
                            return val!=1&&val!=3
                        });
                        this.permitForm.customRoleId=customRoleIdList?customRoleIdList:[];
                    }
                    
                })
                this.dialogSetPermitFormVisible=true;

                getAccountMemPermWebrole().then(res=>{
                    if(res.data.ret){
                        let list=res.data.data;
                        this.roleOptionsData = list.filter(val=>{
                            return val.roleId=='1'||val.roleId=='3'
                        });
                        this.customRoleOptionsData =  list.filter(val=>{
                            return val.roleId!='1'&& val.roleId!='3'
                        });
                    }else{
                        this.roleOptionsData=[];
                    }
                    
                })
            },
            //确认权限设置
            confirmSetAccountRolePer(){
                let param={};
                let roleIdList=this.permitForm.roleId?this.permitForm.customRoleId.concat(this.permitForm.roleId):this.permitForm.customRoleId;
                param.roleIdList=roleIdList;
                param.userId=this.userId;
                setAccountRolePerUrl(param).then(res=>{
                    if(res.data.ret){
                        this.fetchData();
                        this.dialogSetPermitFormVisible=false;
                    }else{
                        this.$message({
                            showClose: true,
                            message: '设置失败',
                            type: 'error'
                        });
                    }
                })
            },
            //启用和禁用
            canUse(data){
                if(this.chooseUseData.length==0){
                    this.$message({
                        showClose: true,
                        message: '请选择用户',
                        type: 'warn'
                    });
                }else{
                    let ids=[];
                    for(let i=0;i<this.chooseUseData.length;i++){
                        ids.push(this.chooseUseData[i].userId-0)
                    }
                    let param={};
                    param.ids=ids.join(',');
                    param.state=data;
                    updateCanOrUse(param).then(res=>{
                        this.fetchData();
                    })
                }
            },
            getTreeData(){
                // console.log("获取",this.$refs.func_tree);
                // console.log(this.$refs.func_tree.getCheckedNodes(false,true));
                // console.log(this.$refs.func_tree.getCheckedKeys());
                // console.log(this.$refs.func_tree.getHalfCheckedKeys());
                // console.log('value',this.value);
            },
            onSearch() {
                this.formInline.pageNumber=1;
                this.fetchData();
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
                this.form.deptName=node.label;
            },
            opendialog(){
                return new Promise((resolve,rej)=>{})
            },
            //promise关于角色和部门请求接口封装
            getRoleOrDeptData(){
                return Promise.all( [ getAllFuncPerm() , getAllDepartData() ] ).then(result=>{
                    this.funcSelectOptions=result[0].data.data;
                    for(let i=0;i<this.funcSelectOptions.length;i++){
                        this.funcSelectOptions[i].id=this.funcSelectOptions[i].menuId;
                        this.funcSelectOptions[i].label=this.funcSelectOptions[i].name;
                    }
                    this.funcSelectOptions=this.treeData(this.funcSelectOptions,'menuId','parentId','children');
                    this.deptSelectOptions=result[1].data.data;
                    for(let i=0;i<this.deptSelectOptions.length;i++){
                        this.deptSelectOptions[i].id=this.deptSelectOptions[i].deptId;
                        this.deptSelectOptions[i].label=this.deptSelectOptions[i].name;
                    }
                    this.deptSelectOptions=this.treeData(this.deptSelectOptions,'deptId','parentId','children');
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
                        let param={};
                        for(let key in this.form){
                            param[key]=this.form[key];
                        }
                        delete param.createTime;
                        param.selectMenuIdList=this.$refs.func_tree.getCheckedKeys()?this.$refs.func_tree.getCheckedKeys():[];
                        let halfMenuId=this.$refs.func_tree.getHalfCheckedKeys()?this.$refs.func_tree.getHalfCheckedKeys():[];
                        param.menuIdList=param.selectMenuIdList.concat(halfMenuId);
                        param.selectDeptIdList=this.$refs.dept_tree.getCheckedKeys()?this.$refs.dept_tree.getCheckedKeys():[];
                        param.deptIdList=param.selectDeptIdList.concat(this.$refs.dept_tree.getHalfCheckedKeys()?this.$refs.dept_tree.getHalfCheckedKeys():[]);
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
                this.dialogExpertFormVisible=true;
                this.dialogFormVisible=true;
                this.dialogFormVisibleTitle="编辑"
                let param={
                    roleId:row.roleId
                }
                Promise.all([this.getRoleOrDeptData(),getRoleDetailInfo(param)]).then(result=>{
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
                getAllMemAccountData(this.formInline).then(res=>{
                    if(res&&res.data.ret){
                        
                        this.tableData=res.data.data.list;
                        for(let i=0;i<this.tableData.length;i++){
                            if(this.tableData[i].expertInfo&&this.tableData[i].facilitator){
                                let facilitator=JSON.parse(JSON.stringify(this.tableData[i].facilitator));
                                let expertInfo=JSON.parse(JSON.stringify(this.tableData[i].expertInfo));
                                
                                this.tableData[i].facilitator=null;
                                this.tableData[i].expertInfo=null;
                                let obj=JSON.parse(JSON.stringify(this.tableData[i]));
                                this.tableData[i].facilitator=facilitator;
                                obj.expertInfo=expertInfo;
                                this.tableData.splice(i,0,obj);
                                i++;
                            }
                        }
                        this.total=res.data.data.total;
                    }
                })
            },
            //分页功能
            handleSizeChange(val){
                this.formInline.pageSize=val;
                this.fetchData();
            },
            handleCurrentChange(val){
                this.formInline.pageNumber=val;
                this.fetchData();
            }
        },
        created () {
            this.optionName=sessionStorage['username'];
            this.fetchData();
            //先处理成vue-treeselect的需求字段。
            for(let i=0;i<this.deptSelectOptions.length;i++){
                this.deptSelectOptions[i].id=this.deptSelectOptions[i].deptId;
                this.deptSelectOptions[i].label=this.deptSelectOptions[i].name;
            }
        },
    }
</script>

<style lang="less">
    thead .el-checkbox{
        display:none;
    }
    .el-table tbody tr:hover>td { 
        background-color:#E6F7FF!important
    }
    .search_input .el-input__inner{
        border:1px solid #01A2E4;
        width:293px;
        border-top-left-radius:4px;
        border-bottom-left-radius:4px;
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
    .set_auth_dialog .el-dialog__header{
        text-align: center;
        background:linear-gradient(36deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);
        // background: rgba(243,247,250,1);
        height: 44px;
    }
    .set_auth_dialog .el-dialog__headerbtn{
        top:15px;
    }
    .set_auth_dialog .el-dialog__title{
        line-height: 8px;
        color:#FFFFFF;
    }
</style>