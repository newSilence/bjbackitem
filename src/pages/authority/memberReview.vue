<template>
    <div style="padding:15px 40px">
      <div style="margin:6px 20px 12px 20px;padding-top:26px;">
        <div>
                <span @click="changePersonType(item,key)" :style="{position:'relative',fontSize:'16px',cursor:'pointer',fontWeight:500,color:key==personClickIndex?'#2BB1E8':'#333333',borderRight:(key!=personType.length-1)?'1px solid #D2D2D2':'',paddingRight:'32px',paddingLeft:(key!=0)?'32px':'0',}" v-for="(item,key) in personType" :key="key">
                    {{item.label}}
                </span>
        </div>
      </div>
        <div style="margin:6px 20px 12px 20px;padding-top:26px;">
            <div>
                <span @click="changeTypeMem(item,key)" :style="{position:'relative',fontSize:'16px',cursor:'pointer',fontWeight:500,color:key==statusClickIndex?'#2BB1E8':'#333333',borderRight:(key!=accountAuditType.length-1)?'1px solid #D2D2D2':'',paddingRight:'32px',paddingLeft:(key!=0)?'32px':'0',}" v-for="(item,key) in accountAuditType" :key="key">
                    {{item.label}}
                    <span v-show="item.value==='0'&&item.num" style="position:absolute;top:-10px;border-radius:50%;width:22px;height:22px;text-align:center;font-size:10px;line-height:22px;background:#FD2044;color:white;margin-left:-3px">{{item.num?item.num>99?'99+':item.num:''}}</span>
                </span>
            </div>
        </div>
        <!-- 会员账号管理页面 -->
        <div style="display:flex;justify-content:space-between;align-items:center">
            <el-form style="margin:20px 20px 2px 20px" :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="账号性质：">
                    <el-select @change="selectChange" v-model="formInline.type" placeholder="请选择">
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
                    <el-input class="search_input" placeholder="请输入会员名称或账号"  v-model="formInline.keyWord">
                        <el-button style="background:linear-gradient(126deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);border-radius:0px 4px 4px 0px;border:1px solid #01A2E4;color:white" slot="append"  @click="onSearch" icon="el-icon-search">搜索</el-button>
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-table
                @selection-change="chooseTr"
                :header-row-style="theadRowStyle"
                :header-cell-style="theadRowCellStyle"
                :data="tableData"
                ref="multipleTable"
                tooltip-effect="dark"
                style="width: 100%"
                >
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                label="会员名称">
                <template slot-scope="scope">
                    <p style="cursor:pointer;height:23px"  @click="seenDeatil(scope.row)">{{ scope.row.realName }}</p>
                </template>
                </el-table-column>
                <!-- scope.row.facilitator&&scope.row.facilitator.facilitatorId?'服务商'
                        :scope.row.expertInfo&&scope.row.expertInfo.expertId?'专家' -->
                <el-table-column
                prop="phoneNumber"
                label="会员账号"
                width="">
                </el-table-column>
                <el-table-column
                label="账号性质"
                width="80px"
                show-overflow-tooltip>
                    <template slot-scope="scope">{{
                        scope.row.type==1?'个人'
                        :scope.row.type==2?'机构':''}}</template>
                </el-table-column>
                <el-table-column
                prop="nickname"
                label="申请权限"
                width="100px">
                </el-table-column>
                <el-table-column
                prop="provinceName"
                label="所在地区"
                show-overflow-tooltip>
                    <template slot-scope="scope">{{ scope.row.provinceName?(scope.row.provinceName+ '/'+ scope.row.cityName):''}}</template>
                </el-table-column>
                <el-table-column
                prop="createTime"
                label="创建时间"
                width="200px"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="auditStatus"
                label="认证状态"
                width="">
                    <template slot-scope="scope">
                        <span v-if="scope.row.auditStatus===1" style="color:#F3A157">已通过</span>
                        <span v-else-if="scope.row.auditStatus===0" style="color:#4B4B4B">待审核</span>
                        <span v-else-if="scope.row.auditStatus===2" style="color:#FD2044">未通过</span>
                        <span v-else></span>
                        <!-- {{ scope.row.auditStatus===0?'待审核':scope.row.auditStatus===1?'已通过':scope.row.auditStatus===2?'未通过':''}} -->
                    </template>
                <!-- 0:待审核
                2:驳回
                1:通过 -->
                </el-table-column>
                 <el-table-column
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button @click="seenDeatil(scope.row)" type="text" size="small">
                            <span style="color:#2BB1E8;font-size:14px" v-if="scope.row.auditStatus===0">审核</span>
                            <span style="color:#F3A157;font-size:14px" v-else>查看</span>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="margin-top:30px">
            <el-pagination
                style="text-align:right"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="formInline.pageNumber"
                :page-sizes="[10, 40, 100, 200]"
                :page-size="formInline.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
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

                            <!-- <el-input v-model=""></el-input> -->
                        </el-form-item>
                        <el-form-item label="所在城市：">
                            <el-input readonly v-model="baseform.cityName"></el-input>
                        </el-form-item>
                    </el-form>
                </el-form>
            </div>
            <!-- 专家描述 -->
            <div v-show="isShowOther" style="display:flex">
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
            </div>
            <!-- 经纪人信息 -->
            <div v-show="isShowOther" style="display:flex">
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
            </div>
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
        <el-dialog title="权限设置" :visible.sync="dialogSetPermitFormVisible">
            <el-form :model="permitForm">
                <el-form-item label="设置角色：" label-width="100px">
                    <el-select v-model="permitForm.roleId" multiple placeholder="请选择">
                        <el-option
                        v-for="item in roleOptionsData"
                        :key="item.roleId"
                        :label="item.roleName"
                        :value="item.roleId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="操作管理员：" label-width="100px">
                    {{optionName}}
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogSetPermitFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmSetAccountRolePer">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getAdminManageTable  , getAllDepartData , saveAdminUser , updateAdminUser , getUserDetailInfo , getAllFuncPerm , updateRoleData , saveRoleData , getRoleDetailInfo } from './api'
import { getMemAccountData , getMemAccountDetailData , getAccountMemPermWebrole , setAccountRolePerUrl , getAccountPermWebrole , getMemAccountSelectAuthenticationData } from './api'

import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
    export default {

        data() {
            return {
                statusClickIndex:0,
                personClickIndex:0,
                //复选框选择的数据
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
                personType:[
                  {label:'专家',value:''},
                  {label:'机构',value:'0'},
                  {label:'服务商',value:'2'},
                  {label:'经纪人',value:'1'},
                ],
                accountAuditType:[
                    {label:'全部',value:''},
                    {label:'待审核',value:'0',num:0},
                    {label:'未通过',value:'2'},
                    {label:'已通过',value:'1'},
                ],
                //专家详情弹框
                dialogExpertFormVisible:false,
                dialogFactoraFormVisible:false,
                //角色下拉框数据
                roleOptionsData:[
                    {
                        value: '选项1',
                        label: '黄金糕'
                    }, {
                        value: '选项2',
                        label: '双皮奶'
                    },
                ],
                //
                permitForm:{
                    roleId:[],
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
                    // {userId:1,username:'admin',email:'1@qq.com',mobile:17521016266,status:1,roleIdList:[1,2],deptId:6,deptName:'测试分公司',createTime: "2016-11-11 11:11:11"}
                ],
                total:0,
                formInline: {
                    keyWord:'',
                    type:'',
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
            chooseTr(val){
                this.chooseUseData=val;
            },
            //切换会员类型
            changeTypeMem(item,key){
                if(this.statusClickIndex!=key){
                    this.statusClickIndex=key;
                    this.formInline.auditStatus=item.value;
                    this.formInline.pageIndex=1;
                    this.fetchData();
                }
            },
            changePersonType(item,key){
                if (this.personClickIndex != key){
                  this.personClickIndex = key;
                }
            },
            //切换账号性质
            selectChange(){
                this.formInline.pageNumber=1;
                this.fetchData();
            },
            //点击表格行
            seenDeatil(row){
                if(row.nickname=='专家'){
                    this.$router.push({path:'/index/authority/expertReview',query:{id:row.userId,approvalType:1}})
                }
                if(row.nickname=='机构'){
                    this.$router.push({path:'/index/authority/angencyReview',query:{id:row.userId,approvalType:2}})
                }
            },
            //权限设置
            setPermit(row){
                this.userId=row.userId;
                let param={userId:this.userId};
                getAccountPermWebrole(param).then(res=>{
                    if(res.data.code==0){
                        this.permitForm.roleId=res.data.data.roleIdList;
                    }

                })
                this.dialogSetPermitFormVisible=true;

                getAccountMemPermWebrole().then(res=>{
                    if(res.data.code==0){
                        this.roleOptionsData=res.data.data;
                    }else{
                        this.roleOptionsData=[];
                    }

                })
            },
            //确认权限设置
            confirmSetAccountRolePer(){
                let param={};
                param.roleIdList=this.permitForm.roleId;
                param.userId=this.userId;
                setAccountRolePerUrl(param).then(res=>{
                    if(res.data.code==0){
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
                        // console.log('error submit!!');
                        return false;
                    }
                });

            },
            //编辑行
            editClick(row){
                this.dialogExpertFormVisible=true;
                return false;
                this.dialogFormVisible=true;
                this.dialogFormVisibleTitle="编辑"
                let param={
                    roleId:row.roleId
                }
                Promise.all([this.getRoleOrDeptData(),getRoleDetailInfo(param)]).then(result=>{
                    // console.log(result);
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
                getMemAccountData(this.formInline).then(res=>{
                    if(res.data.ret){
                        this.tableData=res.data.data.data.list;
                        this.total=res.data.data.data.total;
                        this.accountAuditType[1].num=res.data.data.count;
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
            // console.log('sessionStorage',sessionStorage['username']);
            this.optionName=sessionStorage['username'];
            this.fetchData();
            //先处理成vue-treeselect的需求字段。
            for(let i=0;i<this.deptSelectOptions.length;i++){
                this.deptSelectOptions[i].id=this.deptSelectOptions[i].deptId;
                this.deptSelectOptions[i].label=this.deptSelectOptions[i].name;
            }
            // console.log('this.treeData',this.treeData(this.deptSelectOptions,'deptId','parentId','children'));
        },
    }
</script>

<style lang="less">
    .el-table tbody tr:hover>td {
        background-color:#E6F7FF!important
    }
    .search_input .el-input__inner{
        border:1px solid #01A2E4;
        width: 293px;
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
</style>
